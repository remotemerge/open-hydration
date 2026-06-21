import './style.scss';

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-fg font-sans antialiased flex justify-center px-6 pt-11 pb-16">
      <div className="flex w-full max-w-180 flex-col gap-4.5">
        {/* Page header */}
        <div className="flex items-center gap-3.75 px-0.5 pb-1">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary shadow-[0_6px_18px_-6px_var(--primary)]">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
              <path d="M12 3s-6 6.7-6 11.3a6 6 0 1 0 12 0C18 9.7 12 3 12 3Z" fill="#fff" />
              <path
                d="M9 13.7a2.6 2.6 0 0 0 1.9 3.6"
                stroke="#fff"
                strokeOpacity=".5"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-[21px] font-semibold leading-tight">Open Hydration Settings</h1>
            <p className="mt-0.5 text-sm text-muted">Configure your hydration reminders and daily goals.</p>
          </div>
        </div>

        {/* Section: Daily goal */}
        <section className="overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="flex items-center gap-2.5 px-5 pt-4 pb-3.5">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
              <path d="M12 3s-6 6.7-6 11.3a6 6 0 1 0 12 0C18 9.7 12 3 12 3Z" className="fill-primary" />
            </svg>
            <h2 className="text-xs font-semibold uppercase tracking-[0.06em] text-muted">Daily goal</h2>
          </div>
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
        </section>

        {/* Section: Reminder schedule */}
        <section className="overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="flex items-center gap-2.5 px-5 pt-4 pb-3.5">
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
            <h2 className="text-xs font-semibold uppercase tracking-[0.06em] text-muted">Reminder schedule</h2>
          </div>
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
        </section>

        {/* Section: Notifications */}
        <section className="overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="flex items-center gap-2.5 px-5 pt-4 pb-3.5">
            <svg
              className="h-4 w-4 stroke-primary"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.7 21a2 2 0 0 1-3.4 0" />
            </svg>
            <h2 className="text-xs font-semibold uppercase tracking-[0.06em] text-muted">Notifications</h2>
          </div>

          <div className="flex items-center gap-5 border-t border-border px-5 py-3.75">
            <div className="flex-1">
              <p className="text-sm font-semibold">Enable notifications</p>
              <p className="mt-0.5 text-[13px] text-muted">Receive a gentle reminder when it's time to drink.</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked="true"
              aria-label="Enable notifications"
              className="flex h-6 w-10.5 shrink-0 items-center rounded-full bg-primary p-0.5 transition-colors"
            >
              <span className="h-5 w-5 translate-x-4.5 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.35)] transition-transform" />
            </button>
          </div>
          <div className="flex items-center gap-5 border-t border-border px-5 py-3.75">
            <div className="flex-1">
              <p className="text-sm font-semibold">Reminder sound</p>
              <p className="mt-0.5 text-[13px] text-muted">Play a soft chime with each reminder.</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked="false"
              aria-label="Reminder sound"
              className="flex h-6 w-10.5 shrink-0 items-center rounded-full bg-border p-0.5 transition-colors"
            >
              <span className="h-5 w-5 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.35)] transition-transform" />
            </button>
          </div>
          <div className="flex items-center gap-5 border-t border-border px-5 py-3.75">
            <div className="flex-1">
              <p className="text-sm font-semibold">Desktop notification icon</p>
              <p className="mt-0.5 text-[13px] text-muted">Show the droplet icon in system notifications.</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked="true"
              aria-label="Desktop notification icon"
              className="flex h-6 w-10.5 shrink-0 items-center rounded-full bg-primary p-0.5 transition-colors"
            >
              <span className="h-5 w-5 translate-x-4.5 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.35)] transition-transform" />
            </button>
          </div>
          <div className="flex items-center gap-5 border-t border-border px-5 py-3.75">
            <div className="flex-1">
              <p className="text-sm font-semibold">Motivational messages</p>
              <p className="mt-0.5 text-[13px] text-muted">Include an encouraging line with each reminder.</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked="true"
              aria-label="Motivational messages"
              className="flex h-6 w-10.5 shrink-0 items-center rounded-full bg-primary p-0.5 transition-colors"
            >
              <span className="h-5 w-5 translate-x-4.5 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.35)] transition-transform" />
            </button>
          </div>
        </section>

        {/* Section: Appearance */}
        <section className="overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="flex items-center gap-2.5 px-5 pt-4 pb-3.5">
            <svg
              className="h-4 w-4 stroke-accent"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
            </svg>
            <h2 className="text-xs font-semibold uppercase tracking-[0.06em] text-muted">Appearance</h2>
          </div>
          <div className="flex items-center gap-5 border-t border-border px-5 py-4">
            <div className="flex-1">
              <p className="text-sm font-semibold">Theme</p>
              <p className="mt-0.5 text-[13px] text-muted">Match your system or pick a side.</p>
            </div>
            <div className="inline-flex gap-0.5 rounded-[10px] border border-border bg-elevated p-0.5">
              <button
                type="button"
                className="rounded-lg px-3.5 py-1.5 text-[13px] font-medium text-muted transition-colors"
              >
                System
              </button>
              <button
                type="button"
                className="rounded-lg bg-surface px-3.5 py-1.5 text-[13px] font-medium text-fg shadow-[0_1px_2px_rgba(0,0,0,0.14)] transition-colors"
              >
                Light
              </button>
              <button
                type="button"
                className="rounded-lg px-3.5 py-1.5 text-[13px] font-medium text-muted transition-colors"
              >
                Dark
              </button>
            </div>
          </div>
          <div className="flex items-center gap-5 border-t border-border px-5 py-3.75">
            <div className="flex-1">
              <p className="text-sm font-semibold">Compact mode</p>
              <p className="mt-0.5 text-[13px] text-muted">Reduce padding for a denser popup.</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked="false"
              aria-label="Compact mode"
              className="flex h-6 w-10.5 shrink-0 items-center rounded-full bg-border p-0.5 transition-colors"
            >
              <span className="h-5 w-5 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.35)] transition-transform" />
            </button>
          </div>
          <div className="flex items-center gap-5 border-t border-border px-5 py-3.75">
            <div className="flex-1">
              <p className="text-sm font-semibold">Reduced motion</p>
              <p className="mt-0.5 text-[13px] text-muted">Minimize animations and transitions.</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked="false"
              aria-label="Reduced motion"
              className="flex h-6 w-10.5 shrink-0 items-center rounded-full bg-border p-0.5 transition-colors"
            >
              <span className="h-5 w-5 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.35)] transition-transform" />
            </button>
          </div>
        </section>

        {/* Section: Data & privacy */}
        <section className="overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="flex items-center gap-2.5 px-5 pt-4 pb-3.5">
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
            <h2 className="text-xs font-semibold uppercase tracking-[0.06em] text-muted">Data & privacy</h2>
          </div>
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
        </section>

        {/* Section: Open source */}
        <section className="overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="flex items-center gap-2.5 px-5 pt-4 pb-3.5">
            <svg
              className="h-4 w-4 stroke-primary"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m8 9-3 3 3 3" />
              <path d="m16 9 3 3-3 3" />
              <path d="M13 6 11 18" />
            </svg>
            <h2 className="text-xs font-semibold uppercase tracking-[0.06em] text-muted">Open source</h2>
          </div>
          <div className="flex items-center gap-5 border-t border-border px-5 py-3.5">
            <p className="flex-1 text-sm font-semibold">Repository</p>
            <a
              href="https://github.com/open-hydration"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-primary hover:underline"
            >
              <svg className="h-3.75 w-3.75" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
              </svg>
              github.com/open-hydration
            </a>
          </div>
          <div className="flex items-center gap-5 border-t border-border px-5 py-3.5">
            <p className="flex-1 text-sm font-semibold">License</p>
            <p className="text-[13px] text-muted">MIT</p>
          </div>
          <div className="flex items-center gap-5 border-t border-border px-5 py-3.5">
            <p className="flex-1 text-sm font-semibold">Version</p>
            <p className="text-[13px] text-muted">1.0.0</p>
          </div>
          <div className="border-t border-border px-5 py-4">
            <button
              type="button"
              className="inline-flex h-9.5 items-center gap-1.5 rounded-[10px] border border-border bg-elevated px-4 text-[13px] font-semibold transition-colors hover:bg-border focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <svg
                className="h-3.75 w-3.75"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v5M12 16.5v.01" />
              </svg>
              Report an issue
            </button>
          </div>
        </section>

        {/* Sticky save bar */}
        <div className="sticky bottom-4 flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-3.5 shadow-[0_-2px_24px_-8px_rgba(0,0,0,0.4)]">
          <p className="flex-1 text-[13px] text-muted">Changes apply instantly and save locally.</p>
          <button
            type="button"
            className="h-10 rounded-[11px] border border-border bg-elevated px-4.5 text-[13.5px] font-semibold transition-colors hover:bg-border focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            Reset to defaults
          </button>
          <button
            type="button"
            className="h-10 rounded-[11px] bg-primary px-5.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
