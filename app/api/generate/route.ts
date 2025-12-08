// app/api/generate/route.ts
import { NextResponse } from "next/server";

// ---------------------------------------------------------
// MASTER PROMPT (world‑class Brand Strategist + full JSON)
// (merged – same structure you both used)
// ---------------------------------------------------------
const MASTER_PROMPT = `
You are a world-class Brand Strategist + Business Consultant AI with 15+ years of expertise in consumer psychology, brand positioning, and startup advisory.
Your ONLY job is to return a valid JSON object in the exact structure below.
No explanations, no markdown, no intro text, no backticks — only JSON.
Every section must contain complete and premium business-logic-backed content.

JSON to return:
{
  "business": {
    "summary": "strong and sharp positioning statement in 80–120 words",
    "targetAudience": ["exactly 5 audience archetypes with persona names"],
    "idealCustomerProfile": {
      "ageRange": "age range",
      "location": "specific geography or global market",
      "incomeLevel": "mid / upper / premium",
      "psychographics": ["beliefs, aspirations, values"],
      "buyingMotives": ["emotional triggers that drive purchase"]
    },
    "painPoints": ["pain points that drive customers to purchase"],
    "valueProposition": "unbeatable UVP that emotionally differentiates the brand",
    "businessModel": {
      "revenueModels": ["multiple monetization models"],
      "costDrivers": ["realistic key cost drivers"],
      "keyPartners": ["strategic partnerships for scaling"],
      "scalability": "how this business scales long-term"
    },
    "businessModelCanvas": {
      "keyPartners": [],
      "keyActivities": [],
      "keyResources": [],
      "valueProposition": [],
      "customerSegments": [],
      "channels": [],
      "customerRelationships": [],
      "costStructure": [],
      "revenueStreams": []
    },
    "valuePropositionChart": [
      {
        "customerSegment": "",
        "painPoints": "",
        "desiredOutcome": "",
        "solutionOffered": "",
        "competingSolutions": "",
        "whyWeAreBetter": ""
      }
    ],
    "competitorAnalysis": [
      {
        "competitor": "name",
        "strength": "string",
        "weakness": "string",
        "gapToExploit": "string"
      }
    ],
    "pricingIdeas": ["smart pricing psychology strategies"],
    "marketNeed": "why the world needs this business (research tone)",
    "risks": ["realistic risks"],
    "mitigations": ["practical mitigation steps"]
  },
  "branding": {
    "nameOptions": ["exactly 5 unique & domain-available names"],
    "taglineOptions": ["exactly 5 catchy taglines"],
    "brandStory": "cinematic emotional narrative in 130–200 words",
    "brandVoice": "how the brand should sound everywhere",
    "messagingPillars": ["core phrases for marketing communication"],
    "visualIdentity": {
      "colorPalette": [
        { "name": "color name", "hex": "hex code", "usage": "emotional psychology + where to use" }
      ],
      "fontSuggestions": [
        { "role": "heading", "font": "string" },
        { "role": "body", "font": "string" }
      ],
      "iconographyStyle": "design direction and symbolism"
    }
  },
  "marketing": {
    "landingPage": {
      "heroHeadline": "powerful 8–14 word hook",
      "heroSubheadline": "benefit-driven emotional support line",
      "sections": [
        { "title": "string", "body": "persuasive copy" }
      ],
      "primaryCTA": "CTA designed for conversions"
    },
    "funnels": [
      {
        "stage": "TOFU / MOFU / BOFU",
        "copyAngle": "strategy to move users to the next stage",
        "CTA": "call to action"
      }
    ],
    "socialPosts": [
      { "platform": "string", "caption": "viral copywriting", "imagePrompt": "AI image prompt" }
    ],
    "reelScripts": ["high-hook short video script lines"],
    "contentPlan15Days": [
      { "day": 1, "idea": "content idea" },
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
    "campaignIdeas": ["creative marketing campaigns designed to create buzz"],
    "goToMarketStrategy": "step-by-step approach to launch and capture early adopters"
  },
  "logos": {
    "promptUsed": "ultra-detailed prompt for Stability AI — include industry, brand tone, color palette, symbolism, typography style, emotion, vector clarity and minimalistic white background",
    "imageUrls": []
  }
}

INPUTS:
Brand name: "<<BRAND_NAME>>"
Business idea: "<<IDEA>>"
Target audience: "<<TARGET_AUDIENCE>>"
Tone/style: "<<TONE>>"
Industry: "<<INDUSTRY>>"

Formatting requirements:
- Write short, punchy, non-repetitive sentences.
- Maintain a consistent brand tone across all sections.
- Every field must be logically complete and deeply business relevant.
- Arrays must contain exactly the number of items requested — no more, no less.

Rules:
- Output JSON only — no markdown, no backticks, no comments, no explanations.
- Never remove or rename keys.
- Never say "cannot determine"; assume missing details intelligently.
- Never include placeholders like TBD, etc, or ...
- If a section is hard to fill, still return content — do NOT skip or leave blank.
`.trim();

