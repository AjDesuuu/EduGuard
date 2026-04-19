"use client";

import { useState, useEffect } from "react";
import { Card, Button, Badge, ProgressBar } from "@/components/UI";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Brain,
  CheckCircle,
  XCircle,
  TrendingUp,
  Lightbulb,
  BookOpen,
  ArrowRight,
  Zap,
  Map,
  Target,
  Briefcase,
  Clock,
  ChevronRight,
  RotateCcw,
  Award,
  Download,
  X,
} from "lucide-react";

// Career Paths
interface CareerPath {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  pathwayIds: string[];
}

const careerPaths: CareerPath[] = [
  {
    id: "ai-engineer",
    title: "AI / ML Engineer",
    icon: <Brain className="w-6 h-6" />,
    description: "Build intelligent systems and machine learning models",
    color: "border-purple-500 bg-purple-50 dark:bg-purple-900/30",
    pathwayIds: ["ai-fundamentals", "data-literacy", "ethics-pathway"],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Analyst",
    icon: <Target className="w-6 h-6" />,
    description: "Protect systems and detect digital threats",
    color: "border-red-500 bg-red-50 dark:bg-red-900/30",
    pathwayIds: ["digital-safety", "data-literacy", "ethics-pathway"],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    icon: <TrendingUp className="w-6 h-6" />,
    description: "Analyze data and extract meaningful insights",
    color: "border-green-500 bg-green-50 dark:bg-green-900/30",
    pathwayIds: ["data-literacy", "ai-fundamentals", "ethics-pathway"],
  },
  {
    id: "digital-journalist",
    title: "Digital Journalist",
    icon: <BookOpen className="w-6 h-6" />,
    description: "Report facts and verify information in the digital age",
    color: "border-blue-500 bg-blue-50 dark:bg-blue-900/30",
    pathwayIds: ["digital-safety", "ethics-pathway", "data-literacy"],
  },
];

// Structured Learning Pathways
interface Pathway {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  difficulty: number;
  description: string;
  duration: string;
  questions: Question[];
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: number;
  explanation: string;
  topic: string;
}

