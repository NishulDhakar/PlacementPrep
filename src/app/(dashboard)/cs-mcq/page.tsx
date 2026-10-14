"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getQuestionCatalog, mockQuestions } from "@/data/placement-prep";

export default function CsMcqPage() {
  const [questions, setQuestions] = useState<typeof mockQuestions>(mockQuestions);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});

  useEffect(() => {
    setQuestions(getQuestionCatalog());
  }, []);

  const score = useMemo(
    () => questions.filter((question) => selectedAnswers[question.id] === question.correctAnswer).length,
    [questions, selectedAnswers]
  );

  const chooseAnswer = (questionId: number, option: string) => {
    setSelectedAnswers((current) => ({
      ...current,
      [questionId]: option,
    }));
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">CS MCQ</p>
            <h1 className="mt-2 text-3xl font-bold">Core topics practice</h1>
          </div>
          <div className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-700">
            Score: {score}/{questions.length}
          </div>
        </div>

        {questions.map((question) => {
          const selected = selectedAnswers[question.id];
          const isCorrect = selected === question.correctAnswer;

          return (
            <Card key={question.id}>
              <CardHeader>
                <CardTitle className="text-lg">{question.topic}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-base font-medium">{question.question}</p>
                <div className="grid gap-3">
                  {question.options.map((option) => {
                    const active = selected === option;
                    const correct = option === question.correctAnswer;
                    const variant = active
                      ? correct
                        ? "default"
                        : "destructive"
                      : correct && selected
                        ? "default"
                        : "outline";

                    return (
                      <Button
                        key={option}
                        type="button"
                        variant={variant}
                        className="justify-start text-left"
                        onClick={() => chooseAnswer(question.id, option)}
                      >
                        {option}
                      </Button>
                    );
                  })}
                </div>

                {selected && (
                  <div className={`rounded-xl border p-3 text-sm ${isCorrect ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200" : "border-amber-500/50 bg-amber-500/10 text-amber-900 dark:text-amber-200"}`}>
                    <p className="font-medium">{isCorrect ? "Correct" : "Review this topic"}</p>
                    <p className="mt-1">{question.explanation}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
