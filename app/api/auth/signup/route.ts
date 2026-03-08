import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: Request) {
  try {
    const { name, email, password, role, gradeLevel, interests, subject, bio } = await request.json();

    // Check if user already exists
    const existingUser = await sql`
      SELECT * FROM students WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      return NextResponse.json(
        { success: false, error: "Email already registered" },
        { status: 400 }
      );
    }

    // Insert new user
    const result = await sql`
      INSERT INTO students (name, email, grade_level, digital_literacy_score)
      VALUES (${name}, ${email}, ${gradeLevel || null}, 0)
      RETURNING *
    `;

    const newUser = result[0];

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: role || "student",
        gradeLevel: newUser.grade_level,
        interests,
        subject,
        digitalLiteracyScore: 0,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { success: false, error: "Signup failed", details: String(error) },
      { status: 500 }
    );
  }
}
