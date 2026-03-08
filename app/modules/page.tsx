"use client";

import { useState } from "react";
import { Card, Button, Badge, ProgressBar } from "@/components/UI";
import {
  BookOpen,
  CheckCircle,
  Lock,
  Eye,
  Search,
  AlertCircle,
} from "lucide-react";

interface Module {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  content: string[];
  keyPoints: string[];
}

const modules: Module[] = [
  {
    id: "source-eval",
    title: "Evaluating Source Credibility",
    category: "source-evaluation",
    description:
      "Learn to assess the reliability and trustworthiness of information sources",
    duration: "10 min",
    completed: false,
    locked: false,
    content: [
      "Check the author credentials and expertise",
      "Look for publication date and recent updates",
      "Verify the domain and website credibility (.edu, .gov are often reliable)",
      "Cross-reference with other trusted sources",
      "Examine the references and citations provided",
    ],
    keyPoints: [
      "Always verify the author's credentials",
      "Recent information is often more accurate",
      "Cross-reference multiple sources",
      "Be skeptical of sensational claims",
    ],
  },
  {
    id: "fact-check",
    title: "Fact-Checking Basics",
    category: "fact-checking",
    description:
      "Master the fundamentals of verifying information and debunking false claims",
    duration: "15 min",
    completed: false,
    locked: false,
    content: [
      "Use fact-checking websites (Snopes, FactCheck.org, PolitiFact)",
      "Reverse image search to verify photos",
      "Check primary sources directly",
      "Look for evidence and data supporting claims",
      "Be aware of confirmation bias",
    ],
    keyPoints: [
      "Use multiple fact-checking resources",
      "Verify images with reverse search",
      "Seek primary sources",
      "Watch for emotional manipulation",
    ],
  },
  {
    id: "ai-detection",
    title: "Identifying AI-Generated Content",
    category: "ai-detection",
    description: "Recognize AI-generated text, images, and deepfakes",
    duration: "12 min",
    completed: false,
    locked: false,
    content: [
      "Look for repetitive patterns and unnatural phrasing",
      "Check for inconsistencies in details",
      "Verify with AI detection tools",
      "Examine metadata and source information",
      "Be aware of deepfake indicators (facial inconsistencies, lighting issues)",
    ],
    keyPoints: [
      "AI content often has repetitive patterns",
      "Check for logical inconsistencies",
      "Use specialized detection tools",
      "Verify the source and context",
    ],
  },
  {
    id: "bias-recognition",
    title: "Recognizing Bias & Manipulation",
    category: "source-evaluation",
    description: "Identify biased reporting and manipulative techniques",
    duration: "10 min",
    completed: false,
    locked: true,
    content: [],
    keyPoints: [],
  },
];

