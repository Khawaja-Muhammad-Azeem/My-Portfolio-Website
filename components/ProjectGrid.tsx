import Card from "@/components/Card";
import { content } from "@/lib/content";
import { ArrowUpRight } from "lucide-react";

export default function ProjectGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {content.projects.map((p) => (
        <Card key={p.name} className="group hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {p.name}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{p.year}</div>
            </div>
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
            {p.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm
                           dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-4 text-xs text-slate-600 dark:text-slate-400">
            <span className="font-semibold">Highlight:</span> {p.highlight}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {p.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-4 py-2 text-sm shadow-sm hover:bg-white
                           dark:border-slate-800 dark:bg-slate-950/40 dark:hover:bg-slate-950"
              >
                {l.label} <ArrowUpRight className="h-4 w-4" />
              </a>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}