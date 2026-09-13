"use client";

import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Activity", href: "#developerActivity" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  function handleNavigation() {
    setOpen(false);
  }

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <a
          href="#"
          onClick={handleNavigation}
          className="font-mono text-lg font-semibold tracking-tight"
        >
          <span className="text-zinc-500">&lt;</span>
          AP
          <span className="text-zinc-500">/&gt;</span>
        </a>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-6 sm:flex">
          <div className="flex gap-6 text-sm text-zinc-400">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="menu-toggle flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition hover:border-zinc-400"
          >
            <span className="relative h-3.5 w-4">
              <span
                className={`absolute left-0 top-0 h-px w-4 bg-current transition-transform duration-200 ${open ? "translate-y-[6px] rotate-45" : ""
                  }`}
              />

              <span
                className={`absolute left-0 top-[6px] h-px w-4 bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""
                  }`}
              />

              <span
                className={`absolute left-0 top-3 h-px w-4 bg-current transition-transform duration-200 ${open ? "-translate-y-[6px] -rotate-45" : ""
                  }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-white/5 bg-zinc-950/95 backdrop-blur-xl transition-all duration-200 sm:hidden ${open
          ? "max-h-[500px] opacity-100"
          : "max-h-0 opacity-0"
          }`}
      >
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="divide-y divide-white/5">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavigation}
                className="flex items-center justify-between py-4 text-sm text-zinc-400 transition-colors hover:text-white"
              >
                <span>{item.label}</span>

                <span className="font-mono text-[10px] text-zinc-700">
                  0{index + 1}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}