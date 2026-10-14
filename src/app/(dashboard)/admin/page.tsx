"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  COMPANY_STORAGE_KEY,
  QUESTION_STORAGE_KEY,
  companyProfiles,
  getCompanyCatalog,
  getQuestionCatalog,
  saveCompanyCatalog,
  saveQuestionCatalog,
} from "@/data/placement-prep";

const defaultCompanyForm = {
  name: "",
  slug: "",
  rounds: "Aptitude, Technical, HR",
  focus: "DBMS, DSA, Communication",
  strategy: "",
};

const defaultQuestionForm = {
  topic: "DBMS",
  question: "",
  options: ["", "", "", ""],
  correctAnswer: "",
  explanation: "",
};

export default function AdminPage() {
  const [companyForm, setCompanyForm] = useState(defaultCompanyForm);
  const [questionForm, setQuestionForm] = useState(defaultQuestionForm);
  const [companies, setCompanies] = useState<Record<string, any>>(companyProfiles);
  const [questions, setQuestions] = useState<typeof companyProfiles[]>([]);

  useEffect(() => {
    const savedCompanies = getCompanyCatalog();
    const savedQuestions = getQuestionCatalog();
    setCompanies(savedCompanies);
    setQuestions(savedQuestions);
  }, []);

  const companyList = useMemo(() => Object.values(companies), [companies]);

  const updateCompanyField = (field: keyof typeof defaultCompanyForm, value: string) => {
    setCompanyForm((current) => ({ ...current, [field]: value }));
  };

  const updateQuestionField = (field: keyof typeof defaultQuestionForm, value: string | string[]) => {
    setQuestionForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleCompanySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const slug = companyForm.slug.trim() || companyForm.name.trim().toLowerCase().replace(/\s+/g, "-");
    const entry = {
      name: companyForm.name,
      slug,
      rounds: companyForm.rounds.split(",").map((item) => item.trim()).filter(Boolean),
      focus: companyForm.focus.split(",").map((item) => item.trim()).filter(Boolean),
      strategy: companyForm.strategy,
      lastVerified: new Date().toISOString().slice(0, 10),
    };

    const nextCatalog = { ...companies, [slug]: entry };
    setCompanies(nextCatalog);
    saveCompanyCatalog(nextCatalog);
    setCompanyForm(defaultCompanyForm);
  };

  const handleQuestionSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextQuestion = {
      id: Date.now(),
      topic: questionForm.topic,
      question: questionForm.question,
      options: questionForm.options,
      correctAnswer: questionForm.correctAnswer,
      explanation: questionForm.explanation,
    };

    const nextQuestions = [...questions, nextQuestion];
    setQuestions(nextQuestions);
    saveQuestionCatalog(nextQuestions as any);
    setQuestionForm(defaultQuestionForm);
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">Admin</p>
          <h1 className="mt-2 text-3xl font-bold">Content management</h1>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Add company</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCompanySubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company name</Label>
                  <Input id="company-name" value={companyForm.name} onChange={(e) => updateCompanyField("name", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-slug">Slug</Label>
                  <Input id="company-slug" value={companyForm.slug} onChange={(e) => updateCompanyField("slug", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-rounds">Rounds</Label>
                  <Input id="company-rounds" value={companyForm.rounds} onChange={(e) => updateCompanyField("rounds", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-focus">Focus</Label>
                  <Input id="company-focus" value={companyForm.focus} onChange={(e) => updateCompanyField("focus", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-strategy">Strategy</Label>
                  <textarea
                    id="company-strategy"
                    rows={4}
                    value={companyForm.strategy}
                    onChange={(e) => updateCompanyField("strategy", e.target.value)}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <Button type="submit" className="w-full">Save company</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Add question</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleQuestionSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="q-topic">Topic</Label>
                  <Input id="q-topic" value={questionForm.topic} onChange={(e) => updateQuestionField("topic", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="q-question">Question</Label>
                  <textarea
                    id="q-question"
                    rows={3}
                    value={questionForm.question}
                    onChange={(e) => updateQuestionField("question", e.target.value)}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>

                {questionForm.options.map((option, index) => (
                  <div key={`opt-${index}`} className="space-y-2">
                    <Label htmlFor={`option-${index}`}>Option {index + 1}</Label>
                    <Input
                      id={`option-${index}`}
                      value={option}
                      onChange={(e) => {
                        const nextOptions = [...questionForm.options];
                        nextOptions[index] = e.target.value;
                        updateQuestionField("options", nextOptions);
                      }}
                    />
                  </div>
                ))}

                <div className="space-y-2">
                  <Label htmlFor="correct-answer">Correct answer</Label>
                  <Input id="correct-answer" value={questionForm.correctAnswer} onChange={(e) => updateQuestionField("correctAnswer", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="explanation">Explanation</Label>
                  <textarea
                    id="explanation"
                    rows={3}
                    value={questionForm.explanation}
                    onChange={(e) => updateQuestionField("explanation", e.target.value)}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <Button type="submit" className="w-full">Save question</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Company catalog</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {companyList.map((company) => (
                <div key={company.slug} className="rounded-2xl border border-border p-3">
                  <p className="font-medium">{company.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{company.focus.join(", ")}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Question catalog</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {questions.map((question: any) => (
                <div key={question.id} className="rounded-2xl border border-border p-3">
                  <p className="font-medium">{question.topic}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{question.question}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
