//app/page.tsx

"use client";

import { useState } from "react";

export default function HomePage() {
  const [idea, setIdea] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("");
  const [brandName, setBrandName] = useState("");
  const [industry, setIndustry] = useState("");

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [logoLoading, setLogoLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ------------------------------------------------
  // 1) MAIN: Generate Brand + Strategy + Logos
  // ------------------------------------------------
  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idea,
          audience,
          tone,
          brandName,
          industry,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setResult(data);
      }
    } catch (err: any) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------
  // 2) REGENERATE LOGO ONLY (calls /api/fal)
  // ------------------------------------------------
  const handleRegenerateLogo = async () => {
    if (!brandName && !result?.branding?.nameOptions?.[0]) {
      setError("Need a brand name to regenerate logo.");
      return;
    }

    setLogoLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/fal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandName: brandName || result?.branding?.nameOptions?.[0],
          industry,
          tone,
          targetAudience: audience,
          numImages: 2,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Logo regeneration failed");
      } else {
        // merge new logos into existing result
        setResult((prev: any) => ({
          ...(prev || {}),
          logos: {
            promptUsed: data.promptUsed,
            imageUrls: data.imageUrls,
          },
        }));
      }
    } catch (err: any) {
      setError(err.message || "Network error while regenerating logo");
    } finally {
      setLogoLoading(false);
    }
  };

  return (
    <main style={{ padding: "2rem", maxWidth: 900, margin: "0 auto" }}>
      <h1>Pathway GEN AI – Brand Generator</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          marginTop: "1rem",
        }}
      >
        <input
          placeholder="Brand name (optional)"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
        />
        <textarea
          placeholder="Business idea"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          rows={3}
        />
        <input
          placeholder="Target audience"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
        />
        <input
          placeholder="Tone (e.g. playful, bold, luxury)"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        />
        <input
          placeholder="Industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        />

        <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
          <button onClick={handleGenerate} disabled={loading || !idea}>
            {loading ? "Generating..." : "Generate Brand + Logos"}
          </button>

          <button
            onClick={handleRegenerateLogo}
            disabled={logoLoading || (!brandName && !result)}
          >
            {logoLoading ? "Regenerating..." : "Regenerate Logos Only"}
          </button>
        </div>
      </div>

      {error && (
        <p style={{ color: "red", marginTop: "1rem" }}>
          Error: {error}
        </p>
      )}

      {/* Show logos nicely */}
      {result?.logos?.imageUrls && (
        <div style={{ marginTop: "1.5rem" }}>
          <h2>Logo Options</h2>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {result.logos.imageUrls.map((img: any, idx: number) => {
              const url = typeof img === "string" ? img : img.url;
              return (
                <img
                  key={idx}
                  src={url}
                  alt={`Logo ${idx + 1}`}
                  style={{
                    width: 160,
                    height: 160,
                    objectFit: "contain",
                    border: "1px solid #444",
                    background: "#fff",
                  }}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Raw JSON (for debugging / hackathon demo) */}
      {result && (
        <pre
          style={{
            marginTop: "1.5rem",
            background: "#111",
            padding: "1rem",
            overflowX: "auto",
            color: "#eee",
            fontSize: "0.85rem",
          }}
        >
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}
