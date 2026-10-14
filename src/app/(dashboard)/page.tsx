"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BookOpen, BrainCircuit, CalendarClock, ChartNoAxesCombined, CircleCheckBig, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createDashboardSnapshot, defaultProfile, roadmap } from "@/data/placement-prep";
import { loadSyncedPrepState } from "@/lib/prep-state";

export default function DashboardPage() {
  const [profile, setProfile] = useState(defaultProfile);

  useEffect(() => {
    void loadSyncedPrepState().then(({ profile: savedProfile }) => setProfile(savedProfile));
  }, []);

  const snapshot = useMemo(() => createDashboardSnapshot(profile), [profile]);

  return (
    <div className="min-h-screen bg-background px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 rounded-3xl border border-border/80 bg-gradient-to-br from-emerald-500/10 via-background to-sky-500/10 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">Placement prep</p>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, {profile.branch.split(" ")[0] || "student"}.</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Your plan is tuned for {profile.targetRole.toLowerCase()} prep with focus on {profile.targetCompanies.join(", ")}.
            </p>
          </div>
          <Link href="/onboarding">
            <Button variant="outline">Edit profile</Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Readiness score</CardTitle>
              <ChartNoAxesCombined className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{snapshot.readinessScore}%</div>
              <p className="mt-2 text-xs text-muted-foreground">Strong signal for your current path.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Current streak</CardTitle>
              <CircleCheckBig className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{snapshot.streak}d</div>
              <p className="mt-2 text-xs text-muted-foreground">Keep the momentum going with one focused session.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Daily study time</CardTitle>
              <CalendarClock className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{snapshot.dailyStudyHours}h</div>
              <p className="mt-2 text-xs text-muted-foreground">Comfortable plan for your current schedule.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Today’s next action</CardTitle>
              <Sparkles className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold">{snapshot.targetCompanies[0]}</div>
              <p className="mt-2 text-xs text-muted-foreground">{snapshot.recommendedNextAction}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <BookOpen className="h-5 w-5 text-emerald-600" />
                Preparation roadmap
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {roadmap.map((item) => (
                <div key={item.title} className="rounded-2xl border border-border p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <span className="text-sm font-medium text-emerald-600">{item.progress}%</span>
                  </div>
                  <div className="mb-2 h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" style={{ width: `${item.progress}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground">Next: {item.nextAction}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BrainCircuit className="h-5 w-5 text-emerald-600" />
                  Weak topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {snapshot.weakTopics.map((topic) => (
                  <div key={topic} className="rounded-xl bg-muted/60 px-3 py-2 text-sm text-muted-foreground">
                    {topic}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Due revisions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {snapshot.dueRevisions.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/roadmap" className="block">
            <Button className="h-auto w-full justify-start rounded-2xl border bg-background p-5 text-left shadow-sm" variant="outline">
              <div>
                <p className="text-base font-semibold">Roadmap</p>
                <p className="mt-1 text-sm text-muted-foreground">Follow your structured placement path.</p>
              </div>
            </Button>
          </Link>
          <Link href="/cs-mcq" className="block">
            <Button className="h-auto w-full justify-start rounded-2xl border bg-background p-5 text-left shadow-sm" variant="outline">
              <div>
                <p className="text-base font-semibold">CS MCQ Practice</p>
                <p className="mt-1 text-sm text-muted-foreground">Analyze weak areas with topic-based questions.</p>
              </div>
            </Button>
          </Link>
          <Link href="/company/tcs" className="block">
            <Button className="h-auto w-full justify-start rounded-2xl border bg-background p-5 text-left shadow-sm" variant="outline">
              <div>
                <p className="text-base font-semibold">Company prep</p>
                <p className="mt-1 text-sm text-muted-foreground">Review target-company patterns and strategy.</p>
              </div>
            </Button>
          </Link>
          <Link href="/mentor" className="block">
            <Button className="h-auto w-full justify-start rounded-2xl border bg-background p-5 text-left shadow-sm" variant="outline">
              <div>
                <p className="text-base font-semibold">AI mentor</p>
                <p className="mt-1 text-sm text-muted-foreground">Ask for a daily plan based on your preparation status.</p>
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
