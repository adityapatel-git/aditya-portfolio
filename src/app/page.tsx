import About from "@/components/About";
import DeveloperActivity from "@/components/DeveloperActivity";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />

      <div className="snap-y snap-mandatory">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <DeveloperActivity />
        <Education />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}