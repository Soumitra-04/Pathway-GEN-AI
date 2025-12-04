function buildGroqPrompt({
  brandName,
  idea,
  targetAudience,
  tone,
  industry,
}: {
  brandName?: string;
  idea: string;
  targetAudience: string;
  tone: string;
  industry?: string;
}): string {
  return `
You are a Brand & Business Strategy Generator AI.

Your ONLY job is to return a single JSON object in the exact structure described below.
Do NOT add explanations, markdown, or any text outside the JSON.
Do NOT wrap the JSON in \`\`\` or any other fencing.
Do NOT include comments.

JSON structure you must follow:

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
      { "day": 1, "idea": "string" }
    ],
    "campaignIdeas": ["string"]
  },
  "logos": {
    "promptUsed": "string",
    "imageUrls": ["string"]
  }
}

FILLING RULES:
- ALWAYS return ALL keys shown above.
- "nameOptions" must contain 3–5 unique brand name ideas.
- "taglineOptions" must contain 3–5 strong, marketing-ready taglines.
- "painPoints" must list at least 3 real customer pain points.
- "revenueModels" and "pricingIdeas" must each include 2–4 realistic options.
- "colorPalette" must include 3–5 colors with valid HEX codes (example: "#FF5733") and clear usage descriptions.
- "fontSuggestions" must include at least one "heading" font and one "body" font.
- "socialPosts" must include 3–5 posts for different platforms (Instagram, LinkedIn, X, etc.).
- "reelScripts" must include 1–3 short-form video ideas.
- "contentPlan15Days" must include EXACTLY 10–15 high-quality content ideas, suitable for daily posting.
- "campaignIdeas" must include 3–5 creative marketing or launch campaigns.
- "logos.promptUsed" must be a clean, detailed prompt suitable for an AI image model to generate a minimal, modern logo.
- "logos.imageUrls" must contain 1–3 placeholder or example logo URLs (e.g. "https://example.com/logo1.png").

Now generate this JSON object for the following brand input:

Brand name (can be empty if you want to suggest names): "${brandName ?? ""}"
Business idea / description: "${idea}"
Target audience: "${targetAudience}"
Tone/style (e.g. playful, professional, bold, luxury): "${tone}"
Industry: "${industry ?? ""}"

REMEMBER:
- RESPOND WITH RAW JSON ONLY.
- NO explanations.
- NO markdown.
- NO comments.
`.trim();
}