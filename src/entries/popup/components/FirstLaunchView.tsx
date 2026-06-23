import { AVG_GOAL, MIN_GOAL, MAX_GOAL } from '@/utils/constants';
import { updateSettings, useSettings } from '@/hooks/useSettings';

async function completeOnboarding() {
  await updateSettings({ onboardingComplete: true });
}

export default function FirstLaunchView() {
  const settings = useSettings();
  const goal = settings?.dailyGoal ?? AVG_GOAL;

  async function adjustGoal(delta: number) {
    const next = Math.max(MIN_GOAL, Math.min(MAX_GOAL, goal + delta));
    await updateSettings({ dailyGoal: next });
  }

  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center gap-4.5 px-7 text-center">
        <img src="/icons/128.png" alt="" className="h-16 w-16" />
        <div>
          <h2 className="text-lg font-semibold">Welcome to Open Hydration</h2>
          <p className="mt-1.5 text-body leading-relaxed text-muted">
            Let's set your daily water goal. You can change it anytime in settings.
          </p>
        </div>
        <div className="flex items-center gap-3.5 rounded-[13px] border border-border bg-card px-3 py-2.5">
          <button
            type="button"
            aria-label="Decrease goal"
            onClick={() => adjustGoal(-1)}
            disabled={goal <= MIN_GOAL}
            className="grid h-7.5 w-7.5 place-items-center rounded-lg border border-border text-lg text-muted transition-colors hover:text-fg disabled:opacity-40"
          >
            −
          </button>
          <p className="min-w-21">
            <span className="text-xl font-semibold">{goal}</span>
            <span className="ml-1.5 text-body text-muted">glasses</span>
          </p>
          <button
            type="button"
            aria-label="Increase goal"
            onClick={() => adjustGoal(1)}
            disabled={goal >= MAX_GOAL}
            className="grid h-7.5 w-7.5 place-items-center rounded-lg bg-primary text-lg text-white transition-colors hover:bg-primary-hover disabled:opacity-40"
          >
            +
          </button>
        </div>
      </div>
      <div className="p-4">
        <button
          type="button"
          onClick={completeOnboarding}
          className="h-11 w-full rounded-xl bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          Get started
        </button>
      </div>
    </>
  );
}
