// app/english-test/data.tsx
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export const grammarQuestions: Question[] = [
  {
    id: 1,
    question: "The meeting _____ scheduled for 3 PM tomorrow.",
    options: ["is", "are", "was", "were"],
    correctAnswer: "is",
  },
  {
    id: 2,
    question: "Please _____ the report by Friday.",
    options: ["submit", "submits", "submitted", "submitting"],
    correctAnswer: "submit",
  },
  {
    id: 3,
    question: "I have been working _____ this project for two months.",
    options: ["in", "on", "at", "with"],
    correctAnswer: "on",
  },
  {
    id: 4,
    question: "The team _____ completed the assignment successfully.",
    options: ["have", "has", "had", "having"],
    correctAnswer: "has",
  },
  {
    id: 5,
    question: "Could you please _____ me know when you arrive?",
    options: ["let", "lets", "letting", "to let"],
    correctAnswer: "let",
  },
];
