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
  const [error, setError] = useState<string | null>(null);

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

      const text = await res.text(); // read raw response

      try {
        const data = JSON.parse(text);

        if (!res.ok) {
          setError(data.error || "Something went wrong");
        } else {
          setResult(data);
        }
      } catch {
        // This means backend sent HTML (like the <!DOCTYPE error page)
        console.error("Raw response from API:", text);
        setError(`Backend returned non‑JSON response. First part: ${text.slice(0, 120)}...`);
      }

    } catch (err: any) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: "2rem", maxWidth: 800, margin: "0 auto" }}>
      <h1>Pathway GEN AI – Brand Generator</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
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

        <button onClick={handleGenerate} disabled={loading || !idea}>
          {loading ? "Generating..." : "Generate Brand Strategy"}
        </button>
      </div>

      {error && (
        <p style={{ color: "red", marginTop: "1rem" }}>
          Error: {error}
        </p>
      )}

      {result && (
        <pre style={{ marginTop: "1rem", background: "#111", padding: "1rem", overflowX: "auto" }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}
