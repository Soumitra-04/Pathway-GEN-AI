import { NextResponse } from "next/server";

/* -----------------------------
   MASTER PROMPT FOR LOGO REGEN
----------------------------- */

const HF_LOGO_MASTER_PROMPT = `
You are an expert brand designer AI. Generate minimal, modern, high-quality logo concepts based on the brand details below.

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
- Focus on a single strong, abstract symbol or emblem
- Symbol should be iconic and recognizable even as a small app icon
- No text, no typography, no letters
- No background patterns or decorations

Goal:
Generate a premium, elegant, ultra-clean brand logo symbol that looks like it belongs to a successful global brand, ready for website header, business card, product print, and mobile app icon.
`.trim();

/* -----------------------------
   HF MODEL CONFIG (FIXED)
----------------------------- */

// Primary (paid / future-ready)
const HF_PRIMARY_MODEL =
  process.env.HF_LOGO_MODEL_ID || "black-forest-labs/FLUX.1-dev";

// ✅ Router-compatible free fallback
const HF_FALLBACK_MODEL = "runwayml/stable-diffusion-v1-5";

/* -----------------------------
   Helper: call Hugging Face & return data URLs
----------------------------- */

async function generateHuggingFaceLogos(
  prompt: string,
  numImages: number
): Promise<{
  images: string[];
  modelUsed: string;
  error?: string;
}> {
  const apiKey = process.env.HUGGINGFACE_API_KEY;
  if (!apiKey) {
    console.warn("HUGGINGFACE_API_KEY not set.");
    return { images: [], modelUsed: "none", error: "Missing API key" };
  }

  async function callModel(modelId: string) {
    const endpoint = `https://router.huggingface.co/hf-inference/models/${modelId}`;
    const results: string[] = [];

    for (let i = 0; i < numImages; i++) {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "image/png",
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

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`HF ${res.status}: ${text}`);
      }

      const buffer = await res.arrayBuffer();
      results.push(
        `data:image/png;base64,${Buffer.from(buffer).toString("base64")}`
      );
    }

    return results;
  }

  // 1️⃣ Try primary model
  try {
    const images = await callModel(HF_PRIMARY_MODEL);
    return { images, modelUsed: HF_PRIMARY_MODEL };
  } catch (e: any) {
    try {
      // 2️⃣ Always fallback to router-safe model
      const images = await callModel(HF_FALLBACK_MODEL);
      return { images, modelUsed: HF_FALLBACK_MODEL };
    } catch (fallbackErr: any) {
      return {
        images: [],
        modelUsed: HF_FALLBACK_MODEL,
        error: fallbackErr.message,
      };
    }
  }
}

/* -----------------------------
   POST /api/stability – regenerate logos only
----------------------------- */

type StabilityRequestBody = {
  prompt?: string;
  brandName?: string;
  industry?: string;
  tone?: string;
  targetAudience?: string;
  numImages?: number;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as StabilityRequestBody;
    const {
      prompt,
      brandName,
      industry,
      tone,
      targetAudience,
      numImages,
    } = body;

    // 1) Build final prompt
    let finalPrompt: string;

    if (prompt && prompt.trim()) {
      finalPrompt = prompt.trim();
    } else {
      finalPrompt = HF_LOGO_MASTER_PROMPT
        .replaceAll("{{BRAND_NAME}}", brandName || "the brand")
        .replaceAll("{{INDUSTRY}}", industry || "its industry")
        .replaceAll("{{TONE}}", tone || "modern, premium")
        .replaceAll(
          "{{TARGET_AUDIENCE}}",
          targetAudience || "its ideal customers"
        );
    }

    const imagesRequested =
      Number.isFinite(numImages) && (numImages as number) > 0
        ? Math.min(Number(numImages), 4)
        : 2;

    if (!process.env.HUGGINGFACE_API_KEY) {
      return NextResponse.json(
        { error: "HUGGINGFACE_API_KEY is not set on the server" },
        { status: 500 }
      );
    }

    const result = await generateHuggingFaceLogos(
      finalPrompt,
      imagesRequested
    );

    if (!result.images.length) {
      return NextResponse.json(
        {
          error: "Hugging Face did not return images",
          hfError: result.error || null,
          hfModelId: result.modelUsed,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        promptUsed: finalPrompt,
        imageUrls: result.images,
        hfModelId: result.modelUsed,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("HF SERVER ERROR (/api/stability):", error);
    return NextResponse.json(
      { error: error?.message || "Unexpected server error" },
      { status: 500 }
    );
  }
}
