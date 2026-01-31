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
const PATHWAY_API_URL = "http://127.0.0.1:8000/v1/retrieve";

/* ---------------------------------------------------------
   MASTER PROMPT
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

   ### COMPETITOR NAMING RULES (VERY IMPORTANT):
- **NEVER use "Competitor A", "Competitor B", or "Company X".**
- You MUST generate **REALISTIC, EXISTING, or PLAUSIBLE brand names**.
- Example for Coffee: Use "Starbucks", "Blue Bottle", "Dunkin".
- Example for Tech: Use "Stripe", "Notion", "Salesforce".
- If it's a new niche, invent professional names like "Zenith Labs", "EcoFlow", "NovaSystems".

------------------------------------------------------------
IMPLEMENTATION INTELLIGENCE MODULE (MANDATORY)
------------------------------------------------------------

You must ALSO generate a TOP-LEVEL JSON object called "implementation".

PURPOSE:
Provide AI-assisted guidance for founders to understand how to legally,
financially, and operationally implement their business idea.

IMPORTANT CONSTRAINTS:
- This is NOT legal advice.
- Provide indicative, industry-standard guidance only.
- Never say "depends".
- Use realistic assumptions based on the Industry and Idea.
- Use cost ranges, not exact numbers.
- If the business is regulated or restricted, clearly warn the user.

DEFAULT JURISDICTION RULE:
- If no country or state is explicitly mentioned, assume India.

IMPLEMENTATION RULES:
- Legal status MUST match jurisdiction.
- Regulated industries MUST list permits and authorities.
- Costs MUST align with early-stage startup benchmarks.
- Execution roadmap MUST cover Day 0 to Month 6.
- Feasibility scores MUST be integers between 0 and 100.

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
        "whyWeAreBetter": ""
      }
    ],
    "competitorAnalysis": [
      {
        "competitor": "Real Brand Name1",
        "strength": "string",
        "weakness": "string",
        "gapToExploit": "string"
      },
      {
        "competitor": "Real Brand Name2",
        "strength": "string",
        "weakness": "string",
        "gapToExploit": "string"
      },
      {
        "competitor": "Real Brand Name3",
        "strength": "string",
        "weakness": "string",
        "gapToExploit": "string"
      },
      {
        "competitor": "Real Brand Name4",
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
    "nameOptions": ["Name 1", "Name 2", "Name 3", "Name 4", "Name 5"],
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
      { "platform": "string", "caption": "viral copywriting", "imagePrompt": "AI image prompt" },
      { "platform": "string", "caption": "viral copywriting", "imagePrompt": "AI image prompt" },
    ],
    "reelScripts": ["high-hook short video script lines"],
    "contentPlan15Days": [
        { "day": 1, "idea": "content idea"},
        { "day": 2, "idea": "content idea"},
        { "day": 3, "idea": "content idea"},
        { "day": 4, "idea": "content idea"},
        { "day": 5, "idea": "content idea"},
        { "day": 6, "idea": "content idea"},
        { "day": 7, "idea": "content idea"},
        { "day": 8, "idea": "content idea"},
        { "day": 9, "idea": "content idea"},
        { "day": 10, "idea": "content idea"},
        { "day": 11, "idea": "content idea"},
        { "day": 12, "idea": "content idea"},
        { "day": 13, "idea": "content idea"},
        { "day": 14, "idea": "content idea"},
        { "day": 15, "idea": "content idea"}
    ],
    "campaignIdeas": ["creative marketing campaigns designed to create buzz"],
    "goToMarketStrategy": "step-by-step approach to launch and capture early adopters"
  },
  "logos": {
    "promptUsed": "ultra-detailed prompt for Stability AI",
    "imageUrls": []
  },
  "futureInsights": {
    "growthScore": 0,
    "sixMonthOutlook": "String",
    "biggestGrowthLever": "String",
    "revenueBySegment": [ { "name": "A", "value": 100 } ],
    "contentMomentum": [10, 20],
    "growthPrediction": [10, 25, 45, 60, 80, 100],
    "riskAnalysis": {
      "marketRisk": 0,
      "brandRisk": 0,
      "competitionRisk": 0,
      "executionRisk": 0
    }
  },
  "implementation": {
    "legalStatus": {
      "isAllowed": true,
      "jurisdiction": "Country / State",
      "regulatoryCategory": "Unregulated / Licensed / Restricted",
      "governingBodies": ["Authority names"],
      "legalRisks": ["Key legal or regulatory risks"]
    },
    "permitsAndLicenses": [
      {
        "name": "License name",
        "authority": "Issuing authority",
        "costEstimate": "Approx range",
        "timeRequired": "Estimated duration",
        "mandatory": true
      }
    ],
    "setupCosts": {
      "oneTimeCosts": [
        { "item": "Company registration", "amountRange": "₹X – ₹Y" }
      ],
      "monthlyOperatingCosts": [
        { "item": "Marketing / Tech / Staff", "amountRange": "₹X – ₹Y" }
      ],
      "minimumInvestmentRequired": "₹X – ₹Y"
    },
    "executionPlan": [
      {
        "phase": "Phase name",
        "duration": "Time range",
        "actions": ["Concrete execution steps"]
      },
      {
        "phase": "Phase name",
        "duration": "Time range",
        "actions": ["Concrete execution steps"]
      },
      {
        "phase": "Phase name",
        "duration": "Time range",
        "actions": ["Concrete execution steps"]
      },
      {
        "phase": "Phase name",
        "duration": "Time range",
        "actions": ["Concrete execution steps"]
      },
      {
        "phase": "Phase name",
        "duration": "Time range",
        "actions": ["Concrete execution steps"]
      }
    ],
    "feasibilityScore": {
      "legalComplexity": 0,
      "capitalIntensity": 0,
      "executionDifficulty": 0
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
  } catch (e) {
    try {
      const first = raw.indexOf("{");
      const last = raw.lastIndexOf("}");
      if (first === -1 || last === -1) return null;
      
      let jsonString = raw.slice(first, last + 1);
      // Regex to remove trailing commas before closing braces/brackets
      jsonString = jsonString.replace(/,\s*(\]|\})/g, "$1");
      jsonString = normalizeBadQuotes(jsonString);
      return removeTrailingCommas(JSON.parse(jsonString));
    } catch (err) {
      console.error("Critical JSON Parse Error:", err);
      return null;
    }
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
    console.warn("Missing HUGGINGFACE_API_KEY");
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
    console.error("Primary HF Model Failed:", e.message);
    try {
      const images = await callModel(HF_FALLBACK_MODEL);
      return { images, modelUsed: HF_FALLBACK_MODEL };
    } catch (err: any) {
      console.error("Fallback HF Model Failed:", err.message);
      return { images: [], error: err.message, modelUsed: HF_FALLBACK_MODEL };
    }
  }
}

/* ---------------------------------------------------
   Groq helper
--------------------------------------------------- */
async function callGroqWithFallback(prompt: string) {
  if (!process.env.GROQ_API_KEY) {
    console.error("Missing GROQ_API_KEY");
    return { ok: false, error: "Server configuration error: Missing Groq API Key" };
  }

  const endpoint = "https://api.groq.com/openai/v1/chat/completions";
  
  async function call(useJson: boolean) {
    const body: any = {
      model: "llama-3.3-70b-versatile", // UPDATED MODEL HERE
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 7500,
    };
    if (useJson) body.response_format = { type: "json_object" };
    
    try {
      const resp = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify(body),
      });
      
      if (!resp.ok) {
        const text = await resp.text();
        console.error(`Groq API Error (${resp.status}):`, text);
        return { resp: { ok: false }, json: { error: text } };
      }

      const json = await resp.json();
      return { resp, json };
    } catch (err) {
      console.error("Groq Network/Parsing Error:", err);
      return { resp: { ok: false }, json: { error: err } };
    }
  }

  const first = await call(true);
  if (!first.resp.ok || first.json?.error) {
    console.log("Retrying Groq without JSON mode...");
    const second = await call(false);
    return { 
        ok: second.resp.ok, 
        content: second.json?.choices?.[0]?.message?.content,
        error: second.json?.error
    };
  }
  return { 
      ok: true, 
      content: first.json?.choices?.[0]?.message?.content 
  };
}

