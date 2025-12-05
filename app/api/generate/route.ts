import { NextResponse } from "next/server";

/* -------------------------
   MASTER PROMPT (STATIC)
------------------------- */
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

/* -------------------------
   POST REQUEST HANDLER
------------------------- */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { idea, audience, tone, brandName, industry } = body;

    if (!idea) return NextResponse.json({ error: "Idea is required" }, { status: 400 });

    // Fill placeholders inside master prompt
    const finalPrompt = MASTER_PROMPT
      .replaceAll("<<BRAND_NAME>>", brandName || "")
      .replaceAll("<<IDEA>>", idea)
      .replaceAll("<<TARGET_AUDIENCE>>", audience || "")
      .replaceAll("<<TONE>>", tone || "")
      .replaceAll("<<INDUSTRY>>", industry || "");

    /* -------------------------
       CALL GROQ API
------------------------- */
    const groqResp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: [{ role: "user", content: finalPrompt }],
        temperature: 0.2,
        max_tokens: 3500
      })
    });

    const groqJson = await groqResp.json();
    let raw = groqJson.choices[0].message.content.trim();

    // Ensure JSON parses properly
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      const first = raw.indexOf("{");
      const last = raw.lastIndexOf("}");
      parsed = JSON.parse(raw.slice(first, last + 1));
    }

    /* -------------------------
       LOGO GENERATION
------------------------- */
    const logoPrompt =
      parsed.logos?.promptUsed ||
      `Minimal modern vector logo for ${brandName || parsed.branding?.nameOptions?.[0]} on clean background.`;

    let imageUrls = [
      "https://via.placeholder.com/512?text=Logo1",
      "https://via.placeholder.com/512?text=Logo2"
    ];

    if (process.env.FAL_API_KEY) {
      const falResp = await fetch("https://fal.run/fal-ai/flux-lora", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Key ${process.env.FAL_API_KEY}`
        },
        body: JSON.stringify({ prompt: logoPrompt, num_images: 2 })
      });

      const falJson = await falResp.json().catch(() => null);
      if (falJson?.images) imageUrls = falJson.images;
    }

    parsed.logos = {
      promptUsed: logoPrompt,
      imageUrls
    };

    return NextResponse.json(parsed, { status: 200 });

  } catch (error: any) {
    console.error("SERVER ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}