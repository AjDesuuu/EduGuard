"use client";

import { useEffect, useState } from "react";
import { Card, Badge, ProgressBar, Button } from "@/components/UI";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import {
  TrendingUp,
  Award,
  Clock,
  Target,
  BookOpen,
  AlertTriangle,
  Download,
  CheckCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      fetchProgress();
    }
  }, [user]);

  const fetchProgress = async () => {
    try {
      const response = await fetch(`/api/user/${user?.id}`);
      const data = await response.json();
      setStats(data.stats);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch progress:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Progress Dashboard</h1>
        <Badge variant="success">Active</Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<BookOpen className="w-6 h-6" />}
          title="Lessons Completed"
          value={stats?.completedLessons || 0}
          total={stats?.totalLessons || 0}
          color="text-blue-600"
        />
        <StatCard
          icon={<Target className="w-6 h-6" />}
          title="Average Score"
          value={`${stats?.averageScore || 0}%`}
          color="text-green-600"
        />
        <StatCard
          icon={<Award className="w-6 h-6" />}
          title="Modules"
          value={`${stats?.digitalLiteracyScore || 0}%`}
          color="text-purple-600"
          description="Learn from verified materials by our educators"
        />
        <StatCard
          icon={<Clock className="w-6 h-6" />}
          title="Time Spent"
          value={`${Math.round((stats?.totalTimeSpent || 0) / 60)}h`}
          color="text-orange-600"
        />
      </div>

      {/* Performance Trend */}
      <Card>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          Performance Trend
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={stats?.performanceTrend || mockStats.performanceTrend}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: "#3B82F6" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Completed Pathways - Certificates Available */}
      <Card>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Award className="w-6 h-6 text-primary" />
          Your Certificates
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Generate certificates for your completed learning pathways
        </p>
        <div className="space-y-3">
          {/* Example completed pathways - in production, this would come from API */}
          <CompletedPathwayItem
            title="AI & ML Fundamentals"
            completedDate="March 15, 2026"
            score={85}
            pathwayId="ai-fundamentals"
          />
          <CompletedPathwayItem
            title="Digital Safety & Misinformation"
            completedDate="April 2, 2026"
            score={92}
            pathwayId="digital-safety"
          />
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Complete more pathways in the{" "}
              <Link
                href="/learn"
                className="text-primary hover:underline font-medium"
              >
                Learning page
              </Link>{" "}
              to earn more certificates
            </p>
          </div>
        </div>
      </Card>

      {/* Progress Overview */}
      <Card>
        <h2 className="text-xl font-bold mb-4">Learning Progress</h2>
        <div className="space-y-4">
          <ProgressItem
            title="AI & Machine Learning"
            progress={75}
            color="bg-blue-600"
          />
          <ProgressItem
            title="Module Completion"
            progress={stats?.digitalLiteracyScore || 65}
            color="bg-purple-600"
          />
          <ProgressItem
            title="Source Verification"
            progress={58}
            color="bg-green-600"
          />
          <ProgressItem
            title="Critical Thinking"
            progress={82}
            color="bg-orange-600"
          />
        </div>
      </Card>

      {/* Recent Activity */}
      <Card>
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {(stats?.recentActivity || mockRecentActivity).map(
            (activity: any, index: number) => (
              <ActivityItem
                key={index}
                title={activity.lesson_title || activity.lessonTitle}
                score={activity.score}
                date={new Date(
                  activity.completed_at || activity.completedAt,
                ).toLocaleDateString()}
              />
            ),
          )}
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-primary" />
          AI Recommendations
        </h2>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>
              Focus on source verification - your score is below average
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Complete 2 more modules to reach 75% proficiency</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>
              Great progress in critical thinking! Keep up the momentum
            </span>
          </li>
        </ul>
      </Card>
    </div>
  );
}

function StatCard({ icon, title, value, total, color, description }: any) {
  return (
    <Card className="flex items-start gap-4">
      <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-700 ${color}`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold">
          {value}
          {total && <span className="text-lg text-gray-500">/{total}</span>}
        </p>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {description}
          </p>
        )}
      </div>
    </Card>
  );
}

function ProgressItem({ title, progress, color }: any) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="font-medium">{title}</span>
        <span className="text-gray-600 dark:text-gray-400">{progress}%</span>
      </div>
      <ProgressBar value={progress} color={color} />
    </div>
  );
}

function ActivityItem({ title, score, date }: any) {
  const scoreColor =
    score >= 80 ? "success" : score >= 60 ? "warning" : "danger";

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{date}</p>
      </div>
      <Badge variant={scoreColor}>{score}%</Badge>
    </div>
  );
}

function CompletedPathwayItem({ title, completedDate, score, pathwayId }: any) {
  const handleGenerateCertificate = () => {
    // In production, this would navigate to the certificate view or trigger certificate generation
    window.location.href = `/learn?generateCert=${pathwayId}`;
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-800">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Completed: {completedDate}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="success">Score: {score}%</Badge>
          </div>
        </div>
      </div>
      <Button
        onClick={handleGenerateCertificate}
        className="flex items-center gap-2"
      >
        <Download className="w-4 h-4" />
        Get Certificate
      </Button>
    </div>
  );
}

// Mock data for fallback
const mockStats = {
  totalLessons: 12,
  completedLessons: 8,
  averageScore: 78,
  digitalLiteracyScore: 65,
  totalTimeSpent: 420,
  performanceTrend: [
    { date: "03/01", score: 65 },
    { date: "03/02", score: 72 },
    { date: "03/03", score: 68 },
    { date: "03/04", score: 75 },
    { date: "03/05", score: 82 },
    { date: "03/06", score: 78 },
    { date: "03/07", score: 85 },
  ],
};

const mockRecentActivity = [
  {
    lessonTitle: "AI Ethics & Bias Detection",
    score: 88,
    completedAt: "2024-03-07",
  },
  {
    lessonTitle: "Fact-Checking Techniques",
    score: 75,
    completedAt: "2024-03-06",
  },
  {
    lessonTitle: "Source Credibility Analysis",
    score: 82,
    completedAt: "2024-03-05",
  },
  {
    lessonTitle: "Machine Learning Basics",
    score: 91,
    completedAt: "2024-03-04",
  },
];
