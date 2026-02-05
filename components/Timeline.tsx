import Card from "@/components/Card";

export default function Timeline({
  items,
}: {
  items: { title: string; org: string; date?: string; bullets: string[] }[];
}) {
  return (
    <div className="space-y-4">
      {items.map((x) => (
        <Card key={x.title}>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {x.title}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{x.org}</div>
            </div>
            {x.date ? (
              <div className="text-xs text-slate-500 dark:text-slate-400">{x.date}</div>
            ) : null}
          </div>

          <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            {x.bullets.map((b) => (
              <li key={b} className="leading-6">
                • {b}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}