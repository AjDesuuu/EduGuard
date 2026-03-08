"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, Button } from "@/components/UI";
import { Shield, Mail, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "educator" | "admin">("student");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login, loading, isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect already logged-in users to their dashboard
      if (user.role === "educator") {
        router.push("/educator/dashboard");
      } else if (user.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/dashboard");
      }
    }
  }, [isAuthenticated, user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = await login(email, password, role);

    if (success) {
      // Redirect based on role
      if (role === "educator") {
        router.push("/educator/dashboard");
      } else if (role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/dashboard");
      }
    } else {
      setError("Invalid email or password. Try: emma@student.com / student123");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to continue your learning journey
          </p>
        </div>

        <Card>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                I am a...
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`py-2 px-4 rounded-lg border-2 transition-colors ${
                    role === "student"
                      ? "border-primary bg-blue-50 dark:bg-blue-900 text-primary"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setRole("educator")}
                  className={`py-2 px-4 rounded-lg border-2 transition-colors ${
                    role === "educator"
                      ? "border-primary bg-blue-50 dark:bg-blue-900 text-primary"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  Educator
                </button>
                <button
                  type="button"
                  onClick={() => setRole("admin")}
                  className={`py-2 px-4 rounded-lg border-2 transition-colors ${
                    role === "admin"
                      ? "border-primary bg-blue-50 dark:bg-blue-900 text-primary"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </Card>

        <p className="text-center text-xs text-gray-500">
          Test credentials: emma@student.com / student123
        </p>
      </div>
    </div>
  );
}
