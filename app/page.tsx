// app/page.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const PROFILE = {
  name: "Khawaja Muhammad Azeem",
  title: "Engineering Student, Developer & Police Tactical Trooper",
  location: "Singapore",
  email: "khawajaazeem0409@gmail.com",
  phone: "+65 8840 0409",
  photo: "/me.PNG",
  tagline: "Building AI automation tools for businesses. Currently serving in SPF Special Operations Command.",
};

const CURRENTLY_BUILDING = [
  {
    title: "WhatsApp AI Agent Platform",
    desc: "Intelligent customer service automation for Singapore tuition centres using Claude API.",
    status: "Active",
    tech: ["Next.js", "TypeScript", "Claude API"],
  },
  {
    title: "PTMS (Personnel Management System)",
    desc: "Internal tracking system for SPF Company 3, SOC to streamline personnel operations.",
    status: "Deploying",
    tech: ["React", "Firebase", "Tailwind"],
  },
];

const PROJECTS = [
  {
    title: "Rug Visualizer",
    desc: "Interactive design tool for room visualization with drag, rotate, and resize capabilities.",
    tech: ["Next.js", "TypeScript", "Fabric.js"],
  },
  {
    title: "Web3 Academy",
    desc: "Educational platform for blockchain fundamentals and smart contract development.",
    tech: ["Solidity", "React", "Web3.js"],
  },
  {
    title: "IoT Automation",
    desc: "Arduino-based sensors and Ubuntu system configurations for smart applications.",
    tech: ["C++", "Python", "Arduino"],
  },
];

const NS_JOURNEY = [
  {
    period: "Aug 2024 – Jan 2025",
    title: "Police Officer Basic Course",
    org: "Singapore Police Force",
  },
  {
    period: "Jan 2025 – Apr 2025",
    title: "Police Tactical Course",
    org: "Special Operations Command",
    highlight: "Passed out as Police Tactical Trooper",
    achievements: ["Promoted: SC → SC2 → SC/CPL → SC/SGT(1)", "Marksman: Taurus Revolver (.38) & HK MP5"],
  },
  {
    period: "Apr 2025 – Present",
    title: "Police Tactical Trooper",
    org: "Company 3, SOC",
    projects: [
      "Solution holder design for operational efficiency",
      "Unit identity T-shirt design",
      "PTMS development for Company Commander",
    ],
  },
];

const WORK = {
  role: "Assistant Production Engineer",
  company: "Ascent Solutions",
  period: "Mar – Aug 2023",
  points: [
    "648 sensor boards/day with zero-defect quality",
    "Led tracker configuration team",
    "Systematic troubleshooting protocols",
  ],
};

const EDUCATION = [
  {
    degree: "Electronics & Computer Engineering",
    school: "Ngee Ann Polytechnic",
    period: "2021 – 2024",
    note: "Idea Champions Top 10",
  },
  {
    degree: "GCE O' Levels",
    school: "Yuying Secondary",
    period: "2020",
    note: "Edusave Scholarship",
  },
];

