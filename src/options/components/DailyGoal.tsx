import Section from './Section';

export default function DailyGoal() {
  return (
    <Section
      title="Daily goal"
      icon={
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
          <path d="M12 3s-6 6.7-6 11.3a6 6 0 1 0 12 0C18 9.7 12 3 12 3Z" className="fill-primary" />
        </svg>
      }
    >
      <div className="flex items-center gap-5 border-t border-border px-5 py-4">
        <div className="flex-1">
          <p className="text-sm font-semibold">Goal type</p>
          <p className="mt-0.5 text-[13px] text-muted">Track your intake in glasses or millilitres.</p>
        </div>
        <div className="inline-flex gap-0.5 rounded-[10px] border border-border bg-elevated p-0.5">
          <button
            type="button"
            className="rounded-lg bg-surface px-4 py-1.5 text-[13px] font-medium text-fg shadow-[0_1px_2px_rgba(0,0,0,0.14)]"
          >
            Glasses
          </button>
          <button type="button" className="rounded-lg px-4 py-1.5 text-[13px] font-medium text-muted">
            Milliliters
          </button>
        </div>
      </div>
      <div className="flex items-center gap-5 border-t border-border px-5 py-4">
        <div className="flex-1">
          <p className="text-sm font-semibold">Daily goal</p>
          <p className="mt-0.5 text-[13px] text-muted">How much water you aim to drink each day.</p>
        </div>
        <div className="flex items-center overflow-hidden rounded-[10px] border border-border bg-elevated">
          <button
            type="button"
            aria-label="Decrease goal"
            className="h-9.5 w-9.5 text-lg text-muted transition-colors hover:text-fg"
          >
            −
          </button>
          <span className="min-w-22 text-center text-sm font-semibold">8 glasses</span>
          <button
            type="button"
            aria-label="Increase goal"
            className="h-9.5 w-9.5 text-lg text-muted transition-colors hover:text-fg"
          >
            +
          </button>
        </div>
      </div>
    </Section>
  );
}
