// app/page.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// PROFILE DATA
// ══════════════════════════════════════════════════════════════════════════════
const PROFILE = {
  name:       "Khawaja Muhammad Azeem",
  role:       "Engineering Student × AI/Web3 Builder",
  location:   "Singapore",
  email:      "khawajaazeem0409@gmail.com",
  phone:      "+65 8840 0409",
  photoSrc:   "/me.PNG",
  bio:        "Self-driven engineering student building at the intersection of AI and Web3. From electronics troubleshooting to full-stack development — I ship reliable systems that solve real problems.",
} as const;

const SKILLS = [
  { name: "Python",      proficiency: 85, category: "code" },
  { name: "TypeScript",  proficiency: 80, category: "code" },
  { name: "C#",          proficiency: 75, category: "code" },
  { name: "C++",         proficiency: 70, category: "code" },
  { name: "Next.js",     proficiency: 82, category: "code" },
  { name: "React",       proficiency: 80, category: "code" },
  { name: "Ubuntu",      proficiency: 80, category: "sys" },
  { name: "Arduino",     proficiency: 75, category: "sys" },
  { name: "Solidity",    proficiency: 60, category: "web3" },
] as const;

const EXPERIENCE = [
  {
    role:    "Assistant Production Engineer",
    company: "Ascent Solutions",
    period:  "Mar – Aug 2023",
    impact:  [
      "648 sensor boards/day tested with zero-defect quality",
      "Led tracker configuration team after volunteer initiative",
      "Improved team output through systematic troubleshooting protocols",
    ],
  },
] as const;

const PROJECTS = [
  {
    title:  "Rug Visualizer",
    desc:   "Interactive room design tool with drag-resize-rotate manipulation and real-time preview export",
    stack:  ["Next.js", "TypeScript", "Fabric.js"],
    status: "building",
  },
  {
    title:  "Web3 Academy",
    desc:   "Educational platform exploring blockchain fundamentals and smart contract development",
    stack:  ["Solidity", "Web3.js", "React"],
    status: "shipped",
  },
  {
    title:  "Hardware Systems",
    desc:   "Electronics troubleshooting and automation projects spanning Arduino and Ubuntu environments",
    stack:  ["C++", "Python", "Arduino"],
    status: "shipped",
  },
] as const;

const EDUCATION = [
  {
    degree: "Diploma in Electronics & Computer Engineering",
    school: "Ngee Ann Polytechnic",
    period: "2021 – 2024",
    notes:  ["Idea Champions Top 10", "Full-stack web + embedded systems"],
  },
  {
    degree: "GCE O' Levels",
    school: "Yuying Secondary",
    period: "2020",
    notes:  ["Edusave Scholarship", "Lee Joo Jan Book Award"],
  },
] as const;

// ══════════════════════════════════════════════════════════════════════════════
// UTILITIES
// ══════════════════════════════════════════════════════════════════════════════
function cx(...args: (string | boolean | null | undefined)[]) {
  return args.filter(Boolean).join(" ");
}

// ══════════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ══════════════════════════════════════════════════════════════════════════════

function ThemeToggle({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={cx(
        "group relative h-10 w-10 rounded-full border transition-all hover:scale-110",
        dark
          ? "border-neutral-700 bg-black hover:border-cyan-500"
          : "border-neutral-300 bg-white hover:border-cyan-500"
      )}
    >
      <span className="absolute inset-0 flex items-center justify-center text-xs font-mono">
        {dark ? "◐" : "◑"}
      </span>
    </button>
  );
}

function SkillDot({ name, prof, dark }: { name: string; prof: number; dark: boolean }) {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => e.isIntersecting && setTimeout(() => setRevealed(true), 50),
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Size based on proficiency (60-100 → 32px to 56px)
  const size = 32 + (prof - 60) * 0.6;

  return (
    <div
      ref={ref}
      className={cx(
        "group relative flex flex-col items-center gap-2 transition-all duration-700",
        revealed ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      )}
      style={{ transitionDelay: `${Math.random() * 200}ms` }}
    >
      <div
        className={cx(
          "flex items-center justify-center rounded-full border-2 font-mono text-[9px] font-bold transition-all duration-300",
          dark
            ? "border-cyan-500 bg-black text-cyan-500 group-hover:bg-cyan-500 group-hover:text-black"
            : "border-black bg-white text-black group-hover:bg-black group-hover:text-white"
        )}
        style={{ width: size, height: size }}
      >
        {prof}
      </div>
      <span className={cx("text-[10px] font-medium", dark ? "text-neutral-400" : "text-neutral-600")}>
        {name}
      </span>
    </div>
  );
}

