"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function AdminLoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");
        setLoading(true);

        const supabase = createSupabaseBrowserClient();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        router.push("/admin");
        router.refresh();
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-zinc-100">
            <div className="w-full max-w-sm">
                <div className="mb-10">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-600">
                        AP / Admin
                    </p>

                    <h1 className="mt-4 text-3xl font-bold tracking-tight">
                        Sign in.
                    </h1>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="w-full border border-white/10 bg-transparent px-4 py-3 text-sm text-zinc-200 outline-none transition focus:border-zinc-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="w-full border border-white/10 bg-transparent px-4 py-3 text-sm text-zinc-200 outline-none transition focus:border-zinc-500"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-400">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="border border-[var(--button-border)] bg-[var(--button-bg)] px-5 py-2.5 text-sm font-medium text-[var(--button-text)] transition hover:bg-[var(--button-hover)]"
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>
            </div>
        </main>
    );
}