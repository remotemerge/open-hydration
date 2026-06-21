import type { ReactNode } from 'react';

interface SectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export default function Section({ title, icon, children }: SectionProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="flex items-center gap-2.5 px-5 pt-4 pb-3.5">
        {icon}
        <h2 className="text-xs font-semibold uppercase tracking-[0.06em] text-muted">{title}</h2>
      </div>
      {children}
    </section>
  );
}
