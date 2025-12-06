// app/page.tsx

"use client";

import { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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

  // 👉 this ref points to the logos section we’ll export to PDF
  const logoSectionRef = useRef<HTMLDivElement | null>(null);

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

  // ------------------------------------------------
  // 3) DOWNLOAD LOGOS SECTION AS PDF
  // ------------------------------------------------
  const handleDownloadLogosPdf = async () => {
    if (!logoSectionRef.current) return;

    try {
      const canvas = await html2canvas(logoSectionRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth - 40; // 20pt margins left/right
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const y = 20;

      // If the image is taller than the page, just scale to fit
      if (imgHeight > pageHeight - 40) {
        pdf.addImage(imgData, "PNG", 20, 20, imgWidth, pageHeight - 40);
      } else {
        pdf.addImage(imgData, "PNG", 20, y, imgWidth, imgHeight);
      }

      pdf.save("logos.pdf");
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("Could not generate PDF. Check console for details.");
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

          {/* Show PDF button only when we actually have logos */}
          {result?.logos?.imageUrls?.length > 0 && (
            <button onClick={handleDownloadLogosPdf}>
              Download Logos as PDF
            </button>
          )}
        </div>
      </div>

      {error && (
        <p style={{ color: "red", marginTop: "1rem" }}>
          Error: {error}
        </p>
      )}

      {/* Logo section – this is what we capture into PDF */}
      {result?.logos?.imageUrls && (
        <div
          ref={logoSectionRef}
          style={{ marginTop: "1.5rem" }}
        >
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
