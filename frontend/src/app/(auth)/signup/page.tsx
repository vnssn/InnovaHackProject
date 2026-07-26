"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, register, googleLogin } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { useGoogleLogin } from "@react-oauth/google";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await register(name, email, password);
      setAuth(data.access_token, data.refresh_token, data.user);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const realGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setError("");
      setLoading(true);
      try {
        const data = await googleLogin(tokenResponse.access_token);
        setAuth(data.access_token, data.refresh_token, data.user);
        router.push("/dashboard");
      } catch (err: any) {
        setError(err.response?.data?.detail || "Failed to sign up with Google.");
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setError("Google authentication failed.");
    }
  });

  const handleGoogleLogin = () => {
    if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
      setError("");
      setLoading(true);
      const mockToken = JSON.stringify({ email: "demo_google@example.com", name: "Demo Google User" });
      googleLogin(mockToken)
        .then(data => {
          setAuth(data.access_token, data.refresh_token, data.user);
          router.push("/dashboard");
        })
        .catch(err => {
          setError(err.response?.data?.detail || "Failed to sign up with Google.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      realGoogleLogin();
    }
  };

  return (
    <div className="min-h-screen w-full grid place-items-center bg-surface p-4">
      <div className="max-w-[448px] w-full bg-surface-container rounded-2xl p-8 shadow-xl border border-outline-variant/20">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-primary text-3xl">account_balance_wallet</span>
          </div>
          <h1 className="text-2xl font-bold text-on-surface">Create an Account</h1>
          <p className="text-on-surface-variant mt-2">Join SpendSense today to master your money</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg flex items-center gap-2 text-error">
            <span className="material-symbols-outlined text-sm">warning</span>
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
            {loading ? (
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-surface-container text-on-surface-variant">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-surface-container-highest hover:bg-surface-variant text-on-surface py-3 rounded-xl font-medium transition-all border border-outline-variant/30 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Google
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-on-surface-variant">
          Already have an account?{" "}
          <button onClick={() => router.push("/login")} className="font-medium text-primary hover:text-primary-fixed transition-colors">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
