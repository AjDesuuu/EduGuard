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
  Globe,
  MessageSquare,
  Image,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  RotateCcw,
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
  scenario: Scenario | null;
}

interface Scenario {
  title: string;
  context: string;
  items: ScenarioItem[];
}

interface ScenarioItem {
  content: string;
  type: "credible" | "not-credible";
  explanation: string;
}

const modules: Module[] = [
  {
    id: "source-eval",
    title: "Evaluating Source Credibility",
    category: "source-evaluation",
    description: "Learn to assess the reliability and trustworthiness of information sources",
    duration: "10 min",
    completed: false,
    locked: false,
    content: [
      "Check the author credentials and expertise - Who wrote this? Are they qualified?",
      "Look for publication date and recent updates - Is this information current?",
      "Verify the domain and website credibility (.edu, .gov are often reliable)",
      "Cross-reference with other trusted sources - Does anyone else report this?",
      "Examine the references and citations provided - Can you trace the original source?",
    ],
    keyPoints: [
      "Always verify the author's credentials",
      "Recent information is often more accurate",
      "Cross-reference multiple sources",
      "Be skeptical of sensational claims",
    ],
    scenario: {
      title: "Social Media Feed Check",
      context: "You are scrolling through social media and see these posts. Decide if each source seems credible or not.",
      items: [
        {
          content: "BBC News (@BBCNews): New study published in The Lancet shows vaccine effectiveness at 94% after 6 months. Link: bbc.co.uk/health/vaccine-study-2024",
          type: "credible",
          explanation: "This comes from a verified major news outlet (BBC), references a peer-reviewed journal (The Lancet), includes specific data, and links to a reputable domain.",
        },
        {
          content: "TruthRevealed2024: EXPOSED!!! Big pharma is hiding THIS from you!! The real cure they don't want you to know!! Click link in bio NOW!!!",
          type: "not-credible",
          explanation: "Red flags: anonymous account, excessive punctuation and caps, sensationalist language, conspiracy framing ('they don't want you to know'), no sources cited, and clickbait tactics.",
        },
        {
          content: "Dr. Sarah Chen, MIT Professor (@drchen_mit): Our peer-reviewed paper on climate modeling is now available open-access. We found a 2.1C increase by 2050 under current policies. DOI: 10.1038/s41586-024-0012",
          type: "credible",
          explanation: "Identifiable expert with institutional affiliation, references a peer-reviewed paper with a DOI number, makes specific claims with data, and uses measured scientific language.",
        },
        {
          content: "HealthNaturally_Blog: My neighbor cured her cancer with just lemon water and positive thinking! Doctors HATE this trick! Share before they delete this!!",
          type: "not-credible",
          explanation: "Anecdotal evidence (one person's story), medical claim without scientific backing, uses 'doctors hate this' manipulation tactic, and urgency ('share before they delete') is a classic misinformation pattern.",
        },
      ],
    },
  },
  {
    id: "fact-check",
    title: "Fact-Checking Basics",
    category: "fact-checking",
    description: "Master the fundamentals of verifying information and debunking false claims",
    duration: "15 min",
    completed: false,
    locked: false,
    content: [
      "Use fact-checking websites (Snopes, FactCheck.org, PolitiFact) to verify claims",
      "Reverse image search to verify photos - drag images into Google Images or TinEye",
      "Check primary sources directly - go to the original study, report, or statement",
      "Look for evidence and data supporting claims - are there numbers, studies, or citations?",
      "Be aware of confirmation bias - we tend to believe what matches our existing views",
    ],
    keyPoints: [
      "Use multiple fact-checking resources",
      "Verify images with reverse search",
      "Seek primary sources",
      "Watch for emotional manipulation",
    ],
    scenario: {
      title: "Viral Post Investigation",
      context: "These posts are going viral. Use your fact-checking skills to evaluate each claim.",
      items: [
        {
          content: "BREAKING: Scientists at Stanford University confirm that drinking 8 glasses of water a day prevents all types of cancer. Study published in Nature Medicine, 2024.",
          type: "not-credible",
          explanation: "No real study exists making this claim. The claim is too absolute ('prevents all types'), and legitimate medical research rarely makes such sweeping statements. Fact-checking sites have debunked similar claims. Always verify by searching for the actual study.",
        },
        {
          content: "According to NASA's Climate Change page (climate.nasa.gov), global sea levels have risen about 8 inches since 1880, with about one-third of that coming in just the last 25 years.",
          type: "credible",
          explanation: "References a specific, verifiable government source (NASA). The claim can be checked directly at climate.nasa.gov. The data is specific and measured, and NASA is a highly reliable scientific authority.",
        },
        {
          content: "A friend sends you a photo showing a 'giant spider found in Australia' that appears as large as a car. The image looks extremely realistic.",
          type: "not-credible",
          explanation: "This type of image commonly circulates as a hoax. Use reverse image search to check - you will likely find it has been digitally altered or uses forced perspective. Always verify sensational images, especially ones that seem too extraordinary.",
        },
        {
          content: "The WHO (World Health Organization) reports that global life expectancy increased from 66.8 years in 2000 to 73.4 years in 2019, per their Global Health Observatory data.",
          type: "credible",
          explanation: "Cites a specific authoritative source (WHO) with exact figures and a named database (Global Health Observatory). This can be verified directly on the WHO website. The claim is specific and measurable.",
        },
      ],
    },
  },
  {
    id: "ai-detection",
    title: "Identifying AI-Generated Content",
    category: "ai-detection",
    description: "Recognize AI-generated text, images, and deepfakes in real-world contexts",
    duration: "12 min",
    completed: false,
    locked: false,
    content: [
      "Look for repetitive patterns and unnaturally perfect phrasing in text",
      "Check for inconsistencies in details - AI may contradict itself or state false facts confidently",
      "Verify with AI detection tools like GPTZero, Originality.ai, or Copyleaks",
      "Examine images for AI artifacts: extra fingers, mangled text, impossible reflections",
      "For deepfake videos: watch for unnatural blinking, face-edge blurring, and inconsistent lighting",
    ],
    keyPoints: [
      "AI content often has repetitive patterns",
      "Check for logical inconsistencies",
      "Use specialized detection tools",
      "Verify the source and context",
    ],
    scenario: {
      title: "Real or AI? You Decide",
      context: "Examine each piece of content and decide if it was likely created by a human or AI.",
      items: [
        {
          content: "Email from 'professor': 'Dear Student, It is worth noting that your assignment demonstrates a nuanced understanding. In conclusion, your work effectively synthesizes the key concepts. It is important to note that further exploration would be beneficial. That being said, your analysis is comprehensive.'",
          type: "not-credible",
          explanation: "Classic AI writing patterns: overuse of transition phrases ('it is worth noting', 'that being said', 'in conclusion'), generic praise without specific details, and formulaic structure. Real professor feedback usually references specific parts of your work.",
        },
        {
          content: "A photo shows a politician shaking hands with a celebrity at what appears to be a charity event. The hands look natural, the lighting is consistent, and a reverse image search confirms it appeared on the charity's official website.",
          type: "credible",
          explanation: "The image passes key checks: natural hand details (AI struggles with hands), consistent lighting, and most importantly - it can be traced to a primary source (charity's website). Always try to find the original source of images.",
        },
        {
          content: "A product review reads: 'This product is absolutely amazing and has changed my life completely. I would highly recommend this to anyone looking for a solution. The quality is outstanding and the customer service is wonderful. 5 stars!'",
          type: "not-credible",
          explanation: "Signs of AI/fake reviews: entirely positive with no specifics, generic language that could apply to any product, no mention of actual features or personal experience details. Genuine reviews usually mention specific features and include both pros and cons.",
        },
        {
          content: "A student essay argues: 'While social media connects us globally, my experience tutoring at Lincoln Elementary showed me its downsides. Last March, three of my students repeated a TikTok health myth during class, which sparked a discussion about online literacy.'",
          type: "credible",
          explanation: "Contains specific personal details (Lincoln Elementary, last March, three students), a concrete anecdote, and natural writing flow. AI rarely invents this level of specific, verifiable personal detail. The writing has a natural, reflective tone rather than formulaic structure.",
        },
      ],
    },
  },
  {
    id: "bias-recognition",
    title: "Recognizing Bias & Manipulation",
    category: "source-evaluation",
    description: "Identify biased reporting and manipulative techniques used in media",
    duration: "10 min",
    completed: false,
    locked: false,
    content: [
      "Identify loaded language - words chosen to trigger emotional reactions rather than inform",
      "Recognize framing effects - how the same facts can be presented to push different conclusions",
      "Spot cherry-picking - when only data supporting one side is presented while opposing data is hidden",
      "Watch for false balance - giving equal weight to a fringe view and scientific consensus",
      "Detect astroturfing - when corporate or political messaging is disguised as grassroots opinion",
    ],
    keyPoints: [
      "Loaded language signals bias",
      "Same facts can be framed differently",
      "Cherry-picked data misleads",
      "Check who benefits from the message",
    ],
    scenario: {
      title: "Spot the Bias",
      context: "Read each pair of headlines about the same event. Identify which uses manipulative framing.",
      items: [
        {
          content: "Headline A: 'City council approves $2M park renovation after 3 years of community input'\nHeadline B: 'OUTRAGEOUS: Politicians WASTE $2 Million of YOUR Tax Money on Unnecessary Park Project'",
          type: "not-credible",
          explanation: "Headline B uses loaded language ('OUTRAGEOUS', 'WASTE'), caps for emotional impact, possessive 'YOUR' to trigger personal outrage, and the word 'unnecessary' is an opinion stated as fact. Headline A presents the same information neutrally with context.",
        },
        {
          content: "Reuters: 'Global temperatures rose 0.2C above the 1991-2020 average in 2024, according to measurements from NASA, NOAA, and the EU Copernicus service.'",
          type: "credible",
          explanation: "Neutral reporting with specific data, multiple authoritative sources cited (NASA, NOAA, Copernicus), no loaded language or emotional framing. This is an example of straightforward factual reporting.",
        },
        {
          content: "A news outlet reports: '90% of doctors recommend Brand X pain relief' - but the study surveyed only 10 doctors, and the question was whether they recommend any pain relief (not Brand X specifically).",
          type: "not-credible",
          explanation: "This is cherry-picking and misleading statistics. The tiny sample size (10 doctors) and the misrepresented question make this claim deceptive. Always ask: How many people were surveyed? What exactly was the question?",
        },
        {
          content: "AP News: 'Employment rose by 150,000 jobs in March, below the 200,000 economists expected. The unemployment rate held steady at 3.8%, while wage growth slowed to 3.2% year-over-year.'",
          type: "credible",
          explanation: "Balanced reporting presenting both positive and negative aspects of the same data (jobs added but below expectations, steady unemployment but slower wage growth). No emotional language or one-sided framing.",
        },
      ],
    },
  },
];

