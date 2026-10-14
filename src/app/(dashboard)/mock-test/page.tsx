"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockQuestions } from "@/data/placement-prep";
import { appendMockResult, loadSyncedPrepState } from "@/lib/prep-state";

export default function MockTestPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [submitted, setSubmitted] = useState(false);
  const [history, setHistory] = useState<{ score: number; total: number; date: string }[]>([]);

  useEffect(() => {
    void loadSyncedPrepState().then(({ mockHistory }) => setHistory(mockHistory));
  }, []);

  useEffect(() => {
    if (submitted) return;

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [timeLeft, submitted]);

  const currentQuestion = mockQuestions[currentIndex];

  const score = useMemo(
    () => mockQuestions.filter((question) => selectedAnswers[question.id] === question.correctAnswer).length,
    [selectedAnswers]
  );

  const percentage = useMemo(
    () => Math.round((score / mockQuestions.length) * 100),
    [score]
  );

  const chooseAnswer = (option: string) => {
    setSelectedAnswers((current) => ({
      ...current,
      [currentQuestion.id]: option,
    }));
  };

  const handleSubmit = () => {
    if (submitted) return;

    const result = {
      score,
      total: mockQuestions.length,
      date: new Date().toISOString(),
    };

    const nextHistory = appendMockResult(result);
    setHistory(nextHistory);
    setSubmitted(true);
  };

  const nextQuestion = () => {
    if (currentIndex < mockQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const formatTime = (value: number) => {
    const minutes = Math.floor(value / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (value % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">Mock tests</p>
            <h1 className="mt-2 text-3xl font-bold">Company-style practice</h1>
          </div>
          <div className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-700">
            {submitted ? `${percentage}%` : `Time left: ${formatTime(timeLeft)}`}
          </div>
        </div>

        {!submitted ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-4">
                <span>Question {currentIndex + 1}/{mockQuestions.length}</span>
                <span className="text-sm text-muted-foreground">{currentQuestion.topic}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-xl font-semibold">{currentQuestion.question}</p>

              <div className="grid gap-3">
                {currentQuestion.options.map((option) => {
                  const active = selectedAnswers[currentQuestion.id] === option;

                  return (
                    <Button
                      key={option}
                      type="button"
                      variant={active ? "default" : "outline"}
                      className="justify-start text-left"
                      onClick={() => chooseAnswer(option)}
                    >
                      {option}
                    </Button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">Score so far: {score}/{mockQuestions.length}</p>
                <Button onClick={nextQuestion}>
                  {currentIndex === mockQuestions.length - 1 ? "Submit mock" : "Next question"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Mock summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-border p-4">
                  <p className="text-sm text-muted-foreground">Score</p>
                  <p className="mt-2 text-3xl font-bold">{score}/{mockQuestions.length}</p>
                </div>
                <div className="rounded-2xl border border-border p-4">
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                  <p className="mt-2 text-3xl font-bold">{percentage}%</p>
                </div>
                <div className="rounded-2xl border border-border p-4">
                  <p className="text-sm text-muted-foreground">Time used</p>
                  <p className="mt-2 text-3xl font-bold">{formatTime(45 * 60 - timeLeft)}</p>
                </div>
              </div>

              <div className="space-y-4">
                {mockQuestions.map((question) => {
                  const selected = selectedAnswers[question.id];
                  const isCorrect = selected === question.correctAnswer;

                  return (
                    <div key={question.id} className="rounded-2xl border border-border p-4">
                      <p className="font-medium">{question.topic}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{question.question}</p>
                      <p className={`mt-3 text-sm ${isCorrect ? "text-emerald-600" : "text-amber-600"}`}>
                        Your answer: {selected || "No answer"} {isCorrect ? "(correct)" : `(correct answer: ${question.correctAnswer})`}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">{question.explanation}</p>
                    </div>
                  );
                })}
              </div>

              {history.length > 0 && (
                <div className="rounded-2xl border border-border p-4">
                  <p className="mb-2 font-medium">Recent mock history</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    {history
                      .slice()
                      .reverse()
                      .map((entry, index) => (
                        <div key={`${entry.date}-${index}`} className="flex items-center justify-between gap-3">
                          <span>{new Date(entry.date).toLocaleDateString()}</span>
                          <span>
                            {entry.score}/{entry.total}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              <Button onClick={() => window.location.reload()}>Retake mock</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
