export type Project = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  techStack: string[];
  url?: string;
  github?: string;
  featured: boolean;
  status: "live" | "development" | "planned";
};

export const projects: Project[] = [
  {
    slug: "portfolio",

    name: "Portfolio",

    shortDescription:
      "A personal developer portfolio built with Next.js, TypeScript, and Tailwind CSS.",

    description:
      "A developer-focused personal portfolio designed to showcase my experience, projects, education, GitHub activity, LeetCode progress, and technical interests. The platform is also designed to become the foundation for hosting future projects under adityapatel.in.",

    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "GitHub API",
      "Azure",
    ],

    url: "https://adityapatel.in",

    github: "https://github.com/adityapatel-git/aditya-portfolio",

    featured: true,

    status: "development",
  },
];