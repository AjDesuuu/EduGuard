"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "educator" | "admin";
  gradeLevel?: string;
  interests?: string[];
  subject?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<boolean>;
  logout: () => void;
  signup: (userData: any) => Promise<boolean>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo user for easy demo access - no login required
const DEMO_USER: User = {
  id: "1",
  name: "Emma Rodriguez",
  email: "emma@student.com",
  role: "student",
  gradeLevel: "High School (9-12)",
  interests: ["Artificial Intelligence", "Cybersecurity", "Data Science"],
};

export function AuthProvider({ children }: { children: ReactNode }) {
  // Auto-login as demo user for demo mode
  const [user, setUser] = useState<User | null>(DEMO_USER);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Always ensure demo user is set for demo mode
    if (!user) {
      setUser(DEMO_USER);
    }
  }, [user]);

  const login = async (email: string, password: string, role: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem("eduguard_user", JSON.stringify(data.user));
        setLoading(false);
        return true;
      } else {
        setLoading(false);
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("eduguard_user");
  };

  const signup = async (userData: any) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem("eduguard_user", JSON.stringify(data.user));
        setLoading(false);
        return true;
      } else {
        setLoading(false);
        return false;
      }
    } catch (error) {
      console.error("Signup error:", error);
      setLoading(false);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, signup, isAuthenticated: !!user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
