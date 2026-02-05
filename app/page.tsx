// app/page.tsx
import Image from "next/image";

const PROFILE = {
  name: "Khawaja Muhammad Azeem",
  tagline: "Clean systems. Strong execution. A portfolio that speaks.",
  subtitle:
    "Engineering student who ships clean, reliable work — from testing pipelines to full-stack web experiences.",
  email: "s10223616@connect.np.edu.sg",
  phone: "82640409",
  location: "Singapore",
  photoSrc: "/me.png", // <-- put your photo in /public/me.png
  resumeHref: "/resume.pdf", // optional: put a resume PDF in /public/resume.pdf
};

const SKILLS = [
  {
    label: "Programming",
    items: ["C#", "C++", "Python", "Dart", "HTML", "CSS"],
  },
  {
    label: "Hardware",
    items: ["Ubuntu", "Arduino", "Tinkercad"],
  },
  {
    label: "Tools",
    items: ["Microsoft Word", "PowerPoint"],
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
    title: "GCE O’ Levels",
    org: "Yuying Secondary School",
    dates: "2020",
    notes: ["Edusave Scholarship 2020", "Lee Joo Jan Book Award 2020"],
  },
  {
    title: "GCE N’ Levels",
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

// Optional projects section (add/replace with your real work)
const PROJECTS = [
  {
    title: "Rug Visualizer (MVP)",
    desc: "Interactive rug placement tool: upload room photo → place rugs → drag/rotate/resize → export.",
    tags: ["Next.js", "TypeScript", "Fabric.js", "UI/UX"],
    href: "#",
  },
  {
    title: "Web + Systems Coursework",
    desc: "Hands-on builds spanning web apps, electronics troubleshooting, and automation-style thinking.",
    tags: ["C#", "Python", "Arduino", "Ubuntu"],
    href: "#",
  },
];

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
      {children}
    </span>
  );
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
        <div className="mb-8 md:mb-10">
          {eyebrow ? (
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.6)]" />
              <p className="text-xs font-semibold tracking-widest text-white/60 uppercase">
                {eyebrow}
              </p>
            </div>
          ) : null}
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-[#070A12] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_20%_10%,rgba(124,58,237,0.25),transparent_60%),radial-gradient(900px_500px_at_80%_20%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(1000px_600px_at_50%_90%,rgba(16,185,129,0.10),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.09] [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22 viewBox=%220 0 160 160%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.25%22%3E%3Ccircle cx=%221%22 cy=%221%22 r=%221%22/%3E%3Ccircle cx=%2280%22 cy=%2240%22 r=%221%22/%3E%3Ccircle cx=%22140%22 cy=%22120%22 r=%221%22/%3E%3C/g%3E%3C/svg%3E')]" />
      </div>

      {/* Top nav */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#top" className="group inline-flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
              <span className="text-sm font-semibold">KM</span>
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-white">
                {PROFILE.name}
              </div>
              <div className="text-xs text-white/60">{PROFILE.location}</div>
            </div>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <a className="hover:text-white" href="#about">
              About
            </a>
            <a className="hover:text-white" href="#projects">
              Projects
            </a>
            <a className="hover:text-white" href="#experience">
              Experience
            </a>
            <a className="hover:text-white" href="#education">
              Education
            </a>
            <a className="hover:text-white" href="#contact">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={PROFILE.resumeHref}
              className="hidden rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90 md:inline-flex"
            >
              Download CV
            </a>
            <a
              href="#contact"
              className="inline-flex rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
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
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Portfolio • 2026-ready
              </div>

              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                <span className="text-white">{PROFILE.tagline.split(".")[0]}.</span>
                <br />
                <span className="text-white/90">
                  {PROFILE.tagline.split(".")[1]?.trim() ?? "Strong execution."}
                </span>
                <br />
                <span className="bg-gradient-to-r from-violet-300 via-white to-sky-200 bg-clip-text text-transparent">
                  {PROFILE.tagline.split(".")[2]?.trim() ?? "A portfolio that speaks."}
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/65 md:text-base">
                {PROFILE.subtitle}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90"
                >
                  Let’s talk
                </a>
                <a
                  href={PROFILE.resumeHref}
                  className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Download CV
                </a>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-white/60">Languages</div>
                  <div className="mt-1 text-sm font-semibold">Python, TS/JS</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-white/60">Hardware</div>
                  <div className="mt-1 text-sm font-semibold">Ubuntu, Arduino</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-white/60">Strength</div>
                  <div className="mt-1 text-sm font-semibold">Ownership</div>
                </div>
              </div>
            </div>

            {/* Photo card */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-b from-white/10 to-transparent blur-2xl" />
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
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
              <p className="mt-3 text-center text-xs text-white/45">
                Tip: If your photo still crops weirdly, try <code className="text-white/60">object-center</code> or
                tweak the container aspect ratio.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Section id="about" eyebrow="Executive Profile" title="About">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
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

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="text-sm font-semibold text-white">Technical Toolkit</div>
            <div className="mt-4 space-y-4">
              {SKILLS.map((group) => (
                <div key={group.label}>
                  <div className="text-xs font-semibold uppercase tracking-widest text-white/55">
                    {group.label}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {group.items.map((it) => (
                      <span
                        key={it}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="projects" eyebrow="Selected Work" title="Projects">
        <div className="grid gap-5 md:grid-cols-2">
          {PROJECTS.map((p) => (
            <a
              key={p.title}
              href={p.href}
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/7 hover:ring-1 hover:ring-white/15"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold">{p.title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {p.desc}
                  </p>
                </div>
                <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/70 transition group-hover:bg-white/10">
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
          ))}
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/65">
          Want this to feel “top-1%”? Next we can add: case study pages per project, motion micro-interactions,
          live demos, and a “Now” page that makes you memorable.
        </div>
      </Section>

      <Section id="experience" eyebrow="Professional Experience" title="Experience">
        <div className="space-y-5">
          {EXPERIENCE.map((job) => (
            <div
              key={job.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8"
            >
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
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-white/40" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="leadership" eyebrow="Leadership" title="Leadership & Activities">
        <div className="grid gap-5 md:grid-cols-2">
          {LEADERSHIP.map((l) => (
            <div
              key={l.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8"
            >
              <div className="text-lg font-semibold">{l.title}</div>
              <div className="mt-1 text-sm text-white/70">{l.org}</div>
              <ul className="mt-5 space-y-2 text-sm text-white/70">
                {l.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-white/40" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="education" eyebrow="Education" title="Education">
        <div className="space-y-5">
          {EDUCATION.map((edu) => (
            <div
              key={edu.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8"
            >
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
          ))}
        </div>
      </Section>

      <Section id="contact" eyebrow="Let’s build" title="Contact">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="text-lg font-semibold">Reach out</div>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              If you’re hiring, collaborating, or just want to connect — send a message.
              I reply fast and I’m serious about building great work.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90"
                href={`mailto:${PROFILE.email}`}
              >
                Email me
              </a>
              <a
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                href={PROFILE.resumeHref}
              >
                Download CV
              </a>
            </div>
          </div>

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

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 text-xs text-white/60">
              Next upgrade: add a contact form (with email sending) + analytics + SEO open-graph for link sharing.
            </div>
          </div>
        </div>
      </Section>

      <footer className="border-t border-white/10 bg-black/20 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-white/60">
            © {new Date().getFullYear()} {PROFILE.name}. Built with Next.js.
          </div>
          <div className="flex items-center gap-5 text-sm text-white/60">
            <a className="hover:text-white" href="#about">
              About
            </a>
            <a className="hover:text-white" href="#projects">
              Projects
            </a>
            <a className="hover:text-white" href="#contact">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}