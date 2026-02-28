// app/page.tsx
// ============================================================
// SECURITY NOTES (OWASP Best Practices):
// - No API keys or secrets are stored in this file
// - All external links use rel="noopener noreferrer"
// - No user input is rendered as raw HTML (no dangerouslySetInnerHTML)
// - Contact href uses mailto: (handled by OS mail client, no server input)
// - All data is static/hardcoded — no dynamic user input on this page
// - For a contact form, see /api/contact route with rate limiting + validation
// ============================================================
"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

// ── Profile data ─────────────────────────────────────────────
// SECURITY: No sensitive keys here. Email/phone are intentionally
// public contact info. Keep API keys in .env.local only.
const PROFILE = {
  name:       "Khawaja Muhammad Azeem",
  tagline:    "Learning AI and Web3, one project at a time",
  subtitle:   "Engineering student passionate about creating innovative solutions. From hardware to full-stack development, I love solving real-world problems with technology.",
  email:      "khawajaazeem0409@gmail.com",
  phone:      "+65 8840 0409",
  location:   "Singapore",
  photoSrc:   "/me.PNG",
  resumeHref: "/resume.pdf",
} as const;

const SKILLS = [
  {
    label: "Programming",
    items: [
      { name: "Python",   level: 85 },
      { name: "HTML/CSS", level: 90 },
      { name: "C#",       level: 75 },
      { name: "C++",      level: 70 },
      { name: "Dart",     level: 65 },
    ],
  },
  {
    label: "Hardware & Tools",
    items: [
      { name: "Ubuntu",     level: 80 },
      { name: "Arduino",    level: 75 },
      { name: "Tinkercad",  level: 70 },
      { name: "PowerPoint", level: 92 },
    ],
  },
] as const;

const EXPERIENCE = [
  {
    title:   "Assistant Production Engineer",
    org:     "Ascent Solutions Pte Ltd",
    dates:   "Mar 2023 – Aug 2023",
    bullets: [
      "Took ownership to test and troubleshoot 648 sensor boards/day with consistent quality.",
      "Assisted and motivated teammates to boost production rate and reliability.",
      "Tested, configured, and troubleshooted multiple vehicle trackers; volunteered to join the trackers team.",
    ],
  },
] as const;

const LEADERSHIP = [
  {
    title:   "Prefectorial Board Member",
    org:     "Yuying Secondary School",
    bullets: [
      "Planned and executed Sec 1 orientation camp.",
      "Carried out duties with honesty, integrity, and reliability.",
    ],
  },
  {
    title:   "National Cadet Corps (NCC)",
    org:     "Yuying Secondary School",
    bullets: [
      "Completed leadership courses; appointed In-Charge of the Precision Drill Squad.",
      "Completed Cadets Officers Course; supervised and mentored juniors in the unit.",
    ],
  },
] as const;

const EDUCATION = [
  {
    title:  "Diploma in Electronics & Computer Engineering",
    org:    "Ngee Ann Polytechnic",
    dates:  "2021 – 2024",
    notes:  [
      "Coding, Electronics, Troubleshooting",
      "Idea Champions — Top Ten (Innovation Made Possible)",
    ],
  },
  {
    title:  "GCE O' Levels",
    org:    "Yuying Secondary School",
    dates:  "2020",
    notes:  ["Edusave Scholarship 2020", "Lee Joo Jan Book Award 2020"],
  },
  {
    title:  "GCE N' Levels",
    org:    "Yuying Secondary School",
    dates:  "2016 – 2019",
    notes:  [
      "Edusave Good Progress Award 2016",
      "Edusave Scholarship 2017",
      "Edusave Merit Bursary 2018",
      "Edusave Scholarship 2019",
    ],
  },
] as const;

const PROJECTS = [
  {
    title:  "Rug Visualizer (MVP)",
    desc:   "Interactive rug placement tool: upload a room photo, place rugs, drag/rotate/resize, then export.",
    tags:   ["Next.js", "TypeScript", "Fabric.js", "UI/UX"],
    status: "In Development",
  },
  {
    title:  "Web + Systems Coursework",
    desc:   "Hands-on builds spanning web apps, electronics troubleshooting, and automation-style thinking.",
    tags:   ["C#", "Python", "Arduino", "Ubuntu"],
    status: "Completed",
  },
] as const;

