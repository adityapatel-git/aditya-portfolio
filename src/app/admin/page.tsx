"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import ProfileEditor from "./components/ProfileEditor";
import ExperienceEditor from "./components/ExperienceEditor";
import ProjectsEditor from "./components/ProjectsEditor";
import EducationEditor from "./components/EducationEditor";
import SkillsEditor from "./components/SkillsEditor";
import ThemeToggle from "@/components/ThemeToggle";

type Section =
    | "dashboard"
    | "profile"
    | "experience"
    | "projects"
    | "education"
    | "skills";

const navigation: {
    id: Section;
    label: string;
}[] = [
        { id: "dashboard", label: "Dashboard" },
        { id: "profile", label: "Profile" },
        { id: "experience", label: "Experience" },
        { id: "projects", label: "Projects" },
        { id: "education", label: "Education" },
        { id: "skills", label: "Skills" },
    ];

export default function AdminPage() {
    const router = useRouter();

    const [section, setSection] =
        useState<Section>("dashboard");

    const [userEmail, setUserEmail] = useState("");
    const [profile, setProfile] = useState<any>(null);

    const [counts, setCounts] = useState({
        experiences: 0,
        projects: 0,
        education: 0,
        skills: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadAdminData() {
            const supabase = createSupabaseBrowserClient();

            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                router.replace("/admin/login");
                return;
            }

            setUserEmail(user.email ?? "");

            const [
                profileResult,
                experiencesResult,
                projectsResult,
                educationResult,
                skillsResult,
            ] = await Promise.all([
                supabase.from("profiles").select("*").single(),
                supabase
                    .from("experiences")
                    .select("id", { count: "exact", head: true }),
                supabase
                    .from("projects")
                    .select("id", { count: "exact", head: true }),
                supabase
                    .from("education")
                    .select("id", { count: "exact", head: true }),
                supabase
                    .from("skills")
                    .select("id", { count: "exact", head: true }),
            ]);

            setProfile(profileResult.data);

            setCounts({
                experiences: experiencesResult.count ?? 0,
                projects: projectsResult.count ?? 0,
                education: educationResult.count ?? 0,
                skills: skillsResult.count ?? 0,
            });

            setLoading(false);
        }

        loadAdminData();
    }, [router]);

    async function handleSignOut() {
        const supabase = createSupabaseBrowserClient();

        await supabase.auth.signOut();

        router.replace("/admin/login");
        router.refresh();
    }

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-500">
                <p className="font-mono text-xs uppercase tracking-[0.2em]">
                    Loading...
                </p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-100">
            {/* Header */}
            <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-zinc-950/95 backdrop-blur-xl">
                <div className="flex h-16 items-center justify-between px-6">
                    <a
                        href="/"
                        className="font-mono text-lg font-semibold tracking-tight"
                    >
                        <span className="text-zinc-500">&lt;</span>
                        AP
                        <span className="text-zinc-500">/&gt;</span>
                    </a>

                    <div className="flex items-center gap-5">
                        <span className="hidden text-xs text-zinc-600 sm:block">
                            {userEmail}
                        </span>
                        <ThemeToggle />
                        <button
                            onClick={handleSignOut}
                            className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-600 transition hover:text-zinc-300"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex min-h-screen pt-16">
                {/* Sidebar */}
                <aside className="fixed bottom-0 left-0 top-16 hidden w-56 border-r border-white/10 bg-zinc-950 sm:block">
                    <nav className="p-5">
                        <p className="mb-5 px-3 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-700">
                            Manage
                        </p>

                        <div className="space-y-1">
                            {navigation.map((item, index) => (
                                <button
                                    key={item.id}
                                    onClick={() => setSection(item.id)}
                                    className={`flex w-full items-center justify-between px-3 py-3 text-left text-sm transition ${section === item.id
                                        ? "bg-white/[0.05] text-zinc-200"
                                        : "text-zinc-600 hover:bg-white/[0.02] hover:text-zinc-300"
                                        }`}
                                >
                                    <span>{item.label}</span>

                                    <span className="font-mono text-[9px] text-zinc-800">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </nav>
                </aside>

                {/* Mobile navigation */}
                <div className="fixed left-0 right-0 top-16 z-40 border-b border-white/10 bg-zinc-950/95 px-4 py-3 sm:hidden">
                    <select
                        value={section}
                        onChange={(event) =>
                            setSection(event.target.value as Section)
                        }
                        className="w-full border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-300 outline-none"
                    >
                        {navigation.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Content */}
                <div className="w-full sm:ml-56">
                    <div className="mx-auto max-w-5xl px-6 py-12 sm:px-10 sm:py-16">
                        {section === "dashboard" && (
                            <Dashboard
                                userEmail={userEmail}
                                counts={counts}
                                onNavigate={setSection}
                            />
                        )}

                        {section === "profile" && profile && (
                            <AdminSection
                                number="01"
                                title="Profile"
                                description="Manage the information displayed across your portfolio."
                            >
                                <ProfileEditor profile={profile} />
                            </AdminSection>
                        )}

                        {section === "experience" && (
                            <AdminSection
                                number="02"
                                title="Experience"
                                description="Manage your professional experience."
                            >
                                <ExperienceEditor />
                            </AdminSection>
                        )}

                        {section === "projects" && (
                            <AdminSection
                                number="03"
                                title="Projects"
                                description="Manage your projects."
                            >
                                <ProjectsEditor />
                            </AdminSection>
                        )}

                        {section === "education" && (
                            <AdminSection
                                number="05"
                                title="Education"
                                description="Manage your education history."
                            >
                                <EducationEditor />
                            </AdminSection>
                        )}

                        {section === "skills" && (
                            <AdminSection
                                number="06"
                                title="Skills"
                                description="Manage your technical skills."
                            >
                                <SkillsEditor />
                            </AdminSection>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

function Dashboard({
    userEmail,
    counts,
    onNavigate,
}: {
    userEmail: string;
    counts: {
        experiences: number;
        projects: number;
        education: number;
        skills: number;
    };
    onNavigate: (section: Section) => void;
}) {
    return (
        <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-600">
                AP / Admin
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight">
                Dashboard
            </h1>

            <p className="mt-3 text-sm text-zinc-600">
                Manage your portfolio content.
            </p>

            <div className="mt-12 grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
                <Stat
                    label="Experience"
                    value={counts.experiences}
                    onClick={() => onNavigate("experience")}
                />

                <Stat
                    label="Projects"
                    value={counts.projects}
                    onClick={() => onNavigate("projects")}
                />

                <Stat
                    label="Education"
                    value={counts.education}
                    onClick={() => onNavigate("education")}
                />

                <Stat
                    label="Skills"
                    value={counts.skills}
                    onClick={() => onNavigate("skills")}
                />
            </div>

            <div className="mt-12 border-t border-white/10 pt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-700">
                    Signed in as
                </p>

                <p className="mt-2 text-sm text-zinc-500">
                    {userEmail}
                </p>
            </div>
        </div>
    );
}

function Stat({
    label,
    value,
    onClick,
}: {
    label: string;
    value: number;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="border-b border-r border-white/10 p-6 text-left transition hover:bg-white/[0.02]"
        >
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-700">
                {label}
            </p>

            <p className="mt-3 text-3xl font-semibold text-zinc-300">
                {value}
            </p>
        </button>
    );
}

function AdminSection({
    number,
    title,
    description,
    children,
}: {
    number: string;
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <section>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-600">
                AP / Admin
            </p>

            <div className="mt-4 flex items-baseline gap-3">
                <span className="font-mono text-xs text-zinc-700">
                    {number}
                </span>

                <h1 className="text-4xl font-bold tracking-tight">
                    {title}
                </h1>
            </div>

            <p className="mt-3 text-sm text-zinc-600">
                {description}
            </p>

            <div className="mt-12">
                {children}
            </div>
        </section>
    );
}

function ComingSection({
    number,
    title,
    description,
}: {
    number: string;
    title: string;
    description: string;
}) {
    return (
        <AdminSection
            number={number}
            title={title}
            description={description}
        >
            <div className="border-t border-white/10 py-8">
                <p className="text-sm text-zinc-600">
                    Editor will be added here next.
                </p>
            </div>
        </AdminSection>
    );
}