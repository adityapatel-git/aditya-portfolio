import About from "@/components/About";
import DeveloperActivity from "@/components/DeveloperActivity";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />

      <Hero />

      <About />

      <Experience />

      <Projects />

      <DeveloperActivity />

      <Education />

      <section id="contact" className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-32">
          <p className="mb-4 font-mono text-sm text-zinc-600">
            06 / Contact
          </p>

          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Let&apos;s build something.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-500">
            Whether it&apos;s a software project, an interesting problem, or
            just a conversation about technology, feel free to reach out.
          </p>

          <a
            href="mailto:patel.aditya@dal.ca"
            className="mt-8 inline-flex rounded-full bg-white px-6 py-3 font-medium text-zinc-950 transition hover:bg-zinc-200"
          >
            patel.aditya@dal.ca ↗
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}