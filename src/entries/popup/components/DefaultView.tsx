import { useCallback } from 'react';
import { IconClock, IconDropletFilled, IconPlayerPauseFilled, IconPlayerPlayFilled } from '@tabler/icons-react';
import type { Settings } from '@/db/settings';
import { ML_PER_GLASS } from '@/utils/constants';
import { logDrink, useTodayGlasses, useStreak } from '@/hooks/useDrinks';
import { updateSettings } from '@/hooks/useSettings';
import ProgressRing from './ProgressRing';
import PopupFooter from './PopupFooter';

interface DefaultViewProps {
  settings: Settings;
}

function messageFor(glasses: number, goal: number) {
  const progress = glasses / goal;

  if (glasses === 0) {
    return 'Time for your first glass of water.';
  }

  if (progress >= 1) {
    return "You've reached your water goal today.";
  }

  if (progress >= 0.75) {
    return 'Almost there. Just a little more.';
  }

  if (progress >= 0.4) {
    return "You're doing well. Keep going.";
  }

  return 'Good start. Have another glass when you can.';
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

  const togglePause = useCallback(async () => {
    await updateSettings({ remindersEnabled: paused });
  }, [paused]);

  return (
    <>
      <div className="flex flex-1 flex-col gap-3 overflow-hidden py-3.5">
        <section className="flex flex-col items-center gap-1.5 px-4">
          <ProgressRing glasses={glasses} goal={settings.dailyGoal} />
          <p className="min-h-4.5 px-4 text-center text-body leading-snug text-muted">
            {messageFor(glasses, settings.dailyGoal)}
          </p>
        </section>

        <section className="mx-4 flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-primary/15">
            <IconClock className="h-4 w-4 text-primary" />
          </span>
          <div className="flex flex-1 flex-col gap-0.5">
            {paused ? (
              <>
                <p className="text-body font-semibold">Reminders paused</p>
                <p className="text-caption text-muted">Resume to continue receiving reminders</p>
              </>
            ) : (
              <>
                <p className="text-body font-semibold">Next reminder · in {nextReminderMin} min</p>
                <p className="text-caption text-muted">{formatTime(nextReminderDate)} · Notifications enabled</p>
              </>
            )}
          </div>
        </section>

        <section className="mx-4 flex gap-2">
          <div className="flex flex-1 flex-col items-center gap-0.5 rounded-xl border border-border bg-card px-1.5 py-2.5">
            <p className="text-stat font-semibold">{glasses}</p>
            <p className="text-micro text-muted">glasses</p>
          </div>
          <div className="flex flex-1 flex-col items-center gap-0.5 rounded-xl border border-border bg-card px-1.5 py-2.5">
            <p className="text-stat font-semibold">{ml.toLocaleString('en-US')}</p>
            <p className="text-micro text-muted">ml today</p>
          </div>
          <div className="flex flex-1 flex-col items-center gap-0.5 rounded-xl border border-border bg-card px-1.5 py-2.5">
            <p className="text-stat font-semibold">{streak}</p>
            <p className="text-micro text-muted">day streak</p>
          </div>
        </section>

        <section className="flex gap-2 px-4 pt-0.5">
          <button
            type="button"
            onClick={handleDrink}
            disabled={full}
            className="flex h-10.5 flex-[1.7] items-center justify-center gap-1.5 rounded-[11px] bg-primary text-body font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:opacity-50"
          >
            <IconDropletFilled className="h-4 w-4 text-white" />
            Drink water
          </button>
          <button
            type="button"
            onClick={togglePause}
            aria-pressed={paused}
            className={`flex h-10.5 flex-1 items-center justify-center gap-1.5 rounded-[11px] border text-body font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ${
              paused
                ? 'border-warning/30 bg-warning/15 text-warning hover:bg-warning/25'
                : 'border-border bg-elevated hover:bg-border'
            }`}
          >
            {paused ? <IconPlayerPlayFilled className="h-4 w-4" /> : <IconPlayerPauseFilled className="h-4 w-4" />}
            {paused ? 'Resume' : 'Pause'}
          </button>
        </section>
      </div>

      <PopupFooter />
    </>
  );
}
