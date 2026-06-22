import { updateSettings, useSettings } from '../../options/hooks/useSettings';
import { useTodayGlasses } from '../hooks/useDrinks';

export default function NotificationsDisabledView() {
  const settings = useSettings();
  const today = useTodayGlasses();
  const glasses = today?.glasses ?? 0;
  const goal = settings?.dailyGoal ?? 8;

  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center gap-3.75 px-7 text-center">
        <div className="grid h-16.5 w-16.5 place-items-center rounded-[19px] bg-warning/13">
          <svg
            className="h-7.5 w-7.5 stroke-warning"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8a6 6 0 0 0-9.3-5" />
            <path d="M6 8c0 7-3 9-3 9h13" />
            <path d="M13.7 21a2 2 0 0 1-3.4 0" />
            <path d="m3 3 18 18" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Reminders are paused</h2>
          <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
            Enable notifications to continue receiving hydration reminders.
          </p>
        </div>
        <p className="rounded-[10px] border border-border bg-card px-3.5 py-2 text-xs text-muted">
          Today so far ·{' '}
          <span className="font-semibold text-fg">
            {glasses} / {goal} glasses
          </span>
        </p>
      </div>
      <div className="p-4">
        <button
          type="button"
          onClick={() => updateSettings({ notificationsEnabled: true })}
          className="h-11 w-full rounded-xl bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          Enable notifications
        </button>
      </div>
    </>
  );
}
