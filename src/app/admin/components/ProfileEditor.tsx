"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

type Profile = {
    id: string;
    name: string;
    handle: string | null;
    role: string;
    email: string;
    intro: string;
    location: string;
    github: string | null;
    linkedin: string | null;
    leetcode: string | null;
};

export default function ProfileEditor({
    profile,
}: {
    profile: Profile;
}) {
    const [form, setForm] = useState({
        name: profile.name,
        handle: profile.handle ?? "",
        role: profile.role,
        email: profile.email,
        intro: profile.intro,
        location: profile.location,
        github: profile.github ?? "",
        linkedin: profile.linkedin ?? "",
        leetcode: profile.leetcode ?? "",
    });

    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    function updateField(field: keyof typeof form, value: string) {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    }

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        setSaving(true);
        setMessage("");

        const supabase = createSupabaseBrowserClient();

        const { error } = await supabase
            .from("profiles")
            .update({
                name: form.name,
                handle: form.handle || null,
                role: form.role,
                email: form.email,
                intro: form.intro,
                location: form.location,
                github: form.github || null,
                linkedin: form.linkedin || null,
                leetcode: form.leetcode || null,
            })
            .eq("id", profile.id);

        if (error) {
            setMessage(`Error: ${error.message}`);
        } else {
            setMessage("Changes saved.");
        }

        setSaving(false);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <Field
                label="Name"
                value={form.name}
                onChange={(value) => updateField("name", value)}
                required
            />

            <Field
                label="Handle"
                value={form.handle}
                onChange={(value) => updateField("handle", value)}
                placeholder="@adityapatel"
            />

            <Field
                label="Role"
                value={form.role}
                onChange={(value) => updateField("role", value)}
                required
            />

            <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={(value) => updateField("email", value)}
                required
            />

            <Field
                label="Location"
                value={form.location}
                onChange={(value) => updateField("location", value)}
                required
            />

            <TextArea
                label="Introduction"
                value={form.intro}
                onChange={(value) => updateField("intro", value)}
                required
            />

            <Field
                label="GitHub"
                value={form.github}
                onChange={(value) => updateField("github", value)}
                placeholder="https://github.com/..."
            />

            <Field
                label="LinkedIn"
                value={form.linkedin}
                onChange={(value) => updateField("linkedin", value)}
                placeholder="https://linkedin.com/in/..."
            />

            <Field
                label="LeetCode"
                value={form.leetcode}
                onChange={(value) => updateField("leetcode", value)}
                placeholder="https://leetcode.com/u/..."
            />

            <div className="flex items-center justify-between border-t border-white/10 pt-6">
                <p
                    className={`text-sm ${message.startsWith("Error")
                        ? "text-red-400"
                        : "text-zinc-500"
                        }`}
                >
                    {message}
                </p>


                <button
                    type="submit"
                    disabled={saving}
                    className="border border-[var(--button-border)] bg-[var(--button-bg)] px-5 py-2.5 text-sm font-medium text-[var(--button-text)] transition hover:bg-[var(--button-hover)]"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </form>
    );
}

function Field({
    label,
    value,
    onChange,
    type = "text",
    placeholder,
    required = false,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    placeholder?: string;
    required?: boolean;
}) {
    return (
        <div>
            <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                {label}
            </label>

            <input
                type={type}
                value={value}
                placeholder={placeholder}
                required={required}
                onChange={(event) => onChange(event.target.value)}
                className="w-full border border-white/10 bg-transparent px-4 py-3 text-sm text-zinc-200 outline-none transition placeholder:text-zinc-800 focus:border-zinc-500"
            />
        </div>
    );
}

function TextArea({
    label,
    value,
    onChange,
    required = false,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
}) {
    return (
        <div>
            <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                {label}
            </label>

            <textarea
                value={value}
                required={required}
                rows={5}
                onChange={(event) => onChange(event.target.value)}
                className="w-full resize-y border border-white/10 bg-transparent px-4 py-3 text-sm leading-6 text-zinc-200 outline-none transition placeholder:text-zinc-800 focus:border-zinc-500"
            />
        </div>
    );
}