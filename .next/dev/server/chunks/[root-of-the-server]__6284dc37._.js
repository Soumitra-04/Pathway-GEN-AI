module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/generate/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/api/generate/route.ts
__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
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
async function generateStabilityLogos(prompt, numImages) {
    if (!process.env.STABILITY_API_KEY) {
        console.warn("STABILITY_API_KEY not set, returning empty image list.");
        return [];
    }
    const endpoint = "https://api.stability.ai/v2beta/stable-image/generate/core";
    const results = [];
    // Call the API once per image (simple and reliable)
    for(let i = 0; i < numImages; i++){
        const formData = new FormData();
        formData.append("prompt", prompt);
        formData.append("output_format", "png");
        const resp = await fetch(endpoint, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
                Accept: "image/*"
            },
            body: formData
        });
        if (!resp.ok) {
            const errText = await resp.text().catch(()=>"");
            console.error("Stability API error (generate):", resp.status, errText.slice(0, 200));
            break;
        }
        const arrayBuffer = await resp.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString("base64");
        const dataUrl = `data:image/png;base64,${base64}`;
        results.push(dataUrl);
    }
    return results;
}
async function POST(request) {
    try {
        const body = await request.json();
        const { idea, audience, tone, brandName, industry } = body;
        if (!idea) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Idea is required"
            }, {
                status: 400
            });
        }
        const finalPrompt = MASTER_PROMPT.replaceAll("<<BRAND_NAME>>", brandName || "").replaceAll("<<IDEA>>", idea).replaceAll("<<TARGET_AUDIENCE>>", audience || "").replaceAll("<<TONE>>", tone || "").replaceAll("<<INDUSTRY>>", industry || "");
        // 1) Call Groq for the brand JSON
        const groqResp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [
                    {
                        role: "user",
                        content: finalPrompt
                    }
                ],
                temperature: 0.2,
                max_tokens: 3500
            })
        });
        const groqJson = await groqResp.json();
        console.log("GROQ RAW JSON:", JSON.stringify(groqJson, null, 2));
        if (!groqResp.ok || groqJson.error) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Groq: ${groqJson.error?.message || "request failed"}`,
                details: groqJson
            }, {
                status: 500
            });
        }
        const content = groqJson.choices?.[0]?.message?.content;
        if (!content) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Groq response missing choices[0].message.content",
                raw: groqJson
            }, {
                status: 500
            });
        }
        let raw = content.trim();
        // 2) Parse JSON returned by Groq
        let parsed;
        try {
            parsed = JSON.parse(raw);
        } catch  {
            const first = raw.indexOf("{");
            const last = raw.lastIndexOf("}");
            parsed = JSON.parse(raw.slice(first, last + 1));
        }
        // 3) Build logo prompt
        const logoPrompt = parsed.logos?.promptUsed || `Minimal modern vector logo for ${brandName || parsed.branding?.nameOptions?.[0] || "the brand"} on a clean white background, simple, flat, scalable, no text.`;
        // 4) Try Stability for real logos; fall back to placeholders if it fails
        let imageUrls = [
            "https://via.placeholder.com/512?text=Logo1",
            "https://via.placeholder.com/512?text=Logo2"
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
            imageUrls
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(parsed, {
            status: 200
        });
    } catch (error) {
        console.error("SERVER ERROR /api/generate:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message || "Unexpected server error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6284dc37._.js.map