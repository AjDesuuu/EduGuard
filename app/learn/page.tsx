"use client";

import { useState } from "react";
import { Card, Button, Badge } from "@/components/UI";
import Link from "next/link";
import {
  Brain,
  CheckCircle,
  XCircle,
  TrendingUp,
  Lightbulb,
  BookOpen,
  ArrowRight,
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: number;
  explanation: string;
  topic: string; // Added to track question topics
}

const lessons = [
  {
    id: "ml-basics",
    title: "Machine Learning Basics",
    difficulty: 1,
    description: "Introduction to ML concepts and applications",
    duration: "15 min",
  },
  {
    id: "ai-ethics",
    title: "AI Ethics & Bias",
    difficulty: 2,
    description: "Understanding bias in AI systems",
    duration: "20 min",
  },
  {
    id: "deep-learning",
    title: "Deep Learning Fundamentals",
    difficulty: 3,
    description: "Neural networks and advanced concepts",
    duration: "25 min",
  },
];

const questions: Question[] = [
  {
    id: 1,
    question: "What is machine learning?",
    options: [
      "Programming computers to make decisions",
      "A system that learns from data without explicit programming",
      "A type of robot",
      "A computer game",
    ],
    correctAnswer: 1,
    difficulty: 1,
    explanation:
      "Machine learning allows systems to learn and improve from experience without being explicitly programmed.",
    topic: "ml-basics",
  },
  {
    id: 2,
    question: "Which of the following is an example of supervised learning?",
    options: [
      "Clustering customers by behavior",
      "Predicting house prices based on features",
      "Finding patterns in data",
      "Generating new images",
    ],
    correctAnswer: 1,
    difficulty: 2,
    explanation:
      "Supervised learning uses labeled training data to learn the relationship between inputs and outputs.",
    topic: "supervised-learning",
  },
  {
    id: 3,
    question: "What is bias in AI?",
    options: [
      "When AI is too slow",
      "When AI makes errors",
      "When AI systematically favors certain outcomes",
      "When AI is expensive",
    ],
    correctAnswer: 2,
    difficulty: 2,
    explanation:
      "Bias occurs when AI systems systematically favor certain outcomes over others, often reflecting biases in training data.",
    topic: "ai-ethics",
  },
];

