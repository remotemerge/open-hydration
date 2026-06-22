import Section from './Section';

export default function DataPrivacy() {
  return (
    <Section
      title="Data & privacy"
      icon={
        <svg
          className="h-4 w-4 stroke-success"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m12 3 7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      }
    >
      <div className="px-5 pb-5 pt-1.5">
        <div className="flex gap-3 rounded-xl border border-border bg-card px-4 py-4">
          <svg
            className="mt-0.5 h-5 w-5 shrink-0 stroke-success"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 3 7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3Z" />
          </svg>
          <div>
            <p className="text-sm font-semibold">Your data stays on your device</p>
            <p className="mt-1 text-[13px] leading-relaxed text-muted">
              All data is stored locally in your browser. No tracking. No analytics. No account required.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
