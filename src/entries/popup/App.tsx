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
      <svg className="h-5.5 w-5.5" viewBox="0 0 24 24" fill="none">
        <path d="M12 3s-6 6.7-6 11.3a6 6 0 1 0 12 0C18 9.7 12 3 12 3Z" className="fill-primary" />
        <path
          d="M9 13.7a2.6 2.6 0 0 0 1.9 3.6"
          stroke="#fff"
          strokeOpacity=".6"
          strokeWidth={1.3}
          strokeLinecap="round"
        />
      </svg>
      <h1 className="flex-1 text-sm font-semibold">Open Hydration</h1>
      <StatusBadge />
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
