"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  BookOpen,
  TrendingUp,
  Shield,
  Award,
  LogIn,
  UserPlus,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12 px-4">
        <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
          <Shield className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-primary">
            AI-Powered Learning
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          {isAuthenticated
            ? `Welcome back, ${user?.name?.split(" ")[0]}!`
            : "Welcome to EduGuard"}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          {isAuthenticated
            ? "Continue your learning journey with personalized AI-driven content"
            : "Personalized learning pathways with AI-driven content verification and digital literacy training"}
        </p>
        <div className="flex gap-4 justify-center">
          {isAuthenticated ? (
            <Link
              href={
                user?.role === "educator"
                  ? "/educator/dashboard"
                  : user?.role === "admin"
                    ? "/admin/dashboard"
                    : "/dashboard"
              }
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors text-lg font-semibold"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
          ) : (
            <>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors text-lg font-semibold"
              >
                <UserPlus className="w-5 h-5" />
                Get Started
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 text-primary border-2 border-primary px-8 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors text-lg font-semibold"
              >
                <LogIn className="w-5 h-5" />
                Sign In
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          icon={<TrendingUp className="w-8 h-8" />}
          title="Adaptive Learning"
          description="AI adjusts to your pace and recommends personalized content"
          href="/learn"
        />
        <FeatureCard
          icon={<Shield className="w-8 h-8" />}
          title="Misinformation Detection"
          description="Flags unreliable sources and highlights credibility indicators"
          href="/verify"
        />
        <FeatureCard
          icon={<BookOpen className="w-8 h-8" />}
          title="Digital Literacy"
          description="Learn to evaluate sources and identify AI-generated content"
          href="/modules"
        />
        <FeatureCard
          icon={<Award className="w-8 h-8" />}
          title="Track Progress"
          description="Monitor your learning journey and digital literacy score"
          href="/dashboard"
        />
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Why EduGuard?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <StatCard number="AI-Driven" label="Personalized Roadmap" />
          <StatCard number="Real-time" label="Source Verification" />
          <StatCard number="Track & Improve" label="Digital Literacy Skills" />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer h-full">
        <div className="text-primary mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {description}
        </p>
      </div>
    </Link>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-3xl font-bold text-primary mb-2">{number}</div>
      <div className="text-gray-600 dark:text-gray-300">{label}</div>
    </div>
  );
}
