"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
} from "recharts";

type BrandResult = any;

const PIE_COLORS = ["#ec4899", "#a855f7", "#3b82f6", "#22c55e", "#f97316"];

const growthData = [
  { month: "Jan", score: 40 },
  { month: "Feb", score: 55 },
  { month: "Mar", score: 65 },
  { month: "Apr", score: 78 },
  { month: "May", score: 88 },
  { month: "Jun", score: 95 },
];

const riskData = [
  { name: "Market Risk", value: 30 },
  { name: "Brand Risk", value: 20 },
  { name: "Competition", value: 40 },
  { name: "Execution", value: 25 },
];

export default function BrandFuturePage() {
  const [result, setResult] = useState<BrandResult | null>(null);
  const [loading, setLoading] = useState(true);

  // Load last brand data from localStorage (same key as main page)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = window.localStorage.getItem("pathway-gen-data");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.result) {
          setResult(parsed.result);
        }
      }
    } catch (e) {
      console.error("Failed to load brand data for future insights:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  // ---------- Build derived data for charts ----------

  const business = result?.business;
  const marketing = result?.marketing;

  // Target audience pie chart data
  const audienceArray: string[] = Array.isArray(business?.targetAudience)
    ? business.targetAudience
    : [];

  const audienceData = audienceArray.map((label) => ({
    name: label,
    value: 1, // each archetype = 1 unit; we just want distribution
  }));

  // 15-day content plan bar chart data
  const contentPlan = Array.isArray(marketing?.contentPlan15Days)
    ? marketing.contentPlan15Days
    : [];

  const contentPlanData = contentPlan.map((item: any, idx: number) => {
    // Fake "impact score" just to make the chart feel real
    const base = 60;
    const variation = (idx % 5) * 8;
    return {
      day: `Day ${item.day ?? idx + 1}`,
      impact: base + variation,
    };
  });

  // Simple future “score” & interpretation
  const brandScore = (() => {
    if (!business || !marketing) return null;
    let score = 70;

    if (
      Array.isArray(business.valuePropositionChart) &&
      business.valuePropositionChart.length > 0
    ) {
      score += 5;
    }
    if (Array.isArray(marketing.campaignIdeas) && marketing.campaignIdeas.length >= 2) {
      score += 5;
    }
    if (audienceArray.length >= 4) {
      score += 5;
    }
    if (
      Array.isArray(marketing.contentPlan15Days) &&
      marketing.contentPlan15Days.length === 15
    ) {
      score += 5;
    }

    return Math.min(score, 95);
  })();

  const brandScoreLabel = (() => {
    if (brandScore == null) return "Insufficient data";
    if (brandScore >= 90) return "High probability of strong brand growth";
    if (brandScore >= 80) return "Very promising – with focused execution";
    if (brandScore >= 70)
      return "Good potential – refine positioning & campaigns";
    return "Early stage – needs sharper strategy";
  })();

  // ---------- RENDER ----------

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 text-slate-50 flex items-center justify-center">
        <p className="text-purple-200 text-sm">
          Loading brand future insights…
        </p>
      </main>
    );
  }

  if (!result) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 text-slate-50">
        <div className="max-w-4xl mx-auto px-4 pt-16 pb-10 space-y-6">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-purple-200 hover:text-purple-100 px-3 py-1 rounded-full bg-slate-900/80 border border-purple-500/40"
            >
              ← Back to Brand Generator
            </Link>
          </div>

          <div className="rounded-2xl p-6 md:p-8 bg-slate-950/70 border border-purple-500/40">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-blue-500">
              Brand Future Insights
            </h1>
            <p className="text-sm text-purple-200/90 mb-4">
              No brand data found. Please generate a brand first on the main
              page.
            </p>
            <p className="text-xs text-purple-300/70">
              Tip: The main page saves your last result in localStorage with the
              key{" "}
              <code className="font-mono">pathway-gen-data</code>. This screen
              reads that and visualizes future potential.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const brandName =
    business?.summary?.split(" ")?.slice(0, 3).join(" ") ||
    result?.branding?.nameOptions?.[0] ||
    "Your Brand";

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 text-slate-50 pb-16">
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-6 space-y-6">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-blue-500">
              Brand Future Insights
            </h1>
            <p className="text-sm md:text-base text-purple-200/90 mt-1">
              Data-driven predictions based on your AI-generated brand strategy.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs md:text-sm text-purple-100 hover:text-white px-3 py-2 rounded-full bg-slate-900/80 border border-purple-500/40"
          >
            ← Back to Brand Generator
          </Link>
        </div>

        {/* Brand Score Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-1 rounded-2xl p-5 bg-slate-950/80 border border-purple-500/40 shadow-lg shadow-purple-900/40">
            <p className="text-xs text-purple-300/80 uppercase tracking-wide mb-1">
              Brand Growth Score (Simulated)
            </p>
            <div className="flex items-end gap-3">
              <span className="text-5xl font-bold text-purple-300">
                {brandScore ?? "–"}
              </span>
              <span className="text-sm text-purple-200/80 mb-2">/ 100</span>
            </div>
            <p className="text-xs text-purple-100/90 mt-2">
              {brandScoreLabel}
            </p>
            <p className="text-[11px] text-purple-300/70 mt-3">
              This score is a heuristic based on how complete and sharp your
              brand, marketing and content strategy are. You can tune this logic
              later using real metrics (traffic, conversions, retention, etc.).
            </p>
          </div>

          {/* Quick forecasts */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl p-4 bg-slate-950/80 border border-purple-500/30">
              <p className="text-xs text-purple-300/80 uppercase tracking-wide mb-1">
                3–6 Month Outlook
              </p>
              <p className="text-sm text-slate-100 leading-relaxed">
                With consistent execution of your content plan and campaigns,
                this brand can build strong awareness in its niche. Prioritize{" "}
                <span className="text-purple-200 font-semibold">
                  clear messaging & one hero offer
                </span>{" "}
                to convert early adopters.
              </p>
            </div>

            <div className="rounded-xl p-4 bg-slate-950/80 border border-purple-500/30">
              <p className="text-xs text-purple-300/80 uppercase tracking-wide mb-1">
                Biggest Growth Lever
              </p>
              <p className="text-sm text-slate-100 leading-relaxed">
                The fastest way to accelerate growth is to{" "}
                <span className="text-purple-200 font-semibold">
                  double-down on one primary audience segment
                </span>{" "}
                and build a campaign specifically for them using your strongest
                messaging pillar.
              </p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          {/* Audience Pie Chart */}
          <div className="rounded-2xl p-5 bg-slate-950/80 border border-purple-500/40">
            <h2 className="text-lg font-semibold text-slate-50 mb-1">
              Future Revenue by Audience Segments (Simulated)
            </h2>
            <p className="text-xs text-purple-200/85 mb-4">
              We treat each target archetype as a potential revenue slice. In
              the real product, you’d replace this with actual numbers from
              analytics or CRM.
            </p>

            {audienceData.length === 0 ? (
              <p className="text-sm text-purple-200/70">
                No target audience segments found in the brand JSON.
              </p>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={audienceData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={(entry) => entry.name}
                    >
                      {audienceData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={PIE_COLORS[index % PIE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#020617",
                        border: "1px solid #a855f7",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Content Plan Bar Chart */}
          <div className="rounded-2xl p-5 bg-slate-950/80 border border-purple-500/40">
            <h2 className="text-lg font-semibold text-slate-50 mb-1">
              15-Day Content Momentum Forecast
            </h2>
            <p className="text-xs text-purple-200/85 mb-4">
              Each day’s “impact score” estimates how much that content can push
              the brand forward. Later, you can wire this to real metrics
              (views, saves, clicks, etc.).
            </p>

            {contentPlanData.length === 0 ? (
              <p className="text-sm text-purple-200/70">
                No 15-day content plan found in the brand JSON.
              </p>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={contentPlanData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 10, fill: "#e5e7eb" }}
                    />
                    <YAxis tick={{ fontSize: 10, fill: "#e5e7eb" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#020617",
                        border: "1px solid #a855f7",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: 11, color: "#e5e7eb" }}
                    />
                    <Bar dataKey="impact" name="Impact Score" fill="#a855f7" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>

        {/* Extra simulated future charts: Growth + Risk */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Growth Prediction */}
          <div className="rounded-2xl p-6 bg-slate-950/70 border border-purple-500/40">
            <h3 className="text-lg font-semibold mb-4 text-purple-100">
              Brand Growth Prediction
            </h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData}>
                  <XAxis dataKey="month" stroke="#aaa" />
                  <YAxis stroke="#aaa" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#020617",
                      border: "1px solid #a855f7",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#a855f7"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Risk Analysis */}
          <div className="rounded-2xl p-6 bg-slate-950/70 border border-purple-500/40">
            <h3 className="text-lg font-semibold mb-4 text-purple-100">
              Brand Risk Analysis
            </h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskData}>
                  <XAxis dataKey="name" stroke="#aaa" />
                  <YAxis stroke="#aaa" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#020617",
                      border: "1px solid #ec4899",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill="#ec4899"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
