"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

type Experience = {
    id: string;
    role: string;
    company: string;
    period: string;
    url: string | null;
    description: string;
    tech_stack: string[];
    display_order: number;
};

type ExperienceForm = {
    role: string;
    company: string;
    period: string;
    url: string;
    description: string;
    tech_stack: string;
};

const emptyForm: ExperienceForm = {
    role: "",
    company: "",
    period: "",
    url: "",
    description: "",
    tech_stack: "",
};

export default function ExperienceEditor() {
    const supabase = createSupabaseBrowserClient();

    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [form, setForm] = useState<ExperienceForm>(emptyForm);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadExperiences();
    }, []);

    async function loadExperiences() {
        setLoading(true);

        const { data, error } = await supabase
            .from("experiences")
            .select("*")
            .order("display_order", { ascending: true })
            .order("created_at", { ascending: true });

        if (error) {
            console.error(error);
            setMessage(error.message);
            setLoading(false);
            return;
        }

        setExperiences(data ?? []);
        setLoading(false);
    }

    function updateField(
        field: keyof ExperienceForm,
        value: string,
    ) {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    }

    function startAdd() {
        setEditingId(null);
        setForm(emptyForm);
        setMessage("");
    }

    function startEdit(experience: Experience) {
        setEditingId(experience.id);

        setForm({
            role: experience.role,
            company: experience.company,
            period: experience.period,
            url: experience.url ?? "",
            description: experience.description,
            tech_stack: experience.tech_stack.join(", "),
        });

        setMessage("");
    }

    function cancelEdit() {
        setEditingId(null);
        setForm(emptyForm);
        setMessage("");
    }

    async function saveExperience() {
        if (
            !form.role.trim() ||
            !form.company.trim() ||
            !form.period.trim() ||
            !form.description.trim()
        ) {
            setMessage("Please fill in all required fields.");
            return;
        }

        setSaving(true);
        setMessage("");

        const techStack = form.tech_stack
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);

        if (editingId) {
            const { error } = await supabase
                .from("experiences")
                .update({
                    role: form.role.trim(),
                    company: form.company.trim(),
                    period: form.period.trim(),
                    url: form.url.trim() || null,
                    description: form.description.trim(),
                    tech_stack: techStack,
                })
                .eq("id", editingId);

            if (error) {
                console.error(error);
                setMessage(error.message);
                setSaving(false);
                return;
            }

            setMessage("Experience updated.");
        } else {
            const { data: lastExperience, error: orderError } =
                await supabase
                    .from("experiences")
                    .select("display_order")
                    .order("display_order", { ascending: false })
                    .limit(1)
                    .maybeSingle();

            if (orderError) {
                console.error(orderError);
                setMessage(orderError.message);
                setSaving(false);
                return;
            }

            const nextOrder =
                (lastExperience?.display_order ?? 0) + 1;

            const { error } = await supabase
                .from("experiences")
                .insert({
                    role: form.role.trim(),
                    company: form.company.trim(),
                    period: form.period.trim(),
                    url: form.url.trim() || null,
                    description: form.description.trim(),
                    tech_stack: techStack,
                    display_order: nextOrder,
                });

            if (error) {
                console.error(error);
                setMessage(error.message);
                setSaving(false);
                return;
            }

            setMessage("Experience added.");
        }

        setSaving(false);
        setEditingId(null);
        setForm(emptyForm);
        await loadExperiences();
    }

    async function deleteExperience(id: string) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this experience?",
        );

        if (!confirmed) {
            return;
        }

        setMessage("");

        const { error } = await supabase
            .from("experiences")
            .delete()
            .eq("id", id);

        if (error) {
            console.error(error);
            setMessage(error.message);
            return;
        }

        // Re-number remaining experiences so the order
        // always stays 1, 2, 3, ...
        const { data: remaining, error: fetchError } =
            await supabase
                .from("experiences")
                .select("id")
                .order("display_order", { ascending: true })
                .order("created_at", { ascending: true });

        if (fetchError) {
            console.error(fetchError);
            setMessage(fetchError.message);
            await loadExperiences();
            return;
        }

        for (let index = 0; index < (remaining ?? []).length; index++) {
            await supabase
                .from("experiences")
                .update({
                    display_order: index + 1,
                })
                .eq("id", remaining[index].id);
        }

        if (editingId === id) {
            cancelEdit();
        }

        setMessage("Experience deleted.");
        await loadExperiences();
    }

    async function moveExperience(
        index: number,
        direction: -1 | 1,
    ) {
        const newIndex = index + direction;

        if (
            newIndex < 0 ||
            newIndex >= experiences.length
        ) {
            return;
        }

        const current = experiences[index];
        const target = experiences[newIndex];

        setMessage("");

        const { error } = await supabase.rpc(
            "swap_experience_order",
            {
                first_id: current.id,
                second_id: target.id,
                first_order: current.display_order,
                second_order: target.display_order,
            },
        );

        if (error) {
            console.error(
                "Error reordering experiences:",
                error,
            );
            setMessage(error.message);
            return;
        }

        // Immediately reflect the new order in the UI.
        const reordered = [...experiences];

        [reordered[index], reordered[newIndex]] = [
            reordered[newIndex],
            reordered[index],
        ];

        // Keep the local display_order values correct.
        reordered.forEach((experience, i) => {
            experience.display_order = i + 1;
        });

        setExperiences(reordered);
        setMessage("Order updated.");
    }

    if (loading) {
        return (
            <div className="py-8 text-sm text-zinc-500">
                Loading experience...
            </div>
        );
    }

    return (
        <div className="space-y-10">
            {/* Experience list */}
            <div>

                <div className="divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
                    {experiences.length === 0 ? (
                        <div className="py-10 text-sm text-zinc-500">
                            No experience entries yet.
                        </div>
                    ) : (
                        experiences.map((experience, index) => (
                            <div
                                key={experience.id}
                                className="flex gap-4 py-6"
                            >
                                {/* Order */}
                                <div className="flex w-12 shrink-0 flex-col items-center gap-1">
                                    <span className="font-mono text-xs text-zinc-500">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <div className="flex flex-col gap-1">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                moveExperience(index, -1)
                                            }
                                            disabled={index === 0}
                                            aria-label="Move experience up"
                                            className="flex h-7 w-7 items-center justify-center border border-zinc-200 text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-20 dark:border-zinc-800 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
                                        >
                                            ↑
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                moveExperience(index, 1)
                                            }
                                            disabled={
                                                index === experiences.length - 1
                                            }
                                            aria-label="Move experience down"
                                            className="flex h-7 w-7 items-center justify-center border border-zinc-200 text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-20 dark:border-zinc-800 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
                                        >
                                            ↓
                                        </button>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-col justify-between gap-3 sm:flex-row">
                                        <div>
                                            <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                                                {experience.role}
                                            </h3>

                                            <p className="mt-1 text-sm text-zinc-500">
                                                {experience.company}
                                            </p>

                                            <p className="mt-1 font-mono text-xs text-zinc-500">
                                                {experience.period}
                                            </p>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    startEdit(experience)
                                                }
                                                className="border border-zinc-200 px-3 py-1.5 text-xs text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    deleteExperience(
                                                        experience.id,
                                                    )
                                                }
                                                className="border border-zinc-200 px-3 py-1.5 text-xs text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>

                                    <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                                        {experience.description}
                                    </p>

                                    {experience.tech_stack.length > 0 && (
                                        <p className="mt-3 font-mono text-xs text-zinc-500">
                                            {experience.tech_stack.join(" · ")}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Form */}
            <div className="border-t border-zinc-200 pt-8 dark:border-zinc-800">
                <div className="mb-6">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                        {editingId
                            ? "Edit experience"
                            : "Add experience"}
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    <Field
                        label="Role"
                        value={form.role}
                        onChange={(value) =>
                            updateField("role", value)
                        }
                        placeholder="Software Engineer 1"
                    />

                    <Field
                        label="Company"
                        value={form.company}
                        onChange={(value) =>
                            updateField("company", value)
                        }
                        placeholder="MRI Software"
                    />

                    <Field
                        label="Period"
                        value={form.period}
                        onChange={(value) =>
                            updateField("period", value)
                        }
                        placeholder="May 2025 — Present"
                    />

                    <Field
                        label="URL"
                        value={form.url}
                        onChange={(value) =>
                            updateField("url", value)
                        }
                        placeholder="https://..."
                    />

                    <div className="sm:col-span-2">
                        <Field
                            label="Technologies"
                            value={form.tech_stack}
                            onChange={(value) =>
                                updateField("tech_stack", value)
                            }
                            placeholder="C#, .NET, ASP.NET, SQL"
                        />
                        <p className="mt-2 text-xs text-zinc-500">
                            Separate technologies with commas.
                        </p>
                    </div>

                    <div className="sm:col-span-2">
                        <label className="mb-2 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                            Description
                        </label>

                        <textarea
                            value={form.description}
                            onChange={(event) =>
                                updateField(
                                    "description",
                                    event.target.value,
                                )
                            }
                            rows={6}
                            placeholder="Describe your responsibilities and work..."
                            className="w-full resize-y border border-zinc-200 bg-transparent px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 dark:border-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-500"
                        />
                    </div>
                </div>

                <div className="mt-6 flex items-center gap-3">
                    <button
                        type="button"
                        onClick={saveExperience}
                        disabled={saving}
                        className="border border-[var(--button-border)] bg-[var(--button-bg)] px-5 py-2.5 text-sm font-medium text-[var(--button-text)] transition hover:bg-[var(--button-hover)]"
                    >
                        {saving
                            ? "Saving..."
                            : editingId
                                ? "Update experience"
                                : "Add experience"}
                    </button>

                    {editingId && (
                        <button
                            type="button"
                            onClick={cancelEdit}
                            className="px-4 py-2.5 text-sm text-zinc-500 transition hover:text-zinc-900 dark:hover:text-zinc-100"
                        >
                            Cancel
                        </button>
                    )}
                </div>

                {message && (
                    <p className="mt-4 text-sm text-zinc-500">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

function Field({
    label,
    value,
    onChange,
    placeholder,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}) {
    return (
        <div>
            <label className="mb-2 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                {label}
            </label>

            <input
                type="text"
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
                placeholder={placeholder}
                className="w-full border border-zinc-200 bg-transparent px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 dark:border-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-500"
            />
        </div>
    );
}