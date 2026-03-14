// app/page.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const PROFILE = {
  name: "Khawaja Muhammad Azeem",
  role: "Engineering Student & Developer",
  location: "Singapore",
  email: "khawajaazeem0409@gmail.com",
  phone: "+65 8840 0409",
  photo: "/me.PNG",
  status: "Available for opportunities",
  currentFocus: "Building AI-powered applications",
};

const STATS = [
  { label: "Projects", value: "12+" },
  { label: "Experience", value: "2+ yrs" },
  { label: "Skills", value: "15+" },
];

const SKILLS = [
  { name: "Python", level: 85, category: "Languages" },
  { name: "TypeScript", level: 80, category: "Languages" },
  { name: "React", level: 82, category: "Frontend" },
  { name: "Next.js", level: 80, category: "Frontend" },
  { name: "C++", level: 70, category: "Languages" },
  { name: "C#", level: 75, category: "Languages" },
  { name: "Solidity", level: 65, category: "Web3" },
  { name: "Arduino", level: 75, category: "Hardware" },
  { name: "Ubuntu", level: 80, category: "Systems" },
];

const PROJECTS = [
  {
    title: "Rug Visualizer",
    desc: "Interactive design tool for visualizing rugs in room photos with drag, rotate, and resize capabilities. Real-time preview export.",
    tech: ["Next.js", "TypeScript", "Fabric.js", "Canvas API"],
    status: "building",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    title: "Web3 Academy",
    desc: "Educational platform exploring blockchain fundamentals and smart contract development with interactive tutorials.",
    tech: ["Solidity", "React", "Web3.js", "Ethereum"],
    status: "shipped",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    title: "IoT Systems",
    desc: "Hardware automation projects spanning Arduino-based sensors and Ubuntu system configurations.",
    tech: ["C++", "Python", "Arduino", "MQTT"],
    status: "shipped",
    gradient: "from-emerald-500 to-teal-600",
  },
];

const EXPERIENCE = {
  role: "Assistant Production Engineer",
  company: "Ascent Solutions",
  period: "Mar 2023 – Aug 2023",
  achievements: [
    "Tested 648+ sensor boards daily with zero-defect quality",
    "Led vehicle tracker config after volunteer initiative",
    "Improved team output through systematic protocols",
  ],
};

function GlassCard({ children, className = "", hover = true }: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div className={`
      rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl
      ${hover ? "transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-2xl hover:shadow-blue-500/10" : ""}
      ${className}
    `}>
      {children}
    </div>
  );
}

function StatusDot() {
  return (
    <span className="relative flex h-3 w-3">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
      <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
    </span>
  );
}

