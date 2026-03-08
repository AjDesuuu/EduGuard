"use client";

import { Card, Badge } from "@/components/UI";
import {
  Users,
  BookOpen,
  Shield,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminDashboard() {
  const { user } = useAuth();

  const stats = [
    {
      label: "Total Users",
      value: "1,234",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900",
    },
    {
      label: "Active Courses",
      value: "89",
      icon: BookOpen,
      color: "text-green-600",
      bg: "bg-green-100 dark:bg-green-900",
    },
    {
      label: "Educators",
      value: "45",
      icon: Shield,
      color: "text-purple-600",
      bg: "bg-purple-100 dark:bg-purple-900",
    },
    {
      label: "Completion Rate",
      value: "78%",
      icon: TrendingUp,
      color: "text-orange-600",
      bg: "bg-orange-100 dark:bg-orange-900",
    },
  ];

  const recentActivity = [
    {
      user: "John Doe",
      action: "Completed AI Ethics course",
      time: "2 hours ago",
      status: "success",
    },
    {
      user: "Jane Smith",
      action: "Uploaded new course material",
      time: "4 hours ago",
      status: "info",
    },
    {
      user: "Mike Johnson",
      action: "Flagged content for review",
      time: "6 hours ago",
      status: "warning",
    },
    {
      user: "Sarah Williams",
      action: "Achieved 90% literacy score",
      time: "1 day ago",
      status: "success",
    },
  ];

  const pendingReviews = [
    {
      title: "Advanced Machine Learning",
      educator: "Prof. Anderson",
      category: "AI & ML",
      submitted: "2 days ago",
    },
    {
      title: "Web Security Fundamentals",
      educator: "Dr. Martinez",
      category: "Cybersecurity",
      submitted: "3 days ago",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back, {user?.name}! Here's what's happening on the platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="flex items-start gap-4">
            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Pending Reviews */}
      <Card>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-orange-600" />
          Pending Course Reviews
        </h2>
        {pendingReviews.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-center py-8">
            No pending reviews at this time
          </p>
        ) : (
          <div className="space-y-3">
            {pendingReviews.map((review, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold mb-1">{review.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    By {review.educator} • {review.category}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Submitted {review.submitted}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                    Approve
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Recent Activity */}
      <Card>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          Recent Platform Activity
        </h2>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div
                className={`mt-1 ${
                  activity.status === "success"
                    ? "text-green-600"
                    : activity.status === "warning"
                      ? "text-orange-600"
                      : "text-blue-600"
                }`}
              >
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{activity.user}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {activity.action}
                </p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* System Health */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6 text-green-600" />
          System Status
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium">Database</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Operational
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium">AI Engine</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Operational
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium">File Storage</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Operational
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
