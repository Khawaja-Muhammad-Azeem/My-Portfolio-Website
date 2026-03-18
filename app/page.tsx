// app/page.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  Github, Linkedin, Twitter, Mail, Phone, MapPin, 
  ArrowUpRight, Download, Moon, Sun, Menu, X,
  Code, Briefcase, Award, Zap
} from "lucide-react";

const PROFILE = {
  name: "Khawaja Muhammad Azeem",
  initials: "KMA",
  title: "Engineering Student, Developer & Police Tactical Trooper",
  location: "Singapore",
  email: "khawajaazeem0409@gmail.com",
  phone: "+65 8840 0409",
  photo: "/me.PNG",
  tagline: "Building AI automation tools while serving in SPF Special Operations Command.",
};

const CURRENTLY_BUILDING = [
  {
    title: "WhatsApp AI Agent",
    desc: "Intelligent customer service automation for Singapore tuition centres.",
    icon: Zap,
    tags: ["Next.js", "Claude API", "TypeScript"],
  },
  {
    title: "PTMS System",
    desc: "Personnel tracking for SPF Company 3, SOC operations.",
    icon: Code,
    tags: ["React", "Firebase", "Tailwind"],
  },
];

const PROJECTS = [
  { title: "Rug Visualizer", desc: "Interactive room design with drag & resize.", tags: ["Next.js", "Fabric.js"] },
  { title: "Web3 Academy", desc: "Blockchain education platform.", tags: ["Solidity", "React"] },
  { title: "IoT Automation", desc: "Arduino-based smart systems.", tags: ["C++", "Python"] },
];

const NS_JOURNEY = [
  { period: "Apr 2025 – Present", title: "Tactical Trooper", desc: "Company 3, SOC", icon: Award },
  { period: "Jan – Apr 2025", title: "Tactical Course", desc: "Marksman (Taurus & MP5)", icon: Award },
  { period: "Aug 2024 – Jan 2025", title: "Basic Course", desc: "SPF Foundation", icon: Briefcase },
];

const SKILLS = ["Python", "TypeScript", "React", "Next.js", "C++", "Solidity", "Arduino", "Firebase"];

