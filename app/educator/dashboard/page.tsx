"use client";

import { useState } from "react";
import { Card, Button, Badge } from "@/components/UI";
import {
  Upload,
  FileText,
  Video,
  Image,
  Plus,
  Trash2,
  BookOpen,
  Users,
  BarChart3,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface Course {
  id: string;
  title: string;
  description: string;
  files: UploadedFile[];
  category: string;
  difficulty: number;
  createdAt: Date;
}

interface UploadedFile {
  name: string;
  type: string;
  size: string;
}

export default function EducatorDashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: 1,
  });
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
      name: file.name,
      type: file.type.includes("video")
        ? "video"
        : file.type.includes("image")
          ? "image"
          : "document",
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
    }));

    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const createCourse = () => {
    if (!newCourse.title || !newCourse.description) return;

    const course: Course = {
      id: Date.now().toString(),
      ...newCourse,
      files: uploadedFiles,
      createdAt: new Date(),
    };

    setCourses([...courses, course]);
    setNewCourse({ title: "", description: "", category: "", difficulty: 1 });
    setUploadedFiles([]);
    setShowCreateForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Educator Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, {user?.name}!{" "}
            {user?.subject && `Teaching ${user.subject}`}
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          <Plus className="w-5 h-5 mr-2" />
          Create Course
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Courses
            </p>
            <p className="text-2xl font-bold">{courses.length}</p>
          </div>
        </Card>

        <Card className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900 text-green-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Students</p>
            <p className="text-2xl font-bold">0</p>
          </div>
        </Card>

        <Card className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-600">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Avg. Rating
            </p>
            <p className="text-2xl font-bold">-</p>
          </div>
        </Card>

        <Card className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900 text-orange-600">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Uploads
            </p>
            <p className="text-2xl font-bold">
              {courses.reduce((acc, c) => acc + c.files.length, 0)}
            </p>
          </div>
        </Card>
      </div>

      {/* Create Course Form */}
      {showCreateForm && (
        <Card>
          <h2 className="text-xl font-bold mb-4">Create New Course</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Course Title
              </label>
              <input
                type="text"
                value={newCourse.title}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, title: e.target.value })
                }
                placeholder="e.g., Introduction to Machine Learning"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                value={newCourse.description}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, description: e.target.value })
                }
                placeholder="Describe what students will learn..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>
                <select
                  value={newCourse.category}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select category</option>
                  <option value="AI & Machine Learning">
                    AI & Machine Learning
                  </option>
                  <option value="Programming">Programming</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Digital Literacy">Digital Literacy</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Difficulty Level
                </label>
                <select
                  value={newCourse.difficulty}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      difficulty: Number(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value={1}>Beginner</option>
                  <option value={2}>Intermediate</option>
                  <option value={3}>Advanced</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Course Materials
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.jpg,.png"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-sm font-medium mb-1">
                    Click to upload files
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, PPT, MP4, JPG, PNG (Max 50MB)
                  </p>
                </label>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {file.type === "video" ? (
                          <Video className="w-5 h-5 text-purple-600" />
                        ) : file.type === "image" ? (
                          <Image className="w-5 h-5 text-green-600" />
                        ) : (
                          <FileText className="w-5 h-5 text-blue-600" />
                        )}
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-gray-500">{file.size}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setShowCreateForm(false)}
                variant="secondary"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button onClick={createCourse} className="flex-1">
                Create Course
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Course List */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Courses</h2>
        {courses.length === 0 ? (
          <Card className="text-center py-12">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-bold mb-2">No courses yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create your first course to start sharing knowledge
            </p>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Course
            </Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {courses.map((course) => (
              <Card key={course.id}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold">{course.title}</h3>
                  <Badge
                    variant={
                      course.difficulty === 1
                        ? "success"
                        : course.difficulty === 2
                          ? "warning"
                          : "danger"
                    }
                  >
                    Level {course.difficulty}
                  </Badge>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {course.description}
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="info">{course.category}</Badge>
                  <span className="text-sm text-gray-500">
                    {course.files.length} files
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Created {course.createdAt.toLocaleDateString()}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
