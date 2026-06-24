import { useCallback, useEffect, useMemo } from 'react';
import { IconDropletFilled } from '@tabler/icons-react';
import type { Settings } from '@/db/settings';
import { useTodayGlasses } from '@/hooks/useDrinks';
import { logDrink } from '@/hooks/useDrinks';
import { ML_PER_GLASS } from '@/utils/constants';

// Reminder prompts shown on the page.
const PROMPTS = [
  'Time for a glass of water.',
  'Take a moment to hydrate.',
  'A sip of water can refresh your mind.',
  'Hydration break. Your body will thank you.',
  'Pause for water and keep going.',
  'Stay sharp. Drink some water.',
  'A quick sip can make a difference.',
  'Give yourself a refreshing water break.',
  'Water time. Take a few sips.',
  'Refill your energy with a glass of water.',
  'Hydrate now and feel refreshed.',
  'Small sip, big benefit.',
  'A little water goes a long way.',
  'Refresh, hydrate, and continue your day.',
  'One glass closer to your daily goal.',
  "Water break. You've earned it.",
  'Take a sip and recharge.',
];

interface ReminderViewProps {
  settings: Settings;
}

function pickPrompt(): string {
  return PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
}

function formatAmount(glasses: number, goalType: 'glasses' | 'ml'): string {
  if (goalType === 'ml') {
    return `${(glasses * ML_PER_GLASS).toLocaleString('en-US')} ml`;
  }
  return glasses === 1 ? '1 glass' : `${glasses} glasses`;
}

export default function ReminderView({ settings }: ReminderViewProps) {
  const today = useTodayGlasses();
  const glasses = today?.glasses ?? 0;
  const goalType = settings.goalType ?? 'glasses';
  const dailyGoal = settings.dailyGoal ?? 8;
  // Use the day's frozen goal when present so the bar matches what the popup shows.
  const goal = today?.goal ?? dailyGoal;
  const reached = glasses >= goal;
  const remaining = Math.max(0, goal - glasses);
  const percent = goal > 0 ? Math.min(100, Math.round((glasses / goal) * 100)) : 0;

  const prompt = useMemo(() => pickPrompt(), []);

  const remainingLabel = reached
    ? 'Daily goal reached. Nicely done.'
    : `${formatAmount(remaining, goalType)} left to reach your goal.`;

  const handleLogGlass = useCallback(async () => {
    await logDrink(settings.dailyGoal ?? 8);
  }, [settings.dailyGoal]);

  const handleClose = useCallback(() => {
    window.close();
  }, []);

  // Focus the primary action so the page is immediately keyboard-operable.
  useEffect(() => {
    if (!reached) {
      document.getElementById('log-glass')?.focus();
    }
  }, [reached]);

  // Escape closes the reminder, matching the close button.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        window.close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section
      className="flex w-full max-w-md flex-col items-center gap-5 rounded-3xl border border-border bg-card px-8 py-10 text-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reminder-title"
    >
      <img src="/icons/48.png" alt="" className="h-18 w-18 rounded-2xl" />
      <h1 className="text-display font-bold tracking-tight" id="reminder-title">
        Open Hydration
      </h1>
      <p className="text-heading leading-snug text-muted">{prompt}</p>

      <div className="flex w-full flex-col gap-2">
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-track">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="flex justify-between text-body text-muted">
          <span>
            <strong className="text-fg">{formatAmount(glasses, goalType)}</strong> of {formatAmount(goal, goalType)}
          </span>
          <span>{remainingLabel}</span>
        </div>
      </div>

      <div className="flex w-full gap-2.5">
        <button
          type="button"
          id="log-glass"
          disabled={reached}
          onClick={handleLogGlass}
          className="flex flex-[1.7] items-center justify-center gap-2 rounded-xl bg-primary py-3 text-stat-sm font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:opacity-50"
        >
          <IconDropletFilled className="h-4.5 w-4.5" />
          Log Glass
        </button>
        <button
          type="button"
          onClick={handleClose}
          className="flex flex-1 items-center justify-center rounded-xl border border-border bg-elevated py-3 text-stat-sm font-semibold text-fg transition-colors hover:bg-border focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          Close
        </button>
      </div>
    </section>
  );
}
