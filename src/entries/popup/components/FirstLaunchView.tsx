import { updateSettings, useSettings } from '../../options/hooks/useSettings';

function completeOnboarding() {
  updateSettings({ onboardingComplete: true });
}

export default function FirstLaunchView() {
  const settings = useSettings();
  const goal = settings?.dailyGoal ?? 8;

  function adjustGoal(delta: number) {
    const next = Math.max(1, Math.min(16, goal + delta));
    updateSettings({ dailyGoal: next });
  }

  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center gap-4.5 px-7 text-center">
        <div className="grid h-16.5 w-16.5 place-items-center rounded-[19px] bg-primary/12">
          <svg className="h-8.5 w-8.5" viewBox="0 0 24 24" fill="none">
            <path d="M12 3s-6 6.7-6 11.3a6 6 0 1 0 12 0C18 9.7 12 3 12 3Z" className="fill-primary" />
            <path
              d="M9 13.7a2.6 2.6 0 0 0 1.9 3.6"
              stroke="#fff"
              strokeOpacity=".6"
              strokeWidth={1.3}
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Welcome to Open Hydration</h2>
          <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
            Let's set your daily water goal. You can change it anytime in settings.
          </p>
        </div>
        <div className="flex items-center gap-3.5 rounded-[13px] border border-border bg-card px-3 py-2.5">
          <button
            type="button"
            aria-label="Decrease goal"
            onClick={() => adjustGoal(-1)}
            className="grid h-7.5 w-7.5 place-items-center rounded-lg border border-border text-lg text-muted transition-colors hover:text-fg"
          >
            −
          </button>
          <p className="min-w-21">
            <span className="text-xl font-semibold">{goal}</span>
            <span className="ml-1.5 text-[13px] text-muted">glasses</span>
          </p>
          <button
            type="button"
            aria-label="Increase goal"
            onClick={() => adjustGoal(1)}
            className="grid h-7.5 w-7.5 place-items-center rounded-lg bg-primary text-lg text-white transition-colors hover:bg-primary-hover"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <button
          type="button"
          onClick={completeOnboarding}
          className="h-11 rounded-xl bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          Get started
        </button>
        <button
          type="button"
          onClick={completeOnboarding}
          className="h-9.5 text-[13px] font-medium text-muted transition-colors hover:text-fg"
        >
          Skip for now
        </button>
      </div>
    </>
  );
}
