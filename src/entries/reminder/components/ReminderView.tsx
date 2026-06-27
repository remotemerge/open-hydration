import { useCallback, useEffect, useMemo, useRef } from 'react';
import { IconDropletFilled } from '@tabler/icons-react';
import type { Settings } from '@/db/settings';
import { logDrink, useTodayGlasses } from '@/hooks/useDrinks';
import { ML_PER_GLASS, REMINDER_CHIME_INTERVAL_MS } from '@/utils/constants';

// Motivational prompts randomly selected when the reminder tab opens.
const PROMPTS = [
  'A glass of water is one of the easiest wins you can give yourself today.',
  'Take a minute for water. Your body works better when it is hydrated.',
  'A quick water break can help you stay focused and alert.',
  'Your next task can wait a moment. Have a glass of water first.',
  'Hydration is a small habit that pays off all day.',
  'A few sips now can make the next hour feel better.',
  'Water helps more than you think. Take a moment to hydrate.',
  'Give your mind and body a quick refresh with a glass of water.',
  'You have been working hard. Take a short water break.',
  'Good work deserves good habits. Drink some water.',
  'Stay on top of your day. Start with a glass of water.',
  'Your body needs water regularly, not just when you feel thirsty.',
  'A simple glass of water can be the reset you need right now.',
  'Keep your hydration habit going. Every glass matters.',
  'Take a short pause, drink some water, and continue feeling your best.',
  'A well-hydrated body helps you stay productive throughout the day.',
  'Before the next task, take a moment for a glass of water.',
  'Hydration is self-care in its simplest form. Have a glass of water.',
  'You are already at your computer. This is a great time for a water break.',
  'Future you will appreciate the glass of water you drink right now.',
];

interface ReminderViewProps {
  settings: Settings;
}

/**
 * Returns a random motivational prompt from the PROMPTS array.
 *
 * @returns {string} A randomly selected motivational prompt.
 */
function pickPrompt(): string {
  return PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
}

/**
 * Formats a drink amount as "N glasses", "1 glass", or "N ml" depending on the tracking unit.
 *
 * @param {number} glasses - The number of glasses to format.
 * @param {'glasses' | 'ml'} trackingUnit - The unit used to display the amount.
 * @returns {string} The formatted amount label.
 */
function formatAmount(glasses: number, trackingUnit: 'glasses' | 'ml'): string {
  if (trackingUnit === 'ml') {
    return `${(glasses * ML_PER_GLASS).toLocaleString('en-US')} ml`;
  }
  return glasses === 1 ? '1 glass' : `${glasses} glasses`;
}

/**
 * Full-page reminder view with a motivational prompt, progress bar, and action buttons.
 * Plays a looping chime until the user logs a drink, reaches the goal, or closes the tab.
 *
 * @param {ReminderViewProps} props - The persisted settings driving display and chime behavior.
 * @returns {JSX.Element} The rendered reminder view.
 */
export default function ReminderView({ settings }: Readonly<ReminderViewProps>) {
  const today = useTodayGlasses();
  const glasses = today?.glasses ?? 0;
  const trackingUnit = settings.trackingUnit ?? 'glasses';
  const dailyGoal = settings.dailyGoal ?? 8;
  // Use the day's frozen goal when present so the progress bar matches the popup view.
  const goal = today?.goal ?? dailyGoal;
  const reached = glasses >= goal;
  const remaining = Math.max(0, goal - glasses);
  const percent = goal > 0 ? Math.min(100, Math.round((glasses / goal) * 100)) : 0;

  const prompt = useMemo(() => pickPrompt(), []);

  const remainingLabel = reached
    ? 'Daily goal reached. Nicely done.'
    : `${formatAmount(remaining, trackingUnit)} left to reach your goal.`;

  const handleLogGlass = useCallback(async () => {
    await logDrink(settings.dailyGoal ?? 8);
  }, [settings.dailyGoal]);

  const handleClose = useCallback(() => {
    window.close();
  }, []);

  const dialogRef = useRef<HTMLDialogElement>(null);

  // Open modally so the browser provides focus trapping and dialog semantics.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  // Record the glass count at open so logging a drink stops the chime.
  const openingGlasses = useRef(glasses);

  // Play the chime on open and repeat until the user logs a drink, reaches the goal,
  // or disables sound/reminders.
  useEffect(() => {
    // Stop when muted, paused, goal reached, or a drink is logged on this page.
    if (!settings.soundEnabled || !settings.remindersEnabled || reached || glasses > openingGlasses.current) {
      return;
    }

    const chime = new Audio(browser.runtime.getURL('/audios/water-bubble.wav'));

    const play = () => {
      chime.currentTime = 0;
      void chime.play().catch(() => {});
    };

    play();
    const timer = setInterval(play, REMINDER_CHIME_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [settings.soundEnabled, settings.remindersEnabled, reached, glasses]);

  // Focus the primary action button so the page is immediately keyboard-operable.
  useEffect(() => {
    if (!reached) {
      document.getElementById('log-glass')?.focus();
    }
  }, [reached]);

  return (
    <dialog
      ref={dialogRef}
      // Escape closes the reminder tab, matching the close button behavior.
      onCancel={(event) => {
        event.preventDefault();
        window.close();
      }}
      className="m-auto flex w-full max-w-md flex-col items-center gap-5 rounded-3xl border border-border bg-card px-8 py-10 text-center text-fg backdrop:bg-black/40"
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
        <div className="flex justify-between text-body text-muted" aria-live="polite">
          <span>
            <strong className="text-fg">{formatAmount(glasses, trackingUnit)}</strong> of{' '}
            {formatAmount(goal, trackingUnit)}
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
          Log drink
        </button>
        <button
          type="button"
          onClick={handleClose}
          className="flex flex-1 items-center justify-center rounded-xl border border-border bg-elevated py-3 text-stat-sm font-semibold text-fg transition-colors hover:bg-border focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          Close
        </button>
      </div>
    </dialog>
  );
}
