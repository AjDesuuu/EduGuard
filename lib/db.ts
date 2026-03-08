import { sql } from "@vercel/postgres";

export async function initDatabase() {
  try {
    // Create students table
    await sql`
      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        grade_level VARCHAR(50),
        digital_literacy_score INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create learning_progress table
    await sql`
      CREATE TABLE IF NOT EXISTS learning_progress (
        id SERIAL PRIMARY KEY,
        student_id INTEGER REFERENCES students(id),
        lesson_id VARCHAR(100) NOT NULL,
        lesson_title VARCHAR(255) NOT NULL,
        difficulty_level INTEGER DEFAULT 1,
        score INTEGER,
        time_spent INTEGER,
        completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create quiz_results table
    await sql`
      CREATE TABLE IF NOT EXISTS quiz_results (
        id SERIAL PRIMARY KEY,
        student_id INTEGER REFERENCES students(id),
        quiz_id VARCHAR(100) NOT NULL,
        score INTEGER NOT NULL,
        total_questions INTEGER NOT NULL,
        answers_correct INTEGER NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create digital_literacy_modules table
    await sql`
      CREATE TABLE IF NOT EXISTS digital_literacy_modules (
        id SERIAL PRIMARY KEY,
        student_id INTEGER REFERENCES students(id),
        module_id VARCHAR(100) NOT NULL,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(50) NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        score INTEGER,
        completed_at TIMESTAMP
      )
    `;

    // Create misinformation_checks table
    await sql`
      CREATE TABLE IF NOT EXISTS misinformation_checks (
        id SERIAL PRIMARY KEY,
        student_id INTEGER REFERENCES students(id),
        url TEXT,
        content TEXT NOT NULL,
        credibility_score INTEGER NOT NULL,
        flags TEXT[],
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    return { success: true };
  } catch (error) {
    console.error("Database initialization error:", error);
    return { success: false, error };
  }
}

// Helper function to get or create a demo student
export async function getDemoStudent() {
  try {
    const result = await sql`
      SELECT * FROM students WHERE email = 'demo@eduguard.com' LIMIT 1
    `;

    if (result.rows.length > 0) {
      return result.rows[0];
    }

    // Create demo student
    const newStudent = await sql`
      INSERT INTO students (name, email, grade_level, digital_literacy_score)
      VALUES ('Demo Student', 'demo@eduguard.com', 'Undergraduate', 65)
      RETURNING *
    `;

    return newStudent.rows[0];
  } catch (error) {
    console.error("Error getting demo student:", error);
    return null;
  }
}
