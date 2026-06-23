import type { Settings } from '@/db/settings';
import { ML_PER_GLASS } from '@/utils/constants';
import ProgressRing from './ProgressRing';
import PopupFooter from './PopupFooter';

interface GoalCompletedViewProps {
  settings: Settings;
  streak: number;
}

export default function GoalCompletedView({ settings, streak }: GoalCompletedViewProps) {
  const glasses = settings.dailyGoal;
  const ml = glasses * ML_PER_GLASS;

  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center gap-3.5 px-7 text-center">
        <ProgressRing glasses={glasses} goal={settings.dailyGoal} color="stroke-success" />
        <div>
          <h2 className="text-[19px] font-semibold">Congratulations</h2>
          <p className="mt-1.5 text-[13px] leading-snug text-muted">You reached today's hydration goal.</p>
        </div>
        <div className="flex w-full gap-2">
          <div className="flex-1 rounded-[11px] border border-border bg-card px-1.5 py-2.5">
            <p className="text-[15px] font-semibold">{glasses}</p>
            <p className="text-[10px] text-muted">glasses</p>
          </div>
          <div className="flex-1 rounded-[11px] border border-border bg-card px-1.5 py-2.5">
            <p className="text-[15px] font-semibold">{ml.toLocaleString('en-US')}</p>
            <p className="text-[10px] text-muted">ml today</p>
          </div>
          <div className="flex-1 rounded-[11px] border border-border bg-card px-1.5 py-2.5">
            <p className="text-[15px] font-semibold">{streak}</p>
            <p className="text-[10px] text-muted">day streak</p>
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
