// app/page.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const PROFILE = {
  name: "Khawaja Muhammad Azeem",
  tagline: "Learning AI and Web3, one project at a time",
  subtitle:
    "Engineering student passionate about creating innovative solutions. From hardware to full-stack development, I love solving real-world problems with technology.",
  email: "khawajaazeem0409@gmail.com",
  phone: "+65 8840 0409",
  location: "Singapore",
  photoSrc: "/me.PNG", // FIXED: Changed to uppercase to match your file
  resumeHref: "/resume.pdf",
};

const SKILLS = [
  {
    label: "Programming",
    items: [
      { name: "C#", level: 75 },
      { name: "C++", level: 70 },
      { name: "Python", level: 85 },
      { name: "Dart", level: 65 },
      { name: "HTML", level: 90 },
      { name: "CSS", level: 88 },
    ],
  },
  {
    label: "Hardware",
    items: [
      { name: "Ubuntu", level: 80 },
      { name: "Arduino", level: 75 },
      { name: "Tinkercad", level: 70 },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "Microsoft Word", level: 95 },
      { name: "PowerPoint", level: 92 },
    ],
  },
];

const EXPERIENCE = [
  {
    title: "Assistant Production Engineer",
    org: "Ascent Solutions Pte Ltd",
    dates: "6 Mar 2023 – 5 Aug 2023",
    bullets: [
      "Took ownership to test and troubleshoot 648 sensor boards/day with consistent quality.",
      "Assisted and motivated teammates to boost production rate and reliability.",
      "Tested, configured, and troubleshooted multiple vehicle trackers; volunteered to join the trackers team.",
    ],
  },
];

const LEADERSHIP = [
  {
    title: "Prefectorial Board Member",
    org: "Yuying Secondary School",
    bullets: [
      "Planned and executed Sec 1 orientation camp.",
      "Carried out duties with honesty, integrity, and reliability.",
    ],
  },
  {
    title: "National Cadet Corps (NCC)",
    org: "Yuying Secondary School",
    bullets: [
      "Completed leadership courses; appointed In-Charge of the Precision Drill Squad.",
      "Completed Cadets Officers Course; supervised and mentored juniors in the unit.",
    ],
  },
];

const EDUCATION = [
  {
    title: "Diploma in Electronics and Computer Engineering",
    org: "Ngee Ann Polytechnic",
    dates: "2021 – 2024",
    notes: [
      "Skills: Coding of websites and applications, Electronics, Troubleshooting",
      "Certificate: Idea Champions — Top Ten ideas (Innovation Made Possible module)",
    ],
  },
  {
    title: "GCE O' Levels",
    org: "Yuying Secondary School",
    dates: "2020",
    notes: ["Edusave Scholarship 2020", "Lee Joo Jan Book Award 2020"],
  },
  {
    title: "GCE N' Levels",
    org: "Yuying Secondary School",
    dates: "2016 – 2019",
    notes: [
      "Edusave Good Progress Award 2016",
      "Edusave Scholarship 2017",
      "Edusave Merit Bursary 2018",
      "Edusave Scholarship 2019",
    ],
  },
];

const PROJECTS = [
  {
    title: "Rug Visualizer (MVP)",
    desc: "Interactive rug placement tool: upload room photo → place rugs → drag/rotate/resize → export.",
    tags: ["Next.js", "TypeScript", "Fabric.js", "UI/UX"],
    href: "#",
    status: "In Development",
  },
  {
    title: "Web + Systems Coursework",
    desc: "Hands-on builds spanning web apps, electronics troubleshooting, and automation-style thinking.",
    tags: ["C#", "Python", "Arduino", "Ubuntu"],
    href: "#",
    status: "Completed",
  },
];

const NOW = [
  "Building AI-powered web applications with modern frameworks",
  "Exploring Web3 technologies and blockchain integration",
  "Learning advanced TypeScript patterns and Next.js best practices",
  "Contributing to open-source projects in the developer community",
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
      {children}
    </span>
  );
}

function SkillBar({ name, level }: { name: string; level: number }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(level), 100);
    return () => clearTimeout(timer);
  }, [level]);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-white/80">{name}</span>
        <span className="text-white/50">{level}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

function TypeWriter({ text, delay = 50 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <>{displayText}</>;
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <FadeInSection>
          <div className="mb-8 md:mb-10">
            {eyebrow ? (
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.6)]" />
                <p className="text-xs font-semibold tracking-widest text-white/60 uppercase">
                  {eyebrow}
                </p>
              </div>
            ) : null}
            <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
              {title}
            </h2>
          </div>
        </FadeInSection>
        {children}
      </div>
    </section>
  );
}

