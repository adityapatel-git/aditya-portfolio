"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

type Skill = {
    id: string;
    name: string;
    category: string;
    display_order: number;
};

type SkillForm = {
    name: string;
    category: string;
};

const categories = [
    "Backend",
    "Frontend",
    "Data",
    "Cloud & Infrastructure",
];

const emptyForm: SkillForm = {
    name: "",
    category: "Backend",
};

export default function SkillsEditor() {
    const supabase = createSupabaseBrowserClient();

    const [skills, setSkills] = useState<Skill[]>([]);
    const [form, setForm] = useState<SkillForm>(emptyForm);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadSkills();
    }, []);

    async function loadSkills() {
        setLoading(true);

        const { data, error } = await supabase
            .from("skills")
            .select("*")
            .order("category", { ascending: true })
            .order("display_order", { ascending: true })
            .order("created_at", { ascending: true });

        if (error) {
            console.error(error);
            setMessage(error.message);
            setLoading(false);
            return;
        }

        setSkills(data ?? []);
        setLoading(false);
    }

    function startAdd() {
        setEditingId(null);
        setForm(emptyForm);
        setMessage("");
    }

    function startEdit(skill: Skill) {
        setEditingId(skill.id);

        setForm({
            name: skill.name,
            category: skill.category,
        });

        setMessage("");
    }

    function cancelEdit() {
        setEditingId(null);
        setForm(emptyForm);
        setMessage("");
    }

    async function saveSkill() {
        if (!form.name.trim() || !form.category) {
            setMessage("Please fill in all required fields.");
            return;
        }

        setSaving(true);
        setMessage("");

        if (editingId) {
            const { error } = await supabase
                .from("skills")
                .update({
                    name: form.name.trim(),
                    category: form.category,
                })
                .eq("id", editingId);

            if (error) {
                console.error(error);
                setMessage(error.message);
                setSaving(false);
                return;
            }

            setMessage("Skill updated.");
        } else {
            const { data: lastSkill, error: orderError } =
                await supabase
                    .from("skills")
                    .select("display_order")
                    .eq("category", form.category)
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
                (lastSkill?.display_order ?? 0) + 1;

            const { error } = await supabase
                .from("skills")
                .insert({
                    name: form.name.trim(),
                    category: form.category,
                    display_order: nextOrder,
                });

            if (error) {
                console.error(error);
                setMessage(error.message);
                setSaving(false);
                return;
            }

            setMessage("Skill added.");
        }

        setSaving(false);
        setEditingId(null);
        setForm(emptyForm);

        await loadSkills();
    }

    async function deleteSkill(id: string) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this skill?",
        );

        if (!confirmed) {
            return;
        }

        setMessage("");

        const skill = skills.find((item) => item.id === id);

        const { error } = await supabase
            .from("skills")
            .delete()
            .eq("id", id);

        if (error) {
            console.error(error);
            setMessage(error.message);
            return;
        }

        // Re-number the remaining skills in the same category.
        if (skill) {
            const { data: remaining, error: fetchError } =
                await supabase
                    .from("skills")
                    .select("id")
                    .eq("category", skill.category)
                    .order("display_order", { ascending: true })
                    .order("created_at", { ascending: true });

            if (fetchError) {
                console.error(fetchError);
                setMessage(fetchError.message);
                await loadSkills();
                return;
            }

            for (
                let index = 0;
                index < (remaining ?? []).length;
                index++
            ) {
                await supabase
                    .from("skills")
                    .update({
                        display_order: index + 1,
                    })
                    .eq("id", remaining[index].id);
            }
        }

        if (editingId === id) {
            cancelEdit();
        }

        setMessage("Skill deleted.");
        await loadSkills();
    }

    async function moveSkill(
        index: number,
        direction: -1 | 1,
    ) {
        const current = skills[index];

        const categorySkills = skills.filter(
            (skill) => skill.category === current.category,
        );

        const categoryIndex = categorySkills.findIndex(
            (skill) => skill.id === current.id,
        );

        const newCategoryIndex = categoryIndex + direction;

        if (
            newCategoryIndex < 0 ||
            newCategoryIndex >= categorySkills.length
        ) {
            return;
        }

        const target = categorySkills[newCategoryIndex];

        setMessage("");

        const { error } = await supabase.rpc(
            "swap_skill_order",
            {
                first_id: current.id,
                second_id: target.id,
                first_order: current.display_order,
                second_order: target.display_order,
            },
        );

        if (error) {
            console.error("Error reordering skills:", error);
            setMessage(error.message);
            return;
        }

        setMessage("Order updated.");
        await loadSkills();
    }

    if (loading) {
        return (
            <div className="py-8 text-sm text-zinc-500">
                Loading skills...
            </div>
        );
    }

    return (
        <div className="space-y-10">
            {/* Skills list */}
            <div>
                <div className="space-y-8">
                    {categories.map((category) => {
                        const categorySkills = skills.filter(
                            (skill) => skill.category === category,
                        );

                        return (
                            <div key={category}>
                                <div className="mb-3 flex items-center justify-between">
                                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                                        {category}
                                    </p>

                                    <span className="font-mono text-xs text-zinc-600">
                                        {categorySkills.length}
                                    </span>
                                </div>

                                <div className="divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
                                    {categorySkills.length === 0 ? (
                                        <div className="py-5 text-sm text-zinc-500">
                                            No skills in this category.
                                        </div>
                                    ) : (
                                        categorySkills.map((skill) => {
                                            const categoryIndex =
                                                categorySkills.findIndex(
                                                    (item) =>
                                                        item.id === skill.id,
                                                );

                                            return (
                                                <div
                                                    key={skill.id}
                                                    className="flex items-center gap-4 py-4"
                                                >
                                                    <span className="w-8 shrink-0 font-mono text-xs text-zinc-500">
                                                        {String(
                                                            categoryIndex + 1,
                                                        ).padStart(2, "0")}
                                                    </span>

                                                    <span className="flex-1 text-sm text-zinc-900 dark:text-zinc-100">
                                                        {skill.name}
                                                    </span>

                                                    <div className="flex gap-1">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                moveSkill(
                                                                    skills.findIndex(
                                                                        (item) =>
                                                                            item.id ===
                                                                            skill.id,
                                                                    ),
                                                                    -1,
                                                                )
                                                            }
                                                            disabled={
                                                                categoryIndex === 0
                                                            }
                                                            aria-label="Move skill up"
                                                            className="flex h-7 w-7 items-center justify-center border border-zinc-200 text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-20 dark:border-zinc-800 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
                                                        >
                                                            ↑
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                moveSkill(
                                                                    skills.findIndex(
                                                                        (item) =>
                                                                            item.id ===
                                                                            skill.id,
                                                                    ),
                                                                    1,
                                                                )
                                                            }
                                                            disabled={
                                                                categoryIndex ===
                                                                categorySkills.length - 1
                                                            }
                                                            aria-label="Move skill down"
                                                            className="flex h-7 w-7 items-center justify-center border border-zinc-200 text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-20 dark:border-zinc-800 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
                                                        >
                                                            ↓
                                                        </button>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            startEdit(skill)
                                                        }
                                                        className="border border-zinc-200 px-3 py-1.5 text-xs text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            deleteSkill(skill.id)
                                                        }
                                                        className="border border-zinc-200 px-3 py-1.5 text-xs text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Form */}
            <div className="border-t border-zinc-200 pt-8 dark:border-zinc-800">
                <div className="mb-6">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                        {editingId ? "Edit skill" : "Add skill"}
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                            Skill
                        </label>

                        <input
                            type="text"
                            value={form.name}
                            onChange={(event) =>
                                setForm((current) => ({
                                    ...current,
                                    name: event.target.value,
                                }))
                            }
                            placeholder="C#"
                            className="w-full border border-zinc-200 bg-transparent px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 dark:border-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                            Category
                        </label>

                        <select
                            value={form.category}
                            onChange={(event) =>
                                setForm((current) => ({
                                    ...current,
                                    category: event.target.value,
                                }))
                            }
                            className="w-full border border-zinc-200 bg-transparent px-4 py-3 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                        >
                            {categories.map((category) => (
                                <option
                                    key={category}
                                    value={category}
                                >
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mt-6 flex items-center gap-3">
                    <button
                        type="button"
                        onClick={saveSkill}
                        disabled={saving}
                        className="border border-[var(--button-border)] bg-[var(--button-bg)] px-5 py-2.5 text-sm font-medium text-[var(--button-text)] transition hover:bg-[var(--button-hover)]"
                    >
                        {saving
                            ? "Saving..."
                            : editingId
                                ? "Update skill"
                                : "Add skill"}
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