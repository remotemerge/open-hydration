import type { Settings } from '@/db/settings';
import { ML_PER_GLASS } from '@/utils/constants';
import ProgressRing from './ProgressRing';
import PopupFooter from './PopupFooter';

interface GoalCompletedViewProps {
  glasses: number;
  settings: Settings;
  streak: number;
}

/**
 * Celebration view shown when the user reaches their daily hydration goal.
 *
 * @param {GoalCompletedViewProps} props - Glasses consumed today, current settings, and the day streak.
 * @returns {JSX.Element} The rendered goal-completed view.
 */
export default function GoalCompletedView({ glasses, settings, streak }: GoalCompletedViewProps) {
  const ml = glasses * ML_PER_GLASS;

  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center gap-3.5 px-7 text-center">
        <ProgressRing
          glasses={glasses}
          goal={settings.dailyGoal}
          trackingUnit={settings.trackingUnit}
          color="stroke-success"
        />
        <div>
          <h2 className="text-heading font-semibold">Congratulations</h2>
          <p className="mt-1.5 text-body leading-snug text-muted">You reached today's hydration goal.</p>
        </div>
        <div className="flex w-full gap-2">
          <div className="flex-1 rounded-[11px] border border-border bg-card px-1.5 py-2.5">
            <p className="text-stat-sm font-semibold">{glasses}</p>
            <p className="text-micro text-muted">glasses</p>
          </div>
          <div className="flex-1 rounded-[11px] border border-border bg-card px-1.5 py-2.5">
            <p className="text-stat-sm font-semibold">{ml.toLocaleString('en-US')}</p>
            <p className="text-micro text-muted">ml today</p>
          </div>
          <div className="flex-1 rounded-[11px] border border-border bg-card px-1.5 py-2.5">
            <p className="text-stat-sm font-semibold">{streak}</p>
            <p className="text-micro text-muted">day streak</p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <button
          type="button"
          onClick={() => window.close()}
          className="h-11 w-full rounded-xl border border-border bg-elevated text-sm font-semibold transition-colors hover:bg-border focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          Done for today
        </button>
      </div>
      <PopupFooter />
    </>
  );
}
