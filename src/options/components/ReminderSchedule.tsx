import Section from './Section';

export default function ReminderSchedule() {
  return (
    <Section
      title="Reminder schedule"
      icon={
        <svg
          className="h-4 w-4 stroke-accent"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7.5V12l3 2" />
        </svg>
      }
    >
      <div className="flex items-center gap-5 border-t border-border px-5 py-4">
        <div className="flex-1">
          <p className="text-sm font-semibold">Reminder interval</p>
          <p className="mt-0.5 text-[13px] text-muted">How often you'd like a gentle nudge.</p>
        </div>
        <div className="relative">
          <select
            defaultValue="30 minutes"
            className="cursor-pointer appearance-none rounded-[10px] border border-border bg-elevated py-2.5 pl-3.5 pr-9 text-[13px] font-medium text-fg focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            <option>15 minutes</option>
            <option>20 minutes</option>
            <option>30 minutes</option>
            <option>45 minutes</option>
            <option>60 minutes</option>
            <option>Custom</option>
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 stroke-muted"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
      <div className="flex items-center gap-5 border-t border-border px-5 py-4">
        <div className="flex-1">
          <p className="text-sm font-semibold">Active hours</p>
          <p className="mt-0.5 text-[13px] text-muted">Reminders only run between these times.</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="time"
            defaultValue="08:00"
            className="rounded-[10px] border border-border bg-elevated px-3 py-2 text-[13px] font-semibold text-fg focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          />
          <span className="text-[13px] text-muted">to</span>
          <input
            type="time"
            defaultValue="22:00"
            className="rounded-[10px] border border-border bg-elevated px-3 py-2 text-[13px] font-semibold text-fg focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          />
        </div>
      </div>
      <div className="flex items-start gap-5 border-t border-border px-5 py-4">
        <div className="flex-1">
          <p className="text-sm font-semibold">Pause reminders during</p>
          <p className="mt-0.5 text-[13px] text-muted">Stay quiet when you need to focus.</p>
        </div>
        <div className="flex max-w-75 flex-wrap justify-end gap-2">
          <button
            type="button"
            className="rounded-[9px] border border-border bg-elevated px-3.5 py-1.5 text-[13px] font-medium text-muted transition-colors"
          >
            Lunch
          </button>
          <button
            type="button"
            className="rounded-[9px] border border-primary bg-primary/12 px-3.5 py-1.5 text-[13px] font-medium text-primary transition-colors"
          >
            Meetings
          </button>
          <button
            type="button"
            className="rounded-[9px] border border-border bg-elevated px-3.5 py-1.5 text-[13px] font-medium text-muted transition-colors"
          >
            Focus sessions
          </button>
        </div>
      </div>
    </Section>
  );
}
