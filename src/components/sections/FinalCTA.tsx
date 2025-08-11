import React from 'react'
import { Reveal } from '../reveal'
import { Button } from '../ui/button'
import Link from 'next/link'


export default function FinalCTA() {
  return (
        <section id="get-started" className="relative py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <Reveal>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br  p-8 text-center shadow-xl">
                <h2 className="text-pretty text-2xl font-semibold sm:text-3xl">
                  {"Your placement journey starts today."}
                </h2>
                <p className="mx-auto mt-2 max-w-2xl text-white/80">
                  {"Join thousands of students preparing smarter with PlacementReady—free to start, upgrade anytime."}
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Button asChild size="lg" className="bg-emerald-500 text-emerald-950 hover:bg-emerald-400">
                    <Link href="/signup">{"Create Free Account"}</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white/15 hover:text-white bg-white/5 text-white hover:bg-white/10"
                  >
                    <Link href="#features">{"Explore Features"}</Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
  )
}


