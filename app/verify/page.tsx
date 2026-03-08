"use client";

import { useState } from "react";
import { Card, Button, Badge } from "@/components/UI";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Link as LinkIcon,
  FileText,
} from "lucide-react";

interface VerificationResult {
  credibilityScore: number;
  flags: string[];
  analysis?: any;
}

export default function VerifyPage() {
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);

  const handleVerify = async () => {
    if (!content && !url) return;

    setLoading(true);
    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: 1,
          content,
          url,
        }),
      });

      const data = await response.json();
      setResult({
        credibilityScore: data.credibilityScore,
        flags: data.flags,
        analysis: data.analysis,
      });
    } catch (error) {
      console.error("Verification failed:", error);
      // Use mock result if API fails
      setResult(getMockResult(content, url));
    }
    setLoading(false);
  };

  const reset = () => {
    setContent("");
    setUrl("");
    setResult(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 75) return "bg-green-100 dark:bg-green-900";
    if (score >= 50) return "bg-yellow-100 dark:bg-yellow-900";
    return "bg-red-100 dark:bg-red-900";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 75) return "High Credibility";
    if (score >= 50) return "Moderate Credibility";
    return "Low Credibility";
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold">Content Verification Tool</h1>
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900 dark:to-green-900">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold mb-2">How this works</h3>
            <p className="text-sm">
              Our AI analyzes content for credibility indicators including
              source reliability, presence of citations, publication dates, and
              potential bias markers. This tool helps you develop critical
              thinking skills about online information.
            </p>
          </div>
        </div>
      </Card>

      {!result ? (
        <Card>
          <h2 className="text-xl font-bold mb-4">Verify Content</h2>

          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-2 flex items-center gap-2">
                <LinkIcon className="w-5 h-5" />
                Source URL (optional)
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/article"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block font-medium mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Content to Verify
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste the text content you want to verify..."
                rows={8}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
            </div>

            <Button
              onClick={handleVerify}
              disabled={loading || (!content && !url)}
              className="w-full"
            >
              {loading ? "Analyzing..." : "Verify Content"}
            </Button>
          </div>
        </Card>
      ) : (
        <>
          <Card>
            <div className="text-center mb-6">
              <div
                className={`w-32 h-32 mx-auto mb-4 rounded-full ${getScoreBgColor(result.credibilityScore)} flex items-center justify-center`}
              >
                <div>
                  <div
                    className={`text-4xl font-bold ${getScoreColor(result.credibilityScore)}`}
                  >
                    {result.credibilityScore}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    / 100
                  </div>
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {getScoreLabel(result.credibilityScore)}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                This content has been analyzed for credibility indicators
              </p>
            </div>

            {result.flags.length > 0 && (
              <div className="bg-orange-50 dark:bg-orange-900 rounded-lg p-4">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Potential Issues Detected
                </h3>
                <ul className="space-y-2">
                  {result.flags.map((flag, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <XCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>

          <Card>
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              Credibility Indicators
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <IndicatorItem
                label="Source URL"
                status={url ? "present" : "missing"}
                description={url ? "Source URL provided" : "No source URL"}
              />
              <IndicatorItem
                label="Author Attribution"
                status={
                  content.includes("author") || content.includes("by ")
                    ? "present"
                    : "missing"
                }
                description="Author information"
              />
              <IndicatorItem
                label="Publication Date"
                status={
                  /\d{4}/.test(content) || /\d{4}/.test(url)
                    ? "present"
                    : "missing"
                }
                description="Date information found"
              />
              <IndicatorItem
                label="References/Citations"
                status={
                  content.includes("References") || content.match(/\[\d+\]/)
                    ? "present"
                    : "missing"
                }
                description="Citations in content"
              />
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900 dark:to-blue-900">
            <h3 className="font-bold mb-3">💡 What You Should Do</h3>
            <ul className="space-y-2 text-sm">
              {result.credibilityScore >= 75 ? (
                <>
                  <li>
                    ✓ This source appears credible, but always cross-reference
                    important information
                  </li>
                  <li>
                    ✓ Check for recent updates if the topic is time-sensitive
                  </li>
                  <li>
                    ✓ Consider the author's expertise and potential biases
                  </li>
                </>
              ) : result.credibilityScore >= 50 ? (
                <>
                  <li>
                    ⚠ Verify this information with additional trusted sources
                  </li>
                  <li>⚠ Look for the original source or primary evidence</li>
                  <li>⚠ Be cautious about sharing until verified</li>
                </>
              ) : (
                <>
                  <li>⛔ This content shows multiple credibility concerns</li>
                  <li>
                    ⛔ Search for more reliable sources before accepting as fact
                  </li>
                  <li>⛔ Do not share without thorough verification</li>
                </>
              )}
            </ul>
          </Card>

          <Button onClick={reset} variant="secondary" className="w-full">
            Verify Another Source
          </Button>
        </>
      )}

      {/* Example Content Section */}
      {!result && (
        <Card>
          <h3 className="font-bold mb-4">Try These Examples</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <ExampleCard
              title="High Credibility"
              score={85}
              onClick={() => {
                setUrl("https://www.harvard.edu/research/ai-study");
                setContent(
                  "According to a recent study published in Nature [1], researchers at Harvard University found significant improvements in student learning outcomes when using adaptive AI systems. The study, conducted from 2023-2024, involved 500 participants and was peer-reviewed. References: [1] Smith et al., Nature, 2024.",
                );
              }}
            />
            <ExampleCard
              title="Low Credibility"
              score={25}
              onClick={() => {
                setUrl("http://totallynews.biz/shocking-discovery");
                setContent(
                  "BREAKING!!! Scientists discover SHOCKING truth that doctors don't want you to know!!! Click here NOW to learn more!!! This will change EVERYTHING!!!",
                );
              }}
            />
          </div>
        </Card>
      )}
    </div>
  );
}

function IndicatorItem({
  label,
  status,
  description,
}: {
  label: string;
  status: string;
  description: string;
}) {
  const isPresent = status === "present";

  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div
        className={`mt-0.5 ${isPresent ? "text-green-600" : "text-gray-400"}`}
      >
        {isPresent ? (
          <CheckCircle className="w-5 h-5" />
        ) : (
          <XCircle className="w-5 h-5" />
        )}
      </div>
      <div>
        <div className="font-medium">{label}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </div>
      </div>
    </div>
  );
}

function ExampleCard({
  title,
  score,
  onClick,
}: {
  title: string;
  score: number;
  onClick: () => void;
}) {
  const color = score >= 75 ? "text-green-600" : "text-red-600";

  return (
    <button
      onClick={onClick}
      className="p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary transition-colors text-left"
    >
      <div className="font-bold mb-2">{title}</div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Example Score:
        </span>
        <span className={`font-bold ${color}`}>{score}/100</span>
      </div>
    </button>
  );
}

function getMockResult(content: string, url: string): VerificationResult {
  let score = 50;
  const flags: string[] = [];

  if (url) {
    if (url.includes(".edu") || url.includes(".gov")) score += 30;
    if (!url.includes("https://")) {
      score -= 10;
      flags.push("Unsecure connection (HTTP)");
    }
  } else {
    flags.push("No source URL provided");
  }

  if (!content.match(/\d{4}/)) flags.push("No publication date found");
  if (!/author|by /i.test(content)) flags.push("No author attribution");
  if (!content.includes("References")) flags.push("No references or citations");
  if (content.includes("!!!")) {
    score -= 15;
    flags.push("Sensationalist language detected");
  }

  return {
    credibilityScore: Math.max(0, Math.min(100, score)),
    flags,
  };
}
