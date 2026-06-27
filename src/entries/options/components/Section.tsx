import type { ReactNode } from 'react';

interface SectionProps {
  title: string;
  icon: ReactNode;
  loading?: boolean;
  children: ReactNode;
}

/**
 * Placeholder shown while settings are loading from IndexedDB.
 *
 * @returns {JSX.Element} The rendered skeleton placeholder row.
 */
function SkeletonRow() {
  return (
    <div className="flex items-center gap-5 border-t border-border px-5 py-4">
      <div className="flex-1 space-y-2">
        <div className="h-3.5 w-24 rounded bg-elevated" />
        <div className="h-3 w-40 rounded bg-elevated" />
      </div>
      <div className="h-8 w-20 rounded-lg bg-elevated" />
    </div>
  );
}

/**
 * A grouped settings section with a header, icon, and optional loading skeleton.
 *
 * @param {SectionProps} props - Section title, header icon, loading flag, and child rows.
 * @returns {JSX.Element} The rendered settings section.
 */
export default function Section({ title, icon, loading, children }: Readonly<SectionProps>) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="flex items-center gap-2.5 px-5 pt-4 pb-3.5">
        {icon}
        <h2 className="text-xs font-semibold uppercase tracking-[0.06em] text-muted">{title}</h2>
      </div>
      {loading ? <SkeletonRow /> : children}
    </section>
  );
}
