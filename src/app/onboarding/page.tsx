"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { defaultProfile, type OnboardingProfile } from "@/data/placement-prep";
import { loadSyncedPrepState, saveSyncedProfile } from "@/lib/prep-state";

export default function OnboardingPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<OnboardingProfile>(defaultProfile);

  useEffect(() => {
    void loadSyncedPrepState().then(({ profile: savedProfile }) => setProfile(savedProfile));
  }, []);

  const updateField = (field: keyof OnboardingProfile, value: string | number | string[]) => {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveSyncedProfile(profile);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">Placement Prepy</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">Create your prep profile</h1>
          <p className="mt-2 text-muted-foreground">Tell us where you are today and we will map the fastest path to placement readiness.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle>Onboarding details</CardTitle>
              <CardDescription>Use this to personalize your roadmap, practice plan, and target-company recommendations.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="branch">Branch</Label>
                    <Input id="branch" value={profile.branch} onChange={(e) => updateField("branch", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Graduation year</Label>
                    <Input id="year" value={profile.graduationYear} onChange={(e) => updateField("graduationYear", e.target.value)} />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="level">Current level</Label>
                    <select
                      id="level"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={profile.level}
                      onChange={(e) => updateField("level", e.target.value as OnboardingProfile["level"])}
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Target role</Label>
                    <select
                      id="role"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={profile.targetRole}
                      onChange={(e) => updateField("targetRole", e.target.value as OnboardingProfile["targetRole"])}
                    >
                      <option>Software Engineer</option>
                      <option>Frontend Developer</option>
                      <option>Backend Developer</option>
                      <option>Data Analyst</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companies">Target companies</Label>
                  <Input
                    id="companies"
                    value={profile.targetCompanies.join(", ")}
                    onChange={(e) => updateField("targetCompanies", e.target.value.split(",").map((entry) => entry.trim()).filter(Boolean))}
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="hours">Daily study hours</Label>
                    <Input
                      id="hours"
                      type="number"
                      min={1}
                      max={12}
                      value={profile.dailyStudyHours}
                      onChange={(e) => updateField("dailyStudyHours", Number(e.target.value) || 1)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Interview date</Label>
                    <Input id="date" type="date" value={profile.interviewDate} onChange={(e) => updateField("interviewDate", e.target.value)} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goals">Main goals</Label>
                  <textarea
                    id="goals"
                    rows={4}
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={profile.goals}
                    onChange={(e) => updateField("goals", e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={() => router.push("/")}>
                    Skip for now
                  </Button>
                  <Button type="submit">Continue to dashboard</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-sky-500/10">
            <CardHeader>
              <CardTitle>What this unlocks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-border bg-background/70 p-4">
                <p className="text-sm font-semibold text-emerald-600">Recommended next step</p>
                <p className="mt-2 text-sm text-muted-foreground">Complete one DBMS revision set and one medium DSA problem on trees before your next mock.</p>
              </div>
              <div className="rounded-2xl border border-border bg-background/70 p-4">
                <p className="text-sm font-semibold text-emerald-600">Focus areas</p>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  <li>• OS + DBMS fundamentals</li>
                  <li>• Company-specific aptitude practice</li>
                  <li>• Timed mock performance review</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-background/70 p-4">
                <p className="text-sm font-semibold text-emerald-600">Preparation window</p>
                <p className="mt-2 text-sm text-muted-foreground">{profile.interviewDate ? `Next major milestone: ${profile.interviewDate}` : "Add your interview date to personalize the plan."}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
