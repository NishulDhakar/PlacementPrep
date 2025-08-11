import React from "react";
import { Reveal } from "../../Common/reveal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { CheckCircle2 } from "lucide-react";
import { FEATURES } from "@/data/Feature";

export default function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative scroll-mt-24 mt-12 md:mt-30"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="features-heading"
              className="text-balance text-3xl font-semibold sm:text-4xl"
            >
              {"Everything you need to ace placements"}
            </h2>
            <p className="mt-3 text-white/70">
              {
                "Practice smarter with focused modules, AI-guided feedback, and trackers designed for real progress."
              }
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={60 + i * 40}>
              <Card className="h-full border-white/10 bg-black/40 backdrop-blur transition hover:shadow-lg hover:shadow-emerald-500/5">
                <CardHeader className="flex flex-row items-start gap-3">
                  <div>
                    <div className="flex gap-2 rounded-md border border-white/10 p-2 text-emerald-400 ring-1 ring-inset ring-white/5">
                      <f.icon className="h-7 w-7" />

                      <CardTitle className="text-white/70 text-xl">
                        {f.title}
                      </CardTitle>
                    </div>

                    <CardDescription className="mt-4 text-white/70">
                      {f.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                {f.points?.length ? (
                  <CardContent>
                    <ul className="space-y-2 text-sm text-white/70">
                      {f.points.map((p) => (
                        <li className="flex items-start gap-2" key={p}>
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-400" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                ) : null}
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
