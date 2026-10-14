"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildMentorResponse, defaultProfile, type OnboardingProfile } from "@/data/placement-prep";
import { loadSyncedPrepState } from "@/lib/prep-state";

const defaultPrompts = [
  "How do I crack TCS in 14 days?",
  "What should I study today?",
  "Why am I weak in DBMS?",
  "Make a revision plan from my mistakes.",
];

export default function MentorPage() {
  const [profile, setProfile] = useState<OnboardingProfile>(defaultProfile);
  const [question, setQuestion] = useState(defaultPrompts[0]);
  const [mockHistory, setMockHistory] = useState<Array<{ score: number; total: number }>>([]);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    void loadSyncedPrepState().then((state) => {
      setProfile(state.profile);
      setMockHistory(state.mockHistory.map(({ score, total }) => ({ score, total })));
    });
  }, []);

  const insight = useMemo(
    () => buildMentorResponse(profile, question, mockHistory),
    [profile, question, mockHistory]
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = [
      insight.summary,
      "",
      ...insight.plan.map((line) => `- ${line}`),
      "",
      "Focus on consistent execution: one skill topic, one DSA drill, and one revision block before you stop for the day.",
    ].join("\n");

    setAnswer(response);
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">AI mentor</p>
          <h1 className="mt-2 text-3xl font-bold">Personal guide for your next prep step</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Prompt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Suggested prompts</p>
                <div className="flex flex-wrap gap-2">
                  {defaultPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => setQuestion(prompt)}
                      className="rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground transition hover:bg-muted"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={5}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="Ask about your prep plan, weak areas, or the next step..."
                />
                <Button type="submit" className="w-full">Generate plan</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mentor response</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">Insight</p>
                <p className="mt-3 text-base font-medium">{insight.headline}</p>
              </div>

              <div className="rounded-2xl border border-border bg-muted/30 p-4">
                <p className="mb-3 text-sm font-medium text-muted-foreground">AI context</p>
                <p className="text-sm leading-7 text-foreground whitespace-pre-line">
                  {answer || `${insight.summary}\n\n- ${insight.plan.join("\n- ")}`}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
