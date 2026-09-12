import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section className="mx-auto flex min-h-screen max-w-6xl items-center px-6 pb-20 pt-32">
      <div className="max-w-4xl">
        <p className="mb-6 font-mono text-sm text-zinc-500">
          {"> hello, world"}
        </p>

        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
          Hi, I&apos;m{" "}
          <span className="text-zinc-400">{profile.name}.</span>
        </h1>

        <p className="mt-6 max-w-3xl text-xl leading-relaxed text-zinc-400 sm:text-2xl">
          {profile.intro}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-medium transition hover:border-zinc-400 hover:bg-zinc-900"
          >
            GitHub ↗
          </a>

          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-medium transition hover:border-zinc-400 hover:bg-zinc-900"
          >
            LinkedIn ↗
          </a>

          <a
            href={profile.links.leetcode}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-medium transition hover:border-zinc-400 hover:bg-zinc-900"
          >
            LeetCode ↗
          </a>

          <a
            href={profile.links.email}
            className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
          >
            Get in touch
          </a>
        </div>

        <div className="mt-14 flex items-center gap-3 font-mono text-sm text-zinc-600">
          <span className="h-px w-10 bg-zinc-800" />
          {profile.handle}
        </div>
      </div>
    </section>
  );
}