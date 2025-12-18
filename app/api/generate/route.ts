// app/api/generate/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase"; 
import { 
  doc, 
  getDoc, 
  updateDoc, 
  collection, 
  addDoc, 
  serverTimestamp, 
  increment 
} from "firebase/firestore";

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
        "why we are better": ""
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
   Cleanup helpers
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
    jsonString = jsonString.replace(/,\s*(\]|\})/g, "$1").trim();
    jsonString = normalizeBadQuotes(jsonString);
    const parsed = JSON.parse(jsonString);
    return removeTrailingCommas(parsed);
  }
}

/* ---------------------------------------------------
   Hugging Face helper
--------------------------------------------------- */
const HF_IMAGE_MODEL = process.env.HF_LOGO_MODEL_ID || "stabilityai/stable-diffusion-2-1";

async function generateHFLogos(prompt: string, numImages: number): Promise<{ images: string[]; error?: string }> {
  if (!process.env.HUGGINGFACE_API_KEY) return { images: [], error: "Missing Key" };
  const endpoint = `https://router.huggingface.co/hf-inference/models/${HF_IMAGE_MODEL}`;
  const images: string[] = [];
  let lastError: string | undefined;

  for (let i = 0; i < numImages; i++) {
    try {
      const resp = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          Accept: "image/png",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      });
      if (!resp.ok) { lastError = `HF error ${resp.status}`; break; }
      const arrayBuffer = await resp.arrayBuffer();
      images.push(`data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`);
    } catch (e: any) { lastError = e?.message; break; }
  }
  return { images, error: lastError };
}

/* ---------------------------------------------------
   Groq helper
--------------------------------------------------- */
async function callGroqWithFallback(prompt: string) {
  const endpoint = "https://api.groq.com/openai/v1/chat/completions";
  async function call(useResponseFormat: boolean) {
    const body: any = { model: "llama-3.1-8b-instant", messages: [{ role: "user", content: prompt }], temperature: 0.2, max_tokens: 3500 };
    if (useResponseFormat) body.response_format = { type: "json_object" };
    const resp = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.GROQ_API_KEY}` }, body: JSON.stringify(body) });
    return { resp, json: await resp.json() };
  }
  const first = await call(true);
  if (!first.resp.ok || first.json?.error) {
    const second = await call(false);
    return { ok: second.resp.ok, content: second.json.choices?.[0]?.message?.content, raw: second.json };
  }
  return { ok: true, content: first.json.choices?.[0]?.message?.content, raw: first.json };
}

// ---------------------------------------------------------
// POST HANDLER
// ---------------------------------------------------------
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { idea, audience, tone, brandName, industry, userId } = body;

    if (!idea) return NextResponse.json({ error: "Idea is required" }, { status: 400 });

    if (userId) {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists() && (userSnap.data().credits || 0) < 1) {
        return NextResponse.json({ error: "Insufficient credits" }, { status: 403 });
      }
    }

    const finalPrompt = MASTER_PROMPT.replaceAll("<<BRAND_NAME>>", brandName || "")
      .replaceAll("<<IDEA>>", idea).replaceAll("<<TARGET_AUDIENCE>>", audience || "")
      .replaceAll("<<TONE>>", tone || "").replaceAll("<<INDUSTRY>>", industry || "");

    const groqResult = await callGroqWithFallback(finalPrompt);
    if (!groqResult.ok) return NextResponse.json({ error: "Groq error" }, { status: 500 });

    let parsed = safeParseJSON(groqResult.content.trim());
    const logoPrompt = parsed.logos?.promptUsed || `Minimal logo for ${brandName}`;

    // --- LOGO GENERATION ---
    const generatedImages = await generateHFLogos(logoPrompt, 2);

    parsed.logos = {
      promptUsed: logoPrompt,
      imageUrls: generatedImages.images.length ? generatedImages.images : ["https://dummyimage.com/512x512/aaa/000&text=Fallback"],
      usedFallback: !generatedImages.images.length,
      hfError: generatedImages.error || null,
      hfModelId: HF_IMAGE_MODEL,
    };

    // --- 2. FIRESTORE PERMANENT SAVE & CREDIT DEDUCTION ---
    if (userId) {
      await addDoc(collection(db, "brands"), {
        userId,
        brandName: brandName || parsed.branding?.nameOptions?.[0] || "Untitled Brand",
        strategy: parsed,
        logoData: generatedImages.images.length ? generatedImages.images[0] : null,
        createdAt: serverTimestamp(),
      });
      await updateDoc(doc(db, "users", userId), { credits: increment(-1) });
    }

    return NextResponse.json(parsed, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}