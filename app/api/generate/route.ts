// app/api/generate/route.ts
import { NextResponse } from "next/server";

const MASTER_PROMPT = `
You are a Brand & Business Strategy Generator AI.
Your ONLY job is to return a single JSON object in the exact structure described below.
Do NOT add explanations, markdown, comments, or anything outside the JSON.
Do NOT wrap the JSON in backticks.

JSON structure you must return:
{
  "business": {
    "summary": "string",
    "targetAudience": ["string"],
    "painPoints": ["string"],
    "valueProposition": "string",
    "revenueModels": ["string"],
    "pricingIdeas": ["string"],
    "marketNeed": "string",
    "risks": ["string"],
    "mitigations": ["string"]
  },
  "branding": {
    "nameOptions": ["string"],
    "taglineOptions": ["string"],
    "brandStory": "string",
    "brandVoice": "string",
    "messagingPillars": ["string"],
    "colorPalette": [
      { "name": "string", "hex": "string", "usage": "string" }
    ],
    "fontSuggestions": [
      { "role": "heading", "font": "string" },
      { "role": "body", "font": "string" }
    ]
  },
  "marketing": {
    "landingPage": {
      "heroHeadline": "string",
      "heroSubheadline": "string",
      "sections": [
        { "title": "string", "body": "string" }
      ],
      "primaryCTA": "string"
    },
    "socialPosts": [
      { "platform": "string", "caption": "string", "imagePrompt": "string" }
    ],
    "reelScripts": ["string"],
    "contentPlan15Days": [
      { "day": 1, "idea": "string" },
      { "day": 2, "idea": "string" },
      { "day": 3, "idea": "string" },
      { "day": 4, "idea": "string" },
      { "day": 5, "idea": "string" },
      { "day": 6, "idea": "string" },
      { "day": 7, "idea": "string" },
      { "day": 8, "idea": "string" },
      { "day": 9, "idea": "string" },
      { "day": 10, "idea": "string" },
      { "day": 11, "idea": "string" },
      { "day": 12, "idea": "string" },
      { "day": 13, "idea": "string" },
      { "day": 14, "idea": "string" },
      { "day": 15, "idea": "string" }
    ],
    "campaignIdeas": ["string"]
  },
  "logos": {
    "promptUsed": "string",
    "imageUrls": ["string"]
  }
}

Now generate this JSON object using the input below:
Brand name: "<<BRAND_NAME>>"
Business idea: "<<IDEA>>"
Target audience: "<<TARGET_AUDIENCE>>"
Tone/style: "<<TONE>>"
Industry: "<<INDUSTRY>>"
Respond ONLY with valid JSON.
`.trim();

// Small helper: call Stability.ai Stable Image Core and return data URLs
async function generateStabilityLogos(
  prompt: string,
  numImages: number
): Promise<string[]> {
  if (!process.env.STABILITY_API_KEY) {
    console.warn("STABILITY_API_KEY not set, returning empty image list.");
    return [];
  }

  const endpoint =
    "https://api.stability.ai/v2beta/stable-image/generate/core";

  const results: string[] = [];

  // Call the API once per image (simple and reliable)
  for (let i = 0; i < numImages; i++) {
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("output_format", "png");

    const resp = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
        Accept: "image/*",
      },
      body: formData,
    });

    if (!resp.ok) {
      const errText = await resp.text().catch(() => "");
      console.error(
        "Stability API error (generate):",
        resp.status,
        errText.slice(0, 200)
      );
      break;
    }

    const arrayBuffer = await resp.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataUrl = `data:image/png;base64,${base64}`;
    results.push(dataUrl);
  }

  return results;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { idea, audience, tone, brandName, industry } = body;

    if (!idea) {
      return NextResponse.json(
        { error: "Idea is required" },
        { status: 400 }
      );
    }

    const finalPrompt = MASTER_PROMPT
      .replaceAll("<<BRAND_NAME>>", brandName || "")
      .replaceAll("<<IDEA>>", idea)
      .replaceAll("<<TARGET_AUDIENCE>>", audience || "")
      .replaceAll("<<TONE>>", tone || "")
      .replaceAll("<<INDUSTRY>>", industry || "");

    // 1) Call Groq for the brand JSON
    const groqResp = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "user", content: finalPrompt }],
          temperature: 0.2,
          max_tokens: 3500,
        }),
      }
    );

    const groqJson = await groqResp.json();
    console.log("GROQ RAW JSON:", JSON.stringify(groqJson, null, 2));

    if (!groqResp.ok || groqJson.error) {
      return NextResponse.json(
        {
          error: `Groq: ${groqJson.error?.message || "request failed"}`,
          details: groqJson,
        },
        { status: 500 }
      );
    }

    const content = groqJson.choices?.[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        {
          error: "Groq response missing choices[0].message.content",
          raw: groqJson,
        },
        { status: 500 }
      );
    }

    let raw = content.trim();

    // 2) Parse JSON returned by Groq
    let parsed: any;
    try {
      parsed = JSON.parse(raw);
    } catch {
      const first = raw.indexOf("{");
      const last = raw.lastIndexOf("}");
      parsed = JSON.parse(raw.slice(first, last + 1));
    }

    // 3) Build logo prompt
    const logoPrompt =
      parsed.logos?.promptUsed ||
      `Minimal modern vector logo for ${
        brandName || parsed.branding?.nameOptions?.[0] || "the brand"
      } on a clean white background, simple, flat, scalable, no text.`;

    // 4) Try Stability for real logos; fall back to placeholders if it fails
    let imageUrls: string[] = [
      "https://via.placeholder.com/512?text=Logo1",
      "https://via.placeholder.com/512?text=Logo2",
    ];

    try {
      const stabilityUrls = await generateStabilityLogos(logoPrompt, 2);
      if (stabilityUrls.length) {
        imageUrls = stabilityUrls;
      }
    } catch (e) {
      console.error("Stability call from /api/generate failed:", e);
    }

    parsed.logos = {
      promptUsed: logoPrompt,
      imageUrls,
    };

    return NextResponse.json(parsed, { status: 200 });
  } catch (error: any) {
    console.error("SERVER ERROR /api/generate:", error);
    return NextResponse.json(
      { error: error.message || "Unexpected server error" },
      { status: 500 }
    );
  }
}