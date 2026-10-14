export type PrepLevel = "Beginner" | "Intermediate" | "Advanced";
export type TargetRole =
  | "Software Engineer"
  | "Frontend Developer"
  | "Backend Developer"
  | "Data Analyst";

export interface OnboardingProfile {
  branch: string;
  graduationYear: string;
  level: PrepLevel;
  targetRole: TargetRole;
  targetCompanies: string[];
  dailyStudyHours: number;
  interviewDate: string;
  goals: string;
}

export const defaultProfile: OnboardingProfile = {
  branch: "Computer Science",
  graduationYear: "2027",
  level: "Intermediate",
  targetRole: "Software Engineer",
  targetCompanies: ["TCS", "Infosys", "Accenture"],
  dailyStudyHours: 2,
  interviewDate: "2026-11-30",
  goals: "Build strong CS fundamentals and improve DSA consistency before campus placements.",
};

export const roadmap = [
  {
    title: "CS Fundamentals",
    description: "Build a strong base in OS, DBMS, networking and OOPs.",
    progress: 68,
    nextAction: "Complete DBMS revision set and weak-topic quiz.",
  },
  {
    title: "DSA Practice",
    description: "Move from basics to pattern recognition with arrays, hash maps and trees.",
    progress: 52,
    nextAction: "Solve 3 medium problems on arrays and strings.",
  },
  {
    title: "Company Preparation",
    description: "Align your practice with the target companies and interview stages.",
    progress: 44,
    nextAction: "Review TCS aptitude and communication round checklist.",
  },
  {
    title: "Mock Tests",
    description: "Measure progress with timed company-style tests and review weak topics.",
    progress: 31,
    nextAction: "Take one timed mock before your next interview window.",
  },
];

export const mockQuestions = [
  {
    id: 1,
    topic: "Operating Systems",
    question: "Which scheduling algorithm gives every process an equal share of CPU time in a cyclic manner?",
    options: ["FCFS", "Round Robin", "Priority Scheduling", "Shortest Job First"],
    correctAnswer: "Round Robin",
    explanation:
      "Round Robin allocates a fixed time slice to each process in a circular queue, ensuring fairness and equal CPU access.",
  },
  {
    id: 2,
    topic: "DBMS",
    question: "Which normal form removes transitive dependency?",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    correctAnswer: "3NF",
    explanation:
      "3NF eliminates transitive dependencies by ensuring non-key attributes depend only on the key.",
  },
  {
    id: 3,
    topic: "Computer Networks",
    question: "Which protocol is used to map a domain name to an IP address?",
    options: ["HTTP", "DNS", "SMTP", "TCP"],
    correctAnswer: "DNS",
    explanation:
      "DNS resolves hostnames into IP addresses so clients can route requests to the correct server.",
  },
  {
    id: 4,
    topic: "OOPs",
    question: "Which principle allows one interface to be implemented in multiple ways?",
    options: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction"],
    correctAnswer: "Polymorphism",
    explanation:
      "Polymorphism lets the same interface or method behave differently depending on the object implementing it.",
  },
  {
    id: 5,
    topic: "DBMS",
    question: "Which SQL command is used to remove all rows from a table without deleting the table itself?",
    options: ["DROP TABLE", "DELETE FROM", "TRUNCATE TABLE", "REMOVE FROM"],
    correctAnswer: "TRUNCATE TABLE",
    explanation:
      "TRUNCATE TABLE removes all rows efficiently while keeping the table structure intact, unlike DROP TABLE which deletes the table itself.",
  },
];

export const companyProfiles: Record<string, any> = {
  tcs: {
    name: "TCS",
    slug: "tcs",
    rounds: ["Aptitude", "Coding Test", "Technical Interview", "Managerial Round"],
    focus: ["DBMS", "OS", "Aptitude", "Communication"],
    strategy:
      "Solve fundamentals, practice aptitude questions, and rehearse clear communication with strong examples.",
    lastVerified: "2026-10-13",
  },
  infosys: {
    name: "Infosys",
    slug: "infosys",
    rounds: ["Aptitude", "Reasoning", "Interview"],
    focus: ["Reasoning", "CS Basics", "Verbal Ability"],
    strategy:
      "Stay consistent on aptitude and revise core CS concepts, especially DBMS and OOPs basics.",
    lastVerified: "2026-10-13",
  },
  accenture: {
    name: "Accenture",
    slug: "accenture",
    rounds: ["Aptitude", "Technical", "HR"],
    focus: ["Data Structures", "Logic", "Communication"],
    strategy:
      "Aim for clear, structured answers and practice medium-level DSA patterns with explanations.",
    lastVerified: "2026-10-13",
  },
};

