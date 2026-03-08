export interface Student {
  id: string;
  name: string;
  email: string;
  gradeLevel: string;
  digitalLiteracyScore: number;
  createdAt: Date;
}

export interface LearningProgress {
  id: string;
  studentId: string;
  lessonId: string;
  lessonTitle: string;
  difficultyLevel: number;
  score: number;
  timeSpent: number;
  completedAt: Date;
}

export interface QuizResult {
  id: string;
  studentId: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  answersCorrect: number;
  timestamp: Date;
}

export interface DigitalLiteracyModule {
  id: string;
  title: string;
  description: string;
  category: "source-evaluation" | "fact-checking" | "ai-detection";
  completed: boolean;
  score?: number;
}

export interface MisinformationCheck {
  id: string;
  studentId: string;
  url: string;
  content: string;
  credibilityScore: number;
  flags: string[];
  timestamp: Date;
}

export interface DashboardStats {
  totalLessons: number;
  completedLessons: number;
  averageScore: number;
  digitalLiteracyScore: number;
  totalTimeSpent: number;
  recentActivity: LearningProgress[];
  performanceTrend: { date: string; score: number }[];
}
