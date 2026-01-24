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

export default function BrandFuturePage() {
  const [result, setResult] = useState<BrandResult | null>(null);
  const [loading, setLoading] = useState(true);

  // Load last brand data from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = window.localStorage.getItem("pathway-gen-data");
      
      if (saved) {
        const parsed = JSON.parse(saved);
        
        // --- FIX: Check for nested 'result' OR raw object ---
        // This ensures we get the data regardless of how it was saved
        const validData = parsed.result || parsed;
        
        console.log("✅ Future Page Loaded Data:", validData); 
        setResult(validData);
      }
    } catch (e) {
      console.error("Failed to load brand data for future insights:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  // ---------- DATA PROCESSING (REAL-TIME) ----------

  // 1. Safe Access to Insights (with defaults to prevent crashes)
  const insights = result?.futureInsights || {
    growthScore: 0,
    sixMonthOutlook: "Data pending...",
    biggestGrowthLever: "Data pending...",
    revenueBySegment: [],
    contentMomentum: [],
    growthPrediction: [],
    riskAnalysis: { marketRisk: 0, brandRisk: 0, competitionRisk: 0, executionRisk: 0 },
  };

  // 2. Chart Data: Revenue by Segment (Pie Chart)
  const revenueData = insights.revenueBySegment || [];

  // 3. Chart Data: Content Momentum (Bar Chart)
  // Backend sends [10, 20, 30...], we map to { day: "Day 1", value: 10 }
  const momentumData = (insights.contentMomentum || []).map((val: number, i: number) => ({
    day: `Day ${i + 1}`,
    impact: val,
  }));

  // 4. Chart Data: Growth Prediction (Line Chart)
  // Backend sends [10, 25, 45...], we map to { month: "Month 1", score: 10 }
  const growthChartData = (insights.growthPrediction || []).map((val: number, i: number) => ({
    month: `Month ${i + 1}`,
    score: val,
  }));

  // 5. Chart Data: Risk Analysis (Bar Chart)
  // Backend sends object { marketRisk: 30... }, we map to array
  const risks = insights.riskAnalysis || {};
  const riskChartData = [
    { name: "Market", value: risks.marketRisk || 0 },
    { name: "Brand", value: risks.brandRisk || 0 },
    { name: "Comp", value: risks.competitionRisk || 0 },
    { name: "Exec", value: risks.executionRisk || 0 },
  ];

  // 6. Score Badge Logic
  const getScoreBadge = (score: number) => {
    if (score >= 80) return { label: "🚀 HIGH GROWTH POTENTIAL", color: "text-green-400 border-green-500/30 bg-green-500/20" };
    if (score <= 40) return { label: "⚠️ HIGH RISK DETECTED", color: "text-red-400 border-red-500/30 bg-red-500/20" };
    return { label: "⚖️ MODERATE POTENTIAL", color: "text-yellow-400 border-yellow-500/30 bg-yellow-500/20" };
  };

  const badge = getScoreBadge(insights.growthScore);


  // ---------- RENDER ----------

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 text-slate-50 flex items-center justify-center">
        <p className="text-purple-200 text-sm animate-pulse">
          Loading AI Market Intelligence...
        </p>
      </main>
    );
  }

  if (!result) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 text-slate-50">
        <div className="max-w-4xl mx-auto px-4 pt-16 pb-10 space-y-6">
          <Link href="/" className="text-purple-300 hover:text-white text-sm">← Back</Link>
          <div className="rounded-2xl p-8 bg-slate-950/70 border border-purple-500/40">
            <h1 className="text-3xl font-bold mb-3">No Data Found</h1>
            <p className="text-sm text-purple-200">Please generate a brand first.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 text-slate-50 pb-16">
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-6 space-y-6">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-blue-500">
              Future Market Insights
            </h1>
            <p className="text-sm md:text-base text-purple-200/90 mt-1">
              Real-time market analysis powered by <span className="text-white font-semibold">Pathway RAG</span>.
            </p>
          </div>
          <Link

              href="/?view=results"
              className="inline-flex items-center gap-2 text-xs md:text-sm text-purple-100 hover:text-white px-3 py-2 rounded-full bg-slate-900/80 border border-purple-500/40"
            >
            ← Back to Generator
        </Link>
        </div>

        {/* --- TOP ROW: SCORE & TEXT --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Score Card */}
          <div className="md:col-span-1 rounded-2xl p-5 bg-slate-950/80 border border-purple-500/40 shadow-lg shadow-purple-900/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10">
               {/* Decorative background element if needed */}
            </div>
            <p className="text-xs text-purple-300/80 uppercase tracking-wide mb-1">
              Market Viability Score
            </p>
            <div className="flex items-end gap-3">
              <span className={`text-6xl font-bold ${insights.growthScore > 80 ? 'text-green-400' : insights.growthScore < 40 ? 'text-red-400' : 'text-purple-300'}`}>
                {insights.growthScore}
              </span>
              <span className="text-sm text-purple-200/80 mb-2">/ 100</span>
            </div>
            
            <div className={`mt-3 inline-block px-3 py-1 rounded-full text-[10px] font-bold border ${badge.color}`}>
              {badge.label}
            </div>

            <p className="text-[11px] text-purple-300/60 mt-4 border-t border-purple-500/20 pt-2">
              Based on analysis of {result.ragContextUsed ? "real-time market documents" : "general market trends"}.
            </p>
          </div>

          {/* Text Insights */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl p-5 bg-slate-950/80 border border-purple-500/30">
              <p className="text-xs text-purple-300/80 uppercase tracking-wide mb-2">
                3–6 Month Outlook
              </p>
              <p className="text-sm text-slate-100 leading-relaxed">
                {insights.sixMonthOutlook}
              </p>
            </div>

            <div className="rounded-xl p-5 bg-slate-950/80 border border-purple-500/30">
              <p className="text-xs text-purple-300/80 uppercase tracking-wide mb-2">
                Strategic Growth Lever
              </p>
              <p className="text-sm text-slate-100 leading-relaxed">
                {insights.biggestGrowthLever}
              </p>
            </div>
          </div>
        </div>

        {/* --- CHARTS ROW 1 --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          
          {/* Revenue Pie Chart */}
          <div className="rounded-2xl p-5 bg-slate-950/80 border border-purple-500/40">
            <h2 className="text-lg font-semibold text-slate-50 mb-1">
              Projected Revenue Segments
            </h2>
            <p className="text-xs text-purple-200/85 mb-4">
              Estimated revenue breakdown based on current market demand.
            </p>

            {revenueData.length === 0 ? (
              <p className="text-sm text-purple-200/70 py-10 text-center">No revenue data available.</p>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={revenueData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={(entry) => entry.name}
                    >
                      {revenueData.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#020617", border: "1px solid #a855f7", borderRadius: 8 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Momentum Bar Chart */}
          <div className="rounded-2xl p-5 bg-slate-950/80 border border-purple-500/40">
            <h2 className="text-lg font-semibold text-slate-50 mb-1">
              Viral Momentum Forecast (15 Days)
            </h2>
            <p className="text-xs text-purple-200/85 mb-4">
              Predicted engagement velocity based on content strategy.
            </p>

            {momentumData.length === 0 ? (
              <p className="text-sm text-purple-200/70 py-10 text-center">No momentum data available.</p>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={momentumData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#e5e7eb" }} />
                    <YAxis tick={{ fontSize: 10, fill: "#e5e7eb" }} />
                    <Tooltip contentStyle={{ backgroundColor: "#020617", border: "1px solid #a855f7", borderRadius: 8 }} />
                    <Bar dataKey="impact" name="Impact Score" fill="#a855f7" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>

        {/* --- CHARTS ROW 2: Growth & Risk --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          
          {/* Growth Line Chart */}
          <div className="rounded-2xl p-6 bg-slate-950/70 border border-purple-500/40">
            <h3 className="text-lg font-semibold mb-4 text-purple-100">
              Growth Trajectory Prediction
            </h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#aaa" />
                  <YAxis stroke="#aaa" />
                  <Tooltip contentStyle={{ backgroundColor: "#020617", border: "1px solid #a855f7", borderRadius: 8 }} />
                  <Line type="monotone" dataKey="score" stroke="#a855f7" strokeWidth={3} dot={{r:4}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Risk Bar Chart */}
          <div className="rounded-2xl p-6 bg-slate-950/70 border border-purple-500/40">
            <h3 className="text-lg font-semibold mb-4 text-purple-100">
              Risk Factor Analysis
            </h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#aaa" />
                  <YAxis stroke="#aaa" domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: "#020617", border: "1px solid #ec4899", borderRadius: 8 }} />
                  <Bar dataKey="value" fill="#ec4899" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}