const pathways: Pathway[] = [
  {
    id: "ai-fundamentals",
    title: "AI & Machine Learning Fundamentals",
    description:
      "Master the core concepts of artificial intelligence and machine learning from basics to advanced topics",
    lessons: [
      {
        id: "ml-basics",
        title: "What is Machine Learning?",
        difficulty: 1,
        description:
          "Introduction to ML concepts, types of learning, and real-world applications",
        duration: "15 min",
        questions: [
          {
            id: 1,
            question: "What is machine learning?",
            options: [
              "Programming computers with specific instructions for every task",
              "A system that learns from data without explicit programming",
              "A type of physical robot",
              "A computer game genre",
            ],
            correctAnswer: 1,
            difficulty: 1,
            explanation:
              "Machine learning allows systems to learn and improve from experience without being explicitly programmed. Instead of writing rules, you feed data and the system discovers patterns.",
            topic: "ml-basics",
          },
          {
            id: 2,
            question:
              "Which of these is an example of machine learning in daily life?",
            options: [
              "A calculator performing arithmetic",
              "Netflix recommending shows based on your watch history",
              "A printer printing a document",
              "Turning on a light switch",
            ],
            correctAnswer: 1,
            difficulty: 1,
            explanation:
              "Netflix uses machine learning to analyze your viewing patterns and recommend content you are likely to enjoy. This is a real-world application of recommendation systems.",
            topic: "ml-basics",
          },
          {
            id: 3,
            question: "What does a machine learning model need to learn?",
            options: [
              "Only electricity",
              "Data - the more quality data, the better it learns",
              "A human to supervise every decision",
              "An internet connection at all times",
            ],
            correctAnswer: 1,
            difficulty: 1,
            explanation:
              "ML models learn from data. The quality and quantity of training data directly affects how well the model performs. This is why data collection and preparation is so important.",
            topic: "ml-basics",
          },
        ],
      },
      {
        id: "supervised-learning",
        title: "Supervised vs Unsupervised Learning",
        difficulty: 2,
        description:
          "Understand the key types of machine learning and when to use each",
        duration: "20 min",
        questions: [
          {
            id: 4,
            question:
              "Which of the following is an example of supervised learning?",
            options: [
              "Grouping customers by shopping behavior",
              "Predicting house prices using labeled historical data",
              "Finding hidden patterns in unlabeled data",
              "Generating new images from noise",
            ],
            correctAnswer: 1,
            difficulty: 2,
            explanation:
              "Supervised learning uses labeled training data (e.g., houses with known prices) to learn the relationship between inputs and outputs. The model is supervised because it learns from correct answers.",
            topic: "supervised-learning",
          },
          {
            id: 5,
            question: "What makes unsupervised learning different?",
            options: [
              "It is faster than supervised learning",
              "It works without labeled data and finds hidden patterns",
              "It requires more computing power",
              "It only works with images",
            ],
            correctAnswer: 1,
            difficulty: 2,
            explanation:
              "Unsupervised learning discovers hidden patterns in data without pre-existing labels. Think of it as letting the algorithm find its own structure - like grouping similar customers without telling it what the groups should be.",
            topic: "supervised-learning",
          },
        ],
      },
      {
        id: "ai-ethics",
        title: "AI Ethics & Bias Detection",
        difficulty: 2,
        description:
          "Learn to identify bias in AI systems and understand ethical implications",
        duration: "20 min",
        questions: [
          {
            id: 6,
            question: "What is bias in AI?",
            options: [
              "When AI runs too slowly",
              "When AI makes random errors",
              "When AI systematically favors certain outcomes over others",
              "When AI is too expensive to use",
            ],
            correctAnswer: 2,
            difficulty: 2,
            explanation:
              "AI bias occurs when a system systematically produces unfair results. This often happens because training data reflects existing societal biases. For example, a hiring AI trained on past data might discriminate against certain groups.",
            topic: "ai-ethics",
          },
          {
            id: 7,
            question:
              "A facial recognition system works well for light-skinned people but poorly for dark-skinned people. What likely caused this?",
            options: [
              "A bug in the code",
              "Training data that was not diverse or representative",
              "The camera hardware",
              "Dark skin is harder for all cameras",
            ],
            correctAnswer: 1,
            difficulty: 2,
            explanation:
              "This is a real-world example of data bias. If training data predominantly contains light-skinned faces, the model will not learn to recognize darker-skinned faces well. This shows why diverse, representative datasets are critical.",
            topic: "ai-ethics",
          },
        ],
      },
      {
        id: "deep-learning",
        title: "Deep Learning & Neural Networks",
        difficulty: 3,
        description:
          "Explore how neural networks work and power modern AI systems",
        duration: "25 min",
        questions: [
          {
            id: 8,
            question: "What is a neural network inspired by?",
            options: [
              "Computer circuits",
              "The human brain's network of neurons",
              "The internet's structure",
              "Social media networks",
            ],
            correctAnswer: 1,
            difficulty: 3,
            explanation:
              "Neural networks are inspired by biological neurons in the human brain. They consist of interconnected nodes (artificial neurons) organized in layers that process information and learn patterns from data.",
            topic: "deep-learning",
          },
          {
            id: 9,
            question: "Why is deep learning called 'deep'?",
            options: [
              "Because it requires deep thinking by programmers",
              "Because it uses many hidden layers in neural networks",
              "Because it processes data deeply underground",
              "Because it was invented by someone named Deep",
            ],
            correctAnswer: 1,
            difficulty: 3,
            explanation:
              "Deep learning is called deep because it uses neural networks with many hidden layers. These extra layers allow the network to learn increasingly abstract and complex features from raw data.",
            topic: "deep-learning",
          },
        ],
      },
    ],
  },
  {
    id: "digital-safety",
    title: "Digital Safety & Misinformation",
    description:
      "Learn to navigate the digital world safely by identifying misinformation, fake news, and online threats",
    lessons: [
      {
        id: "misinfo-basics",
        title: "Understanding Misinformation",
        difficulty: 1,
        description:
          "Learn what misinformation is and why it spreads so quickly online",
        duration: "15 min",
        questions: [
          {
            id: 10,
            question:
              "What is the difference between misinformation and disinformation?",
            options: [
              "They mean the same thing",
              "Misinformation is unintentionally false; disinformation is deliberately false",
              "Misinformation is online; disinformation is offline",
              "Misinformation is harmless; disinformation is not",
            ],
            correctAnswer: 1,
            difficulty: 1,
            explanation:
              "Misinformation is false information shared without intent to deceive (e.g., sharing an outdated statistic). Disinformation is deliberately created and spread to mislead people. Understanding this distinction helps evaluate intent.",
            topic: "misinfo-basics",
          },
          {
            id: 11,
            question:
              "Why does misinformation spread so quickly on social media?",
            options: [
              "Social media is poorly designed",
              "Emotional and sensational content gets more engagement and shares",
              "People are not intelligent enough",
              "Governments promote it",
            ],
            correctAnswer: 1,
            difficulty: 1,
            explanation:
              "Social media algorithms prioritize engagement. Emotional, surprising, or outrage-inducing content gets more clicks and shares, regardless of accuracy. This creates a perfect environment for misinformation to go viral.",
            topic: "misinfo-basics",
          },
        ],
      },
      {
        id: "source-verification",
        title: "Source Verification Techniques",
        difficulty: 1,
        description:
          "Master the CRAAP test and other methods to verify online sources",
        duration: "15 min",
        questions: [
          {
            id: 12,
            question:
              "You see a health article on naturalcures4u.biz. What should you check FIRST?",
            options: [
              "How many likes it has",
              "The domain, author credentials, and whether medical sources are cited",
              "Whether the page looks professional",
              "If your friends shared it",
            ],
            correctAnswer: 1,
            difficulty: 1,
            explanation:
              "Always check the domain (.edu, .gov are more reliable), author credentials, and citations. A professional-looking site can still spread misinformation. The CRAAP test (Currency, Relevance, Authority, Accuracy, Purpose) is a great framework.",
            topic: "source-verification",
          },
          {
            id: 13,
            question:
              "Which domain is generally most trustworthy for academic information?",
            options: [".com", ".biz", ".edu", ".info"],
            correctAnswer: 2,
            difficulty: 1,
            explanation:
              ".edu domains are reserved for accredited educational institutions, making them generally more trustworthy for academic information. However, always evaluate the specific content - even .edu sites can have opinion pieces.",
            topic: "source-verification",
          },
        ],
      },
      {
        id: "deepfake-detection",
        title: "Detecting Deepfakes & AI Content",
        difficulty: 2,
        description:
          "Identify AI-generated text, images, and videos in the real world",
        duration: "20 min",
        questions: [
          {
            id: 14,
            question: "Which is a common sign of a deepfake video?",
            options: [
              "The video is in 4K resolution",
              "Unnatural blinking, lip-sync issues, or inconsistent lighting",
              "The video has background music",
              "The person speaks clearly",
            ],
            correctAnswer: 1,
            difficulty: 2,
            explanation:
              "Deepfake videos often have subtle artifacts: unnatural blinking patterns, slight lip-sync mismatches, inconsistent lighting/shadows on the face, and blurry edges around the face. As technology improves, these become harder to spot.",
            topic: "deepfake-detection",
          },
          {
            id: 15,
            question:
              "What can you do when you suspect an image is AI-generated?",
            options: [
              "Nothing - it is impossible to tell",
              "Use reverse image search and AI detection tools to investigate",
              "Ask the person who shared it",
              "Check if it has many likes",
            ],
            correctAnswer: 1,
            difficulty: 2,
            explanation:
              "Reverse image search (Google Images, TinEye) can reveal if an image appears elsewhere or was manipulated. AI detection tools can analyze artifacts. Look for AI-generated tells: extra fingers, text errors, blurry backgrounds.",
            topic: "deepfake-detection",
          },
        ],
      },
    ],
  },
  {
    id: "data-literacy",
    title: "Data Literacy & Critical Thinking",
    description:
      "Develop skills to interpret data, statistics, and research claims critically",
    lessons: [
      {
        id: "reading-data",
        title: "Reading Data & Statistics",
        difficulty: 1,
        description:
          "Learn to interpret charts, graphs, and statistical claims accurately",
        duration: "15 min",
        questions: [
          {
            id: 16,
            question:
              "A news headline says 'Crime up 200%!' but the actual numbers went from 1 to 3 incidents. What is the problem?",
            options: [
              "The math is wrong",
              "Percentages can be misleading with small sample sizes",
              "Crime statistics are always unreliable",
              "Nothing - 200% is accurate",
            ],
            correctAnswer: 1,
            difficulty: 1,
            explanation:
              "While mathematically correct (1 to 3 is a 200% increase), using percentages with very small numbers is misleading. Going from 1 to 3 incidents is very different from 1,000 to 3,000. Always look at absolute numbers alongside percentages.",
            topic: "reading-data",
          },
          {
            id: 17,
            question:
              "A graph showing sales growth starts its Y-axis at 95 instead of 0. What effect does this have?",
            options: [
              "It makes the graph more accurate",
              "It exaggerates small differences to look like dramatic changes",
              "It saves space on the page",
              "It has no effect",
            ],
            correctAnswer: 1,
            difficulty: 1,
            explanation:
              "Truncating the Y-axis (not starting at 0) is a common visual manipulation technique. A 2% change can look like a 50% change. Always check the axis scales when evaluating charts and graphs.",
            topic: "reading-data",
          },
        ],
      },
      {
        id: "research-evaluation",
        title: "Evaluating Research Claims",
        difficulty: 2,
        description:
          "Distinguish between correlation and causation, spot flawed research",
        duration: "20 min",
        questions: [
          {
            id: 18,
            question:
              "A study found that ice cream sales and drowning deaths both increase in summer. Therefore ice cream causes drowning. What is the logical error?",
            options: [
              "The study is fake",
              "Confusing correlation with causation - both are caused by hot weather",
              "Ice cream is dangerous",
              "The sample size is too small",
            ],
            correctAnswer: 1,
            difficulty: 2,
            explanation:
              "This is a classic correlation vs. causation error. Both ice cream sales and drowning increase in summer because of hot weather (a confounding variable), not because one causes the other. Always ask: could a third factor explain both?",
            topic: "research-evaluation",
          },
          {
            id: 19,
            question:
              "A supplement company's own study says their product 'boosts energy by 300%'. What should you be skeptical about?",
            options: [
              "Energy cannot be measured",
              "The company has a financial conflict of interest in the results",
              "300% is too low",
              "Studies are always reliable",
            ],
            correctAnswer: 1,
            difficulty: 2,
            explanation:
              "When a company funds and publishes its own research about its own product, there is an inherent conflict of interest. Look for independent, peer-reviewed studies. Check: Who funded it? Was it peer-reviewed? Can others replicate it?",
            topic: "research-evaluation",
          },
        ],
      },
    ],
  },
  {
    id: "ethics-pathway",
    title: "Digital Ethics & Responsibility",
    description:
      "Understand your ethical responsibilities as a digital citizen and future tech professional",
    lessons: [
      {
        id: "digital-footprint",
        title: "Your Digital Footprint",
        difficulty: 1,
        description:
          "Understand how your online actions create a permanent record",
        duration: "12 min",
        questions: [
          {
            id: 20,
            question: "What is a digital footprint?",
            options: [
              "The amount of storage your files take up",
              "The trail of data you leave behind through online activities",
              "Your computer's processing speed",
              "The size of your social media following",
            ],
            correctAnswer: 1,
            difficulty: 1,
            explanation:
              "Your digital footprint is everything you leave behind online: posts, searches, purchases, location data, and more. Even deleted content may persist on servers. Future employers, schools, and others can discover this information.",
            topic: "digital-footprint",
          },
        ],
      },
      {
        id: "responsible-sharing",
        title: "Responsible Information Sharing",
        difficulty: 1,
        description:
          "Learn when and how to share information responsibly online",
        duration: "12 min",
        questions: [
          {
            id: 21,
            question:
              "Before sharing a shocking news article on social media, what should you do?",
            options: [
              "Share it immediately so others know",
              "Verify it with multiple reliable sources first",
              "Add your own opinion and share",
              "Only share if it has many likes",
            ],
            correctAnswer: 1,
            difficulty: 1,
            explanation:
              "Always verify before sharing. The SIFT method works well: Stop, Investigate the source, Find better coverage, and Trace claims to their origin. Sharing misinformation - even unintentionally - contributes to its spread.",
            topic: "responsible-sharing",
          },
        ],
      },
    ],
  },
];

