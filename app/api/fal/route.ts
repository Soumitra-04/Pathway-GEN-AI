// app/api/fal/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, numImages } = body as {
      prompt?: string;
      numImages?: number;
    };

    // 1) Validate input
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const imagesRequested = Number.isFinite(numImages) && numImages > 0
      ? Math.min(Number(numImages), 4) // small safety cap
      : 2;

    if (!process.env.FAL_API_KEY) {
      return NextResponse.json(
        { error: "FAL_API_KEY is not set on the server" },
        { status: 500 }
      );
    }

    // 2) Call Fal AI
    const falResp = await fetch("https://fal.run/fal-ai/flux-lora", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // NOTE: Fal uses "Key" not "Bearer"
        Authorization: `Key ${process.env.FAL_API_KEY}`,
      },
      body: JSON.stringify({
        prompt,
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

    // 3) Extract image URLs (handle a couple of common formats)
    let imageUrls: string[] = [];

    if (Array.isArray(falJson.images)) {
      // Case A: ["url1", "url2", ...]
      if (typeof falJson.images[0] === "string") {
        imageUrls = falJson.images as string[];
      }
      // Case B: [{ url: "..." }, ...]
      else if (falJson.images[0]?.url) {
        imageUrls = falJson.images.map((img: any) => img.url);
      }
    } else if (Array.isArray(falJson.output?.images)) {
      // Some Fal endpoints use output.images
      const imgs = falJson.output.images;
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

    // 4) Return a clean, small JSON payload
    return NextResponse.json(
      {
        promptUsed: prompt,
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
