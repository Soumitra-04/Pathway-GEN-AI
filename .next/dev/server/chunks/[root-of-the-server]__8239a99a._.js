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
"[project]/app/api/fal/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/api/fal/route.ts
__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
// -----------------------------
// MASTER PROMPT FOR FAL.AI
// -----------------------------
const FAL_MASTER_PROMPT = `
You are an expert brand designer AI.

Generate minimal, modern, high-quality logo concepts based on the brand details below.

Design requirements:
- Clean, professional, and scalable logo
- Suitable for website header, social media, and product packaging
- Flat or semi-flat design (strictly no 3D, no gradients)
- No mockups, no scenes, no devices
- No shadows, no lighting effects, no textures
- Centered composition
- High contrast with clear geometry
- Vector-style or SVG-like appearance
- Plain white or fully transparent background
- Avoid letters, words, or typography unless explicitly requested
- Logo should work at very small sizes (icon-ready)

Brand details:
Brand Name: {{BRAND_NAME}}
Industry: {{INDUSTRY}}
Brand Personality / Tone: {{TONE}}
Target Audience: {{TARGET_AUDIENCE}}

Style guidance:
- Modern
- Premium
- Timeless
- Elegant but simple
- Symbol or emblem focused

Color guidance (optional):
- Use a limited color palette (1–3 colors max)
- Prefer elegant, brand-safe colors
- Avoid neon, pastel, or overly saturated colors

Output instructions:
- Generate visually distinct logo symbols
- Focus on abstract marks, emblems, or minimalist icons
- Original design only
- No background patterns or decoration
`.trim();
async function POST(request) {
    try {
        const body = await request.json();
        const { prompt, brandName, industry, tone, targetAudience, numImages } = body;
        // 1) Build prompt
        let finalPrompt;
        if (prompt && prompt.trim()) {
            finalPrompt = prompt.trim();
        } else {
            finalPrompt = FAL_MASTER_PROMPT.replaceAll("{{BRAND_NAME}}", brandName || "the brand").replaceAll("{{INDUSTRY}}", industry || "its industry").replaceAll("{{TONE}}", tone || "modern, premium").replaceAll("{{TARGET_AUDIENCE}}", targetAudience || "its ideal customers");
        }
        const imagesRequested = Number.isFinite(numImages) && numImages > 0 ? Math.min(Number(numImages), 4) : 2;
        // Default placeholders (used if anything fails)
        let imageUrls = [
            "https://via.placeholder.com/512?text=Logo1",
            "https://via.placeholder.com/512?text=Logo2"
        ];
        let warning;
        if (!process.env.FAL_API_KEY) {
            warning = "FAL_API_KEY is not set; using placeholder logos.";
            console.warn(warning);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                promptUsed: finalPrompt,
                imageUrls,
                warning
            }, {
                status: 200
            });
        }
        // 2) Call Fal AI
        const falResp = await fetch("https://fal.run/fal-ai/flux-lora", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Key ${process.env.FAL_API_KEY}`
            },
            body: JSON.stringify({
                prompt: finalPrompt,
                num_images: imagesRequested
            })
        });
        const falJson = await falResp.json().catch(()=>null);
        console.log("FAL RAW JSON (/api/fal):", JSON.stringify(falJson, null, 2));
        if (falResp.ok && falJson) {
            let urls = [];
            if (Array.isArray(falJson.images)) {
                const imgs = falJson.images;
                if (typeof imgs[0] === "string") {
                    urls = imgs;
                } else if (imgs[0]?.url) {
                    urls = imgs.map((img)=>img.url);
                }
            } else if (Array.isArray(falJson.output?.images)) {
                const imgs = falJson.output.images;
                if (typeof imgs[0] === "string") {
                    urls = imgs;
                } else if (imgs[0]?.url) {
                    urls = imgs.map((img)=>img.url);
                }
            }
            if (urls.length) {
                imageUrls = urls;
            } else {
                warning = "Fal response did not contain any image URLs; using placeholder logos.";
                console.warn(warning, falJson);
            }
        } else {
            warning = "Fal API failed (probably exhausted balance); using placeholder logos.";
            console.error(warning, falJson);
        }
        // Always return 200 so your frontend doesn't show "Error: Fal API failed"
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            promptUsed: finalPrompt,
            imageUrls,
            warning
        }, {
            status: 200
        });
    } catch (error) {
        console.error("FAL SERVER ERROR:", error);
        // Even on unexpected error, return placeholders with 200
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            promptUsed: "Fallback prompt – server error",
            imageUrls: [
                "https://via.placeholder.com/512?text=Logo1",
                "https://via.placeholder.com/512?text=Logo2"
            ],
            warning: error?.message || "Unexpected server error"
        }, {
            status: 200
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8239a99a._.js.map