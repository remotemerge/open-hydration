import { useCallback } from 'react';
import type { Settings } from '@/db/settings';
import { logDrink, useTodayGlasses, useStreak } from '../hooks/useDrinks';
import { updateSettings } from '../../options/hooks/useSettings';
import ProgressRing from './ProgressRing';

interface DefaultViewProps {
  settings: Settings;
}

const ML_PER_GLASS = 250;

function messageFor(glasses: number, goal: number) {
  if (glasses === 0) return "Let's start the day — first glass of water.";
  const p = glasses / goal;
  if (p >= 1) return 'Goal reached. Beautifully hydrated.';
  if (p >= 0.75) return "You're almost at today's goal.";
  if (p >= 0.4) return 'Nice work — keep it flowing.';
  return 'Good start. Keep sipping.';
}

function formatInterval(interval: string): number {
  return parseInt(interval, 10);
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

export default function DefaultView({ settings }: DefaultViewProps) {
  const today = useTodayGlasses();
  const glasses = today?.glasses ?? 0;
  const streak = useStreak(settings.dailyGoal);
  const ml = glasses * ML_PER_GLASS;
  const full = glasses >= settings.dailyGoal;

  const paused = !settings.remindersEnabled;
  const nextReminderMin = formatInterval(settings.reminderInterval);
  const nextReminderDate = new Date(Date.now() + nextReminderMin * 60 * 1000);

  const handleDrink = useCallback(async () => {
    await logDrink(settings.dailyGoal);
  }, [settings.dailyGoal]);

  const togglePause = useCallback(() => {
    updateSettings({ remindersEnabled: paused });
  }, [paused]);

  return (
    <>
      <div className="flex flex-1 flex-col gap-3 overflow-hidden py-3.5">
        <section className="flex flex-col items-center gap-1.5 px-4">
          <ProgressRing glasses={glasses} goal={settings.dailyGoal} />
          <p className="min-h-4.5 px-4 text-center text-[13px] leading-snug text-muted">
            {messageFor(glasses, settings.dailyGoal)}
          </p>
        </section>

        <section className="mx-4 flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-primary/15">
            <svg
              className="h-4 w-4 stroke-primary"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7.5V12l3 2" />
            </svg>
          </span>
          <div className="flex flex-1 flex-col gap-0.5">
            {paused ? (
              <>
                <p className="text-[13px] font-semibold">Reminders paused</p>
                <p className="text-[11px] text-muted">Resume to continue receiving reminders</p>
              </>
            ) : (
              <>
                <p className="text-[13px] font-semibold">Next reminder · in {nextReminderMin} min</p>
                <p className="text-[11px] text-muted">{formatTime(nextReminderDate)} · Notifications enabled</p>
              </>
            )}
          </div>
        </section>

        <section className="mx-4 flex gap-2">
          <div className="flex flex-1 flex-col items-center gap-0.5 rounded-xl border border-border bg-card px-1.5 py-2.5">
            <p className="text-[17px] font-semibold">{glasses}</p>
            <p className="text-[10.5px] text-muted">glasses</p>
          </div>
          <div className="flex flex-1 flex-col items-center gap-0.5 rounded-xl border border-border bg-card px-1.5 py-2.5">
            <p className="text-[17px] font-semibold">{ml.toLocaleString('en-US')}</p>
            <p className="text-[10.5px] text-muted">ml today</p>
          </div>
          <div className="flex flex-1 flex-col items-center gap-0.5 rounded-xl border border-border bg-card px-1.5 py-2.5">
            <p className="text-[17px] font-semibold">{streak}</p>
            <p className="text-[10.5px] text-muted">day streak</p>
          </div>
        </section>

        <section className="flex gap-2 px-4 pt-0.5">
          <button
            type="button"
            onClick={handleDrink}
            disabled={full}
            className="flex h-10.5 flex-[1.7] items-center justify-center gap-1.5 rounded-[11px] bg-primary text-[13.5px] font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:opacity-50"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
              <path d="M12 3s-6 6.7-6 11.3a6 6 0 1 0 12 0C18 9.7 12 3 12 3Z" fill="#fff" />
            </svg>
            Drink water
          </button>
          <button
            type="button"
            onClick={togglePause}
            aria-pressed={paused}
            className={`flex h-10.5 flex-1 items-center justify-center gap-1.5 rounded-[11px] border text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ${
              paused
                ? 'border-warning/30 bg-warning/15 text-warning hover:bg-warning/25'
                : 'border-border bg-elevated hover:bg-border'
            }`}
          >
            {paused ? (
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 4.5h3.5v15H7zM13.5 4.5H17v15h-3.5z" />
              </svg>
            )}
            {paused ? 'Resume' : 'Pause'}
          </button>
        </section>
      </div>

      <footer className="flex items-center gap-2 border-t border-border px-4 py-3 text-[11px] text-muted">
        <span>Open source</span>
        <span className="opacity-50">·</span>
        <a
          href="https://github.com/anomalyco/open-hydration"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 transition-colors hover:text-primary"
        >
          <svg className="h-3.25 w-3.25" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
          </svg>
          View on GitHub
        </a>
        <span className="ml-auto">v1.0.0</span>
      </footer>
    </>
  );
}
