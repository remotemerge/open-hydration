import type { ReactNode } from 'react';
import { IconSettings } from '@tabler/icons-react';
import { useSettings } from '@/hooks/useSettings';
import { useTheme } from '@/hooks/useTheme';
import { useTodayGlasses, useStreak } from '@/hooks/useDrinks';
import { AVG_GOAL } from '@/utils/constants';
import DefaultView from './components/DefaultView';
import FirstLaunchView from './components/FirstLaunchView';
import GoalCompletedView from './components/GoalCompletedView';

export default function App() {
  const settings = useSettings();
  const today = useTodayGlasses();
  const glasses = today?.glasses ?? 0;
  const streak = useStreak(settings?.dailyGoal ?? AVG_GOAL);

  useTheme();

  if (!settings) {
    return null;
  }

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
    <main className="flex max-h-[600px] min-h-110 w-90 flex-col overflow-hidden bg-surface">
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
        <IconSettings className="h-4.5 w-4.5" />
      </button>
    </header>
  );
}

function StatusBadge() {
  const today = useTodayGlasses();
  const settings = useSettings();
  const glasses = today?.glasses ?? 0;
  const full = glasses >= (settings?.dailyGoal ?? AVG_GOAL);

  if (!settings?.onboardingComplete) {
    return <span className="rounded-full bg-elevated px-2.5 py-0.5 text-caption font-semibold text-muted">Setup</span>;
  }

  if (!settings?.remindersEnabled) {
    return <span className="rounded-full bg-elevated px-2.5 py-0.5 text-caption font-semibold text-muted">Paused</span>;
  }

  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-caption font-semibold ${full ? 'bg-success/15 text-success' : 'bg-warning/15 text-warning'}`}
    >
      {full ? 'Hydrated' : 'Drink due'}
    </span>
  );
}
