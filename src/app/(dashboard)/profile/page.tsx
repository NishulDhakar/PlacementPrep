"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { defaultProfile, type OnboardingProfile } from "@/data/placement-prep";
import { loadSyncedPrepState } from "@/lib/prep-state";

export default function ProfilePage() {
  const [profile, setProfile] = useState<OnboardingProfile>(defaultProfile);

  useEffect(() => {
    void loadSyncedPrepState().then(({ profile: savedProfile }) => setProfile(savedProfile));
  }, []);

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">Profile</p>
          <h1 className="mt-2 text-3xl font-bold">Your placement profile</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Student details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-center justify-between gap-3 border-b border-border pb-2">
                <span>Branch</span>
                <span className="font-medium text-foreground">{profile.branch}</span>
              </div>
              <div className="flex items-center justify-between gap-3 border-b border-border pb-2">
                <span>Graduation year</span>
                <span className="font-medium text-foreground">{profile.graduationYear}</span>
              </div>
              <div className="flex items-center justify-between gap-3 border-b border-border pb-2">
                <span>Current level</span>
                <span className="font-medium text-foreground">{profile.level}</span>
              </div>
              <div className="flex items-center justify-between gap-3 border-b border-border pb-2">
                <span>Target role</span>
                <span className="font-medium text-foreground">{profile.targetRole}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Study hours</span>
                <span className="font-medium text-foreground">{profile.dailyStudyHours} hrs/day</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Target companies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.targetCompanies.map((company) => (
                  <span
                    key={company}
                    className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-700 dark:text-emerald-200"
                  >
                    {company}
                  </span>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">Interview date</p>
                <p className="mt-2">{profile.interviewDate || "Not set yet"}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-7 text-muted-foreground">{profile.goals}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
