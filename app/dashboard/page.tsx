// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

export default function Dashboard() {
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchBrands(currentUser.uid);
      } else {
        window.location.href = "/login";
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchBrands = async (uid: string) => {
    try {
      const q = query(
        collection(db, "brands"),
        where("userId", "==", uid),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const fetchedBrands = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBrands(fetchedBrands);
    } catch (error) {
      console.error("Vault Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="text-purple-500 font-black animate-pulse tracking-widest uppercase italic">Accessing Vault...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-6xl font-black text-white italic tracking-tighter uppercase">The <span className="text-purple-600">Vault</span></h1>
            <p className="text-gray-500 font-bold mt-2 uppercase text-xs tracking-[0.2em]">Your Generated Brand Identities</p>
          </div>
          <Link href="/generate" className="bg-purple-600 hover:bg-white hover:text-purple-600 text-white font-black px-8 py-3 rounded-full transition-all text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            + New Brand
          </Link>
        </div>

        {brands.length === 0 ? (
          <div className="text-center py-40 bg-[#0a0a0a] border-2 border-dashed border-purple-500/20 rounded-[3rem]">
            <p className="text-gray-500 font-bold uppercase tracking-widest mb-6 text-sm">Vault Empty</p>
            <Link href="/generate" className="text-purple-500 font-black border-b-2 border-purple-500 hover:text-white hover:border-white transition-all">
              Initiate First Generation
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand) => (
              <Link key={brand.id} href={`/brands/${brand.id}`}>
                <div className="group bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-6 hover:border-purple-500/50 transition-all hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.2)] hover:-translate-y-2 cursor-pointer">
                  <div className="aspect-square bg-white/[0.02] rounded-[1.5rem] mb-6 flex items-center justify-center overflow-hidden border border-white/5 group-hover:border-purple-500/30">
                    {brand.logoData ? (
                      <img src={brand.logoData} alt={brand.brandName} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    ) : (
                      <span className="text-purple-900 font-black text-4xl italic">AI</span>
                    )}
                  </div>
                  <h2 className="font-black text-2xl text-white truncate italic uppercase tracking-tighter">{brand.brandName}</h2>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                      {new Date(brand.createdAt?.seconds * 1000).toLocaleDateString()}
                    </span>
                    <span className="text-purple-500 font-black text-[10px] uppercase opacity-0 group-hover:opacity-100 transition-opacity">View Strategy →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}