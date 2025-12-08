// app/api/stability/route.ts
import { NextResponse } from "next/server";

/* -----------------------------
   MASTER PROMPT FOR LOGO REGEN
   (Merged Shreeya + Soumitra – UNCHANGED)
----------------------------- */

const STABILITY_MASTER_PROMPT = `
You are an expert brand designer AI. Generate minimal, modern, high-quality vector-style logo concepts based on the brand details below.

Design requirements:
- Clean, professional, and scalable logo symbol
- Suitable for website header, app icon, social media, and product packaging
- Flat or semi-flat design (strictly no 3D, no gradients)
- No mockups, no scenes, no devices
- No shadows, no lighting effects, no textures
- Centered geometric composition
- High contrast with clear geometry
- SVG-icon style with sharp edges and perfect edge clarity
- Plain white (#FFFFFF) or fully transparent background
- Avoid letters, words, or typography unless explicitly requested
- Logo should work at very small sizes (favicon / app icon ready)

Brand details:
Brand Name: {{BRAND_NAME}}
Industry: {{INDUSTRY}}
Brand Personality / Tone: {{TONE}}
Target Audience: {{TARGET_AUDIENCE}}

Style guidance:
- Modern
- Premium
- Timeless and iconic
- Elegant but simple
- Symbol-focused, not text-focused

Color guidance:
- Limited palette (1–3 colors max)
- Prefer elegant, brand-safe colors
- Avoid neon, pastel, or oversaturated tones

Output instructions:
- Generate visually distinct logo symbols
- Focus on abstract marks, emblems, or minimalist icons
- Original design only
- No background patterns or decoration
- No mockups, no watermarks, no text in image

Advanced quality requirements:
- Prioritize symmetry, golden ratio balance, and harmonious proportions
- Symbolism connected to industry and customer psychology
- Every shape must communicate meaning intelligently (no random shapes)
- Must look like a global brand symbol
- Works on light and dark UI themes
- Minimal padding — symbol centered in a 1:1 square frame

Export requirements:
- Square 1:1 composition
- High resolution
- PNG output suitable for web and print
- Pure white or transparent background only
`.trim();

/* -----------------------------
   Hugging Face image model helper
----------------------------- */

const HF_IMAGE_MODEL =
  process.env.HF_LOGO_MODEL_ID || "stabilityai/stable-diffusion-xl-base-1.0";

async function generateHFLogos(
  prompt: string,
  numImages: number
): Promise<{ images: string[]; error?: string }> {
  if (!process.env.HUGGINGFACE_API_KEY) {
    const msg = "HUGGINGFACE_API_KEY not set on the server";
    console.warn(msg);
    return { images: [], error: msg };
  }

  const endpoint = `https://router.huggingface.co/models/${HF_IMAGE_MODEL}`;
  const images: string[] = [];
  let lastError: string | undefined;

  for (let i = 0; i < numImages; i++) {
    const resp = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        Accept: "image/png, application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
      }),
    });

    const contentType = resp.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const jsonText = await resp.text();
      lastError = `HF JSON response (status ${resp.status}): ${jsonText}`;
      console.error(
        "Hugging Face image JSON (/api/stability):",
        resp.status,
        jsonText.slice(0, 400)
      );
      break;
    }

    if (!resp.ok) {
      const errText = await resp.text().catch(() => "");
      lastError = `HF image error (status ${resp.status}): ${errText}`;
      console.error(
        "Hugging Face image API error (/api/stability):",
        resp.status,
        errText.slice(0, 400)
      );
      break;
    }

    const arrayBuffer = await resp.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataUrl = `data:image/png;base64,${base64}`;
    images.push(dataUrl);
  }

  return { images, error: lastError };
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

    // 1) Build final prompt (either raw or templated)
    let finalPrompt: string;

    if (prompt && prompt.trim()) {
      finalPrompt = prompt.trim();
    } else {
      finalPrompt = STABILITY_MASTER_PROMPT
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

    const { images, error } = await generateHFLogos(
      finalPrompt,
      imagesRequested
    );

    if (!images.length) {
      return NextResponse.json(
        {
          error:
            error ||
            "Hugging Face did not return any image data. Check model permissions / plan.",
          promptUsed: finalPrompt,
          hfModelId: HF_IMAGE_MODEL,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        promptUsed: finalPrompt,
        imageUrls: images,
        hfModelId: HF_IMAGE_MODEL,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("HF STABILITY SERVER ERROR (/api/stability):", error);
    return NextResponse.json(
      { error: error?.message || "Unexpected server error" },
      { status: 500 }
    );
  }
}
