// app/english-test/english-data.tsx

export interface EnglishSection {
  title: string;
  description: string;
  href?: string;
}

export const englishSections: EnglishSection[] = [
  {
    title: "Email / Chat",
    description: "Write professional emails or chat responses.",
  },
  {
    title: "Reading Comprehension",
    description: "Read a paragraph and answer questions (4 passages).",
  },
  {
    title: "Listening Comprehension",
    description: "Listen to a conversation, story, or situation and answer questions.",
  },
  {
    title: "Spoken Communication",
    description: "Answer 2 questions on topics like work from home, culture, or hobbies.",
  },
  {
    title: "Business Communication Writing",
    description: "Write responses to 2 business-related communication prompts.",
  },
  {
    title: "Grammar",
    description: "Identify and correct errors in given sentences.",
    href: "/english-test/grammer",
  },
];