const SKILLS = ["Python", "TypeScript", "React", "Next.js", "C++", "Solidity", "Arduino", "Firebase"];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => e.isIntersecting && setTimeout(() => setShow(true), delay),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`transition-all duration-500 ${show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
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
    <div className="min-h-screen bg-white">
      
      {/* Header */}
      <header className={`fixed top-0 z-50 w-full transition-all ${
        scrolled ? "border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-sm" : ""
      }`}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#" className="text-lg font-bold text-gray-900">Azeem</a>
          <nav className="hidden gap-6 text-sm font-medium md:flex">
            <a href="#building" className="text-gray-700 hover:text-gray-900">Building</a>
            <a href="#work" className="text-gray-700 hover:text-gray-900">Work</a>
            <a href="#ns" className="text-gray-700 hover:text-gray-900">NS</a>
            <a href="#contact" className="text-gray-700 hover:text-gray-900">Contact</a>
          </nav>
          <a href="#contact" className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800">
            Get in touch
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-32 pb-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <FadeIn>
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-600 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-600"></span>
                Open to collaboration
              </div>
              <h1 className="mb-4 text-5xl font-bold leading-tight text-gray-900 md:text-6xl">{PROFILE.name}</h1>
              <p className="mb-4 text-2xl font-medium text-gray-800">{PROFILE.title}</p>
              <p className="mb-8 max-w-xl text-lg leading-relaxed text-gray-700">{PROFILE.tagline}</p>
              <div className="mb-8 flex flex-wrap gap-3">
                <a href="#contact" className="rounded-lg bg-gray-900 px-7 py-3.5 text-base font-semibold text-white hover:bg-gray-800">
                  Let's work together
                </a>
                <button onClick={() => window.print()} className="rounded-lg border-2 border-gray-300 px-7 py-3.5 text-base font-semibold text-gray-900 hover:border-gray-400 hover:bg-gray-50">
                  Download CV
                </button>
              </div>
              {/* Social icons */}
              <div className="flex gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-gray-300 text-gray-700 transition-colors hover:border-gray-900 hover:bg-gray-50">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-gray-300 text-gray-700 transition-colors hover:border-gray-900 hover:bg-gray-50">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-gray-300 text-gray-700 transition-colors hover:border-gray-900 hover:bg-gray-50">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl border-2 border-gray-200 shadow-xl">
                <Image src={PROFILE.photo} alt={PROFILE.name} fill priority className="object-cover object-top" sizes="500px" />
              </div>
              <div className="absolute -bottom-4 -right-4 rounded-xl border-2 border-gray-200 bg-white px-5 py-3 shadow-lg">
                <p className="text-sm font-semibold text-gray-900">📍 {PROFILE.location}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Currently Building */}
      <section id="building" className="border-t border-gray-200 bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <h2 className="mb-12 text-4xl font-bold text-gray-900">Currently Building</h2>
          </FadeIn>
          <div className="grid gap-6 md:grid-cols-2">
            {CURRENTLY_BUILDING.map((item, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="rounded-2xl border-2 border-gray-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                    <span className="whitespace-nowrap rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-800">{item.status}</span>
                  </div>
                  <p className="mb-5 text-base leading-relaxed text-gray-700">{item.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tech.map(t => <span key={t} className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800">{t}</span>)}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="work" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn><h2 className="mb-12 text-4xl font-bold text-gray-900">Projects</h2></FadeIn>
          <div className="grid gap-6 md:grid-cols-3">
            {PROJECTS.map((p, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="group rounded-2xl border-2 border-gray-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="mb-3 text-xl font-bold text-gray-900">{p.title}</h3>
                  <p className="mb-4 text-base leading-relaxed text-gray-700">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tech.map(t => <span key={t} className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-800">{t}</span>)}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={300}>
            <div className="mt-12">
              <h3 className="mb-6 text-3xl font-bold text-gray-900">Professional Experience</h3>
              <div className="rounded-2xl border-2 border-gray-200 bg-white p-7">
                <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{WORK.role}</h4>
                    <p className="text-lg font-medium text-gray-700">{WORK.company}</p>
                  </div>
                  <span className="text-base font-semibold text-gray-600">{WORK.period}</span>
                </div>
                <ul className="space-y-3">
                  {WORK.points.map((p, i) => (
                    <li key={i} className="flex gap-3 text-base text-gray-700">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-900" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* National Service */}
      <section id="ns" className="border-t border-gray-200 bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn><h2 className="mb-12 text-4xl font-bold text-gray-900">National Service</h2></FadeIn>
          <div className="space-y-6">
            {NS_JOURNEY.map((item, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="rounded-2xl border-2 border-gray-200 bg-white p-7">
                  <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                      <p className="text-lg font-medium text-gray-700">{item.org}</p>
                    </div>
                    <span className="text-base font-semibold text-gray-600">{item.period}</span>
                  </div>
                  {item.highlight && <p className="mb-4 text-base font-semibold text-emerald-700">{item.highlight}</p>}
                  {item.achievements && (
                    <ul className="mb-4 space-y-2">
                      {item.achievements.map((a, j) => (
                        <li key={j} className="flex gap-2 text-base text-gray-700">
                          <span>•</span><span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.projects && (
                    <div>
                      <p className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-600">Projects</p>
                      <ul className="space-y-2">
                        {item.projects.map((p, j) => (
                          <li key={j} className="flex gap-2 text-base text-gray-700">
                            <span>•</span><span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Education */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <FadeIn>
              <h3 className="mb-6 text-3xl font-bold text-gray-900">Skills</h3>
              <div className="flex flex-wrap gap-3">
                {SKILLS.map(s => <span key={s} className="rounded-xl border-2 border-gray-200 bg-white px-5 py-3 text-base font-semibold text-gray-900">{s}</span>)}
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <h3 className="mb-6 text-3xl font-bold text-gray-900">Education</h3>
              <div className="space-y-5">
                {EDUCATION.map((e, i) => (
                  <div key={i} className="border-l-4 border-gray-900 pl-5">
                    <h4 className="text-lg font-bold text-gray-900">{e.degree}</h4>
                    <p className="text-base font-medium text-gray-700">{e.school}</p>
                    <p className="text-sm font-semibold text-gray-600">{e.period} • {e.note}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-gray-200 bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn><h2 className="mb-12 text-4xl font-bold text-gray-900">Get in Touch</h2></FadeIn>
          <div className="grid gap-6 md:grid-cols-2">
            <FadeIn delay={100}>
              <div>
                <p className="mb-8 text-lg leading-relaxed text-gray-700">
                  Open to collaborations, entrepreneurial opportunities, and building with great founders.
                </p>
                <a href={`mailto:${PROFILE.email}`} className="inline-flex rounded-lg bg-gray-900 px-7 py-4 text-base font-semibold text-white hover:bg-gray-800">
                  Send email
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="space-y-5 rounded-2xl border-2 border-gray-200 bg-white p-7">
                <div className="flex justify-between border-b-2 border-gray-100 pb-5">
                  <span className="text-base font-semibold text-gray-600">Email</span>
                  <a href={`mailto:${PROFILE.email}`} className="text-base font-semibold text-gray-900 hover:text-gray-700">{PROFILE.email}</a>
                </div>
                <div className="flex justify-between border-b-2 border-gray-100 pb-5">
                  <span className="text-base font-semibold text-gray-600">Phone</span>
                  <a href={`tel:${PROFILE.phone}`} className="text-base font-semibold text-gray-900 hover:text-gray-700">{PROFILE.phone}</a>
                </div>
                <div className="flex justify-between">
                  <span className="text-base font-semibold text-gray-600">Location</span>
                  <span className="text-base font-semibold text-gray-900">{PROFILE.location}</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-gray-200 py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-base font-medium text-gray-700">
          © {new Date().getFullYear()} {PROFILE.name}
        </div>
      </footer>

    </div>
  );
}