const NOW = [
  "Building AI-powered web applications with modern frameworks",
  "Exploring Web3 technologies and blockchain integration",
  "Learning TypeScript patterns and Next.js best practices",
  "Contributing to open-source projects",
] as const;

// ── Utility ───────────────────────────────────────────────────
function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// ── Sub-components ────────────────────────────────────────────
function Tag({ children, dark }: { children: React.ReactNode; dark: boolean }) {
  return (
    <span className={cx(
      "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
      dark
        ? "border-stone-700 bg-stone-800/60 text-stone-300 hover:border-amber-500/40 hover:text-amber-300"
        : "border-stone-300 bg-stone-100 text-stone-600 hover:border-amber-500/60 hover:text-amber-700"
    )}>
      {children}
    </span>
  );
}

function Pill({ children, dark }: { children: React.ReactNode; dark: boolean }) {
  return (
    <span className={cx(
      "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
      dark
        ? "border-stone-700 bg-stone-800/50 text-stone-300"
        : "border-stone-300 bg-stone-100 text-stone-600"
    )}>
      {children}
    </span>
  );
}

function SkillBar({ name, level, dark }: { name: string; level: number; dark: boolean }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = setTimeout(() => setWidth(level), 150);
          return () => clearTimeout(t);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className={dark ? "text-stone-300" : "text-stone-600"}>{name}</span>
        <span className={dark ? "text-stone-500" : "text-stone-400"}>{level}%</span>
      </div>
      <div className={cx("h-1.5 overflow-hidden rounded-full", dark ? "bg-stone-800" : "bg-stone-200")}>
        <div
          className="h-full rounded-full bg-amber-500 transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTimeout(() => setVisible(true), delay);
      },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={cx(
        "transition-all duration-700",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      )}
    >
      {children}
    </div>
  );
}

function TypeWriter({ text, delay = 65 }: { text: string; delay?: number }) {
  const [display, setDisplay] = useState("");
  const [i, setI] = useState(0);

  useEffect(() => {
    if (i < text.length) {
      const t = setTimeout(() => {
        setDisplay((p) => p + text[i]);
        setI((p) => p + 1);
      }, delay);
      return () => clearTimeout(t);
    }
  }, [i, delay, text]);

  return <>{display}</>;
}

function ThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={cx(
        "relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2",
        dark
          ? "border-stone-600 bg-stone-700 focus:ring-offset-stone-900"
          : "border-stone-300 bg-stone-200 focus:ring-offset-white"
      )}
    >
      <span
        className={cx(
          "inline-flex h-5 w-5 transform items-center justify-center rounded-full shadow transition-transform duration-300 text-[9px]",
          dark ? "translate-x-[20px] bg-amber-400" : "translate-x-[1px] bg-white"
        )}
      >
        {dark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}

function Section({
  id, eyebrow, title, children, dark,
}: {
  id: string; eyebrow?: string; title: string;
  children: React.ReactNode; dark: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-20 py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <FadeIn>
          <div className="mb-8 md:mb-10">
            {eyebrow && (
              <p className={cx(
                "mb-2 text-[10px] font-semibold uppercase tracking-[0.2em]",
                dark ? "text-amber-500" : "text-amber-600"
              )}>
                {eyebrow}
              </p>
            )}
            <h2 className={cx(
              "font-serif text-2xl font-semibold md:text-3xl",
              dark ? "text-stone-100" : "text-stone-900"
            )}>
              {title}
            </h2>
          </div>
        </FadeIn>
        {children}
      </div>
    </section>
  );
}

