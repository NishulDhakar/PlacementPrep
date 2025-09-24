import Hero from "@/components/LandingPage/sections/Hero";
// import { Navbar } from "@/components/LandingPage/sections/Navbar";
import Bg from "@/components/Common/bg";
import Features from "@/components/LandingPage/sections/Features";
import FinalCTA from "@/components/LandingPage/sections/FinalCTA";
import Footer from "@/components/LandingPage/sections/Footer";



export default function Home() {
  return (
        <div className="min-h-svh bg-neutral-950 text-white antialiased">
        <Bg />
        {/* <Navbar /> */}
        <main id="main" className="relative">
          <Hero />
          <Features />
          <FinalCTA />
          <Footer />
        </main>
        </div>
  );
}
