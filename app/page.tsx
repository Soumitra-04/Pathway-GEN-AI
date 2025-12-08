// app/page.tsx

"use client";

import { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type ResultType = any;

export default function HomePage() {
  // Required state variables
  const [brandName, setBrandName] = useState("");
  const [idea, setIdea] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("");
  const [industry, setIndustry] = useState("");

  const [result, setResult] = useState<ResultType | null>(null);
  const [loading, setLoading] = useState(false);
  const [logoLoading, setLogoLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showJson, setShowJson] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  // "Multi-page" flow: input page vs results page with tabs
  const [view, setView] = useState<"input" | "results">("input");
  const [activeTab, setActiveTab] = useState<
    "overview" | "marketing" | "content" | "logos"
  >("overview");

  // this ref points to the logos section we’ll export to PDF
  const logoSectionRef = useRef<HTMLDivElement | null>(null);

  // --------------------------
  // Load from localStorage on mount
  // --------------------------
  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = window.localStorage.getItem("pathway-gen-data");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setBrandName(data.brandName || "");
        setIdea(data.idea || "");
        setAudience(data.audience || "");
        setTone(data.tone || "");
        setIndustry(data.industry || "");
        if (data.result) {
          setResult(data.result);
          setHasGenerated(true);
        }
      } catch (e) {
        console.error("Failed to load from localStorage:", e);
      }
    }
  }, []);

  // --------------------------
  // Save to localStorage whenever inputs or result change (with a trimmed result)
  // --------------------------
  useEffect(() => {
    if (typeof window === "undefined") return;

    const safeResult =
      result && typeof result === "object"
        ? {
            brandName: result.brandName ?? null,
            tagline:
              result.branding?.taglineOptions?.[0] ??
              result.branding?.tagline ??
              result.tagline ??
              null,
            brandStrategy: {
              business: result.business ?? null,
              branding: result.branding ?? null,
              marketing: result.marketing
                ? {
                    landingPage: result.marketing.landingPage ?? null,
                    campaignIdeas: result.marketing.campaignIdeas ?? null,
                  }
                : null,
            },
          }
        : null;

    const data = {
      brandName,
      idea,
      audience,
      tone,
      industry,
      result: safeResult,
    };

    try {
      window.localStorage.setItem("pathway-gen-data", JSON.stringify(data));
    } catch (err) {
      console.error("Failed to save to localStorage", err);
    }
  }, [brandName, idea, audience, tone, industry, result]);

  // --------------------------
  // Confetti animation (simple CSS-based)
  // --------------------------
  const triggerConfetti = () => {
    if (!hasGenerated && result?.logos?.imageUrls?.length > 0) {
      setHasGenerated(true);
      if (typeof document === "undefined") return;

      const confetti = document.createElement("div");
      confetti.className = "fixed inset-0 pointer-events-none z-50";
      confetti.innerHTML = Array.from({ length: 50 }, (_, i) => {
        const colors = ["#ff00ff", "#9333ea", "#3b82f6"];
        const color = colors[i % colors.length];
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        return `<div class="absolute w-2 h-2 rounded-full" style="background: ${color}; left: ${left}%; top: -10px; animation: confetti-fall 3s ${delay}s linear forwards; box-shadow: 0 0 10px ${color};"></div>`;
      }).join("");
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 5000);
    }
  };

  useEffect(() => {
    if (result?.logos?.imageUrls?.length > 0 && !hasGenerated) {
      triggerConfetti();
    }
  }, [result, hasGenerated]);

  // ------------------------------------------------
  // 1) MAIN: Generate Brand + Strategy + Logos
  // ------------------------------------------------
  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setHasGenerated(false);

    try {
      const res = await fetch("/api/generate", {
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

      let data: any;
      try {
        data = await res.json();
      } catch (parseError) {
        const text = await res.text();
        throw new Error(`Server returned invalid JSON: ${text.slice(0, 200)}`);
      }

      if (!res.ok) {
        setError(data.error || `Request failed with status ${res.status}`);
      } else {
        setResult(data);
        setView("results");
        setActiveTab("overview");
      }
    } catch (err: any) {
      setError(err.message || "Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------
  // 2) REGENERATE LOGO ONLY (calls /api/stability) – robust JSON parsing
  // ------------------------------------------------
  const handleRegenerateLogo = async () => {
    if (!brandName && !result?.branding?.nameOptions?.[0]) {
      setError("Need a brand name to regenerate logo.");
      return;
    }

    setLogoLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/stability", {
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

      const text = await res.text();
      let data: any;

      try {
        data = JSON.parse(text);
      } catch {
        console.error("Raw /api/stability response (non‑JSON):", text);
        setError(
          `Backend (/api/stability) returned non‑JSON. First part: ${text.slice(
            0,
            120
          )}...`
        );
        return;
      }

      if (!res.ok) {
        setError(
          data?.error || `Logo regeneration failed with status ${res.status}`
        );
      } else if (!data?.imageUrls || data.imageUrls.length === 0) {
        setError("Stability response did not contain any image data");
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
      const canvas = await html2canvas(logoSectionRef.current, {
        scale: 2,
        useCORS: true, // important for remote images
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth - 40;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const y = 20;

      if (imgHeight > pageHeight - 40) {
        pdf.addImage(imgData, "PNG", 20, 20, imgWidth, pageHeight - 40);
      } else {
        pdf.addImage(imgData, "PNG", 20, y, imgWidth, imgHeight);
      }

      pdf.save("logos.pdf");
    } catch (err) {
      console.error("PDF generation error:", err);
      setError("Could not generate PDF. Please try again.");
    }
  };

  // ---------- RENDER HELPERS FOR TABS ----------
  const renderBrandOverviewTab = () => {
    if (!result) return null;

    const strategy =
      result?.brandStrategy ??
      result?.brand ??
      result?.branding ??
      result?.strategy ??
      null;

    const business = result?.business ?? null;
    const branding = result?.branding ?? null;

    const hasStrategyData = strategy || business || branding;
    if (!hasStrategyData) {
      return (
        <p className="text-sm text-purple-200/70">
          No brand strategy data returned yet. Try generating again.
        </p>
      );
    }

    const renderArray = (
      arr: any[] | undefined | null,
      maxItems: number = 10
    ) => {
      if (!Array.isArray(arr) || arr.length === 0) return null;
      const items = arr.slice(0, maxItems);
      return (
        <div className="flex flex-wrap gap-2 mt-2">
          {items.map((item, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full bg-slate-900/70 border border-purple-500/30 text-sm text-purple-100"
            >
              {typeof item === "string" ? item : JSON.stringify(item)}
            </span>
          ))}
        </div>
      );
    };

    const renderField = (label: string, value: any, isArray = false) => {
      if (value === null || value === undefined || value === "") return null;
      if (isArray && Array.isArray(value)) {
        return (
          <div className="space-y-1">
            <div className="text-xs text-purple-300/80 uppercase tracking-wide font-medium">
              {label}
            </div>
            {renderArray(value)}
          </div>
        );
      }
      if (typeof value === "string" || typeof value === "number") {
        return (
          <div className="space-y-1">
            <div className="text-xs text-purple-300/80 uppercase tracking-wide font-medium">
              {label}
            </div>
            <div className="text-slate-100 text-sm leading-relaxed">
              {value}
            </div>
          </div>
        );
      }
      return null;
    };

    const brandNameValue =
      brandName ||
      branding?.nameOptions?.[0] ||
      branding?.name ||
      strategy?.name ||
      null;

    const tagline =
      branding?.taglineOptions?.[0] ||
      branding?.tagline ||
      strategy?.tagline ||
      null;

    const brandDescription =
      branding?.brandStory ||
      business?.summary ||
      strategy?.description ||
      strategy?.brandStory ||
      null;

    const brandVoice =
      branding?.brandVoice || strategy?.brandVoice || tone || null;

    const targetAudience =
      branding?.targetAudience ||
      business?.targetAudience ||
      strategy?.targetAudience ||
      audience ||
      null;

    const valueProposition =
      business?.valueProposition ||
      strategy?.valueProposition ||
      strategy?.usp ||
      null;

    const mission = strategy?.mission || business?.mission || null;
    const vision = strategy?.vision || business?.vision || null;

    const coreValues =
      strategy?.coreValues ||
      strategy?.values ||
      branding?.messagingPillars ||
      null;

    const colorPalette =
      branding?.colorPalette || strategy?.colorPalette || null;

    const typography =
      branding?.fontSuggestions || strategy?.typography || null;

    const keywords =
      strategy?.keywords || strategy?.tags || business?.keyWords || null;

    const marketPositioning =
      strategy?.marketPositioning ||
      business?.marketNeed ||
      strategy?.positioning ||
      null;

    const industryValue =
      industry || strategy?.industry || business?.industry || null;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderField("Brand Name", brandNameValue)}
          {renderField("Tagline", tagline)}

          {brandDescription && (
            <div className="md:col-span-2 space-y-1">
              <div className="text-xs text-purple-300/80 uppercase tracking-wide font-medium">
                Brand Description
              </div>
              <div className="text-slate-100 text-sm leading-relaxed">
                {brandDescription}
              </div>
            </div>
          )}

          {renderField("Brand Voice / Tone", brandVoice)}
          {renderField("Target Audience", targetAudience, true)}
          {renderField("Industry", industryValue)}
          {renderField("Unique Selling Proposition", valueProposition)}
          {renderField("Mission", mission)}
          {renderField("Vision", vision)}
          {coreValues && renderField("Core Values", coreValues, true)}
          {keywords && renderField("Keywords", keywords, true)}
          {renderField("Market Positioning", marketPositioning)}
        </div>

        {colorPalette &&
          Array.isArray(colorPalette) &&
          colorPalette.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs text-purple-300/80 uppercase tracking-wide font-medium">
                Color Palette
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {colorPalette.map((color: any, idx: number) => {
                  const hex = color?.hex || color?.color || color;
                  const name = color?.name || `Color ${idx + 1}`;
                  const usage = color?.usage;
                  const hexValue = typeof hex === "string" ? hex : "#000000";
                  return (
                    <div
                      key={idx}
                      className="rounded-lg p-3 bg-slate-950/80 border border-purple-500/30"
                    >
                      <div
                        className="w-full h-16 rounded-md mb-2 border border-slate-700"
                        style={{ backgroundColor: hexValue }}
                      />
                      <div className="text-xs text-slate-100 font-medium truncate">
                        {name}
                      </div>
                      <div className="text-xs text-purple-200/80 font-mono truncate">
                        {hexValue}
                      </div>
                      {usage && (
                        <div className="text-xs text-purple-300/70 mt-1 line-clamp-2">
                          {usage}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        {typography &&
          Array.isArray(typography) &&
          typography.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs text-purple-300/80 uppercase tracking-wide font-medium">
                Typography
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {typography.map((font: any, idx: number) => {
                  const role = font?.role || font?.type || "Font";
                  const fontName = font?.font || font?.name || font;
                  return (
                    <div
                      key={idx}
                      className="rounded-lg p-3 bg-slate-950/80 border border-purple-500/30"
                    >
                      <div className="text-xs text-purple-300/80 uppercase tracking-wide">
                        {role}
                      </div>
                      <div
                        className="text-slate-100 font-medium mt-1"
                        style={{ fontFamily: fontName }}
                      >
                        {fontName}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
      </div>
    );
  };

  const renderMarketingTab = () => {
    const marketing = result?.marketing;
    const business = result?.business;

    if (!marketing && !business) {
      return (
        <p className="text-sm text-purple-200/70">
          No marketing data returned yet.
        </p>
      );
    }

    const landing = marketing?.landingPage;
    const socialPosts = marketing?.socialPosts;
    const campaigns = marketing?.campaignIdeas;

    return (
      <div className="space-y-6">
        {/* Hero / Landing Section */}
        {landing && (
          <div className="rounded-xl bg-gradient-to-br from-slate-950/90 via-slate-950/80 to-slate-900/80 border border-purple-500/40 p-5 md:p-6 shadow-lg shadow-purple-900/40">
            <h3 className="text-lg md:text-xl font-semibold text-slate-50 mb-2">
              {landing.heroHeadline}
            </h3>
            <p className="text-sm text-purple-100 mb-4">
              {landing.heroSubheadline}
            </p>
            {landing.sections && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {landing.sections.map((sec: any, idx: number) => (
                  <div
                    key={idx}
                    className="rounded-lg bg-slate-950/80 border border-purple-500/30 p-4"
                  >
                    <h4 className="text-sm font-semibold text-slate-50 mb-1">
                      {sec.title}
                    </h4>
                    <p className="text-sm text-purple-100/90">{sec.body}</p>
                  </div>
                ))}
              </div>
            )}
            {landing.primaryCTA && (
              <div className="mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-600/70 text-slate-50">
                  Primary CTA: {landing.primaryCTA}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Social Posts */}
        {socialPosts &&
          Array.isArray(socialPosts) &&
          socialPosts.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-50 uppercase tracking-wide">
                Social Post Ideas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {socialPosts.map((post: any, idx: number) => (
                  <div
                    key={idx}
                    className="rounded-lg bg-slate-950/80 border border-purple-500/30 p-4"
                  >
                    <div className="text-xs text-purple-300/80 uppercase tracking-wide mb-1">
                      {post.platform || "Social"}
                    </div>
                    <p className="text-sm text-slate-100 mb-2">
                      {post.caption}
                    </p>
                    {post.imagePrompt && (
                      <p className="text-xs text-purple-300/80">
                        <span className="font-semibold">Image prompt:</span>{" "}
                        {post.imagePrompt}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Campaign Ideas */}
        {campaigns && Array.isArray(campaigns) && campaigns.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-50 uppercase tracking-wide">
              Campaign Ideas
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-purple-100">
              {campaigns.map((c: any, idx: number) => (
                <li key={idx}>
                  {typeof c === "string" ? c : JSON.stringify(c)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const renderContentPlanTab = () => {
    const contentPlan = result?.marketing?.contentPlan15Days;
    if (!contentPlan || !Array.isArray(contentPlan) || contentPlan.length === 0) {
      return (
        <p className="text-sm text-purple-200/70">
          No content plan data returned yet.
        </p>
      );
    }

    return (
      <div className="space-y-4">
        <p className="text-sm text-purple-100/90 mb-2">
          15-day content plan for your brand.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contentPlan.map((item: any, idx: number) => (
            <div
              key={idx}
              className="rounded-lg bg-slate-950/80 border border-purple-500/30 p-4"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-purple-300/80 uppercase tracking-wide">
                  Day {item.day ?? idx + 1}
                </span>
              </div>
              <p className="text-sm text-slate-100">{item.idea}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderLogosTab = () => {
    if (!result?.logos?.imageUrls || result.logos.imageUrls.length === 0) {
      return (
        <p className="text-sm text-purple-200/70">
          No logos generated yet. Try generating or regenerating logos.
        </p>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-sm text-purple-100/90">
            Preview your AI-generated logo options. You can regenerate them or
            export as a PDF for download or sharing.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleRegenerateLogo}
              disabled={logoLoading}
              className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/40 active:scale-95 text-sm"
            >
              {logoLoading ? "Regenerating..." : "Regenerate Logos Only"}
            </button>
            <button
              onClick={handleDownloadLogosPdf}
              className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 active:scale-95 text-sm"
            >
              Download Logos as PDF
            </button>
          </div>
        </div>

        <div ref={logoSectionRef}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
            {result.logos.imageUrls.map((img: any, idx: number) => {
              const url = typeof img === "string" ? img : img.url;
              return (
                <div
                  key={idx}
                  className="rounded-xl p-4 bg-slate-950/80 border border-purple-500/40 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-900/40 transition-all duration-300 cursor-pointer group"
                >
                  <div className="aspect-square flex items-center justify-center bg-slate-900 rounded-lg overflow-hidden">
                    <img
  src={url}
  alt={`Logo ${idx + 1}`}
  crossOrigin="anonymous"
  className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300"
  onError={(e) => {
    const target = e.currentTarget as HTMLImageElement;
    target.onerror = null;
    target.src =
      'data:image/svg+xml;utf8,' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">' +
      '<rect width="100%" height="100%" fill="%23111"/>' +
      '<text x="50%" y="50%" fill="%23aaa" font-size="28" text-anchor="middle" dominant-baseline="middle">' +
      'Logo%20Preview' +
      '</text>' +
      '</svg>';
  }}
/>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // ---------- MAIN RENDER ----------
  return (
    <main className="min-h-screen pb-16 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 text-slate-50">
      {/* Header Section */}
      <div className="pt-12 pb-8 px-4 animate-fade-up">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-blue-500 drop-shadow-[0_0_20px_rgba(168,85,247,0.65)]">
            Pathway GEN AI – Brand Generator
          </h1>
          <p className="text-lg md:text-xl text-purple-200 font-light tracking-wide">
            Design brands with AI in 30 seconds
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 space-y-6">
        {/* Error Display */}
        {error && (
          <div className="rounded-xl p-4 border border-red-500/60 bg-red-950/40 shadow-lg shadow-red-900/40 animate-fade-up">
            <p className="text-red-200 font-medium">
              <span className="text-red-300 font-bold">Error:</span> {error}
            </p>
          </div>
        )}

        {/* INPUT PAGE */}
        {view === "input" && (
          <div className="rounded-2xl p-6 md:p-8 animate-fade-up shadow-2xl bg-slate-950/70 border border-purple-500/40">
            <div className="space-y-5">
              <input
                type="text"
                placeholder="Brand Name (optional)"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-purple-500/40 text-white placeholder-purple-300/60 focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-500/60 transition-all"
              />

              <textarea
                placeholder="Business Idea"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-purple-500/40 text-white placeholder-purple-300/60 focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-500/60 transition-all resize-none"
              />

              <input
                type="text"
                placeholder="Target Audience"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-purple-500/40 text-white placeholder-purple-300/60 focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-500/60 transition-all"
              />

              <input
                type="text"
                placeholder="Tone (e.g. playful, bold, luxury)"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-purple-500/40 text-white placeholder-purple-300/60 focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-500/60 transition-all"
              />

              <input
                type="text"
                placeholder="Industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-purple-500/40 text-white placeholder-purple-300/60 focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-500/60 transition-all"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={handleGenerate}
                disabled={loading || !idea}
                className="flex-1 px-6 py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 active:scale-95"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Generating...
                  </span>
                ) : (
                  "Generate Brand + Logos"
                )}
              </button>

              <button
                onClick={handleRegenerateLogo}
                disabled={logoLoading || (!brandName && !result)}
                className="flex-1 px-6 py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 active:scale-95"
              >
                {logoLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Regenerating...
                  </span>
                ) : (
                  "Regenerate Logos Only"
                )}
              </button>
            </div>
          </div>
        )}

        {/* RESULTS PAGE WITH TABS */}
        {view === "results" && result && (
          <div className="space-y-4 animate-fade-up">
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => setView("input")}
                className="inline-flex items-center gap-2 text-sm text-purple-200 hover:text-purple-100 px-3 py-1 rounded-full bg-slate-900/80 border border-purple-500/40"
              >
                ← Back to Inputs
              </button>
              <p className="text-xs text-purple-300/80">
                Generated brand strategy & assets based on your inputs.
              </p>
            </div>

            {/* Tab container */}
            <div className="rounded-2xl p-5 md:p-6 bg-slate-950/70 border border-purple-500/40 shadow-2xl">
              {/* Tab headers */}
              <div className="flex flex-wrap gap-2 mb-5">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "marketing", label: "Marketing" },
                  { id: "content", label: "Content Plan" },
                  { id: "logos", label: "Logos" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() =>
                      setActiveTab(
                        tab.id as "overview" | "marketing" | "content" | "logos"
                      )
                    }
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white border-transparent shadow-lg shadow-purple-900/50"
                        : "bg-slate-900/80 text-purple-200 border-purple-500/40 hover:bg-slate-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="mt-3">
                {activeTab === "overview" && renderBrandOverviewTab()}
                {activeTab === "marketing" && renderMarketingTab()}
                {activeTab === "content" && renderContentPlanTab()}
                {activeTab === "logos" && renderLogosTab()}
              </div>
            </div>

            {/* JSON Debug Viewer - optional dev mode */}
            <div className="rounded-xl p-4 bg-slate-950/80 border border-purple-500/30">
              <button
                onClick={() => setShowJson(!showJson)}
                className="w-full flex items-center justify-between text-left mb-2 font-semibold text-purple-200 hover:text-purple-100 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span>Raw JSON Output</span>
                  <span className="text-xs text-purple-400/70">
                    (Developer Mode)
                  </span>
                </span>
                <span className="text-2xl transform transition-transform duration-200">
                  {showJson ? "−" : "+"}
                </span>
              </button>
              {showJson && (
                <div className="mt-3 rounded-lg overflow-hidden">
                  <pre className="p-4 bg-black/60 rounded-lg overflow-auto max-h-72 text-xs font-mono text-purple-100 border border-purple-500/40">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}


