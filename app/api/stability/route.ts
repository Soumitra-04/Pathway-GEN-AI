// app/api/stability/route.ts
import { NextResponse } from "next/server";

/* -----------------------------
   MASTER PROMPT FOR LOGO REGEN
   (Merged Shreeya + Soumitra)
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
   Helper: call Stability & return data URLs (PNG)
----------------------------- */

async function generateStabilityLogos(
  prompt: string,
  numImages: number
): Promise<string[]> {
  if (!process.env.STABILITY_API_KEY) {
    console.warn("STABILITY_API_KEY not set, returning empty image list.");
    return [];
  }

  const endpoint = "https://api.stability.ai/v2beta/stable-image/generate/core";
  const results: string[] = [];

  for (let i = 0; i < numImages; i++) {
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("output_format", "png");
    formData.append("aspect_ratio", "1:1");
    formData.append("style_preset", "logo");

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
        "Stability API error (/api/stability):",
        resp.status,
        errText.slice(0, 200)
      );
      // Stop on first failure to avoid spamming the API
      break;
    }

    const arrayBuffer = await resp.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataUrl = `data:image/png;base64,${base64}`;
    results.push(dataUrl);
  }

  return results;
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
      // If a raw prompt is passed, let the user override the template
      finalPrompt = prompt.trim();
    } else {
      // Otherwise, fill the master template with brand details
      finalPrompt = STABILITY_MASTER_PROMPT
        .replaceAll("{{BRAND_NAME}}", brandName || "the brand")
        .replaceAll("{{INDUSTRY}}", industry || "its industry")
        .replaceAll("{{TONE}}", tone || "modern, premium")
        .replaceAll(
          "{{TARGET_AUDIENCE}}",
          targetAudience || "its ideal customers"
        );
    }

    // Cap at 4 images just like Shreeya's version, default 2
    const imagesRequested =
      Number.isFinite(numImages) && (numImages as number) > 0
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
        { error: "Stability response did not contain any image data" },
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
    console.error("STABILITY SERVER ERROR (/api/stability):", error);
    return NextResponse.json(
      { error: error?.message || "Unexpected server error" },
      { status: 500 }
    );
  }
}