// Video Background Component
const VideoBackground = ({ isDark }: { isDark: boolean }) => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className={`absolute inset-0 ${isDark ? 'bg-gray-950' : 'bg-white'} transition-colors duration-500`} />
      <div className={`absolute inset-0 ${isDark ? 'opacity-20' : 'opacity-10'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 animate-gradient" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzIxMjEyMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
      </div>
    </div>
  );
};

export default function Portfolio() {
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  const textColor = isDark ? "text-white" : "text-gray-900";
  const bgColor = isDark ? "bg-gray-900" : "bg-white";
  const borderColor = isDark ? "border-white/10" : "border-gray-200";
  const glassColor = isDark ? "bg-white/5" : "bg-white/70";

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} transition-colors duration-500`}>
      <VideoBackground isDark={isDark} />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Sticky Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? `${glassColor} backdrop-blur-2xl border-b ${borderColor} shadow-lg` : ""
        }`}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl border-2 ${
                isDark ? 'border-indigo-400 bg-indigo-500/20' : 'border-indigo-600 bg-indigo-50'
              } font-bold backdrop-blur-sm`}>
                {PROFILE.initials}
              </div>
              <span className="hidden text-xl font-bold sm:block">Azeem</span>
            </div>
            
            <nav className="hidden gap-8 text-sm font-medium md:flex">
              <a href="#building" className="hover:text-indigo-500 transition-colors">Building</a>
              <a href="#work" className="hover:text-indigo-500 transition-colors">Work</a>
              <a href="#ns" className="hover:text-indigo-500 transition-colors">NS</a>
              <a href="#contact" className="hover:text-indigo-500 transition-colors">Contact</a>
            </nav>
            
            <div className="flex items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className={`p-3 rounded-xl ${glassColor} backdrop-blur-xl border ${borderColor}`}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </motion.button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-3 rounded-xl ${glassColor} backdrop-blur-xl border ${borderColor}`}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className={`fixed right-0 top-20 z-30 h-screen w-64 ${glassColor} backdrop-blur-2xl border-l ${borderColor} p-6 md:hidden`}
        >
          <nav className="flex flex-col gap-6 text-lg font-medium">
            <a href="#building" onClick={() => setMobileMenuOpen(false)}>Building</a>
            <a href="#work" onClick={() => setMobileMenuOpen(false)}>Work</a>
            <a href="#ns" onClick={() => setMobileMenuOpen(false)}>NS</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </nav>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-emerald-500 bg-emerald-500/10 px-5 py-2 backdrop-blur-sm"
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                <span className="text-sm font-bold uppercase tracking-wider text-emerald-500">
                  Open to Collaboration
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6 text-6xl font-black leading-[1.1] tracking-tight md:text-7xl lg:text-8xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {PROFILE.name.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className={`block ${i === 2 ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent' : ''}`}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mb-4 text-2xl font-bold"
              >
                {PROFILE.title}
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className={`mb-10 max-w-xl text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
              >
                {PROFILE.tagline}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-wrap gap-4"
              >
                <motion.a
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact"
                  className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-base font-bold text-white shadow-lg"
                >
                  Let's Collaborate
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </motion.a>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.print()}
                  className={`flex items-center gap-2 rounded-xl ${glassColor} backdrop-blur-xl border-2 ${borderColor} px-8 py-4 text-base font-bold`}
                >
                  <Download className="h-5 w-5" />
                  Download CV
                </motion.button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-8 flex gap-4"
              >
                {[Github, Linkedin, Twitter].map((Icon, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.1, y: -4 }}
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${glassColor} backdrop-blur-xl border ${borderColor} cursor-pointer`}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative"
            >
              <div className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-30 blur-3xl" />
              <div className="relative">
                <div className={`aspect-[4/5] overflow-hidden rounded-3xl border-4 ${borderColor} ${glassColor} backdrop-blur-xl shadow-2xl`}>
                  <Image
                    src={PROFILE.photo}
                    alt={PROFILE.name}
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Currently Building */}
      <section id="building" className="relative py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-5xl font-black md:text-6xl"
          >
            Currently Building
          </motion.h2>
          
          <div className="grid gap-8 md:grid-cols-2">
            {CURRENTLY_BUILDING.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group relative overflow-hidden rounded-3xl border-2 ${borderColor} ${glassColor} backdrop-blur-2xl p-8 shadow-xl transition-all`}
              >
                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-2xl" />
                <div className="relative">
                  <item.icon className="mb-6 h-12 w-12 text-indigo-500" />
                  <h3 className="mb-4 text-2xl font-bold">{item.title}</h3>
                  <p className={`mb-6 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <span
                        key={tag}
                        className={`rounded-lg ${isDark ? 'bg-white/10' : 'bg-gray-100'} px-4 py-2 text-sm font-semibold`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="work" className="relative py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-5xl font-black md:text-6xl"
          >
            Projects
          </motion.h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            {PROJECTS.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className={`rounded-2xl border-2 ${borderColor} ${glassColor} backdrop-blur-2xl p-7 shadow-lg`}
              >
                <h3 className="mb-3 text-xl font-bold">{p.title}</h3>
                <p className={`mb-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map(t => (
                    <span
                      key={t}
                      className={`rounded-lg ${isDark ? 'bg-white/10' : 'bg-gray-100'} px-3 py-1.5 text-sm font-medium`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NS Section */}
      <section id="ns" className="relative py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-5xl font-black md:text-6xl"
          >
            National Service
          </motion.h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            {NS_JOURNEY.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className={`rounded-2xl border-2 ${borderColor} ${glassColor} backdrop-blur-2xl p-7`}
              >
                <item.icon className="mb-4 h-10 w-10 text-indigo-500" />
                <div className={`mb-3 text-sm font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.period}
                </div>
                <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="relative py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-4xl font-black"
          >
            Skills
          </motion.h3>
          <div className="flex flex-wrap gap-4">
            {SKILLS.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.1, y: -4 }}
                className={`rounded-xl border-2 ${borderColor} ${glassColor} backdrop-blur-xl px-6 py-3 text-base font-bold`}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-5xl font-black md:text-6xl"
          >
            Get in Touch
          </motion.h2>
          
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className={`mb-10 text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Open to collaborations, entrepreneurial opportunities, and building with great founders.
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-base font-bold text-white shadow-lg"
              >
                <Mail className="h-5 w-5" />
                Send Email
              </motion.a>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`space-y-6 rounded-2xl border-2 ${borderColor} ${glassColor} backdrop-blur-2xl p-8`}
            >
              {[
                { icon: Mail, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
                { icon: Phone, label: "Phone", value: PROFILE.phone, href: `tel:${PROFILE.phone}` },
                { icon: MapPin, label: "Location", value: PROFILE.location },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <item.icon className="h-6 w-6 text-indigo-500" />
                  <div>
                    <div className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.label}
                    </div>
                    {item.href ? (
                      <a href={item.href} className="text-lg font-bold hover:text-indigo-500">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-lg font-bold">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t-2 ${borderColor} py-10`}>
        <div className="mx-auto max-w-7xl px-6 text-center text-base font-medium">
          © {new Date().getFullYear()} {PROFILE.name}
        </div>
      </footer>
    </div>
  );
}