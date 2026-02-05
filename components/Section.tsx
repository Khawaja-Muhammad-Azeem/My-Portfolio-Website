export default function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-14 scroll-mt-24">
      <div className="mb-4">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{subtitle}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}