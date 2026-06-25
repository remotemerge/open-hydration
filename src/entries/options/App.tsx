import DailyGoal from './components/DailyGoal';
import ReminderSchedule from './components/ReminderSchedule';
import Reminders from './components/Reminders';
import Appearance from './components/Appearance';
import DataPrivacy from './components/DataPrivacy';
import OpenSource from './components/OpenSource';
import Toast from './components/Toast';
import { useTheme } from '@/hooks/useTheme';
import { useSaveToast } from '@/hooks/useSaveToast';

export default function App() {
  useTheme();
  const { toast, dismiss } = useSaveToast();

  return (
    <div className="flex min-h-screen justify-center bg-bg px-6 pb-16 pt-11 font-sans text-fg antialiased">
      <div className="flex w-full max-w-180 flex-col gap-4.5">
        {/* Page header */}
        <div className="flex items-center gap-3.75 px-0.5 pb-1">
          <img src="/icons/48.png" alt="" className="h-11 w-11 rounded-xl" />
          <div>
            <h1 className="text-title font-semibold leading-tight">Open Hydration Settings</h1>
            <p className="mt-0.5 text-sm text-muted">Set your daily goal and reminder schedule.</p>
          </div>
        </div>

        <DailyGoal />
        <ReminderSchedule />
        <Reminders />
        <Appearance />
        <DataPrivacy />
        <OpenSource />
      </div>

      {toast && <Toast message={toast} onDone={dismiss} />}
    </div>
  );
}