export default function ModulesPage() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [moduleCompleted, setModuleCompleted] = useState(false);

  const completedCount = modules.filter((m) => m.completed).length;
  const totalCount = modules.length;
  const progress = (completedCount / totalCount) * 100;

  const startModule = (module: Module) => {
    if (module.locked) return;
    setSelectedModule(module);
    setCurrentStep(0);
    setModuleCompleted(false);
  };

  const nextStep = () => {
    if (selectedModule && currentStep < selectedModule.content.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setModuleCompleted(true);
    }
  };

  const completeModule = () => {
    if (selectedModule) {
      const moduleIndex = modules.findIndex((m) => m.id === selectedModule.id);
      modules[moduleIndex].completed = true;
    }
    setSelectedModule(null);
    setModuleCompleted(false);
  };

  if (selectedModule) {
    if (moduleCompleted) {
      return (
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <CheckCircle className="w-12 h-12" />
            </div>

            <h2 className="text-3xl font-bold mb-2">Module Complete!</h2>
            <p className="text-xl mb-6">
              You've mastered: {selectedModule.title}
            </p>

            <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6 mb-6 text-left">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-primary" />
                Key Takeaways
              </h3>
              <ul className="space-y-2">
                {selectedModule.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => setSelectedModule(null)}
                variant="secondary"
              >
                Back to Modules
              </Button>
              <Button onClick={completeModule}>Mark as Complete</Button>
            </div>
          </Card>
        </div>
      );
    }

    return (
      <div className="max-w-3xl mx-auto">
        <Card>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {selectedModule.title}
              </h2>
              <Badge>{selectedModule.category}</Badge>
            </div>
            <span className="text-sm text-gray-500">
              Step {currentStep + 1} of {selectedModule.content.length}
            </span>
          </div>

          <ProgressBar
            value={currentStep + 1}
            max={selectedModule.content.length}
            className="mb-6"
          />

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-lg p-8 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                {currentStep + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-3">Learning Point</h3>
                <p className="text-lg">{selectedModule.content[currentStep]}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              Quick Example
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {getExample(selectedModule.id, currentStep)}
            </p>
          </div>

          <div className="flex justify-between">
            <Button onClick={() => setSelectedModule(null)} variant="secondary">
              Exit Module
            </Button>
            <Button onClick={nextStep}>
              {currentStep < selectedModule.content.length - 1
                ? "Next"
                : "Complete Module"}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BookOpen className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold">Digital Literacy Modules</h1>
      </div>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-bold">Your Progress</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {completedCount} of {totalCount} modules completed
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {Math.round(progress)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Complete
            </div>
          </div>
        </div>
        <ProgressBar value={progress} />
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {modules.map((module) => (
          <div
            key={module.id}
            onClick={() => !module.locked && startModule(module)}
            className={`${module.locked ? "opacity-60" : "cursor-pointer"}`}
          >
            <Card
              className={`${module.locked ? "" : "hover:shadow-xl"} transition-all h-full`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      module.completed
                        ? "bg-green-100 text-green-600"
                        : module.locked
                          ? "bg-gray-100 text-gray-400"
                          : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {module.completed ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : module.locked ? (
                      <Lock className="w-6 h-6" />
                    ) : (
                      <BookOpen className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{module.title}</h3>
                    <Badge variant={module.completed ? "success" : "info"}>
                      {module.category}
                    </Badge>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {module.description}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Search className="w-4 h-4" />
                  {module.duration}
                </span>
                {module.locked && (
                  <span className="text-sm text-gray-500">
                    Complete previous modules
                  </span>
                )}
                {module.completed && <Badge variant="success">Completed</Badge>}
              </div>
            </Card>
          </div>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900">
        <h3 className="font-bold mb-2">🎯 Why Digital Literacy Matters</h3>
        <p className="text-sm">
          In today's digital age, the ability to critically evaluate information
          is crucial. These modules will help you become a more informed and
          responsible digital citizen, protecting yourself from misinformation
          and making better decisions.
        </p>
      </Card>
    </div>
  );
}

function getExample(moduleId: string, step: number): string {
  const examples: Record<string, string[]> = {
    "source-eval": [
      'Example: A news article from "TotallyRealNews.biz" vs. an article from "Harvard.edu" - which is more credible?',
      "Example: An article published in 2018 about 2024 technology trends might be outdated.",
      'Example: Check if the website has an "About Us" page and contact information.',
      "Example: If only one website reports a major story, it might not be verified yet.",
      "Example: An article about climate change without scientific references should raise concerns.",
    ],
    "fact-check": [
      "Example: Use Snopes.com to verify viral social media claims before sharing.",
      "Example: Upload a suspicious image to Google Images to see where it originally appeared.",
      "Example: Instead of trusting a news report about a study, read the actual study paper.",
      "Example: If a claim seems too shocking to be true, look for supporting data and statistics.",
      "Example: Notice when you immediately believe information that confirms what you already think.",
    ],
    "ai-detection": [
      'Example: AI text often uses phrases like "it\'s worth noting" or "in conclusion" repeatedly.',
      "Example: An AI-generated image of a person might have odd hands or background inconsistencies.",
      "Example: Use tools like GPTZero or AI Content Detector to analyze suspicious text.",
      "Example: Check the EXIF data of images to see if generation tools were used.",
      "Example: In deepfake videos, watch for unnatural blinking, lip-sync issues, or lighting problems.",
    ],
  };

  return (
    examples[moduleId]?.[step] ||
    "Apply these principles when evaluating online content."
  );
}
