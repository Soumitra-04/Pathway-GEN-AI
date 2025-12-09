// app/api/generate/route.ts
import { NextResponse } from "next/server";

// ---------------------------------------------------------
// MASTER PROMPT (world-class Brand Strategist + full JSON)
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

function normalizeBadQuotes(str: string): string {
  let s = str.replace(/""/g, '"');
  s = s.replace(/[\u0000-\u001F]+/g, "");
  return s;
}

function safeParseJSON(raw: string): any {
  try {
    return JSON.parse(raw);
  } catch {
    const first = raw.indexOf("{");
    const last = raw.lastIndexOf("}");
    if (first === -1 || last === -1) {
      throw new Error("Failed to extract JSON block from model output.");
    }

    let jsonString = raw.slice(first, last + 1);

    // remove trailing commas before ] or }
    jsonString = jsonString.replace(/,\s*(\]|\})/g, "$1").trim();
    jsonString = normalizeBadQuotes(jsonString);

    const parsed = JSON.parse(jsonString);
    return removeTrailingCommas(parsed);
  }
}

/* ---------------------------------------------------
   Hugging Face helper for logos (image only)
--------------------------------------------------- */

// default HF image model
const HF_IMAGE_MODEL =
  process.env.HF_LOGO_MODEL_ID || "stabilityai/stable-diffusion-2-1";

async function generateHFLogos(
  prompt: string,
  numImages: number
): Promise<{ images: string[]; error?: string }> {
  if (!process.env.HUGGINGFACE_API_KEY) {
    const msg = "HUGGINGFACE_API_KEY not set on the server";
    console.warn(msg);
    return { images: [], error: msg };
  }

  // router-based Inference endpoint
  const endpoint = `https://router.huggingface.co/hf-inference/models/${HF_IMAGE_MODEL}`;

  const images: string[] = [];
  let lastError: string | undefined;

  for (let i = 0; i < numImages; i++) {
    try {
      const resp = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          Accept: "image/png", // important: request image only
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            guidance_scale: 7,
            num_inference_steps: 28,
          },
        }),
      });

      const contentType = (resp.headers.get("content-type") || "").toLowerCase();

      if (contentType.includes("application/json")) {
        const jsonText = await resp.text().catch(() => "");
        lastError = `HF JSON response (status ${resp.status}): ${jsonText}`;
        console.error(
          "Hugging Face image JSON (/api/generate):",
          resp.status,
          jsonText.slice(0, 800)
        );
        break;
      }

      if (!resp.ok) {
        const errText = await resp.text().catch(() => "");
        lastError = `HF image error (status ${resp.status}): ${errText}`;
        console.error(
          "Hugging Face image API error (/api/generate):",
          resp.status,
          errText.slice(0, 800)
        );
        if (resp.status === 503 || resp.status === 429 || resp.status === 410) {
          break;
        }
        break;
      }

      const arrayBuffer = await resp.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");
      const dataUrl = `data:image/png;base64,${base64}`;
      images.push(dataUrl);
    } catch (e: any) {
      lastError = e?.message || String(e);
      console.error("HF image call from /api/generate failed:", lastError);
      break;
    }
  }

  return { images, error: lastError };
}

/* ---------------------------------------------------
   Groq helper with JSON-safe fallback
--------------------------------------------------- */

type GroqResult =
  | { ok: true; content: string; raw: any }
  | { ok: false; errorMessage: string; raw: any };

