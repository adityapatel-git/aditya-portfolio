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
    slug: "hallsight",
    name: "HallSight",
    shortDescription:
      "Real-time event seat occupancy and attendance tracking platform.",
    description:
      "A full-stack event management platform designed for real-time seat occupancy and attendance tracking. The system uses RESTful APIs with authentication, authorization, and role-based access control, with Prisma ORM handling database operations on MySQL.",
    techStack: [
      "Next.js",
      "Prisma ORM",
      "MySQL",
      "REST APIs",
      "Authentication",
      "RBAC",
      "shadcn/ui",
      "Postman",
    ],
    github: "https://github.com/4118adi",
    featured: true,
    status: "development",
  },
  {
    slug: "canteen-point",
    name: "Canteen Point",
    shortDescription:
      "Canteen management system for orders, payments, and inventory.",
    description:
      "A web-based canteen management system built with PHP, MySQL, HTML, and Bootstrap. The application provides interfaces for order placement, payment processing, and inventory management.",
    techStack: [
      "PHP",
      "MySQL",
      "HTML",
      "Bootstrap",
    ],
    github: "https://github.com/4118adi",
    featured: false,
    status: "development",
  },
  {
    slug: "portfolio",
    name: "Portfolio",
    shortDescription:
      "A developer-focused portfolio built with Next.js and TypeScript.",
    description:
      "A personal developer platform showcasing engineering experience, projects, education, GitHub activity, and technical work.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "GitHub API",
      "AWS Amplify",
    ],
    url: "https://adityapatel.in",
    github: "https://github.com/adityapatel-git/aditya-portfolio",
    featured: false,
    status: "development",
  },
];