function SkillPill({ name, category }: { name: string; category: string }) {
  return (
    <div className="group relative">
      <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all hover:border-blue-400/50 hover:bg-blue-500/20">
        {name}
      </div>
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
        {category}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-10`} />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="mb-4 flex items-start justify-between">
          <h3 className="text-xl font-semibold text-white">{project.title}</h3>
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${
            project.status === "building"
              ? "bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/30"
              : "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/30"
          }`}>
            {project.status === "building" ? "In Progress" : "Shipped"}
          </span>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-gray-300">
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-gray-300 backdrop-blur-sm ring-1 ring-white/20"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Hover effect */}
      <div className={`absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 transition-opacity duration-500 ${isHovered ? "opacity-100" : ""}`} />
    </div>
  );
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setTimeout(() => setShow(true), delay),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${show ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
    >
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-700/20 via-transparent to-transparent"></div>
      </div>

      {/* Header */}
      <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-gray-900/80 shadow-lg shadow-black/20 backdrop-blur-xl" : ""
      }`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="#top" className="text-lg font-semibold text-white">
            Azeem
          </a>
          <nav className="hidden gap-8 text-sm font-medium text-gray-300 md:flex">
            <a href="#about" className="transition-colors hover:text-white">About</a>
            <a href="#work" className="transition-colors hover:text-white">Work</a>
            <a href="#contact" className="transition-colors hover:text-white">Contact</a>
          </nav>
          <a
            href="#contact"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50"
          >
            Get in touch
          </a>
        </div>
      </header>

      {/* Hero - Bento Grid */}
      <section id="top" className="mx-auto max-w-7xl px-6 pt-32 pb-20">
        <div className="grid gap-4 md:grid-cols-12 md:grid-rows-2">
          
          {/* Main intro card - spans 7 columns, 2 rows */}
          <FadeIn>
            <GlassCard className="md:col-span-7 md:row-span-2 flex flex-col justify-between">
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <StatusDot />
                  <span className="text-sm font-medium text-emerald-400">{PROFILE.status}</span>
                </div>
                
                <h1 className="mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
                  {PROFILE.name}
                </h1>
                
                <p className="mb-2 text-xl font-medium text-gray-300">
                  {PROFILE.role}
                </p>
                
                <p className="mb-8 max-w-xl text-gray-400">
                  Engineering student building at the intersection of AI and Web3. From electronics troubleshooting to full-stack development — shipping reliable systems that solve real problems.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white transition-all hover:shadow-2xl hover:shadow-blue-500/50"
                >
                  <span className="relative z-10">Let's talk</span>
                  <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
                </a>
                <button
                  onClick={() => window.print()}
                  className="rounded-lg border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
                >
                  Download CV
                </button>
              </div>
            </GlassCard>
          </FadeIn>

          {/* Photo card - spans 5 columns, 2 rows */}
          <FadeIn delay={100}>
            <GlassCard className="md:col-span-5 md:row-span-2 relative overflow-hidden p-0" hover={false}>
              <div className="aspect-[4/5] md:h-full">
                <Image
                  src={PROFILE.photo}
                  alt={PROFILE.name}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-gray-900/80 p-3 backdrop-blur-lg">
                <p className="text-sm font-medium text-white">📍 {PROFILE.location}</p>
                <p className="text-xs text-gray-400">{PROFILE.currentFocus}</p>
              </div>
            </GlassCard>
          </FadeIn>

          {/* Stats cards - 3 small cards */}
          {STATS.map((stat, i) => (
            <FadeIn key={i} delay={200 + i * 50}>
              <GlassCard className="md:col-span-4 text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-20">
        <FadeIn>
          <h2 className="mb-12 text-3xl font-bold text-white">Skills & Technologies</h2>
        </FadeIn>
        
        <FadeIn delay={100}>
          <div className="flex flex-wrap gap-3">
            {SKILLS.map((skill) => (
              <SkillPill key={skill.name} name={skill.name} category={skill.category} />
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Projects */}
      <section id="work" className="mx-auto max-w-7xl px-6 py-20">
        <FadeIn>
          <div className="mb-12 flex items-end justify-between">
            <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
            <span className="text-sm text-gray-400">{PROJECTS.length} projects</span>
          </div>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <FadeIn key={i} delay={i * 100}>
              <ProjectCard project={project} index={i} />
            </FadeIn>
          ))}
        </div>

        {/* Experience */}
        <FadeIn delay={300}>
          <div className="mt-16">
            <h3 className="mb-8 text-2xl font-bold text-white">Experience</h3>
            <GlassCard>
              <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h4 className="text-xl font-semibold text-white">{EXPERIENCE.role}</h4>
                  <p className="text-gray-400">{EXPERIENCE.company}</p>
                </div>
                <span className="rounded-full bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-300 ring-1 ring-blue-500/30">
                  {EXPERIENCE.period}
                </span>
              </div>
              <ul className="space-y-3">
                {EXPERIENCE.achievements.map((achievement, i) => (
                  <li key={i} className="flex gap-3 text-gray-300">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </FadeIn>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-7xl px-6 py-20">
        <FadeIn>
          <h2 className="mb-12 text-3xl font-bold text-white">Get in Touch</h2>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2">
          <FadeIn delay={100}>
            <GlassCard>
              <h3 className="mb-4 text-xl font-semibold text-white">Let's work together</h3>
              <p className="mb-6 text-gray-400">
                Available for freelance projects, collaborations, and full-time opportunities.
                Based in Singapore, working globally.
              </p>
              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white transition-all hover:shadow-2xl hover:shadow-blue-500/50"
              >
                <span>Send Email</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </GlassCard>
          </FadeIn>

          <FadeIn delay={200}>
            <GlassCard>
              <h3 className="mb-4 text-xl font-semibold text-white">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-gray-400">Email</span>
                  <a href={`mailto:${PROFILE.email}`} className="font-medium text-white hover:text-blue-400">
                    {PROFILE.email}
                  </a>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-gray-400">Phone</span>
                  <a href={`tel:${PROFILE.phone}`} className="font-medium text-white hover:text-blue-400">
                    {PROFILE.phone}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Location</span>
                  <span className="font-medium text-white">{PROFILE.location}</span>
                </div>
              </div>
            </GlassCard>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-gray-900/50 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} {PROFILE.name}. Built with Next.js & passion.
        </div>
      </footer>

    </div>
  );
}