/* ---------------------------------------------------
   HELPER: GET MARKET DATA
--------------------------------------------------- */
async function getPathwayContext(query: string) {
  try {
    const res = await fetch(PATHWAY_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query, k: 3 }),
    });
    if (!res.ok) throw new Error("Pathway server unreachable");
    const data = await res.json();
    // Safely map data only if it is an array
    if (Array.isArray(data)) {
        const context = data.map((d: any) => d.text).join("\n\n");
        return context || "No specific market data found.";
    }
    return "Market data format unrecognized.";
  } catch (error) {
    console.warn("Pathway Context Error (using fallback):", error);
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

    console.log("Generating for:", { idea, brandName });

    if (!idea) return NextResponse.json({ error: "Idea is required" }, { status: 400 });

    if (userId) {
      try {
        const snap = await getDoc(doc(db, "users", userId));
        if (snap.exists() && (snap.data().credits || 0) < 1) {
          return NextResponse.json({ error: "Insufficient credits" }, { status: 403 });
        }
      } catch (dbError) {
        console.error("Firebase Auth Check Failed:", dbError);
        // Continue anyway if you want to allow guests, otherwise throw
      }
    }

    const marketContext = await getPathwayContext(idea);

    const finalPrompt = MASTER_PROMPT
      .replaceAll("<<BRAND_NAME>>", brandName || "A new startup")
      .replaceAll("<<IDEA>>", idea)
      .replaceAll("<<TARGET_AUDIENCE>>", audience || "General Public")
      .replaceAll("<<TONE>>", tone || "Professional")
      .replaceAll("<<INDUSTRY>>", industry || "Technology")
      .replaceAll("<<MARKET_CONTEXT>>", marketContext);

    const groq = await callGroqWithFallback(finalPrompt);
    
    if (!groq.ok || !groq.content) {
        return NextResponse.json({ error: "AI Generation Failed: " + (groq.error || "Unknown error") }, { status: 500 });
    }

    let parsed = safeParseJSON(groq.content.trim());
    
    if (!parsed) {
        console.error("Failed to parse JSON from Groq:", groq.content.substring(0, 200) + "...");
        return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

    const logoPrompt = parsed.logos?.promptUsed || `Minimal vector logo for ${brandName}`;
    const logos = await generateHFLogos(logoPrompt, 2);

    parsed.logos = {
      promptUsed: logoPrompt,
      imageUrls: logos.images.length ? logos.images : ["https://placehold.co/512x512?text=Logo+Generation+Failed"],
      usedFallback: !logos.images.length,
      hfError: logos.error || null,
      hfModelId: logos.modelUsed,
    };

    // Save to Firebase only if userId exists
    if (userId) {
      try {
        await addDoc(collection(db, "brands"), {
          userId,
          brandName: brandName || parsed.branding?.nameOptions?.[0],
          strategy: parsed,
          logoData: logos.images[0] || null,
          createdAt: serverTimestamp(),
          ragContextUsed: marketContext,
        });
        await updateDoc(doc(db, "users", userId), { credits: increment(-1) });
      } catch (e) {
        console.error("Firebase Save Error:", e);
        // Don't fail the request if just saving to DB fails
      }
    }

    return NextResponse.json(parsed);
  } catch (e: any) {
    console.error("General API Error:", e);
    return NextResponse.json({ error: e.message || "Internal Server Error" }, { status: 500 });
  }
}