export const COMPANY_STORAGE_KEY = "placement-prepy-companies";
export const QUESTION_STORAGE_KEY = "placement-prepy-questions";

export function getCompanyCatalog(): Record<string, any> {
  if (typeof window === "undefined") {
    return companyProfiles;
  }

  try {
    const saved = window.localStorage.getItem(COMPANY_STORAGE_KEY);
    if (!saved) {
      return companyProfiles;
    }

    const parsed = JSON.parse(saved) as Record<string, any>;
    return { ...companyProfiles, ...parsed };
  } catch {
    return companyProfiles;
  }
}

export function saveCompanyCatalog(catalog: Record<string, any>) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(COMPANY_STORAGE_KEY, JSON.stringify(catalog));
}

export function getQuestionCatalog() {
  if (typeof window === "undefined") {
    return mockQuestions;
  }

  try {
    const saved = window.localStorage.getItem(QUESTION_STORAGE_KEY);
    if (!saved) {
      return mockQuestions;
    }

    const parsed = JSON.parse(saved) as typeof mockQuestions;
    return [...mockQuestions, ...parsed];
  } catch {
    return mockQuestions;
  }
}

export function saveQuestionCatalog(questions: typeof mockQuestions) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(QUESTION_STORAGE_KEY, JSON.stringify(questions));
}

export function createDashboardSnapshot(profile: Partial<OnboardingProfile>) {
  const branch = profile.branch ?? defaultProfile.branch;
  const targetCompanies = profile.targetCompanies?.length
    ? profile.targetCompanies
    : defaultProfile.targetCompanies;
  const dailyStudyHours = profile.dailyStudyHours ?? defaultProfile.dailyStudyHours;
  const level = profile.level ?? defaultProfile.level;

  const levelBoost = {
    Beginner: 18,
    Intermediate: 26,
    Advanced: 34,
  }[level] ?? 22;

  const readinessScore = Math.min(
    98,
    Math.max(45, 52 + levelBoost + Math.min(12, dailyStudyHours * 4) - targetCompanies.length)
  );

  const weakTopics = [
    "DBMS normalization",
    "Trees and recursion",
    "Networking concepts",
  ];

  const dueRevisions = [
    "Revise SQL joins",
    "Practice 2 tree problems",
    "Revisit OS scheduling notes",
  ];

  const recommendedNextAction =
    targetCompanies.includes("TCS")
      ? "Do 10 aptitude questions and one DBMS revision set today."
      : "Complete 3 core CS MCQs and 2 DSA medium problems before your next mock.";

  return {
    readinessScore: Math.round(readinessScore),
    branch,
    targetCompanies,
    dailyStudyHours,
    streak: 7 + dailyStudyHours,
    weakTopics,
    dueRevisions,
    recommendedNextAction,
  };
}

export function buildMentorResponse(
  profile: Partial<OnboardingProfile>,
  question: string,
  mockHistory: Array<{ score: number; total: number }> = []
) {
  const targetCompanies = profile.targetCompanies?.length
    ? profile.targetCompanies
    : defaultProfile.targetCompanies;
  const level = profile.level ?? defaultProfile.level;
  const dailyHours = profile.dailyStudyHours ?? defaultProfile.dailyStudyHours;

  const accuracy = mockHistory.length
    ? Math.round(
        (mockHistory.reduce((sum, entry) => sum + entry.score, 0) /
          mockHistory.reduce((sum, entry) => sum + entry.total, 0)) *
          100
      )
    : 62;

  const focus =
    question.toLowerCase().includes("tcs") || targetCompanies.includes("TCS")
      ? "TCS aptitude + DBMS fundamentals"
      : "company-aligned core fundamentals and DSA consistency";

  const nextPlan = [
    `Today: solve 10 ${level === "Beginner" ? "easy" : "medium"} questions on DBMS and arrays.`,
    `Spend ${Math.min(2, dailyHours)} focused hours on ${focus}.`,
    `Review one weak topic from your roadmap and finish a timed mock before tomorrow.`,
  ];

  return {
    summary: `Based on your profile, you are a ${level.toLowerCase()} learner targeting ${targetCompanies.join(", ")}. Your current accuracy is about ${accuracy}%.`,
    plan: nextPlan,
    headline: `Your best next move is to focus on ${focus.toLowerCase()}.`,
  };
}
