import { roadmap } from "@/data/placement-prep";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">Roadmap</p>
          <h1 className="mt-2 text-3xl font-bold">Placement preparation roadmap</h1>
        </div>

        {roadmap.map((step, index) => (
          <Card key={step.title}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-3">
                <span>
                  {index + 1}. {step.title}
                </span>
                <span className="text-sm font-medium text-emerald-600">{step.progress}%</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">{step.description}</p>
              <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" style={{ width: `${step.progress}%` }} />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">Next action: {step.nextAction}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