function Card({ children, dark, className = "" }: {
  children: React.ReactNode; dark: boolean; className?: string;
}) {
  return (
    <div className={cx(
      "rounded-2xl border p-5 transition-all md:p-6",
      dark
        ? "border-stone-700/60 bg-stone-800/50 hover:border-amber-500/30"
        : "border-stone-200 bg-white hover:border-amber-400/50 hover:shadow-sm",
      className
    )}>
      {children}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function Page() {
  const [dark, setDark] = useState(true);
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover">("default");
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  // Persist theme in localStorage (SECURITY: only stores "dark"/"light" string)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light") setDark(false);
    } catch {
      // localStorage may be unavailable in some environments — fail silently
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("theme", next ? "dark" : "light");
      } catch {
        // fail silently
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const hover = useCallback((on: boolean) => {
    setCursorVariant(on ? "hover" : "default");
  }, []);

  // Theme tokens
  const bg      = dark ? "bg-[#111009]"   : "bg-[#FAF9F6]";
  const text     = dark ? "text-stone-100" : "text-stone-900";
  const muted    = dark ? "text-stone-400" : "text-stone-500";
  const navBg    = dark
    ? "bg-stone-950/80 border-stone-800/80"
    : "bg-white/80 border-stone-200";
  const divider  = dark ? "border-stone-800" : "border-stone-200";

  return (
    <div className={cx("min-h-screen transition-colors duration-300", bg, text)}>

      {/* ── Custom cursor (desktop only) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed z-[999] hidden md:block"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: `translate(-50%, -50%) scale(${cursorVariant === "hover" ? 1.6 : 1})`,
          transition: "transform 0.15s ease",
        }}
      >
        <div className={cx(
          "h-5 w-5 rounded-full border transition-colors duration-200",
          dark ? "border-amber-400/60" : "border-amber-600/60"
        )} />
      </div>

      {/* ── Grain texture overlay ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Ambient glow (dark only) ── */}
      {dark && (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-amber-600/5 blur-[100px]" />
          <div className="absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-orange-700/5 blur-[100px]" />
        </div>
      )}

      {/* ── Navigation ── */}
      <header className={cx(
        "sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300",
        navBg
      )}>
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:px-6 md:py-3.5">

          <a
            href="#top"
            className="group flex items-center gap-2.5"
            onMouseEnter={() => hover(true)}
            onMouseLeave={() => hover(false)}
          >
            <span className={cx(
              "flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-bold transition-all group-hover:scale-105",
              dark
                ? "border-amber-500/40 bg-amber-500/10 text-amber-400"
                : "border-amber-500/30 bg-amber-50 text-amber-700"
            )}>
              KM
            </span>
            <div className="leading-tight">
              <div className={cx("text-xs font-semibold", dark ? "text-stone-200" : "text-stone-800")}>
                {PROFILE.name}
              </div>
              <div className={cx("text-[10px]", muted)}>{PROFILE.location}</div>
            </div>
          </a>

          <nav className="hidden items-center gap-5 text-sm md:flex" aria-label="Primary navigation">
            {(["about","projects","experience","education","contact"] as const).map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={cx(
                  "capitalize transition-colors hover:text-amber-500",
                  muted
                )}
              >
                {id}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <ThemeToggle dark={dark} onToggle={toggleTheme} />
            <button
              onClick={() => window.print()}
              className={cx(
                "hidden rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all hover:scale-105 md:inline-flex",
                dark
                  ? "border-amber-500/40 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                  : "border-amber-600/30 bg-amber-50 text-amber-700 hover:bg-amber-100"
              )}
              onMouseEnter={() => hover(true)}
              onMouseLeave={() => hover(false)}
            >
              Download CV
            </button>
            <a
              href="#contact"
              className={cx(
                "rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors",
                dark
                  ? "border-stone-700 bg-stone-800/80 text-stone-300 hover:border-stone-500 hover:text-stone-100"
                  : "border-stone-300 bg-white text-stone-700 hover:border-stone-400"
              )}
            >
              Contact
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <main id="top" className="relative z-10 mx-auto max-w-5xl px-4 md:px-6">
        <section className="py-12 md:py-16 lg:py-20">
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-14">

            {/* Text */}
            <FadeIn>
              <div className="flex-1">
                <div className={cx(
                  "mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
                  dark
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                    : "border-emerald-600/20 bg-emerald-50 text-emerald-700"
                )}>
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  Available for opportunities
                </div>

                <h1 className={cx(
                  "font-serif text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.2rem]",
                  dark ? "text-stone-100" : "text-stone-900"
                )}>
                  <TypeWriter text="Learning AI and Web3," delay={65} />
                  <br />
                  <span className="text-amber-500">one project at a time</span>
                </h1>

                <p className={cx("mt-4 max-w-lg text-sm leading-relaxed md:text-[0.95rem]", muted)}>
                  {PROFILE.subtitle}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="#contact"
                    className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-stone-900 transition-all hover:scale-105 hover:bg-amber-400"
                    onMouseEnter={() => hover(true)}
                    onMouseLeave={() => hover(false)}
                  >
                    Let's talk
                  </a>
                  <a
                    href={PROFILE.resumeHref}
                    rel="noopener noreferrer"
                    className={cx(
                      "rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors",
                      dark
                        ? "border-stone-700 text-stone-300 hover:border-stone-500 hover:text-stone-100"
                        : "border-stone-300 text-stone-700 hover:border-stone-400"
                    )}
                  >
                    Download CV
                  </a>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  {[
                    { label: "Languages", value: "Python, TS/JS" },
                    { label: "Hardware",  value: "Arduino, Ubuntu" },
                    { label: "Strength",  value: "Ownership" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className={cx(
                        "rounded-xl border p-3 transition-colors",
                        dark
                          ? "border-stone-700/60 bg-stone-800/40 hover:border-amber-500/30"
                          : "border-stone-200 bg-stone-50 hover:border-amber-400/40"
                      )}
                    >
                      <div className={cx("text-[9px] font-semibold uppercase tracking-wider", muted)}>
                        {stat.label}
                      </div>
                      <div className={cx("mt-1 text-xs font-semibold md:text-sm", dark ? "text-stone-200" : "text-stone-800")}>
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* ── Profile photo — deliberately smaller, editorial style ── */}
            <FadeIn delay={180}>
              <div className="flex justify-center md:block">
                <div className="relative">
                  {/* Offset decorative border */}
                  <div className={cx(
                    "absolute -bottom-2.5 -right-2.5 h-full w-full rounded-2xl border-2",
                    dark ? "border-amber-500/25" : "border-amber-400/35"
                  )} />
                  {/* Photo container — max ~208px wide */}
                  <div className={cx(
                    "relative h-56 w-44 overflow-hidden rounded-2xl border shadow-lg sm:h-60 sm:w-48 md:h-64 md:w-52",
                    dark ? "border-stone-700" : "border-stone-300"
                  )}>
                    <Image
                      src={PROFILE.photoSrc}
                      alt={`Photo of ${PROFILE.name}`}
                      fill
                      priority
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 176px, (max-width: 768px) 192px, 208px"
                    />
                  </div>
                  {/* Small name badge */}
                  <div className={cx(
                    "absolute -bottom-4 left-3 max-w-[calc(100%-12px)] rounded-lg border px-3 py-1.5 text-[10px] font-semibold shadow-md backdrop-blur",
                    dark
                      ? "border-stone-700 bg-stone-900/90 text-stone-300"
                      : "border-stone-200 bg-white/90 text-stone-700"
                  )}>
                    Azeem · Singapore
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <div className={cx("border-t", divider)} />

      {/* ── About ── */}
      <Section id="about" eyebrow="Who I Am" title="About" dark={dark}>
        <div className="grid gap-4 md:grid-cols-2">
          <FadeIn>
            <Card dark={dark} className="h-full">
              <p className={cx("text-sm leading-relaxed md:text-[0.9rem]", muted)}>
                Engineering student who is self-motivated and detail-oriented with a profound interest in problem-solving.
                Adept at working independently and collaboratively. Inquisitive in nature — I like to learn and explore
                new ideas and technologies to solve complex problems.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Reliable","Detail-oriented","Team + solo","Curious builder"].map((p) => (
                  <Pill key={p} dark={dark}>{p}</Pill>
                ))}
              </div>
            </Card>
          </FadeIn>
          <FadeIn delay={100}>
            <Card dark={dark} className="h-full">
              <div className={cx("mb-5 text-[10px] font-semibold uppercase tracking-[0.15em]", dark ? "text-amber-500" : "text-amber-600")}>
                Technical Proficiency
              </div>
              <div className="space-y-5">
                {SKILLS.map((group) => (
                  <div key={group.label}>
                    <div className={cx("mb-3 text-[10px] font-semibold uppercase tracking-wider", muted)}>
                      {group.label}
                    </div>
                    <div className="space-y-2.5">
                      {group.items.map((s) => (
                        <SkillBar key={s.name} name={s.name} level={s.level} dark={dark} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>
        </div>
      </Section>

      {/* ── Currently ── */}
      <Section id="now" eyebrow="Right Now" title="What I'm Building Now" dark={dark}>
        <FadeIn>
          <div className={cx(
            "rounded-2xl border p-5 md:p-6",
            dark
              ? "border-emerald-500/20 bg-emerald-950/20"
              : "border-emerald-400/20 bg-emerald-50/50"
          )}>
            <div className="mb-5 flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span className={cx("text-[10px] font-semibold uppercase tracking-widest", dark ? "text-emerald-400" : "text-emerald-700")}>
                Active
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {NOW.map((item, i) => (
                <div
                  key={i}
                  className={cx(
                    "flex items-start gap-3 rounded-xl border p-3.5 transition-colors",
                    dark
                      ? "border-stone-700/50 bg-stone-800/40 hover:border-emerald-500/20"
                      : "border-stone-200 bg-white hover:border-emerald-400/30"
                  )}
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-amber-500" />
                  <span className={cx("text-sm", muted)}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* ── Projects ── */}
      <Section id="projects" eyebrow="Selected Work" title="Projects" dark={dark}>
        <div className="grid gap-4 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.title} delay={i * 80}>
              <Card dark={dark} className="h-full">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className={cx("font-serif text-base font-semibold md:text-lg", dark ? "text-stone-100" : "text-stone-900")}>
                    {p.title}
                  </h3>
                  <span className={cx(
                    "mt-0.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[10px] font-medium",
                    p.status === "Completed"
                      ? dark  ? "border-emerald-500/30 bg-emerald-950/40 text-emerald-400"
                              : "border-emerald-500/30 bg-emerald-50 text-emerald-700"
                      : dark  ? "border-amber-500/30 bg-amber-950/30 text-amber-400"
                              : "border-amber-500/30 bg-amber-50 text-amber-700"
                  )}>
                    {p.status}
                  </span>
                </div>
                <p className={cx("text-sm leading-relaxed", muted)}>{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => <Tag key={t} dark={dark}>{t}</Tag>)}
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ── Experience ── */}
      <Section id="experience" eyebrow="Professional Experience" title="Experience" dark={dark}>
        <div className="space-y-4">
          {EXPERIENCE.map((job, i) => (
            <FadeIn key={job.title} delay={i * 80}>
              <Card dark={dark}>
                <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h3 className={cx("font-serif font-semibold", dark ? "text-stone-100" : "text-stone-900")}>
                      {job.title}
                    </h3>
                    <div className={cx("text-sm", muted)}>{job.org}</div>
                  </div>
                  <span className={cx(
                    "mt-1 w-fit rounded-full border px-2.5 py-0.5 text-[10px] font-medium sm:mt-0",
                    dark ? "border-stone-700 bg-stone-800/60 text-stone-400" : "border-stone-200 bg-stone-50 text-stone-500"
                  )}>
                    {job.dates}
                  </span>
                </div>
                <ul className="space-y-2">
                  {job.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-[7px] h-1 w-1 flex-none rounded-full bg-amber-500" />
                      <span className={cx("text-sm leading-relaxed", muted)}>{b}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ── Leadership ── */}
      <Section id="leadership" eyebrow="Leadership" title="Leadership & Activities" dark={dark}>
        <div className="grid gap-4 md:grid-cols-2">
          {LEADERSHIP.map((l, i) => (
            <FadeIn key={l.title} delay={i * 80}>
              <Card dark={dark} className="h-full">
                <h3 className={cx("font-serif font-semibold", dark ? "text-stone-100" : "text-stone-900")}>{l.title}</h3>
                <div className={cx("mt-1 text-sm", muted)}>{l.org}</div>
                <ul className="mt-4 space-y-2">
                  {l.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-[7px] h-1 w-1 flex-none rounded-full bg-amber-500" />
                      <span className={cx("text-sm leading-relaxed", muted)}>{b}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ── Education ── */}
      <Section id="education" eyebrow="Education" title="Education" dark={dark}>
        <div className="space-y-4">
          {EDUCATION.map((edu, i) => (
            <FadeIn key={edu.title} delay={i * 80}>
              <Card dark={dark}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h3 className={cx("font-serif font-semibold", dark ? "text-stone-100" : "text-stone-900")}>{edu.title}</h3>
                    <div className={cx("text-sm", muted)}>{edu.org}</div>
                  </div>
                  <span className={cx(
                    "mt-1 w-fit rounded-full border px-2.5 py-0.5 text-[10px] font-medium sm:mt-0",
                    dark ? "border-stone-700 bg-stone-800/60 text-stone-400" : "border-stone-200 bg-stone-50 text-stone-500"
                  )}>
                    {edu.dates}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {edu.notes.map((n) => <Tag key={n} dark={dark}>{n}</Tag>)}
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ── Contact ── */}
      <Section id="contact" eyebrow="Get in Touch" title="Contact" dark={dark}>
        <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <FadeIn>
            <Card dark={dark}>
              <h3 className={cx("font-serif text-lg font-semibold", dark ? "text-stone-100" : "text-stone-900")}>
                Reach out
              </h3>
              <p className={cx("mt-2 text-sm leading-relaxed", muted)}>
                If you're hiring, collaborating, or just want to connect — send a message.
                I reply fast and I'm serious about building great work.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={`mailto:${PROFILE.email}`}
                  rel="noopener noreferrer"
                  className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-stone-900 transition-all hover:scale-105 hover:bg-amber-400"
                  onMouseEnter={() => hover(true)}
                  onMouseLeave={() => hover(false)}
                >
                  Email me
                </a>
                <button
                  onClick={() => window.print()}
                  className={cx(
                    "rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors",
                    dark
                      ? "border-stone-700 text-stone-300 hover:border-stone-500 hover:text-stone-100"
                      : "border-stone-300 text-stone-700 hover:border-stone-400"
                  )}
                >
                  Download CV
                </button>
              </div>
            </Card>
          </FadeIn>
          <FadeIn delay={100}>
            <Card dark={dark}>
              <div className={cx("mb-4 text-[10px] font-semibold uppercase tracking-[0.15em]", dark ? "text-amber-500" : "text-amber-600")}>
                Details
              </div>
              <div className="space-y-3">
                {[
                  { label: "Email",    value: PROFILE.email },
                  { label: "Phone",    value: PROFILE.phone },
                  { label: "Location", value: PROFILE.location },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start justify-between gap-3">
                    <span className={cx("flex-none text-xs", muted)}>{label}</span>
                    <span className={cx("break-all text-right text-xs font-medium", dark ? "text-stone-200" : "text-stone-800")}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>
        </div>
      </Section>

      {/* ── Footer ── */}
      <footer className={cx("border-t py-8", divider)}>
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 md:flex-row md:items-center md:justify-between md:px-6">
          <div className={cx("text-xs", muted)}>
            © {new Date().getFullYear()} {PROFILE.name}
          </div>
          <div className={cx("flex items-center gap-5 text-xs", muted)}>
            {["about","projects","contact"].map((id) => (
              <a key={id} href={`#${id}`} className="capitalize transition-colors hover:text-amber-500">
                {id}
              </a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}