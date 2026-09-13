"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

type Education = {
    id: string;
    degree: string;
    school: string;
    period: string;
    grade: string | null;
    display_order: number;
};

type EducationForm = {
    degree: string;
    school: string;
    period: string;
    grade: string;
};

const emptyForm: EducationForm = {
    degree: "",
    school: "",
    period: "",
    grade: "",
};

export default function EducationEditor() {
    const supabase = createSupabaseBrowserClient();

    const [education, setEducation] = useState<Education[]>([]);
    const [form, setForm] = useState<EducationForm>(emptyForm);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadEducation();
    }, []);

    async function loadEducation() {
        setLoading(true);

        const { data, error } = await supabase
            .from("education")
            .select("*")
            .order("display_order", { ascending: true })
            .order("created_at", { ascending: true });

        if (error) {
            console.error(error);
            setMessage(error.message);
            setLoading(false);
            return;
        }

        setEducation(data ?? []);
        setLoading(false);
    }

    function updateField(
        field: keyof EducationForm,
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

    function startEdit(item: Education) {
        setEditingId(item.id);

        setForm({
            degree: item.degree,
            school: item.school,
            period: item.period,
            grade: item.grade ?? "",
        });

        setMessage("");
    }

    function cancelEdit() {
        setEditingId(null);
        setForm(emptyForm);
        setMessage("");
    }

    async function saveEducation() {
        if (
            !form.degree.trim() ||
            !form.school.trim() ||
            !form.period.trim()
        ) {
            setMessage("Please fill in all required fields.");
            return;
        }

        setSaving(true);
        setMessage("");

        const educationData = {
            degree: form.degree.trim(),
            school: form.school.trim(),
            period: form.period.trim(),
            grade: form.grade.trim() || null,
        };

        if (editingId) {
            const { error } = await supabase
                .from("education")
                .update(educationData)
                .eq("id", editingId);

            if (error) {
                console.error(error);
                setMessage(error.message);
                setSaving(false);
                return;
            }

            setMessage("Education updated.");
        } else {
            const { data: lastItem, error: orderError } =
                await supabase
                    .from("education")
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
                (lastItem?.display_order ?? 0) + 1;

            const { error } = await supabase
                .from("education")
                .insert({
                    ...educationData,
                    display_order: nextOrder,
                });

            if (error) {
                console.error(error);
                setMessage(error.message);
                setSaving(false);
                return;
            }

            setMessage("Education added.");
        }

        setSaving(false);
        setEditingId(null);
        setForm(emptyForm);

        await loadEducation();
    }

    async function deleteEducation(id: string) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this education entry?",
        );

        if (!confirmed) {
            return;
        }

        setMessage("");

        const { error } = await supabase
            .from("education")
            .delete()
            .eq("id", id);

        if (error) {
            console.error(error);
            setMessage(error.message);
            return;
        }

        // Keep display_order sequential.
        const { data: remaining, error: fetchError } =
            await supabase
                .from("education")
                .select("id")
                .order("display_order", { ascending: true })
                .order("created_at", { ascending: true });

        if (fetchError) {
            console.error(fetchError);
            setMessage(fetchError.message);
            await loadEducation();
            return;
        }

        for (let index = 0; index < (remaining ?? []).length; index++) {
            await supabase
                .from("education")
                .update({
                    display_order: index + 1,
                })
                .eq("id", remaining[index].id);
        }

        if (editingId === id) {
            cancelEdit();
        }

        setMessage("Education deleted.");
        await loadEducation();
    }

    async function moveEducation(
        index: number,
        direction: -1 | 1,
    ) {
        const newIndex = index + direction;

        if (
            newIndex < 0 ||
            newIndex >= education.length
        ) {
            return;
        }

        const current = education[index];
        const target = education[newIndex];

        setMessage("");

        const { error } = await supabase.rpc(
            "swap_education_order",
            {
                first_id: current.id,
                second_id: target.id,
                first_order: current.display_order,
                second_order: target.display_order,
            },
        );

        if (error) {
            console.error(
                "Error reordering education:",
                error,
            );
            setMessage(error.message);
            return;
        }

        const reordered = [...education];

        [reordered[index], reordered[newIndex]] = [
            reordered[newIndex],
            reordered[index],
        ];

        reordered.forEach((item, i) => {
            item.display_order = i + 1;
        });

        setEducation(reordered);
        setMessage("Order updated.");
    }

    if (loading) {
        return (
            <div className="py-8 text-sm text-zinc-500">
                Loading education...
            </div>
        );
    }

    return (
        <div className="space-y-10">
            {/* Education list */}
            <div>

                <div className="divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
                    {education.length === 0 ? (
                        <div className="py-10 text-sm text-zinc-500">
                            No education entries yet.
                        </div>
                    ) : (
                        education.map((item, index) => (
                            <div
                                key={item.id}
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
                                                moveEducation(index, -1)
                                            }
                                            disabled={index === 0}
                                            aria-label="Move education up"
                                            className="flex h-7 w-7 items-center justify-center border border-zinc-200 text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-20 dark:border-zinc-800 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
                                        >
                                            ↑
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                moveEducation(index, 1)
                                            }
                                            disabled={
                                                index === education.length - 1
                                            }
                                            aria-label="Move education down"
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
                                                {item.degree}
                                            </h3>

                                            <p className="mt-1 text-sm text-zinc-500">
                                                {item.school}
                                            </p>

                                            <p className="mt-1 font-mono text-xs text-zinc-500">
                                                {item.period}
                                            </p>

                                            {item.grade && (
                                                <p className="mt-1 text-xs text-zinc-500">
                                                    {item.grade}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    startEdit(item)
                                                }
                                                className="border border-zinc-200 px-3 py-1.5 text-xs text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    deleteEducation(item.id)
                                                }
                                                className="border border-zinc-200 px-3 py-1.5 text-xs text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
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
                            ? "Edit education"
                            : "Add education"}
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    <Field
                        label="Degree"
                        value={form.degree}
                        onChange={(value) =>
                            updateField("degree", value)
                        }
                        placeholder="Master of Applied Computer Science"
                    />

                    <Field
                        label="School"
                        value={form.school}
                        onChange={(value) =>
                            updateField("school", value)
                        }
                        placeholder="Dalhousie University"
                    />

                    <Field
                        label="Period"
                        value={form.period}
                        onChange={(value) =>
                            updateField("period", value)
                        }
                        placeholder="September 2026 — Present"
                    />

                    <Field
                        label="Grade"
                        value={form.grade}
                        onChange={(value) =>
                            updateField("grade", value)
                        }
                        placeholder="8.24/10 CGPA"
                    />
                </div>

                <div className="mt-6 flex items-center gap-3">
                    <button
                        type="button"
                        onClick={saveEducation}
                        disabled={saving}
                        className="border border-[var(--button-border)] bg-[var(--button-bg)] px-5 py-2.5 text-sm font-medium text-[var(--button-text)] transition hover:bg-[var(--button-hover)]"
                    >
                        {saving
                        ? "Saving..."
                        : editingId
                            ? "Update education"
                            : "Add education"}
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