import React from 'react'


export default function Bg() {
  return (
    <div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="hidden md:block absolute -bottom-64 right-1/2 h-96 w-[48rem] translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>
    </div>
  )
}


