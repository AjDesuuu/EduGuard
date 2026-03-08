import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const studentId = parseInt(params.id);

    // Get student info
    const studentResult = await sql`
      SELECT * FROM students WHERE id = ${studentId}
    `;

    if (studentResult.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const student = studentResult[0];

    // Get learning progress stats
    const progressResult = await sql`
      SELECT 
        COUNT(*) as total_lessons,
        COUNT(CASE WHEN score >= 70 THEN 1 END) as completed_lessons,
        AVG(score) as average_score,
        SUM(time_spent) as total_time_spent
      FROM learning_progress 
      WHERE student_id = ${studentId}
    `;

    // Get recent activity
    const recentActivity = await sql`
      SELECT * FROM learning_progress 
      WHERE student_id = ${studentId}
      ORDER BY completed_at DESC 
      LIMIT 5
    `;

    // Get performance trend (last 7 entries)
    const trend = await sql`
      SELECT 
        TO_CHAR(completed_at, 'MM/DD') as date,
        score
      FROM learning_progress 
      WHERE student_id = ${studentId}
      ORDER BY completed_at DESC 
      LIMIT 7
    `;

    // Get module completions
    const modules = await sql`
      SELECT * FROM digital_literacy_modules
      WHERE student_id = ${studentId}
    `;

    // Get quiz results
    const quizResults = await sql`
      SELECT * FROM quiz_results
      WHERE student_id = ${studentId}
      ORDER BY timestamp DESC
      LIMIT 10
    `;

    const stats = progressResult[0];

    return NextResponse.json({
      user: {
        id: student.id,
        name: student.name,
        email: student.email,
        gradeLevel: student.grade_level,
        digitalLiteracyScore: student.digital_literacy_score,
      },
      stats: {
        totalLessons: parseInt(stats.total_lessons) || 0,
        completedLessons: parseInt(stats.completed_lessons) || 0,
        averageScore: Math.round(parseFloat(stats.average_score) || 0),
        digitalLiteracyScore: student.digital_literacy_score,
        totalTimeSpent: parseInt(stats.total_time_spent) || 0,
        recentActivity: recentActivity,
        performanceTrend: trend.reverse(),
      },
      modules: modules,
      quizResults: quizResults,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch dashboard data",
        details: String(error),
      },
      { status: 500 },
    );
  }
}
