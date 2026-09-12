import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <p className="text-xs text-zinc-600">
          {profile.name}
        </p>

        <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-700">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}