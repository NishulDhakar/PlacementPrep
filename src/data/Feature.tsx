import {
  GraduationCap,
  Layers,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
  Star,
  Timer,
  Trophy,
  Users,
} from "lucide-react"

export const FEATURES = [
  {
    title: "Essay Practice",
    description: "Pick topics, write under time, and get instant AI-powered feedback.",
    icon: Layers,
    points: ["Timed writing", "Topic bank", "Coaching tips", "Auto saved drafts"],
  },
  {
    title: "Pseudocode Challenges",
    description: "Build logic with language-agnostic problems.",
    icon: MonitorSmartphone,
    points: ["Daily sets", "Progressive difficulty", "Hints & solutions"],
  },
  {
    title: "CS Core Subjects",
    description: "DBMS, OS, CN, OOPs theory with quizzes to test recall.",
    icon: GraduationCap,
    points: ["Concise notes", "Chapter quizzes", "Bookmark tough topics"],
  },
  {
    title: "DSA Tracker + SRS",
    description: "Track problems and learn with spaced repetition.",
    icon: Timer,
    points: ["Tag by company", "Spaced repetition", "Topic mastery heatmap"],
  },
  {
    title: "Aptitude & Reasoning",
    description: "Quant, LR, DI with practice sets and solutions.",
    icon: Trophy,
    points: ["Timed drills", "Explanations", "Company-style tests"],
  },
  {
    title: "Interview Prep",
    description: "Mock interviews, HR and technical Q&A practice.",
    icon: Users,
    points: ["Mock sessions", "Question bank", "STAR method helpers"],
  },
  {
    title: "Resume Review & ATS",
    description: "Upload CV, get feedback and ATS compatibility checks.",
    icon: ShieldCheck,
    points: ["ATS score", "Action verbs", "Formatting tips"],
  },
  {
    title: "Community Contributions",
    description: "Read and share interview experiences and strategies.",
    icon: Sparkles,
    points: ["Real experiences", "Company tags", "Peer feedback"],
  },
] as const