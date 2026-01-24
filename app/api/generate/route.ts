import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  serverTimestamp,
  increment,
} from "firebase/firestore";

// --- CONFIG ---
// const groqClient = new Groq(...) // REMOVED: You use callGroqWithFallback below, so we don't need this.
const PATHWAY_API_URL = "http://127.0.0.1:8000/v1/retrieve";

/* ---------------------------------------------------------
   MASTER PROMPT (WITH MARKET CONTEXT PLACEHOLDER)
--------------------------------------------------------- */
const MASTER_PROMPT = `
You are a world-class Brand Strategist AI. Create a strategy for:
Brand: <<BRAND_NAME>>
Idea: <<IDEA>>
Audience: <<TARGET_AUDIENCE>>
Tone: <<TONE>>
Industry: <<INDUSTRY>>

MARKET INTELLIGENCE (REAL-TIME DATA):
<<MARKET_CONTEXT>>

MARKET DATA ANALYSIS INSTRUCTIONS:
Analyze the MARKET INTELLIGENCE provided above.
1. If context mentions "saturation" or "declining", set 'marketRisk' > 80 and 'growthScore' < 40.
2. If context mentions "emerging" or "high demand", set 'growthScore' > 80.
3. Ensure all graphs (revenue, growth) match this sentiment.

### CRITICAL SCORING RULES (MUST FOLLOW):
1. **IF Context contains "SATURATION" or "DECLINING" or "DEAD":**
   - You MUST set 'growthScore' between **10 and 35**.
   - Set 'marketRisk' to **90**.
   - The 'sixMonthOutlook' must be negative/warning about failure.

2. **IF Context contains "EMERGING" or "EXPLODING" or "HIGH DEMAND":**
   - You MUST set 'growthScore' between **85 and 99**.
   - Set 'marketRisk' to **10**.
   - The 'sixMonthOutlook' must be extremely positive.

3. **IF Context is neutral/missing:**
   - Set 'growthScore' to 50 (Average).

Your ONLY job is to return a valid JSON object in the exact structure below.
No explanations, no markdown, no intro text, no backticks — only JSON.

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
    "promptUsed": "ultra-detailed prompt for Stability AI",
    "imageUrls": []
  },
  "futureInsights": {
    "growthScore": 0, <-- INTEGER ONLY (Follow Rules Above)
    "sixMonthOutlook": "String",
    "biggestGrowthLever": "String",
    "revenueBySegment": [ { "name": "A", "value": 100 } ],
    "contentMomentum": [10, 20, ...], 
    "growthPrediction": [10, 25, 45, 60, 80, 100], <-- Adjust curve based on Score (Flat for low score, Steep for high)
    "riskAnalysis": {
      "marketRisk": 0,
      "brandRisk": 0,
      "competitionRisk": 0,
      "executionRisk": 0
    }
  }
}
`.trim();

/* ---------------------------------------------------
   Cleanup helpers
--------------------------------------------------- */
function removeTrailingCommas(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.filter((el: any) => el !== undefined).map(removeTrailingCommas);
  } else if (obj !== null && typeof obj === "object") {
    const cleaned: any = {};
    for (const key in obj) {
      cleaned[key] = removeTrailingCommas(obj[key]);
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
    let jsonString = raw.slice(first, last + 1);
    jsonString = jsonString.replace(/,\s*(\]|\})/g, "$1");
    jsonString = normalizeBadQuotes(jsonString);
    return removeTrailingCommas(JSON.parse(jsonString));
  }
}

/* ---------------------------------------------------
   Hugging Face Image Generator
--------------------------------------------------- */
const HF_PRIMARY_MODEL = process.env.HF_LOGO_MODEL_ID || "black-forest-labs/FLUX.1-dev";
const HF_FALLBACK_MODEL = "runwayml/stable-diffusion-v1-5";

async function generateHFLogos(
  prompt: string,
  numImages: number
): Promise<{ images: string[]; error?: string; modelUsed: string }> {
  if (!process.env.HUGGINGFACE_API_KEY) {
    return { images: [], error: "Missing HF key", modelUsed: "none" };
  }

  async function callModel(modelId: string) {
    const endpoint = `https://router.huggingface.co/hf-inference/models/${modelId}`;
    const images: string[] = [];
    for (let i = 0; i < numImages; i++) {
      const resp = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          Accept: "image/png",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      });
      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`HF ${resp.status}: ${text}`);
      }
      const buffer = await resp.arrayBuffer();
      images.push(`data:image/png;base64,${Buffer.from(buffer).toString("base64")}`);
    }
    return images;
  }

  try {
    const images = await callModel(HF_PRIMARY_MODEL);
    return { images, modelUsed: HF_PRIMARY_MODEL };
  } catch (e: any) {
    try {
      const images = await callModel(HF_FALLBACK_MODEL);
      return { images, modelUsed: HF_FALLBACK_MODEL };
    } catch (err: any) {
      return { images: [], error: err.message, modelUsed: HF_FALLBACK_MODEL };
    }
  }
}

