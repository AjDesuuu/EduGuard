import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const studentId = 1; // Demo student ID

    // Get basic student info
    const studentResult = await sql`
      SELECT * FROM students WHERE id = ${studentId}
    `;

    if (studentResult.rows.length === 0) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const student = studentResult.rows[0];

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

    const stats = progressResult.rows[0];

    return NextResponse.json({
      student,
      stats: {
        totalLessons: parseInt(stats.total_lessons) || 0,
        completedLessons: parseInt(stats.completed_lessons) || 0,
        averageScore: Math.round(parseFloat(stats.average_score) || 0),
        digitalLiteracyScore: student.digital_literacy_score,
        totalTimeSpent: parseInt(stats.total_time_spent) || 0,
        recentActivity: recentActivity.rows,
        performanceTrend: trend.rows.reverse(),
      },
    });
  } catch (error) {
    console.error("Progress API error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch progress",
        details: String(error),
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      studentId,
      lessonId,
      lessonTitle,
      difficultyLevel,
      score,
      timeSpent,
    } = body;

    const result = await sql`
      INSERT INTO learning_progress 
      (student_id, lesson_id, lesson_title, difficulty_level, score, time_spent)
      VALUES (${studentId}, ${lessonId}, ${lessonTitle}, ${difficultyLevel}, ${score}, ${timeSpent})
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      progress: result.rows[0],
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to save progress",
        details: String(error),
      },
      { status: 500 },
    );
  }
}
