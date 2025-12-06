// app/api/fal/route.ts
import { NextResponse } from "next/server";

// Same master prompt for logo‑only regeneration
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

// Helper: call Stability and return N data URLs
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
        "Stability API error (/api/fal):",
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

    const {
      prompt,
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

    // 1) Build final prompt (either raw or templated)
    let finalPrompt: string;

    if (prompt && prompt.trim()) {
      finalPrompt = prompt.trim();
    } else {
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
        ? Math.min(Number(numImages), 4)
        : 2;

    if (!process.env.STABILITY_API_KEY) {
      return NextResponse.json(
        { error: "STABILITY_API_KEY is not set on the server" },
        { status: 500 }
      );
    }

    const urls = await generateStabilityLogos(finalPrompt, imagesRequested);

    if (!urls.length) {
      return NextResponse.json(
        {
          error: "Stability response did not contain any image data",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        promptUsed: finalPrompt,
        imageUrls: urls,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("STABILITY SERVER ERROR (/api/fal):", error);
    return NextResponse.json(
      { error: error?.message || "Unexpected server error" },
      { status: 500 }
    );
  }
}