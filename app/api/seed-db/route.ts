import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    // Clear existing data
    await sql`DELETE FROM misinformation_checks`;
    await sql`DELETE FROM digital_literacy_modules`;
    await sql`DELETE FROM quiz_results`;
    await sql`DELETE FROM learning_progress`;
    await sql`DELETE FROM students`;

    // Create 10 Students
    const students = [
      { name: "Emma Wilson", email: "emma@student.com", password: "student123", grade: "Elementary (K-5)", score: 75 },
      { name: "Liam Chen", email: "liam@student.com", password: "student123", grade: "Elementary (K-5)", score: 82 },
      { name: "Sophia Martinez", email: "sophia@student.com", password: "student123", grade: "Middle School (6-8)", score: 68 },
      { name: "Noah Johnson", email: "noah@student.com", password: "student123", grade: "Middle School (6-8)", score: 90 },
      { name: "Olivia Brown", email: "olivia@student.com", password: "student123", grade: "Middle School (6-8)", score: 77 },
      { name: "Ethan Davis", email: "ethan@student.com", password: "student123", grade: "High School (9-12)", score: 85 },
      { name: "Ava Garcia", email: "ava@student.com", password: "student123", grade: "High School (9-12)", score: 92 },
      { name: "Mason Rodriguez", email: "mason@student.com", password: "student123", grade: "High School (9-12)", score: 71 },
      { name: "Isabella Lee", email: "isabella@student.com", password: "student123", grade: "High School (9-12)", score: 88 },
      { name: "James Taylor", email: "james@student.com", password: "student123", grade: "Elementary (K-5)", score: 79 },
    ];

    const insertedStudents = [];
    for (const student of students) {
      const result = await sql`
        INSERT INTO students (name, email, grade_level, digital_literacy_score)
        VALUES (${student.name}, ${student.email}, ${student.grade}, ${student.score})
        RETURNING *
      `;
      insertedStudents.push(result[0]);
    }

    // Create mock learning progress for each student
    const lessons = [
      { id: "critical-thinking", title: "Critical Thinking Basics", difficulty: 1 },
      { id: "source-evaluation", title: "Evaluating Information Sources", difficulty: 2 },
      { id: "fact-checking", title: "Fact-Checking Fundamentals", difficulty: 2 },
      { id: "ai-detection", title: "Identifying AI Content", difficulty: 3 },
      { id: "media-literacy", title: "Media Literacy Essentials", difficulty: 2 },
    ];

    for (const student of insertedStudents) {
      // Each student completes 2-4 lessons
      const lessonCount = Math.floor(Math.random() * 3) + 2;
      const selectedLessons = lessons.slice(0, lessonCount);

      for (const lesson of selectedLessons) {
        const score = Math.floor(Math.random() * 40) + 60; // 60-100
        const timeSpent = Math.floor(Math.random() * 20) + 5; // 5-25 minutes

        await sql`
          INSERT INTO learning_progress 
          (student_id, lesson_id, lesson_title, difficulty_level, score, time_spent)
          VALUES (${student.id}, ${lesson.id}, ${lesson.title}, ${lesson.difficulty}, ${score}, ${timeSpent})
        `;
      }
    }

    // Create quiz results for students
    const quizzes = ["critical-thinking-quiz", "source-eval-quiz", "fact-check-quiz"];
    
    for (const student of insertedStudents) {
      for (const quizId of quizzes) {
        const totalQuestions = 10;
        const correctAnswers = Math.floor(Math.random() * 6) + 4; // 4-10
        const score = Math.round((correctAnswers / totalQuestions) * 100);

        await sql`
          INSERT INTO quiz_results
          (student_id, quiz_id, score, total_questions, answers_correct)
          VALUES (${student.id}, ${quizId}, ${score}, ${totalQuestions}, ${correctAnswers})
        `;
      }
    }

    // Create digital literacy module completions
    const modules = [
      { id: "source-eval", title: "Evaluating Source Credibility", category: "source-evaluation" },
      { id: "fact-check", title: "Fact-Checking Basics", category: "fact-checking" },
      { id: "ai-detection", title: "Identifying AI-Generated Content", category: "ai-detection" },
    ];

    for (const student of insertedStudents) {
      // 50% chance to complete each module
      for (const module of modules) {
        if (Math.random() > 0.5) {
          const score = Math.floor(Math.random() * 30) + 70;
          await sql`
            INSERT INTO digital_literacy_modules
            (student_id, module_id, title, category, completed, score)
            VALUES (${student.id}, ${module.id}, ${module.title}, ${module.category}, true, ${score})
          `;
        }
      }
    }

    // Create misinformation check history
    const sampleChecks = [
      { url: "https://reliablenews.com/article", content: "Scientists discover new treatment for...", score: 85 },
      { url: "https://socialmedia.com/post", content: "BREAKING: You won't believe what happened!!!", score: 35 },
      { url: "https://university.edu/research", content: "According to recent study published in...", score: 92 },
    ];

    for (const student of insertedStudents.slice(0, 5)) {
      for (const check of sampleChecks) {
        const flags = check.score < 50 
          ? ["Sensational language", "No source attribution"]
          : check.score > 80 
          ? [] 
          : ["No publication date"];

        await sql`
          INSERT INTO misinformation_checks
          (student_id, url, content, credibility_score, flags)
          VALUES (${student.id}, ${check.url}, ${check.content}, ${check.score}, ARRAY[${flags.join(",")}]::text[])
        `;
      }
    }

    // Return credentials for easy testing
    const credentials = {
      students: students.map(s => ({ email: s.email, password: s.password, name: s.name })),
      educators: [
        { email: "prof.smith@edu.com", password: "educator123", name: "Dr. Sarah Smith", subject: "Computer Science" },
        { email: "prof.jones@edu.com", password: "educator123", name: "Prof. Michael Jones", subject: "Mathematics" },
        { email: "prof.williams@edu.com", password: "educator123", name: "Dr. Emily Williams", subject: "Digital Literacy" },
        { email: "prof.davis@edu.com", password: "educator123", name: "Prof. David Davis", subject: "Critical Thinking" },
        { email: "prof.miller@edu.com", password: "educator123", name: "Dr. Lisa Miller", subject: "Media Studies" },
      ],
      admin: [
        { email: "admin@eduguard.com", password: "admin123", name: "Admin User" },
      ],
    };

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully with mock data",
      credentials,
      stats: {
        students: students.length,
        learningProgress: insertedStudents.length * 3,
        quizResults: insertedStudents.length * quizzes.length,
        moduleCompletions: "varies",
        misinformationChecks: 5 * sampleChecks.length,
      },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to seed database",
        details: String(error),
      },
      { status: 500 }
    );
  }
}
