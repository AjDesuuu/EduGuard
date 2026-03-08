import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { studentId, content, url } = body;

    // Mock AI misinformation detection
    const credibilityScore = calculateCredibilityScore(content, url);
    const flags = detectFlags(content, url);

    // Save to database
    const result = await sql`
      INSERT INTO misinformation_checks 
      (student_id, url, content, credibility_score, flags)
      VALUES (${studentId}, ${url || null}, ${content}, ${credibilityScore}, ARRAY[${flags.join(",")}]::text[])
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      credibilityScore,
      flags,
      analysis: result[0],
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to verify content",
        details: String(error),
      },
      { status: 500 },
    );
  }
}

function calculateCredibilityScore(content: string, url?: string): number {
  let score = 50; // Base score

  // URL credibility indicators
  if (url) {
    if (url.includes(".edu") || url.includes(".gov")) score += 30;
    else if (url.includes(".org")) score += 20;
    else if (url.includes("wikipedia")) score += 15;

    if (url.includes("https://")) score += 10;
    if (url.match(/\d{4}/)) score += 5; // Has year/date
  }

  // Content analysis
  if (content.includes("study") || content.includes("research")) score += 10;
  if (content.includes("according to") || content.includes("source:"))
    score += 10;
  if (content.match(/\[\d+\]/) || content.includes("References")) score += 15;

  // Negative indicators
  if (content.includes("BREAKING") || content.includes("!!!")) score -= 15;
  if (content.includes("click here") || content.includes("you won't believe"))
    score -= 20;
  if (/[A-Z]{5,}/.test(content)) score -= 10; // Excessive caps

  return Math.max(0, Math.min(100, score));
}

function detectFlags(content: string, url?: string): string[] {
  const flags: string[] = [];

  if (!url) flags.push("No source URL provided");
  else if (!url.includes("https://")) flags.push("Unsecure connection (HTTP)");

  if (!/\d{4}/.test(content) && !url?.match(/\d{4}/)) {
    flags.push("No publication date found");
  }

  if (!/author|by |written/i.test(content)) {
    flags.push("No author attribution");
  }

  if (content.includes("!!!") || /[A-Z]{5,}/.test(content)) {
    flags.push("Sensationalist language detected");
  }

  if (!content.includes("References") && !content.match(/\[\d+\]/)) {
    flags.push("No references or citations");
  }

  return flags;
}
