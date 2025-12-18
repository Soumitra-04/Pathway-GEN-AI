// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  increment, 
  query, 
  orderBy 
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [totalBrands, setTotalBrands] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // IMPORTANT: Set this to your specific admin email
  const ADMIN_EMAIL = "your-email@example.com"; 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Security Check: Only allow access if email matches ADMIN_EMAIL
      if (!user || user.email !== ADMIN_EMAIL) {
        router.push("/"); 
      } else {
        fetchAdminData();
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchAdminData = async () => {
    try {
      // Fetch users sorted by credit count (lowest first to identify those needing refills)
      const userSnap = await getDocs(query(collection(db, "users"), orderBy("credits", "asc")));
      setUsers(userSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      // Fetch global brand count to see total app usage
      const brandSnap = await getDocs(collection(db, "brands"));
      setTotalBrands(brandSnap.size);
    } catch (error) {
      console.error("Admin Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const addCredits = async (userId: string) => {
    try {
      const userRef = doc(db, "users", userId);
      // Atomically increment credits by 10
      await updateDoc(userRef, { credits: increment(10) });
      alert("System: Credits updated successfully.");
      fetchAdminData(); 
    } catch (error) {
      alert("Critical: Failed to update database.");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="animate-pulse text-purple-500 font-black tracking-[0.3em] uppercase text-sm">
        Initializing Terminal...
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-sans p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase">
              Admin <span className="text-purple-600">Control</span>
            </h1>
            <p className="text-gray-500 font-bold mt-2 tracking-wide uppercase text-xs">
              Command Center / User Management
            </p>
          </div>
          <div className="flex items-center gap-3 px-5 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping"></div>
            <span className="text-purple-400 text-[10px] font-black uppercase tracking-widest">System Online</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] shadow-[0_0_50px_-15px_rgba(168,85,247,0.15)] transition-transform hover:scale-[1.02]">
            <p className="text-purple-500 text-[10px] font-black uppercase tracking-[0.2em]">Total Brands</p>
            <h2 className="text-6xl font-black text-white mt-3 tracking-tighter">{totalBrands}</h2>
            <div className="h-1.5 w-16 bg-purple-600 mt-6 rounded-full"></div>
          </div>
          
          <div className="p-8 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] shadow-[0_0_50px_-15px_rgba(168,85,247,0.15)] transition-transform hover:scale-[1.02]">
            <p className="text-purple-500 text-[10px] font-black uppercase tracking-[0.2em]">Active Users</p>
            <h2 className="text-6xl font-black text-white mt-3 tracking-tighter">{users.length}</h2>
            <div className="h-1.5 w-16 bg-purple-600 mt-6 rounded-full"></div>
          </div>

          <div className="p-8 bg-purple-600 rounded-[2.5rem] shadow-[0_0_40px_-5px_rgba(168,85,247,0.5)] flex flex-col justify-between">
            <p className="text-purple-100 text-[10px] font-black uppercase tracking-[0.2em]">Server Health</p>
            <h2 className="text-5xl font-black text-white mt-3 italic tracking-tighter">OPTIMAL</h2>
            <p className="text-purple-200 text-[10px] font-bold mt-4">UPTIME: 99.9%</p>
          </div>
        </div>

        {/* User Table Section */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <h3 className="text-2xl font-black text-white tracking-tight uppercase italic">User Database</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/[0.03] text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">
                <tr>
                  <th className="p-8">Identification / UID</th>
                  <th className="p-8">Credit Balance</th>
                  <th className="p-8 text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((u) => (
                  <tr key={u.id} className="group hover:bg-purple-500/[0.02] transition-all">
                    <td className="p-8">
                      <div className="flex flex-col">
                        <span className="text-white font-black text-lg">{u.email || "Unknown Identity"}</span>
                        <span className="text-[10px] text-gray-600 font-mono mt-1 tracking-widest">{u.id}</span>
                      </div>
                    </td>
                    <td className="p-8">
                      <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest border ${
                        u.credits < 3 
                        ? 'bg-red-500/10 text-red-500 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                        : 'bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                      }`}>
                        {u.credits || 0} CREDITS
                      </span>
                    </td>
                    <td className="p-8 text-right">
                      <button 
                        onClick={() => addCredits(u.id)}
                        className="bg-purple-600 hover:bg-white hover:text-purple-600 text-white font-black text-[10px] uppercase tracking-[0.2em] px-8 py-4 rounded-full transition-all active:scale-90 shadow-lg"
                      >
                        Refill +10
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}