export default function ModulesPage() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [moduleCompleted, setModuleCompleted] = useState(false);
  const [inScenario, setInScenario] = useState(false);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [scenarioAnswer, setScenarioAnswer] = useState<string | null>(null);
  const [scenarioScore, setScenarioScore] = useState(0);
  const [scenarioComplete, setScenarioComplete] = useState(false);
  const [completedModuleIds, setCompletedModuleIds] = useState<string[]>([]);

  const completedCount = completedModuleIds.length;
  const totalCount = modules.length;
  const progress = (completedCount / totalCount) * 100;

  const startModule = (mod: Module) => {
    if (mod.locked) return;
    setSelectedModule(mod);
    setCurrentStep(0);
    setModuleCompleted(false);
    setInScenario(false);
    setScenarioIndex(0);
    setScenarioAnswer(null);
    setScenarioScore(0);
    setScenarioComplete(false);
  };

  const nextStep = () => {
    if (selectedModule && currentStep < selectedModule.content.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      if (selectedModule?.scenario) {
        setInScenario(true);
        setScenarioIndex(0);
        setScenarioAnswer(null);
        setScenarioScore(0);
        setScenarioComplete(false);
      } else {
        setModuleCompleted(true);
      }
    }
  };

  const handleScenarioAnswer = (answer: "credible" | "not-credible") => {
    if (scenarioAnswer) return;
    setScenarioAnswer(answer);
    if (selectedModule?.scenario) {
      const correct = selectedModule.scenario.items[scenarioIndex].type === answer;
      if (correct) setScenarioScore(scenarioScore + 1);
    }
  };

  const nextScenarioItem = () => {
    if (!selectedModule?.scenario) return;
    if (scenarioIndex < selectedModule.scenario.items.length - 1) {
      setScenarioIndex(scenarioIndex + 1);
      setScenarioAnswer(null);
    } else {
      setScenarioComplete(true);
    }
  };

  const completeModule = () => {
    if (selectedModule && !completedModuleIds.includes(selectedModule.id)) {
      setCompletedModuleIds([...completedModuleIds, selectedModule.id]);
    }
    setSelectedModule(null);
    setModuleCompleted(false);
    setInScenario(false);
  };

  // Scenario complete screen
  if (selectedModule && inScenario && scenarioComplete) {
    const scenario = selectedModule.scenario!;
    const pct = Math.round((scenarioScore / scenario.items.length) * 100);
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${pct >= 75 ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"}`}>
            <CheckCircle className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Scenario Complete!</h2>
          <p className="text-xl mb-2">You got {scenarioScore} out of {scenario.items.length} correct ({pct}%)</p>
          <p className="text-gray-600 dark:text-gray-400 mb-6">in the &quot;{scenario.title}&quot; activity</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => { setInScenario(false); setModuleCompleted(true); }}>
              Complete Module
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Active scenario
  if (selectedModule && inScenario && selectedModule.scenario) {
    const scenario = selectedModule.scenario;
    const item = scenario.items[scenarioIndex];
    const isCorrect = scenarioAnswer === item.type;

    return (
      <div className="max-w-3xl mx-auto">
        <Card>
          <div className="flex justify-between items-start mb-4">
            <div>
              <Badge variant="warning">Interactive Scenario</Badge>
              <h2 className="text-2xl font-bold mt-2">{scenario.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{scenario.context}</p>
            </div>
            <span className="text-sm text-gray-500">{scenarioIndex + 1} of {scenario.items.length}</span>
          </div>

          <ProgressBar value={scenarioIndex + 1} max={scenario.items.length} className="mb-6" />

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
              <p className="text-sm whitespace-pre-line">{item.content}</p>
            </div>
          </div>

          {!scenarioAnswer ? (
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button onClick={() => handleScenarioAnswer("credible")}
                className="p-4 border-2 border-green-300 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/30 transition-all flex items-center justify-center gap-2 font-medium text-green-700 dark:text-green-400">
                <ThumbsUp className="w-5 h-5" /> Credible
              </button>
              <button onClick={() => handleScenarioAnswer("not-credible")}
                className="p-4 border-2 border-red-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-all flex items-center justify-center gap-2 font-medium text-red-700 dark:text-red-400">
                <ThumbsDown className="w-5 h-5" /> Not Credible
              </button>
            </div>
          ) : (
            <div className={`p-4 rounded-lg mb-6 ${isCorrect ? "bg-green-50 dark:bg-green-900/30 border border-green-200" : "bg-orange-50 dark:bg-orange-900/30 border border-orange-200"}`}>
              <h4 className="font-bold mb-2">{isCorrect ? "Correct!" : "Not quite!"} This is {item.type === "credible" ? "credible" : "not credible"}.</h4>
              <p className="text-sm">{item.explanation}</p>
            </div>
          )}

          <div className="flex justify-between">
            <Button onClick={() => { setInScenario(false); setModuleCompleted(true); }} variant="secondary">Skip to Summary</Button>
            {scenarioAnswer && (
              <Button onClick={nextScenarioItem}>
                {scenarioIndex < scenario.items.length - 1 ? "Next Item" : "See Results"}
              </Button>
            )}
          </div>
        </Card>
      </div>
    );
  }

  // Module completed screen
  if (selectedModule && moduleCompleted) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
            <CheckCircle className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Module Complete!</h2>
          <p className="text-xl mb-6">You have mastered: {selectedModule.title}</p>
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
            <Button onClick={() => setSelectedModule(null)} variant="secondary">Back to Modules</Button>
            <Button onClick={completeModule}>Mark as Complete</Button>
          </div>
        </Card>
      </div>
    );
  }

  // Active module learning
  if (selectedModule) {
    return (
      <div className="max-w-3xl mx-auto">
        <Card>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{selectedModule.title}</h2>
              <Badge>{selectedModule.category}</Badge>
            </div>
            <span className="text-sm text-gray-500">Step {currentStep + 1} of {selectedModule.content.length}{selectedModule.scenario ? " + Interactive Scenario" : ""}</span>
          </div>
          <ProgressBar value={currentStep + 1} max={selectedModule.content.length} className="mb-6" />
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-lg p-8 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">{currentStep + 1}</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-3">Learning Point</h3>
                <p className="text-lg">{selectedModule.content[currentStep]}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              Real-World Example
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{getExample(selectedModule.id, currentStep)}</p>
          </div>
          <div className="flex justify-between">
            <Button onClick={() => setSelectedModule(null)} variant="secondary">Exit Module</Button>
            <Button onClick={nextStep}>
              {currentStep < selectedModule.content.length - 1 ? "Next" : selectedModule.scenario ? "Start Interactive Scenario" : "Complete Module"}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Module list
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
            <p className="text-sm text-gray-600 dark:text-gray-400">{completedCount} of {totalCount} modules completed</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{Math.round(progress)}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Complete</div>
          </div>
        </div>
        <ProgressBar value={progress} />
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {modules.map((mod) => {
          const isCompleted = completedModuleIds.includes(mod.id);
          return (
            <div key={mod.id} onClick={() => !mod.locked && startModule(mod)} className={`${mod.locked ? "opacity-60" : "cursor-pointer"}`}>
              <Card className={`${mod.locked ? "" : "hover:shadow-xl"} transition-all h-full`}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${isCompleted ? "bg-green-100 text-green-600" : mod.locked ? "bg-gray-100 text-gray-400" : "bg-blue-100 text-blue-600"}`}>
                      {isCompleted ? <CheckCircle className="w-6 h-6" /> : mod.locked ? <Lock className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{mod.title}</h3>
                      <Badge variant={isCompleted ? "success" : "info"}>{mod.category}</Badge>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{mod.description}</p>
                {mod.scenario && (
                  <div className="flex items-center gap-1 mb-3">
                    <Globe className="w-4 h-4 text-primary" />
                    <span className="text-xs text-primary font-medium">Includes interactive real-world scenario</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 flex items-center gap-1"><Search className="w-4 h-4" />{mod.duration}</span>
                  {mod.locked && <span className="text-sm text-gray-500">Complete previous modules</span>}
                  {isCompleted && <Badge variant="success">Completed</Badge>}
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900">
        <h3 className="font-bold mb-2">Why Digital Literacy Matters</h3>
        <p className="text-sm">In today's digital age, the ability to critically evaluate information is crucial. These modules include interactive real-world scenarios to help you practice identifying misinformation, evaluating sources, and making better decisions as a digital citizen.</p>
      </Card>
    </div>
  );
}

function getExample(moduleId: string, step: number): string {
  const examples: Record<string, string[]> = {
    "source-eval": [
      "A news article from 'TotallyRealNews.biz' claims a miracle cure. Compare this with a study published on Harvard.edu with author credentials and peer review - which would you trust more?",
      "An article published in 2018 about '2024 technology trends' is likely outdated. Always check when information was last updated, especially for fast-moving topics like technology or health.",
      "Legitimate websites have clear 'About Us' pages, contact information, and editorial policies. If a site lacks these, be cautious about trusting its content.",
      "If only one website reports a major story but no major news outlets cover it, the story may not be verified. Major events are typically covered by multiple independent sources.",
      "An article making bold claims about climate change without any scientific references or links to studies should raise concerns. Credible reporting cites its sources.",
    ],
    "fact-check": [
      "A viral post claims a celebrity has died. Before sharing, check Snopes.com or the celebrity's official social media. Celebrity death hoaxes are one of the most common types of misinformation.",
      "A striking photo claims to show a 'recent disaster.' Upload it to Google Images - you might find it is actually from a different event years ago. Images are frequently reused out of context.",
      "A news report says 'a study proves coffee cures depression.' Instead of trusting the headline, find and read the actual study. You might find the study only showed a small correlation, not proof.",
      "A post claims 'a new law bans all social media for minors.' Search for the actual legislation text on government websites. Headlines often exaggerate what laws actually say.",
      "You immediately believe a negative story about a politician you dislike. That is confirmation bias at work. Challenge yourself to verify information that confirms your existing beliefs just as rigorously.",
    ],
    "ai-detection": [
      "AI-generated text often uses filler phrases like 'it is worth noting that,' 'in the realm of,' or 'it is important to note.' These hedge phrases are a telltale sign of AI writing.",
      "Look at AI-generated images closely: people may have six fingers, text on signs is garbled, and backgrounds may have impossible architecture or melting objects.",
      "Tools like GPTZero analyze writing patterns (perplexity and burstiness) to estimate whether text was human- or AI-written. Use them as one data point, not definitive proof.",
      "Check image EXIF data (right-click > Properties on Windows, or use online tools). AI-generated images often lack camera metadata that real photos contain.",
      "In deepfake videos, pause and look closely at the edges of the face - you may see blurring or warping where the fake face meets the real background, especially around hair and ears.",
    ],
    "bias-recognition": [
      "Compare: 'Tax relief plan approved' vs 'Tax cuts for wealthy pass.' The word 'relief' implies the tax was a burden, while 'cuts for wealthy' implies unfairness. Both describe the same event but frame it differently.",
      "A report shows only the months where stock prices rose while hiding the months they fell. This cherry-picking creates a misleading picture of overall performance.",
      "A news panel gives equal time to a climate scientist and a climate denier, implying both views have equal scientific support. In reality, 97% of climate scientists agree on human-caused climate change.",
      "A news story presents equal time to one scientist with published research and one blogger with no credentials, creating a false impression that both viewpoints are equally valid.",
      "Social media campaigns that appear grassroots but are actually funded by corporations are called astroturfing. Look for coordinated messaging and trace who is behind advocacy campaigns.",
    ],
  };
  return examples[moduleId]?.[step] || "Apply these principles when evaluating online content.";
}
