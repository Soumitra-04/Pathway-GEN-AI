'use client'
import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/'); 
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/'); 
    } catch (err: any) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />

      <div className="w-full max-w-md z-10 animate-fade-up">
        {/* Branding Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-blue-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            ORIGYN
          </h1>
          <p className="text-purple-200 font-light tracking-wide text-sm">
            Welcome to the future of brand generation
          </p>
        </div>

        {/* Glassmorphism Card */}
        <div className="rounded-2xl p-8 bg-slate-900/60 border border-purple-500/30 backdrop-blur-xl shadow-2xl">
          <h2 className="text-xl font-semibold text-slate-50 mb-6 text-center">Login to your account</h2>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs text-purple-300 uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-purple-500/30 text-white placeholder-purple-300/30 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </div>
            
            <div>
              <label className="block text-xs text-purple-300 uppercase tracking-widest mb-2 ml-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-purple-500/30 text-white placeholder-purple-300/30 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 shadow-lg shadow-purple-900/40 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Sign In
            </button>
            
            {error && (
              <p className="text-red-400 text-xs text-center font-medium animate-pulse">
                {error}
              </p>
            )}

            <div className="pt-4 border-t border-purple-500/20 text-center">
              <p className="text-sm text-purple-200/60">
                New to Origyn?{" "}
                <Link href="/signup" className="text-purple-400 hover:text-pink-400 underline-offset-4 hover:underline transition-colors font-medium">
                  Create an account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}