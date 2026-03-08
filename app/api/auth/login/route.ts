import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: Request) {
  try {
    const { email, password, role } = await request.json();

    // Query students table for all roles (we store all users there)
    const result = await sql`
      SELECT * FROM students WHERE email = ${email} LIMIT 1
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 },
      );
    }

    const user = result[0];

    // In a real app, you'd hash and compare passwords
    // For now, we're using mock passwords from seed data
    // student123, educator123, admin123 based on email pattern
    let expectedPassword = "student123";
    if (email.includes("prof.") || email.includes("educator")) {
      expectedPassword = "educator123";
    } else if (email.includes("admin")) {
      expectedPassword = "admin123";
    }

    if (password !== expectedPassword) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 },
      );
    }

    // Determine role from email
    let userRole: "student" | "educator" | "admin" = "student";
    if (email.includes("prof.") || email.includes("educator")) {
      userRole = "educator";
    } else if (email.includes("admin")) {
      userRole = "admin";
    }

    // Return user data (excluding sensitive info)
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: userRole,
        gradeLevel: user.grade_level,
        digitalLiteracyScore: user.digital_literacy_score,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Login failed", details: String(error) },
      { status: 500 },
    );
  }
}
