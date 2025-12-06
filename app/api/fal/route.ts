// app/api/fal/route.ts
import { NextResponse } from "next/server";

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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      // you can pass EITHER a raw prompt…
      prompt,
      // …or these brand fields to fill the master prompt:
      brandName,
      industry,
      tone,
      targetAudience,
      numImages,
    } = body as {
      prompt?: string;
      brandName?: string;
      industry?: string;
      tone?: string;
      targetAudience?: string;
      numImages?: number;
    };

    // -----------------------------
    // 1) Build the final prompt
    // -----------------------------
    let finalPrompt: string;

    if (prompt && typeof prompt === "string" && prompt.trim()) {
      // If caller sends a direct prompt, use it as-is
      finalPrompt = prompt.trim();
    } else {
      // Otherwise, use the master prompt with placeholders
      finalPrompt = FAL_MASTER_PROMPT
        .replaceAll("{{BRAND_NAME}}", brandName || "the brand")
        .replaceAll("{{INDUSTRY}}", industry || "its industry")
        .replaceAll("{{TONE}}", tone || "modern, premium")
        .replaceAll(
          "{{TARGET_AUDIENCE}}",
          targetAudience || "its ideal customers"
        );
    }

    const imagesRequested =
      Number.isFinite(numImages) && numImages! > 0
        ? Math.min(Number(numImages), 4) // small safety cap
        : 2;

    if (!process.env.FAL_API_KEY) {
      return NextResponse.json(
        { error: "FAL_API_KEY is not set on the server" },
        { status: 500 }
      );
    }

    // -----------------------------
    // 2) Call Fal AI
    // -----------------------------
    const falResp = await fetch("https://fal.run/fal-ai/flux-lora", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Fal uses "Key" for auth, not "Bearer"
        Authorization: `Key ${process.env.FAL_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: finalPrompt,
        num_images: imagesRequested,
      }),
    });

    const falJson = await falResp.json().catch(() => null);
    console.log("FAL RAW JSON:", JSON.stringify(falJson, null, 2));

    if (!falResp.ok || !falJson) {
      return NextResponse.json(
        {
          error: "Fal API failed",
          details: falJson,
        },
        { status: 500 }
      );
    }

    // -----------------------------
    // 3) Extract image URLs
    // -----------------------------
    let imageUrls: string[] = [];

    // Case A: { images: ["url1", "url2", ...] }
    if (Array.isArray((falJson as any).images)) {
      const imgs = (falJson as any).images;
      if (typeof imgs[0] === "string") {
        imageUrls = imgs as string[];
      } else if (imgs[0]?.url) {
        imageUrls = imgs.map((img: any) => img.url);
      }
    }

    // Case B: { output: { images: [...] } }
    else if (Array.isArray((falJson as any).output?.images)) {
      const imgs = (falJson as any).output.images;
      if (typeof imgs[0] === "string") {
        imageUrls = imgs as string[];
      } else if (imgs[0]?.url) {
        imageUrls = imgs.map((img: any) => img.url);
      }
    }

    if (!imageUrls.length) {
      return NextResponse.json(
        {
          error: "Fal response did not contain any image URLs",
          details: falJson,
        },
        { status: 500 }
      );
    }

    // -----------------------------
    // 4) Return clean JSON payload
    // -----------------------------
    return NextResponse.json(
      {
        promptUsed: finalPrompt,
        imageUrls,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("FAL SERVER ERROR:", error);
    return NextResponse.json(
      { error: error?.message || "Unexpected server error" },
      { status: 500 }
    );
  }
}
