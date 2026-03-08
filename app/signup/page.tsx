"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, Button, Badge } from "@/components/UI";
import {
  Shield,
  Mail,
  Lock,
  User,
  BookOpen,
  Upload,
  GraduationCap,
  X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"student" | "educator" | "admin">("student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gradeLevel: "",
    interests: [] as string[],
    subject: "",
    bio: "",
  });
  const [interestInput, setInterestInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const { signup, loading, isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect already logged-in users to their dashboard
      if (user.role === 'educator') {
        router.push('/educator/dashboard');
      } else if (user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, user, router]);

  const interestOptions = [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Cybersecurity",
    "Web Development",
    "Mobile Development",
    "Cloud Computing",
    "Digital Literacy",
    "Programming Basics",
    "Mathematics",
    "Science",
    "Critical Thinking",
  ];

  const gradeLevels = [
    "Elementary (K-5)",
    "Middle School (6-8)",
    "High School (9-12)",
  ];

  const addInterest = (interest: string) => {
    const trimmedInterest = interest.trim();
    if (trimmedInterest && !formData.interests.includes(trimmedInterest)) {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, trimmedInterest],
      }));
      setInterestInput("");
      setShowDropdown(false);
    }
  };

  const removeInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }));
  };

  const handleInterestInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setInterestInput(value);
    setShowDropdown(value.length > 0);
  };

  const handleInterestKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && interestInput.trim()) {
      e.preventDefault();
      addInterest(interestInput);
    }
  };

  const filteredInterests = interestOptions.filter(
    (option) =>
      option.toLowerCase().includes(interestInput.toLowerCase()) &&
      !formData.interests.includes(option),
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNext = () => {
    if (step === 1 && formData.name && formData.email && formData.password) {
      setStep(2);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = await signup({
      ...formData,
      role,
    });

    if (success) {
      // Redirect based on role
      if (role === "educator") {
        router.push("/educator/dashboard");
      } else if (role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/dashboard");
      }
    } else {
      setError("Signup failed. Email may already be registered.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-2">Join EduGuard</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Create your account and start learning
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 1 ? "bg-primary text-white" : "bg-green-500 text-white"
            }`}
          >
            1
          </div>
          <div className="w-16 h-1 bg-gray-300 dark:bg-gray-600"></div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 2
                ? "bg-primary text-white"
                : "bg-gray-300 dark:bg-gray-600"
            }`}
          >
            2
          </div>
        </div>

        <Card>
          {step === 1 ? (
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  I am a...
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole("student")}
                    className={`py-3 px-4 rounded-lg border-2 transition-colors ${
                      role === "student"
                        ? "border-primary bg-blue-50 dark:bg-blue-900 text-primary"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    <GraduationCap className="w-6 h-6 mx-auto mb-1" />
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("educator")}
                    className={`py-3 px-4 rounded-lg border-2 transition-colors ${
                      role === "educator"
                        ? "border-primary bg-blue-50 dark:bg-blue-900 text-primary"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    <BookOpen className="w-6 h-6 mx-auto mb-1" />
                    Educator
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("admin")}
                    className={`py-3 px-4 rounded-lg border-2 transition-colors ${
                      role === "admin"
                        ? "border-primary bg-blue-50 dark:bg-blue-900 text-primary"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    <Shield className="w-6 h-6 mx-auto mb-1" />
                    Admin
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="your.email@example.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <Button type="button" onClick={handleNext} className="w-full">
                Continue
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-6">
              {role === "student" && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Grade Level
                    </label>
                    <select
                      value={formData.gradeLevel}
                      onChange={(e) =>
                        setFormData({ ...formData, gradeLevel: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select your grade level</option>
                      {gradeLevels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Your Interests (Add at least 2)
                    </label>
                    <div className="relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={interestInput}
                        onChange={handleInterestInputChange}
                        onKeyDown={handleInterestKeyDown}
                        onFocus={() => interestInput && setShowDropdown(true)}
                        placeholder="Type an interest (e.g., Artificial Intelligence, Mathematics)..."
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      {showDropdown && filteredInterests.length > 0 && (
                        <div
                          ref={dropdownRef}
                          className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto"
                        >
                          {filteredInterests.map((interest) => (
                            <button
                              key={interest}
                              type="button"
                              onClick={() => addInterest(interest)}
                              className="w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors text-sm"
                            >
                              {interest}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {formData.interests.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {formData.interests.map((interest) => (
                          <Badge
                            key={interest}
                            variant="info"
                            className="flex items-center gap-1 px-3 py-1"
                          >
                            {interest}
                            <button
                              type="button"
                              onClick={() => removeInterest(interest)}
                              className="hover:text-red-600 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      {formData.interests.length} interest
                      {formData.interests.length !== 1 ? "s" : ""} added · Press
                      Enter or select from dropdown
                    </p>
                  </div>
                </>
              )}

              {role === "educator" && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Subject/Expertise
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder="e.g., Computer Science, Mathematics, English"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Bio
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                      }
                      placeholder="Tell us about your teaching experience..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                  </div>
                </>
              )}

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={() => setStep(1)}
                  variant="secondary"
                  className="flex-1"
                  disabled={loading}
                >
                  Back
                </Button>
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </div>
            </form>
          )}

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