async function callGroqWithFallback(prompt: string): Promise<GroqResult> {
  const endpoint = "https://api.groq.com/openai/v1/chat/completions";

  async function call(useResponseFormat: boolean) {
    const body: any = {
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 3500,
    };

    if (useResponseFormat) {
      body.response_format = { type: "json_object" };
    }

    const resp = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const json = await resp.json();
    console.log(
      `GROQ RAW JSON (useResponseFormat=${useResponseFormat}):`,
      JSON.stringify(json, null, 2)
    );

    return { resp, json };
  }

  // 1) Try strict JSON mode first
  const first = await call(true);
  if (!first.resp.ok || first.json?.error) {
    const err = first.json?.error;
    if (err?.code === "json_validate_failed") {
      console.warn(
        "Groq JSON validation failed, retrying without response_format..."
      );
      // 2) Retry once without response_format, we’ll clean JSON ourselves
      const second = await call(false);
      if (!second.resp.ok || second.json?.error) {
        return {
          ok: false,
          errorMessage:
            second.json?.error?.message ||
            "Groq request failed even after fallback",
          raw: second.json,
        };
      }
      const content = second.json.choices?.[0]?.message?.content;
      if (!content || typeof content !== "string") {
        return {
          ok: false,
          errorMessage:
            "Groq fallback response missing choices[0].message.content",
          raw: second.json,
        };
      }
      return { ok: true, content, raw: second.json };
    }

    // some other error
    return {
      ok: false,
      errorMessage: err?.message || "Groq request failed",
      raw: first.json,
    };
  }

  // strict JSON success: Groq guarantees valid JSON string here
  const content = first.json.choices?.[0]?.message?.content;
  if (!content || typeof content !== "string") {
    return {
      ok: false,
      errorMessage:
        "Groq response missing choices[0].message.content in strict JSON mode",
      raw: first.json,
    };
  }

  return { ok: true, content, raw: first.json };
}

// ---------------------------------------------------------
// POST /api/generate  – Groq for TEXT, HF only for LOGOS
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

    const finalPrompt = MASTER_PROMPT.replaceAll(
      "<<BRAND_NAME>>",
      brandName || ""
    )
      .replaceAll("<<IDEA>>", idea)
      .replaceAll("<<TARGET_AUDIENCE>>", audience || "")
      .replaceAll("<<TONE>>", tone || "")
      .replaceAll("<<INDUSTRY>>", industry || "");

    // 1) Groq for brand JSON  ✅ (with fallback)
    const groqResult = await callGroqWithFallback(finalPrompt);

    if (!groqResult.ok) {
      return NextResponse.json(
        {
          error: groqResult.errorMessage,
          details: groqResult.raw,
        },
        { status: 500 }
      );
    }

    let parsed: any;
    try {
      // content is always a string here
      parsed = safeParseJSON(groqResult.content.trim());
    } catch (e) {
      console.error(
        "JSON parse failed even after cleanup:",
        e,
        "\nRAW (truncated):",
        groqResult.content.slice(0, 500)
      );
      return NextResponse.json(
        {
          error:
            "Model returned invalid JSON even after cleanup. Try again with simpler inputs.",
        },
        { status: 500 }
      );
    }

    // 2) Normalize shape for frontend
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

    // 4) Hugging Face for initial logos (image only)
    let imageUrls: string[] = [
      "https://dummyimage.com/512x512/111/aaa.png&text=Logo+1",
      "https://dummyimage.com/512x512/111/aaa.png&text=Logo+2",
    ];
    let usedFallback = false;
    let hfError: string | undefined;

    try {
      const { images, error } = await generateHFLogos(logoPrompt, 2);
      if (images.length) {
        imageUrls = images;
      } else {
        usedFallback = true;
        hfError = error;
      }
    } catch (e: any) {
      usedFallback = true;
      hfError = e?.message || String(e);
      console.error("HF image call from /api/generate failed:", e);
    }

    parsed.logos = {
      promptUsed: logoPrompt,
      imageUrls,
      usedFallback,
      hfError: hfError || null,
      hfModelId: HF_IMAGE_MODEL,
    };

    return NextResponse.json(parsed, { status: 200 });
  } catch (error: any) {
    console.error("SERVER ERROR /api/generate (HF+Groq):", error);
    return NextResponse.json(
      { error: error.message || "Unexpected server error" },
      { status: 500 }
    );
  }
}
