import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-6 py-8 text-sm text-zinc-600 sm:flex-row">
        <p>© {new Date().getFullYear()} Aditya Patel</p>

        <div className="flex gap-5">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-zinc-300"
          >
            GitHub
          </a>

          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-zinc-300"
          >
            LinkedIn
          </a>

          <a
            href={profile.links.leetcode}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-zinc-300"
          >
            LeetCode
          </a>
        </div>
      </div>
    </footer>
  );
}