// app/brands/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function PublicBrandPage() {
  const { id } = useParams();
  const [brand, setBrand] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchBrandData();
  }, [id]);

  const fetchBrandData = async () => {
    try {
      const docRef = doc(db, "brands", id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBrand(docSnap.data());
      }
    } catch (error) {
      console.error("Error fetching brand:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">Loading Strategy...</div>;
  if (!brand) return <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">Brand not found.</div>;

  const { strategy, logoData } = brand;

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-blue-500/30">
      {/* Header / Hero Section */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {logoData && <img src={logoData} alt="Logo" className="w-10 h-10 rounded-lg border border-white/20" />}
            <h1 className="text-xl font-bold tracking-tight text-white">{brand.brandName}</h1>
          </div>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Link copied to clipboard!");
            }}
            className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full transition-all font-medium"
          >
            Share Strategy
          </button>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Brand Narrative Section */}
        <section className="space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
            Brand Story
          </div>
          <h2 className="text-4xl font-extrabold text-white leading-tight max-w-3xl">
            {strategy.marketing?.landingPage?.heroHeadline || "The Vision"}
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed max-w-4xl italic">
            "{strategy.branding?.brandStory}"
          </p>
        </section>

        {/* Visual Identity Grid */}
        <section className="grid md:grid-cols-2 gap-12 border-t border-white/10 pt-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Visual DNA</h3>
            <div className="flex gap-4">
              {strategy.branding?.visualIdentity?.colorPalette?.map((color: any, i: number) => (
                <div key={i} className="group flex flex-col items-center">
                  <div 
                    className="w-16 h-16 rounded-2xl border border-white/10 shadow-xl" 
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-[10px] mt-2 text-gray-500 font-mono uppercase tracking-tighter">{color.hex}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Voice & Tone</h3>
            <p className="text-gray-400">{strategy.branding?.brandVoice}</p>
          </div>
        </section>

        {/* Strategic Analysis */}
        <section className="bg-white/5 rounded-3xl p-8 border border-white/10 grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-blue-400 font-bold mb-2 uppercase text-xs">Target Audience</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              {strategy.business?.targetAudience?.map((item: string, i: number) => <li key={i}>• {item}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="text-blue-400 font-bold mb-2 uppercase text-xs">Core Value Prop</h4>
            <p className="text-sm text-gray-300">{strategy.business?.valueProposition}</p>
          </div>
          <div>
            <h4 className="text-blue-400 font-bold mb-2 uppercase text-xs">Market Need</h4>
            <p className="text-sm text-gray-300">{strategy.business?.marketNeed}</p>
          </div>
        </section>

        {/* 15-Day Content Roadmap */}
        <section className="space-y-8">
          <h3 className="text-3xl font-bold text-white text-center">GTM Roadmap: 15-Day Launch</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {strategy.marketing?.contentPlan15Days?.map((day: any, i: number) => (
              <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-blue-500/50 transition-all">
                <span className="text-blue-500 font-black text-xs">DAY {day.day}</span>
                <p className="text-xs text-gray-300 mt-2 leading-tight">{day.idea}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-12 text-center border-t border-white/10 text-gray-600 text-xs">
        Generated by Pathway-GEN-AI • Powered by Groq & Hugging Face
      </footer>
    </div>
  );
}