import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const dsaTopics = [
  "Arrays",
  "Strings",
  "Hashing",
  "Two Pointers",
  "Sliding Window",
  "Stack & Queue",
  "Linked List",
  "Trees",
  "Graphs",
  "Heaps",
  "Recursion",
  "Dynamic Programming",
];

export default function DsaJournalPage() {
  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">DSA Journal</p>
          <h1 className="mt-2 text-3xl font-bold">Topic roadmap</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {dsaTopics.map((topic, index) => (
            <Card key={topic}>
              <CardHeader>
                <CardTitle className="text-base">{index + 1}. {topic}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Status</span>
                  <span className={index < 4 ? "text-emerald-600" : "text-amber-600"}>{index < 4 ? "In progress" : "Queued"}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
