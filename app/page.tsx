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
};

const SKILLS = [
  "Python",
  "TypeScript",
  "React",
  "Next.js",
  "C++",
  "C#",
  "Solidity",
  "Arduino",
  "Ubuntu",
];

const PROJECTS = [
  {
    title: "Rug Visualizer",
    desc: "Interactive room design tool with drag, rotate, and resize for rug placement and real-time preview export.",
    tech: ["Next.js", "TypeScript", "Fabric.js"],
  },
  {
    title: "Web3 Academy",
    desc: "Educational platform for blockchain fundamentals and smart contract development.",
    tech: ["Solidity", "React", "Web3.js"],
  },
  {
    title: "IoT Systems",
    desc: "Arduino-based automation and Ubuntu system configuration projects.",
    tech: ["C++", "Python", "Arduino"],
  },
];

const EXPERIENCE = {
  role: "Assistant Production Engineer",
  company: "Ascent Solutions",
  period: "Mar – Aug 2023",
  points: [
    "Tested 648+ sensor boards daily with consistent quality",
    "Led tracker configuration team after volunteer initiative",
    "Improved productivity through systematic protocols",
  ],
};

const EDUCATION = [
  {
    degree: "Diploma in Electronics & Computer Engineering",
    school: "Ngee Ann Polytechnic",
    year: "2021 – 2024",
  },
  {
    degree: "GCE O' Levels",
    school: "Yuying Secondary",
    year: "2020",
  },
];

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
    <div
      ref={ref}
      className={`transition-all duration-500 ${show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
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
    <div className="min-h-screen bg-white">
      
      {/* Header */}
      <header className={`fixed top-0 z-50 w-full transition-all ${
        scrolled ? "border-b bg-white/80 shadow-sm backdrop-blur-lg" : "bg-transparent"
      }`}>
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <a href="#top" className="text-lg font-semibold text-slate-900">
            {PROFILE.name.split(" ").pop()}
          </a>
          <nav className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#about" className="hover:text-slate-900">About</a>
            <a href="#work" className="hover:text-slate-900">Work</a>
            <a href="#contact" className="hover:text-slate-900">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="mx-auto max-w-5xl px-6 pt-32 pb-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:gap-16">
          
          <FadeIn>
            <div>
              <h1 className="mb-4 text-5xl font-bold text-slate-900 md:text-6xl">
                {PROFILE.name}
              </h1>
              <p className="mb-6 text-xl text-slate-600">
                {PROFILE.role}
              </p>
              <p className="mb-8 text-slate-600 leading-relaxed">
                Engineering student building at the intersection of AI and Web3. From electronics 
                troubleshooting to full-stack development — shipping reliable systems that solve real problems.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800"
                >
                  Get in touch
                </a>
                <button
                  onClick={() => window.print()}
                  className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-slate-400"
                >
                  Download CV
                </button>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-slate-200 shadow-xl">
                <Image
                  src={PROFILE.photo}
                  alt={PROFILE.name}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-lg">
                <p className="text-sm font-medium text-slate-700">📍 {PROFILE.location}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t bg-slate-50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <h2 className="mb-12 text-3xl font-bold text-slate-900">About Me</h2>
          </FadeIn>

          <div className="grid gap-12 md:grid-cols-2">
            <FadeIn delay={100}>
              <div>
                <h3 className="mb-4 text-xl font-semibold text-slate-900">Background</h3>
                <p className="mb-4 text-slate-600 leading-relaxed">
                  Self-driven engineering student with hands-on experience in electronics, software 
                  development, and emerging technologies like AI and Web3.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  I thrive on building reliable systems and solving complex problems, whether it's 
                  troubleshooting hardware or developing full-stack applications.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div>
                <h3 className="mb-6 text-xl font-semibold text-slate-900">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="work" className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <h2 className="mb-12 text-3xl font-bold text-slate-900">Projects</h2>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {PROJECTS.map((project, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="mb-3 text-xl font-semibold text-slate-900">{project.title}</h3>
                  <p className="mb-4 text-sm text-slate-600 leading-relaxed">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={300}>
            <div className="mt-12">
              <h3 className="mb-6 text-2xl font-bold text-slate-900">Experience</h3>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900">{EXPERIENCE.role}</h4>
                    <p className="text-slate-600">{EXPERIENCE.company}</p>
                  </div>
                  <span className="text-sm text-slate-500">{EXPERIENCE.period}</span>
                </div>
                <ul className="space-y-2">
                  {EXPERIENCE.points.map((point, j) => (
                    <li key={j} className="flex gap-3 text-sm text-slate-600">
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-slate-400" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Education */}
      <section className="border-t bg-slate-50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <h2 className="mb-12 text-3xl font-bold text-slate-900">Education</h2>
          </FadeIn>

          <div className="space-y-6">
            {EDUCATION.map((edu, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="flex flex-wrap items-baseline justify-between gap-4 border-l-2 border-slate-300 pl-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{edu.degree}</h3>
                    <p className="text-slate-600">{edu.school}</p>
                  </div>
                  <span className="text-sm font-medium text-slate-500">{edu.year}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <h2 className="mb-12 text-3xl font-bold text-slate-900">Get in Touch</h2>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-2">
            <FadeIn delay={100}>
              <div>
                <p className="mb-8 text-lg text-slate-600 leading-relaxed">
                  Available for freelance projects, collaborations, and full-time opportunities.
                  Based in Singapore, working globally.
                </p>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="inline-flex rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800"
                >
                  Send me an email
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-sm text-slate-500">Email</span>
                  <a href={`mailto:${PROFILE.email}`} className="text-sm font-medium text-slate-900 hover:text-slate-700">
                    {PROFILE.email}
                  </a>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-sm text-slate-500">Phone</span>
                  <a href={`tel:${PROFILE.phone}`} className="text-sm font-medium text-slate-900 hover:text-slate-700">
                    {PROFILE.phone}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Location</span>
                  <span className="text-sm font-medium text-slate-900">{PROFILE.location}</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="mx-auto max-w-5xl px-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} {PROFILE.name}
        </div>
      </footer>

    </div>
  );
}