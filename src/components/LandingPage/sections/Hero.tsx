"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Reveal } from "../../Common/reveal"
import { ArrowRight, Sparkles, Users } from "lucide-react"
import { Button } from "../../ui/button"

export default function Hero() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("")

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()
      setStatus(data.message || data.error)
      setEmail("")
    } catch (err) {
      setStatus("Failed to join. Try again later.")
    }
  }

  return (
    <section id="hero" aria-labelledby="hero-heading" className="pt-16 md:pt-24">
      <div className="container mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              Free-first, high-quality campus placement prep
            </span>

            <h1
              id="hero-heading"
              className="mt-6 text-balance bg-gradient-to-b from-white to-white/80 bg-clip-text text-4xl font-semibold leading-tight text-transparent sm:text-5xl md:text-6xl"
            >
              Be Placement Ready. Be Job Ready.
            </h1>

            <p className="mt-5 max-w-2xl text-pretty text-base text-white/70 sm:text-lg">
              PlacementReady helps you master essays, logic, core CS, DSA, aptitude, and interviews with AI feedback, trackers, and a thriving student community.
            </p>

            <div className="mt-8 w-full max-w-md">
              {/* FIX: added onSubmit + value + onChange */}
              {/* <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm shadow-lg"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email to join waitlist"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-lg border-none bg-transparent px-3 py-2 text-sm text-white placeholder-white/60 focus:outline-none"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="bg-emerald-500 text-emerald-950 hover:bg-emerald-400"
                >
                  Join Waitlist
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form> */}

              {/* Show status message */}
              {status && (
                <p className="mt-2 text-sm text-emerald-400">{status}</p>
              )}

              {/* Social Proof */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/60">
                <Users className="h-4 w-4 text-emerald-400" />
                <span>Already 200+ students joined this week </span>
              </div>
            </div>

            {/* Alternative CTA */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/15 hover:text-white bg-white/5 text-white hover:bg-white/10"
              >
                <Link href="#features">Explore Features</Link>
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Dashboard Preview */}
        <Reveal delay={120}>
          <div className="mt-14">
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] shadow-2xl">
              <Image
                priority
                width={1600}
                height={900}
                alt="PlacementReady dashboard preview"
                className="h-auto w-full"
                src={"/landing3.jpg"}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
