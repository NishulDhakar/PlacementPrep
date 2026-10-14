"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { companyProfiles, getCompanyCatalog } from "@/data/placement-prep";

export default function CompanyPage() {
  const params = useParams<{ slug: string }>();
  const [catalog, setCatalog] = useState(companyProfiles);

  useEffect(() => {
    setCatalog(getCompanyCatalog());
  }, []);

  const slug = params?.slug ?? "tcs";
  const company = useMemo(() => catalog[slug] ?? catalog.tcs ?? companyProfiles.tcs, [catalog, slug]);

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">Company prep</p>
          <h1 className="mt-2 text-3xl font-bold">{company.name}</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Placement process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {company.rounds.map((round: string) => (
                <span key={round} className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-700 dark:text-emerald-200">
                  {round}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Focus areas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {company.focus.map((topic: string) => (
              <div key={topic} className="rounded-xl border border-border bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
                {topic}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended strategy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{company.strategy}</p>
            <p className="mt-4 text-sm text-muted-foreground">Last verified: {company.lastVerified}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