export default function LearnPage() {
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [selectedPathway, setSelectedPathway] = useState<Pathway | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [learningMode, setLearningMode] = useState<"guided" | "quick" | null>(
    null,
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [incorrectTopics, setIncorrectTopics] = useState<string[]>([]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [showCertificate, setShowCertificate] = useState(false);

  // Auto-open certificate from dashboard link
  useEffect(() => {
    const certPathwayId = searchParams.get("generateCert");
    if (certPathwayId && user) {
      const pathway = pathways.find((p) => p.id === certPathwayId);
      if (pathway) {
        setSelectedPathway(pathway);
        // Set a mock lesson to satisfy the certificate requirements
        setSelectedLesson(pathway.lessons[0]);
        setShowCertificate(true);
      }
    }
  }, [searchParams, user]);

  const activePathways = selectedCareer
    ? pathways.filter((p) =>
        careerPaths
          .find((c) => c.id === selectedCareer)
          ?.pathwayIds.includes(p.id),
      )
    : pathways;

  const startLesson = (lesson: Lesson, mode: "guided" | "quick") => {
    setSelectedLesson(lesson);
    setLearningMode(mode);
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
    if (selectedAnswer === null || !selectedLesson) return;
    const q = selectedLesson.questions[currentQuestion];
    const isCorrect = selectedAnswer === q.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    } else {
      setIncorrectTopics([...incorrectTopics, q.topic]);
    }
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (!selectedLesson) return;
    if (currentQuestion < selectedLesson.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
      if (!completedLessons.includes(selectedLesson.id)) {
        setCompletedLessons([...completedLessons, selectedLesson.id]);
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

  // Certificate Modal
  if (showCertificate && selectedPathway && selectedLesson && user) {
    const today = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    // Generate unique certificate ID
    const certificateId = `EDG-${user.id}-${selectedPathway.id.toUpperCase()}-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}${String(new Date().getDate()).padStart(2, "0")}`;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-auto relative">
          <button
            onClick={() => setShowCertificate(false)}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8 md:p-12">
            {/* Certificate Content */}
            <div className="border-8 border-double border-primary rounded-lg p-8 md:p-12 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-900/20 dark:via-gray-800 dark:to-purple-900/20">
              <div className="text-center mb-8">
                <Award className="w-20 h-20 mx-auto text-primary mb-4" />
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  Certificate of Achievement
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This is to certify that
                </p>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white border-b-2 border-primary inline-block pb-2">
                  {user.name}
                </h2>
              </div>

              <div className="text-center mb-8">
                <p className="text-lg mb-2">
                  has successfully completed the learning pathway
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  {selectedPathway.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {selectedPathway.description}
                </p>
                <p className="text-sm">
                  with a score of{" "}
                  <span className="font-bold text-primary">
                    {Math.round(
                      (score / selectedLesson.questions.length) * 100,
                    )}
                    %
                  </span>
                </p>
              </div>

              <div className="flex justify-between items-end mt-12 pt-8 border-t-2 border-gray-300">
                <div className="text-center">
                  <div className="w-32 border-t-2 border-gray-400 mb-2"></div>
                  <p className="text-sm font-semibold">Date of Completion</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {today}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Brain className="w-8 h-8 text-primary" />
                  <div className="text-left">
                    <p className="font-bold text-lg">EduGuard</p>
                    <p className="text-xs text-gray-600">
                      Digital Literacy Platform
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-32 border-t-2 border-gray-400 mb-2"></div>
                  <p className="text-sm font-semibold">Authorized Signature</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    EduGuard Team
                  </p>
                </div>
              </div>

              {/* Certificate ID and QR Code */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">Certificate ID</p>
                  <p className="text-sm font-mono font-semibold text-gray-800 dark:text-gray-200">
                    {certificateId}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Verify authenticity at eduguard.com/verify
                  </p>
                </div>
                <div className="text-center">
                  <img
                    src="/qr.png"
                    alt="Verification QR Code"
                    className="w-20 h-20 border-2 border-gray-300 rounded"
                  />
                  <p className="text-xs text-gray-500 mt-1">Scan to verify</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center mt-6">
              <Button onClick={() => window.print()} variant="secondary">
                <Download className="w-4 h-4 mr-1" />
                Print / Save as PDF
              </Button>
              <Button onClick={() => setShowCertificate(false)}>Close</Button>
            </div>

            <p className="text-xs text-center text-gray-500 mt-4">
              Tip: Use your browser's Print function (Ctrl/Cmd + P) and select
              "Save as PDF" to download this certificate
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 1. Career Path Selection + Pathway List
  if (!selectedPathway && !selectedLesson) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Brain className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">AI Adaptive Learning</h1>
        </div>

        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/40 dark:to-purple-900/40">
          <div className="flex items-start gap-3">
            <Briefcase className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold mb-2">What career interests you?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Select a career path and we will recommend learning pathways
                aligned with your goals. Or browse all pathways below.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {careerPaths.map((career) => (
                  <button
                    key={career.id}
                    onClick={() =>
                      setSelectedCareer(
                        selectedCareer === career.id ? null : career.id,
                      )
                    }
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      selectedCareer === career.id
                        ? career.color + " border-opacity-100"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <div className="mb-2 text-primary">{career.icon}</div>
                    <div className="font-semibold text-sm">{career.title}</div>
                  </button>
                ))}
              </div>
              {selectedCareer && (
                <p className="text-sm mt-3 text-primary font-medium">
                  Showing pathways aligned with{" "}
                  {careerPaths.find((c) => c.id === selectedCareer)?.title}
                </p>
              )}
            </div>
          </div>
        </Card>

        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Map className="w-6 h-6 text-primary" />
          {selectedCareer
            ? "Recommended Learning Pathways"
            : "All Learning Pathways"}
        </h2>

        <div className="space-y-4">
          {activePathways.map((pathway) => {
            const completedInPathway = pathway.lessons.filter((l) =>
              completedLessons.includes(l.id),
            ).length;
            const progress =
              (completedInPathway / pathway.lessons.length) * 100;
            return (
              <Card
                key={pathway.id}
                className="hover:shadow-xl transition-all cursor-pointer"
              >
                <div
                  onClick={() => setSelectedPathway(pathway)}
                  className="flex items-start justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{pathway.title}</h3>
                      {completedInPathway === pathway.lessons.length &&
                        pathway.lessons.length > 0 && (
                          <Badge variant="success">Completed</Badge>
                        )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {pathway.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {pathway.lessons.length} lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {pathway.lessons.reduce(
                          (acc, l) => acc + parseInt(l.duration),
                          0,
                        )}{" "}
                        min total
                      </span>
                      <span>
                        {completedInPathway}/{pathway.lessons.length} completed
                      </span>
                    </div>
                    <div className="mt-3">
                      <ProgressBar value={progress} />
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400 ml-4 mt-2" />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // 2. Pathway detail - choose a lesson and mode
  if (selectedPathway && !selectedLesson) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedPathway(null)}
          className="text-primary hover:underline flex items-center gap-1 font-medium"
        >
          &larr; Back to Pathways
        </button>
        <div>
          <h1 className="text-3xl font-bold mb-2">{selectedPathway.title}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {selectedPathway.description}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border-2 border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Lightbulb className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg">Guided Mode</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Step-by-step learning with explanations before each question. Best
              for new topics.
            </p>
          </Card>
          <Card className="border-2 border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-bold text-lg">Quick Mode</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Jump straight into questions. Rapid-fire quiz to test what you
              already know.
            </p>
          </Card>
        </div>
        <h2 className="text-xl font-bold">Lessons in This Pathway</h2>
        <div className="space-y-3">
          {selectedPathway.lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            return (
              <Card key={lesson.id}>
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${isCompleted ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">{lesson.title}</h3>
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
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {lesson.description}
                    </p>
                    <span className="text-xs text-gray-500">
                      {lesson.duration} &middot; {lesson.questions.length}{" "}
                      questions
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => startLesson(lesson, "guided")}
                      variant="secondary"
                    >
                      <Lightbulb className="w-4 h-4 mr-1" />
                      Guided
                    </Button>
                    <Button onClick={() => startLesson(lesson, "quick")}>
                      <Zap className="w-4 h-4 mr-1" />
                      Quick
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // 3. Quiz Complete Screen
  if (quizComplete && selectedLesson) {
    const percentage = Math.round(
      (score / selectedLesson.questions.length) * 100,
    );
    const passed = percentage >= 70;
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="text-center">
          <div
            className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${passed ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"}`}
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
            You scored {score} out of {selectedLesson.questions.length} (
            {percentage}%)
          </p>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              AI Recommendation
            </h3>
            <p className="text-sm">
              {passed
                ? "Excellent work! You have demonstrated strong understanding. Move on to the next lesson in this pathway to continue building your knowledge."
                : "Review the explanations and retry. Focus on the areas where you missed questions. The guided mode can help reinforce the concepts."}
            </p>
          </div>
          {incorrectTopics.length > 0 && (
            <div className="bg-orange-50 dark:bg-orange-900/30 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-bold mb-2">Areas to Review</h3>
              <ul className="space-y-1 text-sm">
                {[...new Set(incorrectTopics)].map((topic) => (
                  <li key={topic} className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-orange-500" />
                    {topic
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex gap-3 justify-center">
            <Button onClick={restartQuiz} variant="secondary">
              <RotateCcw className="w-4 h-4 mr-1" />
              Retry Quiz
            </Button>
            {passed && selectedPathway && (
              <Button
                onClick={() => setShowCertificate(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Award className="w-4 h-4 mr-1" />
                Get Certificate
              </Button>
            )}
            <Button
              onClick={() => {
                setSelectedLesson(null);
                setLearningMode(null);
              }}
            >
              Back to Pathway
            </Button>
          </div>
        </Card>
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Continue Learning
          </h3>
          <p className="text-sm mb-3 text-gray-600 dark:text-gray-300">
            Strengthen your skills with our interactive digital literacy
            modules:
          </p>
          <Link
            href="/modules"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            Go to Modules <ArrowRight className="w-4 h-4" />
          </Link>
        </Card>
      </div>
    );
  }

  // 4. Active Lesson - Guided or Quick mode
  if (!selectedLesson) return null;
  const question = selectedLesson.questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            setSelectedLesson(null);
            setLearningMode(null);
          }}
          className="text-primary hover:underline flex items-center gap-1 font-medium"
        >
          &larr; Exit Lesson
        </button>
        <Badge variant={learningMode === "guided" ? "info" : "warning"}>
          {learningMode === "guided" ? (
            <span className="flex items-center gap-1">
              <Lightbulb className="w-3 h-3" /> Guided Mode
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3" /> Quick Mode
            </span>
          )}
        </Badge>
      </div>

      {learningMode === "guided" &&
        !showExplanation &&
        selectedAnswer === null && (
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-2 border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Concept Overview</h3>
                <p className="text-sm mb-2">{question.explanation}</p>
                <p className="text-xs text-gray-500 italic">
                  Now answer the question below to test your understanding.
                </p>
              </div>
            </div>
          </Card>
        )}

      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{selectedLesson.title}</h2>
          <Badge>
            Question {currentQuestion + 1}/{selectedLesson.questions.length}
          </Badge>
        </div>
        <div className="mb-6">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{
                width: `${((currentQuestion + 1) / selectedLesson.questions.length) * 100}%`,
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
            className={`p-4 rounded-lg mb-6 ${isCorrect ? "bg-green-50 dark:bg-green-900/40" : "bg-orange-50 dark:bg-orange-900/40"}`}
          >
            <h4 className="font-bold mb-2">
              {isCorrect ? "Correct!" : "Not quite right"}
            </h4>
            <p className="text-sm">{question.explanation}</p>
          </div>
        )}
        <div className="flex justify-between">
          <Button
            onClick={() => {
              setSelectedLesson(null);
              setLearningMode(null);
            }}
            variant="secondary"
          >
            Exit Lesson
          </Button>
          {!showExplanation ? (
            <Button onClick={submitAnswer} disabled={selectedAnswer === null}>
              Submit Answer
            </Button>
          ) : (
            <Button onClick={nextQuestion}>
              {currentQuestion < selectedLesson.questions.length - 1
                ? "Next Question"
                : "Finish Quiz"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
