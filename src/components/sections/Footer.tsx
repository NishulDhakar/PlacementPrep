import { GraduationCap } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


export default function Footer() {
  return (
      <footer className="relative border-t border-white/10 bg-black/40">
        <div className="container mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-emerald-400" aria-hidden="true" />
                <span className="font-semibold">PlacementReady</span>
              </div>
              <p className="mt-2 text-sm text-white/70">
                {"Preparation hub for students serious about campus placements."}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold">{"Product"}</p>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li>
                  <Link href="#features" className="hover:text-white">
                    {"Features"}
                  </Link>
                </li>
                {/* <li>
                  <Link href="#why" className="hover:text-white">
                    {"Why PlacementReady"}
                  </Link>
                </li>
                <li>
                  <Link href="#success" className="hover:text-white">
                    {"Success Stories"}
                  </Link>
                </li> */}
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold">{"Company"}</p>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                {/* <li>
                  <Link href="/about" className="hover:text-white">
                    {"About"}
                  </Link>
                </li> */}
                <li>
                  <Link href="https://www.nishul.dev/" target='_blank' className="hover:text-white">
                    {"Contact"}
                  </Link>
                </li>
                {/* <li>
                  <Link href="/careers" className="hover:text-white">
                    {"Careers"}
                  </Link>
                </li> */}
              </ul>
            </div>
{/* 
            <div>
              <p className="text-sm font-semibold">{"Legal"}</p>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    {"Privacy Policy"}
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    {"Terms of Service"}
                  </Link>
                </li>
              </ul>
            </div> */}
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row">
            <p>© {new Date().getFullYear()} PlacementReady. All rights reserved.</p>
            <nav aria-label="Social links" className="flex items-center gap-4">
              <Link
                aria-label="Twitter"
                href="https://twitter.com"
                target="_blank"
                className="rounded-md p-2 text-white/70 transition hover:bg-white/5 hover:text-white"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.633 7.997c.013.176.013.353.013.529 0 5.39-4.103 11.608-11.608 11.608-2.307 0-4.453-.676-6.256-1.843.322.038.63.051.965.051a8.208 8.208 0 0 0 5.09-1.753 4.104 4.104 0 0 1-3.827-2.841c.255.038.51.064.777.064.374 0 .748-.051 1.096-.14a4.096 4.096 0 0 1-3.287-4.025v-.051c.54.304 1.165.49 1.83.516a4.09 4.09 0 0 1-1.828-3.415c0-.765.204-1.47.56-2.083a11.65 11.65 0 0 0 8.457 4.292 4.622 4.622 0 0 1-.102-.94 4.1 4.1 0 0 1 7.096-2.803 8.07 8.07 0 0 0 2.603-.991 4.12 4.12 0 0 1-1.803 2.263 8.204 8.204 0 0 0 2.366-.64 8.843 8.843 0 0 1-2.054 2.123z" />
                </svg>
              </Link>
              <Link
                aria-label="LinkedIn"
                href="https://linkedin.com"
                target="_blank"
                className="rounded-md p-2 text-white/70 transition hover:bg-white/5 hover:text-white"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.06c.53-1 1.84-2.2 3.78-2.2 4.04 0 4.78 2.66 4.78 6.12V24h-4v-7.1c0-1.7-.03-3.88-2.36-3.88-2.37 0-2.73 1.85-2.73 3.76V24h-4V8z" />
                </svg>
              </Link>
            </nav>
          </div>
        </div>
      </footer>
  )
}