/* ---------------------------------------------------
   Cleanup helpers to survive messy model JSON
--------------------------------------------------- */

// Remove trailing commas in objects/arrays and undefineds in arrays
function removeTrailingCommas(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.filter((el) => el !== undefined).map(removeTrailingCommas);
  } else if (obj !== null && typeof obj === "object") {
    const cleaned: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        cleaned[key] = removeTrailingCommas(obj[key]);
      }
    }
    return cleaned;
  }
  return obj;
}

// Extra normalization for the ""Experience..."" type bugs
function normalizeBadQuotes(str: string): string {
  // 1) Collapse any "" into "
  let s = str.replace(/""/g, '"');

  // 2) Remove stray control characters
  s = s.replace(/[\u0000-\u001F]+/g, "");

  return s;
}

function safeParseJSON(raw: string): any {
  // Try naive parse first
  try {
    return JSON.parse(raw);
  } catch {
    // Extract object region
    const first = raw.indexOf("{");
    const last = raw.lastIndexOf("}");
    if (first === -1 || last === -1) {
      throw new Error("Failed to extract JSON block from model output.");
    }

    let jsonString = raw.slice(first, last + 1);

    // Fix common issues: trailing commas and bad quotes
    jsonString = jsonString
      .replace(/,\s*(\]|\})/g, "$1") // trailing commas
      .trim();

    jsonString = normalizeBadQuotes(jsonString);

    const parsed = JSON.parse(jsonString);
    return removeTrailingCommas(parsed);
  }
}

/* ---------------------------------------------------
   Stability helper for logos
   (merged: still PNG data URLs; easy for frontend)
--------------------------------------------------- */
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

  for (let i = 0; i < numImages; i++) {
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("output_format", "png");
    // You can add style_preset/aspect_ratio here if you want stricter logos

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

// ---------------------------------------------------------
// POST /api/generate
// ---------------------------------------------------------
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

    // Fill prompt with user inputs
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
          // Ask Groq to stay in JSON mode, but we still clean up
          response_format: { type: "json_object" },
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
          error: groqJson.error?.message || "Groq request failed",
          details: groqJson,
        },
        { status: 500 }
      );
    }

    let content: any = groqJson.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        {
          error: "Groq response missing choices[0].message.content",
          raw: groqJson,
        },
        { status: 500 }
      );
    }

    // content might already be an object (in strict JSON mode), or a JSON string
    let parsed: any;
    try {
      if (typeof content === "string") {
        parsed = safeParseJSON(content.trim());
      } else {
        // already object-shaped
        parsed = removeTrailingCommas(content);
      }
    } catch (e) {
      console.error(
        "JSON parse failed even after cleanup:",
        e,
        "\nRAW (truncated):",
        typeof content === "string" ? content.slice(0, 500) : content
      );
      return NextResponse.json(
        {
          error:
            "Model returned invalid JSON even after cleanup. Try again with simpler inputs.",
        },
        { status: 500 }
      );
    }

    // -----------------------------------------------------
    // Normalize shape so frontend remains compatible
    // -----------------------------------------------------
    if (parsed?.branding?.visualIdentity) {
      const vi = parsed.branding.visualIdentity;

      if (vi.colorPalette && !parsed.branding.colorPalette) {
        parsed.branding.colorPalette = vi.colorPalette;
      }
      if (vi.fontSuggestions && !parsed.branding.fontSuggestions) {
        parsed.branding.fontSuggestions = vi.fontSuggestions;
      }
    }

    // 3) Build logo prompt
    const logoPrompt =
      parsed.logos?.promptUsed ||
      `Minimal modern vector logo for ${
        brandName || parsed.branding?.nameOptions?.[0] || "the brand"
      } on a clean white background, simple, flat, scalable, no text.`;

    // 4) Try Stability for real logos; fall back to placeholders if it fails
    let imageUrls: string[] = [
      "https://dummyimage.com/512x512/111/aaa.png&text=Logo+1",
      "https://dummyimage.com/512x512/111/aaa.png&text=Logo+2",
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
