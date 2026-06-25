import { useCallback, useEffect, useState } from 'react';
import { IconClock, IconDropletFilled, IconPlayerPauseFilled, IconPlayerPlayFilled } from '@tabler/icons-react';
import type { Settings } from '@/db/settings';
import { ML_PER_GLASS } from '@/utils/constants';
import { formatTime, nextAlignedFireTime } from '@/utils/time';
import { logDrink } from '@/hooks/useDrinks';
import { updateSettings } from '@/hooks/useSettings';
import ProgressRing from './ProgressRing';
import PopupFooter from './PopupFooter';

interface DefaultViewProps {
  settings: Settings;
  glasses: number;
  streak: number;
}

function messageFor(glasses: number, goal: number) {
  const progress = glasses / goal;

  if (glasses === 0) {
    return 'Time for your first glass of water.';
  }

  if (progress >= 0.75) {
    return 'Almost there. Just a little more.';
  }

  if (progress >= 0.4) {
    return "You're doing well. Keep going.";
  }

  return 'Good start. Have another glass when you can.';
}

// Live "N min M sec" countdown, dropping the minute part once under a minute.
function formatCountdown(remainingMs: number): string {
  const totalSeconds = Math.max(0, Math.floor(remainingMs / 1_000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes === 0) {
    return `in ${seconds} sec`;
  }

  return `in ${minutes} min ${seconds} sec`;
}

export default function DefaultView({ settings, glasses, streak }: DefaultViewProps) {
  const ml = glasses * ML_PER_GLASS;
  const full = glasses >= settings.dailyGoal;

  const paused = !settings.remindersEnabled;

  // Tick every second so the final-minute countdown stays live while open.
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1_000);
    return () => clearInterval(id);
  }, []);

  const intervalMinutes = Number.parseInt(settings.reminderInterval, 10);
  const nextReminderAt = nextAlignedFireTime(new Date(now), intervalMinutes);

  const nextReminderDate = new Date(nextReminderAt);
  const nextReminderLabel = formatCountdown(nextReminderAt - now);

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
          <ProgressRing glasses={glasses} goal={settings.dailyGoal} trackingUnit={settings.trackingUnit} />
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
                <p className="text-body font-semibold">Next reminder · {nextReminderLabel}</p>
                <p className="text-caption text-muted">{formatTime(nextReminderDate)} · Reminders enabled</p>
              </>
            )}
          </div>
        </section>

        <section className="mx-4 flex gap-2" aria-live="polite">
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
            Log drink
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