export default function Page() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#070A12] text-white">
      {/* Custom Cursor */}
      <div
        className="pointer-events-none fixed z-50 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/20 transition-transform duration-100 md:block"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: `translate(-50%, -50%) scale(${cursorVariant === "hover" ? 1.5 : 1})`,
        }}
      />

      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_20%_10%,rgba(124,58,237,0.25),transparent_60%),radial-gradient(900px_500px_at_80%_20%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(1000px_600px_at_50%_90%,rgba(16,185,129,0.10),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.09] [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22 viewBox=%220 0 160 160%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.25%22%3E%3Ccircle cx=%221%22 cy=%221%22 r=%221%22/%3E%3Ccircle cx=%2280%22 cy=%2240%22 r=%221%22/%3E%3Ccircle cx=%22140%22 cy=%22120%22 r=%221%22/%3E%3C/g%3E%3C/svg%3E')]" />
      </div>

      {/* Top nav */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#top" className="group inline-flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 ring-1 ring-white/10 transition-transform group-hover:scale-110">
              <span className="text-sm font-semibold text-white">KM</span>
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-white">
                {PROFILE.name}
              </div>
              <div className="text-xs text-white/60">{PROFILE.location}</div>
            </div>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <a className="transition-colors hover:text-white" href="#about">
              About
            </a>
            <a className="transition-colors hover:text-white" href="#projects">
              Projects
            </a>
            <a className="transition-colors hover:text-white" href="#experience">
              Experience
            </a>
            <a className="transition-colors hover:text-white" href="#education">
              Education
            </a>
            <a className="transition-colors hover:text-white" href="#contact">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={PROFILE.resumeHref}
              className="hidden rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition-transform hover:scale-105 hover:bg-white/90 md:inline-flex"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              Download CV
            </a>
            <a
              href="#contact"
              className="inline-flex rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Contact
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main id="top" className="mx-auto max-w-6xl px-5">
        <section className="py-12 md:py-16">
          <div className="grid items-center gap-10 md:grid-cols-[1.15fr_0.85fr]">
            <FadeInSection>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70 backdrop-blur">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Available for opportunities
              </div>

              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                <span className="text-white">
                  <TypeWriter text="Learning AI and Web3," delay={80} />
                </span>
                <br />
                <span className="bg-gradient-to-r from-violet-300 via-white to-sky-200 bg-clip-text text-transparent">
                  one project at a time
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/65 md:text-base">
                {PROFILE.subtitle}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="rounded-xl bg-gradient-to-r from-violet-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  Let's talk
                </a>
                <a
                  href={PROFILE.resumeHref}
                  className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Download CV
                </a>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-white/20 hover:bg-white/10">
                  <div className="text-xs text-white/60">Languages</div>
                  <div className="mt-1 text-sm font-semibold">Python, TS/JS</div>
                </div>
                <div className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-white/20 hover:bg-white/10">
                  <div className="text-xs text-white/60">Hardware</div>
                  <div className="mt-1 text-sm font-semibold">Ubuntu, Arduino</div>
                </div>
                <div className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-white/20 hover:bg-white/10">
                  <div className="text-xs text-white/60">Strength</div>
                  <div className="mt-1 text-sm font-semibold">Ownership</div>
                </div>
              </div>
            </FadeInSection>

            {/* Photo card */}
            <FadeInSection delay={200}>
              <div className="relative">
                <div className="absolute -inset-4 animate-pulse rounded-[32px] bg-gradient-to-b from-violet-500/20 to-cyan-400/20 blur-2xl" />
                <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.55)] transition-transform hover:scale-[1.02]">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={PROFILE.photoSrc}
                      alt={PROFILE.name}
                      fill
                      priority
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 90vw, 420px"
                    />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-xl">
                      <div className="text-sm font-semibold">{PROFILE.name}</div>
                      <div className="mt-1 text-xs text-white/70">
                        {PROFILE.email} • {PROFILE.phone}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>
      </main>

      <Section id="about" eyebrow="Executive Profile" title="About">
        <div className="grid gap-6 md:grid-cols-2">
          <FadeInSection>
            <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20 hover:bg-white/7 md:p-8">
              <p className="text-sm leading-relaxed text-white/70 md:text-base">
                Engineering student who is self-motivated and detail-oriented with a profound interest in problem-solving.
                Adept at working independently and collaboratively in a team environment. Inquisitive in nature — I like to
                learn and explore new ideas and technologies to solve complex problems.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Pill>Reliable</Pill>
                <Pill>Detail-oriented</Pill>
                <Pill>Team + solo</Pill>
                <Pill>Curious builder</Pill>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={100}>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
              <div className="mb-6 text-sm font-semibold text-white">Technical Proficiency</div>
              <div className="space-y-6">
                {SKILLS.map((group) => (
                  <div key={group.label}>
                    <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/55">
                      {group.label}
                    </div>
                    <div className="space-y-3">
                      {group.items.map((skill) => (
                        <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </Section>

      <Section id="now" eyebrow="Current Focus" title="What I'm Building Now">
        <FadeInSection>
          <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-3 w-3 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.8)]" />
              <span className="text-sm font-semibold text-emerald-400">Active Learning & Development</span>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {NOW.map((item, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-3 rounded-2xl border border-white/5 bg-white/5 p-4 transition-all hover:border-emerald-500/20 hover:bg-white/10"
                >
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-emerald-400" />
                  <span className="text-sm text-white/70 group-hover:text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </Section>

      <Section id="projects" eyebrow="Selected Work" title="Projects">
        <div className="grid gap-5 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <FadeInSection key={p.title} delay={i * 100}>
              <a
                href={p.href}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20 hover:bg-white/7 hover:shadow-[0_20px_50px_rgba(124,58,237,0.15)]"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <div className="absolute right-4 top-4">
                  <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/60">
                    {p.status}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold">{p.title}</div>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">
                      {p.desc}
                    </p>
                  </div>
                  <span className="mt-1 inline-flex h-10 w-10 flex-none items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/70 transition-transform group-hover:scale-110 group-hover:bg-white/10">
                    ↗
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            </FadeInSection>
          ))}
        </div>
      </Section>

      <Section id="experience" eyebrow="Professional Experience" title="Experience">
        <div className="space-y-5">
          {EXPERIENCE.map((job, i) => (
            <FadeInSection key={job.title} delay={i * 100}>
              <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20 hover:bg-white/7 md:p-8">
                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                  <div>
                    <div className="text-lg font-semibold">{job.title}</div>
                    <div className="text-sm text-white/70">{job.org}</div>
                  </div>
                  <div className="text-xs text-white/55">{job.dates}</div>
                </div>

                <ul className="mt-5 space-y-2 text-sm text-white/70">
                  {job.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-violet-400" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInSection>
          ))}
        </div>
      </Section>

      <Section id="leadership" eyebrow="Leadership" title="Leadership & Activities">
        <div className="grid gap-5 md:grid-cols-2">
          {LEADERSHIP.map((l, i) => (
            <FadeInSection key={l.title} delay={i * 100}>
              <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20 hover:bg-white/7 md:p-8">
                <div className="text-lg font-semibold">{l.title}</div>
                <div className="mt-1 text-sm text-white/70">{l.org}</div>
                <ul className="mt-5 space-y-2 text-sm text-white/70">
                  {l.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyan-400" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInSection>
          ))}
        </div>
      </Section>

      <Section id="education" eyebrow="Education" title="Education">
        <div className="space-y-5">
          {EDUCATION.map((edu, i) => (
            <FadeInSection key={edu.title} delay={i * 100}>
              <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20 hover:bg-white/7 md:p-8">
                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                  <div>
                    <div className="text-lg font-semibold">{edu.title}</div>
                    <div className="text-sm text-white/70">{edu.org}</div>
                  </div>
                  <div className="text-xs text-white/55">{edu.dates}</div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {edu.notes.map((n) => (
                    <span
                      key={n}
                      className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </Section>

      <Section id="contact" eyebrow="Let's build" title="Contact">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <FadeInSection>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
              <div className="text-lg font-semibold">Reach out</div>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                If you're hiring, collaborating, or just want to connect — send a message.
                I reply fast and I'm serious about building great work.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  className="rounded-xl bg-gradient-to-r from-violet-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
                  href={`mailto:${PROFILE.email}`}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  Email me
                </a>
                <a
                  className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  href={PROFILE.resumeHref}
                >
                  Download CV
                </a>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={100}>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
              <div className="text-sm font-semibold text-white">Details</div>
              <div className="mt-4 space-y-3 text-sm text-white/70">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-white/55">Email</span>
                  <span className="font-medium">{PROFILE.email}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-white/55">Phone</span>
                  <span className="font-medium">{PROFILE.phone}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-white/55">Location</span>
                  <span className="font-medium">{PROFILE.location}</span>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </Section>

      <footer className="border-t border-white/10 bg-black/20 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-white/60">
            © {new Date().getFullYear()} {PROFILE.name}. Built with Next.js & ❤️
          </div>
          <div className="flex items-center gap-5 text-sm text-white/60">
            <a className="transition-colors hover:text-white" href="#about">
              About
            </a>
            <a className="transition-colors hover:text-white" href="#projects">
              Projects
            </a>
            <a className="transition-colors hover:text-white" href="#contact">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}