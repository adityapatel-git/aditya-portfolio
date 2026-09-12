import { profile } from "@/data/profile";

export default function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="font-mono text-lg font-semibold">
          <span className="text-zinc-500">&lt;</span>
          AP
          <span className="text-zinc-500">/&gt;</span>
        </a>

        <div className="hidden gap-6 text-sm text-zinc-400 sm:flex">
          <a href="#about" className="transition hover:text-white">
            About
          </a>

          <a href="#experience" className="transition hover:text-white">
            Experience
          </a>

          <a href="#projects" className="transition hover:text-white">
            Projects
          </a>

          <a href="#education" className="transition hover:text-white">
            Education
          </a>

          <a href="#contact" className="transition hover:text-white">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}