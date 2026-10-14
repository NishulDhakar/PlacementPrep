"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const defaultSettings = {
  dailyReminders: true,
  weeklyReport: true,
  mentorHints: false,
  mockNotifications: true,
};

export default function SettingsPage() {
  const [settings, setSettings] = useState(defaultSettings);

  const toggleSetting = (key: keyof typeof defaultSettings) => {
    setSettings((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">Settings</p>
          <h1 className="mt-2 text-3xl font-bold">Your prep preferences</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(defaultSettings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between gap-3 rounded-2xl border border-border p-4">
                <div>
                  <p className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                  <p className="text-sm text-muted-foreground">
                    {value ? "Enabled" : "Disabled"}
                  </p>
                </div>

                <button
                  type="button"
                  aria-pressed={settings[key as keyof typeof defaultSettings]}
                  onClick={() => toggleSetting(key as keyof typeof defaultSettings)}
                  className={`relative h-7 w-12 rounded-full transition ${settings[key as keyof typeof defaultSettings] ? "bg-emerald-500" : "bg-muted"}`}
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${settings[key as keyof typeof defaultSettings] ? "left-6" : "left-1"}`}
                  />
                </button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button>Save preferences</Button>
        </div>
      </div>
    </div>
  );
}
