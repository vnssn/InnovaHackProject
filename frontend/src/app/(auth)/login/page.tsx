"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, register } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("demo123");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(email, password);
      setAuth(data.access_token, data.refresh_token, data.user);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to login. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(email, password, name);
      // Auto-login after register
      const data = await login(email, password);
      setAuth(data.access_token, data.refresh_token, data.user);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4" style={{ width: '100%', flex: 1 }}>
      <div className="bg-surface-container rounded-2xl p-8 shadow-xl border border-outline-variant/20" style={{ width: '100%', maxWidth: '448px' }}>
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-primary text-3xl">account_balance_wallet</span>
          </div>
          <h1 className="text-2xl font-bold text-on-surface">FinGuard AI Copilot</h1>
          <p className="text-on-surface-variant mt-2">Your AI-powered financial companion</p>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 bg-surface-container-highest rounded-xl p-1">
          <button
            onClick={() => { setTab('login'); setError(''); }}
            className={`flex-1 py-2 rounded-lg font-label-md text-label-md transition-colors ${tab === 'login' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
          >Sign In</button>
          <button
            onClick={() => { setTab('register'); setError(''); }}
            className={`flex-1 py-2 rounded-lg font-label-md text-label-md transition-colors ${tab === 'register' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
          >Create Account</button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg flex items-center gap-2 text-error">
            <span className="material-symbols-outlined text-sm">warning</span>
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {tab === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-on-surface mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-surface-container-highest text-on-surface px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary border border-transparent transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-surface-container-highest text-on-surface px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary border border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-fixed text-on-primary py-3 rounded-xl font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : "Sign In"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-on-surface mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-surface-container-highest text-on-surface px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary border border-transparent transition-all"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-surface-container-highest text-on-surface px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary border border-transparent transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-surface-container-highest text-on-surface px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary border border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-fixed text-on-primary py-3 rounded-xl font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : "Create Account"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
