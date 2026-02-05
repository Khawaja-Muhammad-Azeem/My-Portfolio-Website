export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur " +
        "dark:border-slate-800 dark:bg-slate-950/40 " +
        className
      }
    >
      {children}
    </div>
  );
}