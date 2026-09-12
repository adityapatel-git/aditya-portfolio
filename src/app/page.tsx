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
    <main className="min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* About */}
      <About />

      {/* Experience */}
      <Experience />

      {/* Projects */}
      <Projects />

      {/* Developer Activity */}
      <DeveloperActivity />

      {/* Education */}
      <Education />

      {/* Contact */}
      <section
        id="contact"
        className="relative border-t border-white/5"
      >
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-32 sm:py-40">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-zinc-600">
            07 / Contact
          </p>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                Let&apos;s build
                <br />
                something.
              </h2>

              <p className="mt-7 max-w-xl text-base leading-7 text-zinc-500 sm:text-lg">
                Have an interesting problem, project, or opportunity?
                I&apos;d be happy to hear from you.
              </p>
            </div>

            <a
              href="mailto:patel.aditya@dal.ca"
              className="group flex w-fit items-center gap-3 border-b border-zinc-700 pb-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-300 hover:text-white"
            >
              patel.aditya@dal.ca

              <span className="transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1">
                ↗
              </span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}