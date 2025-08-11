import Hero from "@/components/sections/Hero";
import { Navbar } from "@/components/sections/Navbar";
import Bg from "@/components/bg";
import Features from "@/components/sections/Features";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";



export default function Home() {
  return (
        <div className="min-h-svh bg-neutral-950 text-white antialiased">
        <Bg />
        <Navbar />
        <main id="main" className="relative">
          <Hero />
          <Features />
          <FinalCTA />
          <Footer />


        </main>
        </div>

  );
}