/* ---------------------------------------------------
   Groq helper
--------------------------------------------------- */
async function callGroqWithFallback(prompt: string) {
  const endpoint = "https://api.groq.com/openai/v1/chat/completions";
  async function call(useJson: boolean) {
    const body: any = {
      model: "llama-3.1-70b-versatile", // Upped to 70b for better logic
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 3500,
    };
    if (useJson) body.response_format = { type: "json_object" };
    try{
      const resp = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify(body),
      });
  
  const json = await resp.json();
      
      if (!resp.ok) {
        // LOG THE REAL ERROR HERE
        console.error("❌ Groq API Failure:", JSON.stringify(json, null, 2));
      }
      
      return { resp, json };
    } catch (err) {
      console.error("❌ Network/Fetch Error:", err);
      return { resp: { ok: false }, json: { error: err } };
    }
  }

  console.log("Attempting Primary Call (JSON Mode)...");
  const first = await call(true);
  
  if (!first.resp.ok || first.json?.error) {
    console.warn("⚠️ Primary call failed. Attempting Fallback (Text Mode)...");
    
    // Switch to a smaller/faster model for fallback if 70b failed
    const body: any = {
      model: "llama-3.1-8b-instant", 
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    };

    const secondEndpoint = "https://api.groq.com/openai/v1/chat/completions";
    const secondResp = await fetch(secondEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify(body),
    });
    
    const secondJson = await secondResp.json();
    
    if (!secondResp.ok) {
        console.error("❌ Fallback also failed:", JSON.stringify(secondJson, null, 2));
        return { ok: false, content: null };
    }
    
    return { ok: true, content: secondJson.choices?.[0]?.message?.content };
  }

  return { ok: true, content: first.json.choices?.[0]?.message?.content };
}


// --- HELPER: GET MARKET DATA ---
async function getPathwayContext(query: string) {
  try {
    const res = await fetch(PATHWAY_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query, k: 3 }), 
    });
    
    if (!res.ok) throw new Error("Pathway server unreachable");
    
    const data = await res.json();
    const context = data.map((d: any) => d.text).join("\n\n"); 
    return context || "No specific market data found.";

  } catch (error) {
    console.warn("Pathway RAG failed/skipped (using fallback):", error);
    return "Market appears stable with moderate growth opportunities.";
  }
}

/* ---------------------------------------------------
   POST HANDLER (WIRED UP)
--------------------------------------------------- */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { idea, audience, tone, brandName, industry, userId } = body;

    if (!idea) return NextResponse.json({ error: "Idea is required" }, { status: 400 });

    if (userId) {
      const snap = await getDoc(doc(db, "users", userId));
      if (snap.exists() && (snap.data().credits || 0) < 1) {
        return NextResponse.json({ error: "Insufficient credits" }, { status: 403 });
      }
    }

    // --- STEP 1: FETCH REAL DATA ---
    const marketContext = await getPathwayContext(idea);

    // --- STEP 2: INJECT INTO PROMPT ---
    const finalPrompt = MASTER_PROMPT
      .replaceAll("<<BRAND_NAME>>", brandName || "")
      .replaceAll("<<IDEA>>", idea)
      .replaceAll("<<TARGET_AUDIENCE>>", audience || "")
      .replaceAll("<<TONE>>", tone || "")
      .replaceAll("<<INDUSTRY>>", industry || "")
      .replaceAll("<<MARKET_CONTEXT>>", marketContext); // <--- THIS IS THE MISSING PIECE

    // --- STEP 3: GENERATE STRATEGY ---
    const groq = await callGroqWithFallback(finalPrompt);
    if (!groq.ok) return NextResponse.json({ error: "Groq error" }, { status: 500 });

    let parsed = safeParseJSON(groq.content.trim());
    console.log("------------------------------------------------");
    console.log("1. RAG Context Used:", marketContext.substring(0, 50) + "...");
    console.log("2. Future Insights Object:", parsed.futureInsights);
    console.log("3. Growth Score Generated:", parsed.futureInsights?.growthScore);
    console.log("------------------------------------------------");
    // --- STEP 4: GENERATE LOGOS ---
    const logoPrompt = parsed.logos?.promptUsed || `Minimal vector logo for ${brandName}`;
    const logos = await generateHFLogos(logoPrompt, 2);

    parsed.logos = {
      promptUsed: logoPrompt,
      imageUrls: logos.images.length ? logos.images : ["https://dummyimage.com/512x512/aaa/000&text=Fallback"],
      usedFallback: !logos.images.length,
      hfError: logos.error || null,
      hfModelId: logos.modelUsed,
    };

    if (userId) {
      await addDoc(collection(db, "brands"), {
        userId,
        brandName: brandName || parsed.branding?.nameOptions?.[0],
        strategy: parsed,
        logoData: logos.images[0] || null,
        createdAt: serverTimestamp(),
        // Optional: Save the context used so you can show it in the UI later
        ragContextUsed: marketContext, 
      });
      await updateDoc(doc(db, "users", userId), { credits: increment(-1) });
    }

    return NextResponse.json(parsed);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}