export default function LearnPage() {
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [incorrectTopics, setIncorrectTopics] = useState<string[]>([]);

  const startLesson = (lesson: any) => {
    setSelectedLesson(lesson);
    setCurrentQuestion(0);
    setScore(0);
    setQuizComplete(false);
    setShowExplanation(false);
    setSelectedAnswer(null);
    setIncorrectTopics([]);
  };

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect =
      selectedAnswer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    } else {
      // Track incorrect topic
      setIncorrectTopics([
        ...incorrectTopics,
        questions[currentQuestion].topic,
      ]);
    }

    setShowExplanation(true);
  };

  const nextQuestion = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);

      // Save progress to database
      try {
        await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            studentId: 1,
            lessonId: selectedLesson.id,
            lessonTitle: selectedLesson.title,
            difficultyLevel: selectedLesson.difficulty,
            score: Math.round((score / questions.length) * 100),
            timeSpent: 10, // Mock time
          }),
        });
      } catch (error) {
        console.error("Failed to save progress:", error);
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setIncorrectTopics([]);
    setScore(0);
    setQuizComplete(false);
    setShowExplanation(false);
    setSelectedAnswer(null);
  };

  if (!selectedLesson) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Brain className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">AI Adaptive Learning</h1>
        </div>

        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold mb-2">How it works</h3>
              <p className="text-sm">
                Our AI engine adapts to your performance. Complete lessons and
                quizzes, and the system will recommend content at the right
                difficulty level for you.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-4">
          {lessons.map((lesson) => (
            <Card key={lesson.id} className="hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold">{lesson.title}</h3>
                <Badge
                  variant={
                    lesson.difficulty === 1
                      ? "success"
                      : lesson.difficulty === 2
                        ? "warning"
                        : "danger"
                  }
                >
                  Level {lesson.difficulty}
                </Badge>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {lesson.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{lesson.duration}</span>
                <Button onClick={() => startLesson(lesson)}>
                  Start Lesson
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Card>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            Recommended for You
          </h2>
          <div className="space-y-3">
            <RecommendationItem
              title="AI Ethics & Bias"
              reason="Based on your interest in machine learning"
              difficulty={2}
            />
            <RecommendationItem
              title="Source Verification Techniques"
              reason="Improve your digital literacy score"
              difficulty={1}
            />
          </div>
        </Card>
      </div>
    );
  }

  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 70;

    // Get recommended modules based on incorrect topics
    const recommendedModules = getRecommendedModules(incorrectTopics);

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="text-center">
          <div
            className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
              passed
                ? "bg-green-100 text-green-600"
                : "bg-orange-100 text-orange-600"
            }`}
          >
            {passed ? (
              <CheckCircle className="w-12 h-12" />
            ) : (
              <XCircle className="w-12 h-12" />
            )}
          </div>

          <h2 className="text-3xl font-bold mb-2">
            {passed ? "Great Job!" : "Keep Practicing!"}
          </h2>
          <p className="text-xl mb-6">
            You scored {score} out of {questions.length} ({percentage}%)
          </p>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <h3 className="font-bold mb-2">AI Recommendation</h3>
            <p className="text-sm">
              {passed
                ? "Excellent work! You're ready for more advanced topics. Try the next difficulty level."
                : "Review the material and try again. Focus on understanding the explanations for each question."}
            </p>
          </div>

          <div className="flex gap-3 justify-center">
            <Button onClick={restartQuiz} variant="secondary">
              Retry Quiz
            </Button>
            <Button onClick={() => setSelectedLesson(null)}>
              Back to Lessons
            </Button>
          </div>
        </Card>

        {recommendedModules.length > 0 && (
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900 dark:to-blue-900">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Recommended Modules for You
            </h3>
            <p className="text-sm mb-4 text-gray-600 dark:text-gray-300">
              Based on your quiz performance, we recommend these digital
              literacy modules to strengthen your skills:
            </p>
            <div className="space-y-3">
              {recommendedModules.map((module, index) => (
                <Link key={index} href="/modules">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-lg transition-all cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold mb-1">{module.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {module.reason}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        )}
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{selectedLesson.title}</h2>
          <Badge>
            Question {currentQuestion + 1}/{questions.length}
          </Badge>
        </div>

        <div className="mb-6">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <h3 className="text-xl mb-6">{question.question}</h3>

        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showExplanation}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                selectedAnswer === index
                  ? showExplanation
                    ? isCorrect
                      ? "border-green-500 bg-green-50 dark:bg-green-900"
                      : "border-red-500 bg-red-50 dark:bg-red-900"
                    : "border-primary bg-blue-50 dark:bg-blue-900"
                  : "border-gray-300 hover:border-gray-400 dark:border-gray-600"
              } ${showExplanation && index === question.correctAnswer ? "border-green-500 bg-green-50 dark:bg-green-900" : ""}`}
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span>{option}</span>
                {showExplanation && index === question.correctAnswer && (
                  <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                )}
                {showExplanation && selectedAnswer === index && !isCorrect && (
                  <XCircle className="w-5 h-5 text-red-600 ml-auto" />
                )}
              </div>
            </button>
          ))}
        </div>

        {showExplanation && (
          <div
            className={`p-4 rounded-lg mb-6 ${
              isCorrect
                ? "bg-green-50 dark:bg-green-900"
                : "bg-orange-50 dark:bg-orange-900"
            }`}
          >
            <h4 className="font-bold mb-2">
              {isCorrect ? "✓ Correct!" : "✗ Not quite"}
            </h4>
            <p className="text-sm">{question.explanation}</p>
          </div>
        )}

        <div className="flex justify-between">
          <Button onClick={() => setSelectedLesson(null)} variant="secondary">
            Exit Lesson
          </Button>

          {!showExplanation ? (
            <Button onClick={submitAnswer} disabled={selectedAnswer === null}>
              Submit Answer
            </Button>
          ) : (
            <Button onClick={nextQuestion}>
              {currentQuestion < questions.length - 1
                ? "Next Question"
                : "Finish Quiz"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

function RecommendationItem({ title, reason, difficulty }: any) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{reason}</p>
      </div>
      <Badge variant={difficulty === 1 ? "success" : "warning"}>
        Level {difficulty}
      </Badge>
    </div>
  );
}

// Helper function to recommend modules based on weak topics
function getRecommendedModules(incorrectTopics: string[]) {
  const moduleRecommendations: Record<
    string,
    { title: string; reason: string }
  > = {
    "supervised-learning": {
      title: "Evaluating Source Credibility",
      reason:
        "Strengthen your ability to verify supervised learning concepts and validate data sources",
    },
    "ai-ethics": {
      title: "Recognizing Bias & Manipulation",
      reason:
        "Learn to identify bias in AI systems and understand ethical implications",
    },
    "ml-basics": {
      title: "Fact-Checking Basics",
      reason:
        "Build foundational skills in verifying machine learning claims and concepts",
    },
  };

  const recommended = incorrectTopics
    .filter((topic, index, self) => self.indexOf(topic) === index) // Remove duplicates
    .map((topic) => moduleRecommendations[topic])
    .filter(Boolean); // Remove undefined entries

  // Always add a general recommendation
  if (recommended.length > 0) {
    recommended.push({
      title: "Identifying AI-Generated Content",
      reason:
        "Essential skills for understanding AI outputs and their limitations",
    });
  }

  return recommended;
}