function Section({ id, label, title, children, dark }: {
  id: string; label: string; title: string; children: React.ReactNode; dark: boolean;
}) {
  return (
    <section id={id} className="border-t border-current py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="mb-12 flex items-baseline gap-8">
          <span className={cx(
            "font-mono text-[10px] font-bold uppercase tracking-[0.3em]",
            dark ? "text-cyan-500" : "text-black"
          )}>
            {label}
          </span>
          <h2 className="flex-1 font-display text-2xl font-bold uppercase tracking-tight md:text-4xl">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════════════════════════
export default function Portfolio() {
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") setDark(true);
    } catch {}
  }, []);

  const toggle = useCallback(() => {
    setDark(prev => {
      const next = !prev;
      try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
      return next;
    });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bg   = dark ? "bg-black text-white" : "bg-white text-black";
  const line = dark ? "border-neutral-800" : "border-neutral-200";

  return (
    <div className={cx("min-h-screen font-sans transition-colors duration-300", bg)}>

      {/* ── HEADER ── */}
      <header className={cx(
        "fixed top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? dark ? "border-neutral-800 bg-black/95 backdrop-blur-xl" : "border-neutral-200 bg-white/95 backdrop-blur-xl"
          : "border-transparent"
      )}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-8">
          <a href="#top" className="font-mono text-xs font-bold uppercase tracking-widest hover:opacity-60">
            Azeem
          </a>
          <nav className="hidden items-center gap-8 font-mono text-[10px] font-medium uppercase tracking-[0.2em] md:flex">
            <a href="#work" className="hover:opacity-60">Work</a>
            <a href="#about" className="hover:opacity-60">About</a>
            <a href="#contact" className="hover:opacity-60">Contact</a>
          </nav>
          <ThemeToggle dark={dark} toggle={toggle} />
        </div>
      </header>

      {/* ── HERO ── */}
      <main id="top" className="relative pt-16">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1fr_400px] md:gap-16 md:px-8 md:py-32">
          
          {/* Left: Text */}
          <div className="flex flex-col justify-center">
            <div className="mb-6 flex items-center gap-3">
              <div className={cx("h-px flex-1", dark ? "bg-cyan-500" : "bg-black")} />
              <span className={cx("font-mono text-[9px] font-bold uppercase tracking-[0.3em]", dark ? "text-cyan-500" : "text-black")}>
                Portfolio / 2026
              </span>
            </div>

            <h1 className="mb-6 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
              {PROFILE.name.split(" ").map((word, i) => (
                <span key={i} className="block" style={{ animationDelay: `${i * 100}ms` }}>
                  {word}
                </span>
              ))}
            </h1>

            <p className={cx("mb-8 max-w-md font-mono text-sm leading-relaxed", dark ? "text-neutral-400" : "text-neutral-600")}>
              {PROFILE.role}
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#contact"
                className={cx(
                  "inline-flex h-12 items-center border px-6 font-mono text-xs font-bold uppercase tracking-wider transition-all hover:scale-105",
                  dark ? "border-cyan-500 bg-cyan-500 text-black" : "border-black bg-black text-white"
                )}
              >
                Get in touch
              </a>
              <button
                onClick={() => window.print()}
                className={cx(
                  "inline-flex h-12 items-center border px-6 font-mono text-xs font-bold uppercase tracking-wider transition-all hover:scale-105",
                  dark ? "border-neutral-700 hover:border-cyan-500" : "border-neutral-300 hover:border-black"
                )}
              >
                Download CV
              </button>
            </div>
          </div>

          {/* Right: Photo */}
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden border-2 border-current">
              <Image
                src={PROFILE.photoSrc}
                alt={PROFILE.name}
                fill
                priority
                className="object-cover object-top grayscale transition-all hover:grayscale-0"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            <div className={cx("absolute -bottom-3 -right-3 border bg-current px-4 py-2 font-mono text-xs font-bold", dark ? "text-black" : "text-white")}>
              {PROFILE.location}
            </div>
          </div>
        </div>
      </main>

      {/* ── ABOUT ── */}
      <Section id="about" label="01" title="About" dark={dark}>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className={cx("mb-6 text-lg leading-relaxed", dark ? "text-neutral-300" : "text-neutral-800")}>
              {PROFILE.bio}
            </p>
            <div className="flex flex-wrap gap-2">
              {["Reliable", "Detail-oriented", "Self-driven", "Problem solver"].map(trait => (
                <span
                  key={trait}
                  className={cx(
                    "border px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wider",
                    dark ? "border-neutral-700" : "border-neutral-300"
                  )}
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-6 font-mono text-xs font-bold uppercase tracking-[0.2em]">Technical Stack</h3>
            <div className="flex flex-wrap gap-6">
              {SKILLS.map(s => (
                <SkillDot key={s.name} name={s.name} prof={s.proficiency} dark={dark} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── WORK ── */}
      <Section id="work" label="02" title="Work" dark={dark}>
        <div className="space-y-8">
          {PROJECTS.map((p, i) => (
            <div
              key={i}
              className={cx("group grid gap-6 border-b pb-8 transition-all hover:border-current md:grid-cols-[200px_1fr_auto]", line)}
            >
              <div className="font-mono text-xs uppercase tracking-wider opacity-60">
                Project {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold">{p.title}</h3>
                <p className={cx("mb-4 text-sm", dark ? "text-neutral-400" : "text-neutral-600")}>
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map(tech => (
                    <span
                      key={tech}
                      className={cx(
                        "border px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider",
                        dark ? "border-neutral-700" : "border-neutral-300"
                      )}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className={cx(
                "self-start border px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider",
                p.status === "shipped"
                  ? dark ? "border-cyan-500 text-cyan-500" : "border-black text-black"
                  : dark ? "border-neutral-700 text-neutral-500" : "border-neutral-300 text-neutral-600"
              )}>
                {p.status}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="mb-6 font-mono text-xs font-bold uppercase tracking-[0.2em]">Experience</h3>
          {EXPERIENCE.map((job, i) => (
            <div key={i} className={cx("border-l-2 pl-6", dark ? "border-cyan-500" : "border-black")}>
              <div className="mb-2 flex flex-wrap items-baseline gap-4">
                <h4 className="text-lg font-bold">{job.role}</h4>
                <span className={cx("font-mono text-xs", dark ? "text-neutral-500" : "text-neutral-600")}>
                  {job.company}
                </span>
              </div>
              <p className={cx("mb-4 font-mono text-xs uppercase tracking-wider", dark ? "text-neutral-500" : "text-neutral-600")}>
                {job.period}
              </p>
              <ul className="space-y-2">
                {job.impact.map((item, j) => (
                  <li key={j} className={cx("text-sm", dark ? "text-neutral-400" : "text-neutral-700")}>
                    → {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ── EDUCATION ── */}
      <Section id="education" label="03" title="Education" dark={dark}>
        <div className="space-y-8">
          {EDUCATION.map((edu, i) => (
            <div key={i} className="grid gap-4 md:grid-cols-[200px_1fr]">
              <div className="font-mono text-xs uppercase tracking-wider opacity-60">
                {edu.period}
              </div>
              <div>
                <h3 className="mb-1 text-lg font-bold">{edu.degree}</h3>
                <p className={cx("mb-3 text-sm", dark ? "text-neutral-400" : "text-neutral-600")}>
                  {edu.school}
                </p>
                <div className="flex flex-wrap gap-2">
                  {edu.notes.map((note, j) => (
                    <span
                      key={j}
                      className={cx(
                        "border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider",
                        dark ? "border-neutral-700 text-neutral-400" : "border-neutral-300 text-neutral-600"
                      )}
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── CONTACT ── */}
      <Section id="contact" label="04" title="Contact" dark={dark}>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className={cx("mb-8 text-lg", dark ? "text-neutral-300" : "text-neutral-800")}>
              Available for freelance projects, collaborations, and full-time opportunities.
              Based in Singapore, working globally.
            </p>
            <a
              href={`mailto:${PROFILE.email}`}
              className={cx(
                "inline-flex h-12 items-center border px-6 font-mono text-xs font-bold uppercase tracking-wider transition-all hover:scale-105",
                dark ? "border-cyan-500 bg-cyan-500 text-black" : "border-black bg-black text-white"
              )}
            >
              Send Email
            </a>
          </div>

          <div className="space-y-4 font-mono text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="opacity-60">Email</span>
              <a href={`mailto:${PROFILE.email}`} className="hover:opacity-60">
                {PROFILE.email}
              </a>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="opacity-60">Phone</span>
              <a href={`tel:${PROFILE.phone}`} className="hover:opacity-60">
                {PROFILE.phone}
              </a>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="opacity-60">Location</span>
              <span>{PROFILE.location}</span>
            </div>
          </div>
        </div>
      </Section>

      {/* ── FOOTER ── */}
      <footer className={cx("border-t py-8", line)}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 font-mono text-[9px] uppercase tracking-[0.2em] opacity-40 md:px-8">
          <span>© {new Date().getFullYear()}</span>
          <span>Built with Next.js</span>
        </div>
      </footer>

    </div>
  );
}