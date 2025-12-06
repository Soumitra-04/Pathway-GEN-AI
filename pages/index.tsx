"use client";

import { useState } from "react";

export default function HomePage() {
  const [brandName, setBrandName] = useState("");
  const [idea, setIdea] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("");
  const [industry, setIndustry] = useState("");

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/generateBrand/route.ts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandName,
          idea,
          audience,
          tone,
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

  return (
    <main style={{ padding: "2rem", maxWidth: 800, margin: "0 auto" }}>
      <h1>Pathway GEN AI – Brand Generator</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
        <input placeholder="Brand Name" value={brandName} onChange={(e) => setBrandName(e.target.value)} />
        <textarea rows={3} placeholder="Business idea" value={idea} onChange={(e) => setIdea(e.target.value)} />
        <input placeholder="Target Audience" value={audience} onChange={(e) => setAudience(e.target.value)} />
        <input placeholder="Tone (playful, bold, luxury, etc.)" value={tone} onChange={(e) => setTone(e.target.value)} />
        <input placeholder="Industry" value={industry} onChange={(e) => setIndustry(e.target.value)} />

        <button onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate Brand Strategy"}
        </button>
      </div>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>Error: {error}</p>}
      {result && (
        <pre style={{ marginTop: "1rem", background: "#111", padding: "1rem", color: "#fff", overflowX: "auto" }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}
