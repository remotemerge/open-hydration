import type { ReactNode } from 'react';
import { useSettings } from '../options/hooks/useSettings';
import { useTheme } from '../options/hooks/useTheme';
import { useTodayGlasses, useStreak } from './hooks/useDrinks';
import DefaultView from './components/DefaultView';
import FirstLaunchView from './components/FirstLaunchView';
import GoalCompletedView from './components/GoalCompletedView';

export default function App() {
  const settings = useSettings();
  const today = useTodayGlasses();
  const glasses = today?.glasses ?? 0;
  const streak = useStreak(settings?.dailyGoal ?? 8);

  useTheme();

  if (!settings) return null;

  if (!settings.onboardingComplete) {
    return (
      <PopupShell>
        <FirstLaunchView />
      </PopupShell>
    );
  }

  if (glasses >= settings.dailyGoal) {
    return (
      <PopupShell>
        <GoalCompletedView settings={settings} streak={streak} />
      </PopupShell>
    );
  }

  return (
    <PopupShell>
      <DefaultView settings={settings} />
    </PopupShell>
  );
}

function PopupShell({ children }: { children: ReactNode }) {
  return (
    <main className="flex h-130 w-90 flex-col overflow-hidden rounded-[20px] border border-border bg-surface shadow-[0_30px_70px_-28px_rgba(0,0,0,0.6)]">
      <Header />
      {children}
    </main>
  );
}

function Header() {
  return (
    <header className="flex shrink-0 items-center gap-2.5 border-b border-border px-4 py-3.5">
      <img src="/icons/24.png" alt="" className="h-5.5 w-5.5" />
      <h1 className="flex-1 text-sm font-semibold">Open Hydration</h1>
      <StatusBadge />
      <button
        type="button"
        aria-label="Open settings"
        onClick={() => browser.runtime.openOptionsPage()}
        className="grid h-7 w-7 place-items-center rounded-[8px] text-muted transition-colors hover:bg-elevated hover:text-fg focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      >
        <svg
          className="h-4.5 w-4.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
        </svg>
      </button>
    </header>
  );
}

function StatusBadge() {
  const today = useTodayGlasses();
  const settings = useSettings();
  const glasses = today?.glasses ?? 0;
  const full = glasses >= (settings?.dailyGoal ?? 8);

  if (!settings?.onboardingComplete) {
    return <span className="rounded-full bg-elevated px-2.5 py-0.5 text-[11px] font-semibold text-muted">Setup</span>;
  }

  if (!settings?.remindersEnabled) {
    return <span className="rounded-full bg-elevated px-2.5 py-0.5 text-[11px] font-semibold text-muted">Paused</span>;
  }

  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${full ? 'bg-success/15 text-success' : 'bg-warning/15 text-warning'}`}
    >
      {full ? 'Hydrated' : 'Drink due'}
    </span>
  );
}
