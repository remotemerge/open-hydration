import './style.scss';

import DailyGoal from './components/DailyGoal';
import ReminderSchedule from './components/ReminderSchedule';
import Notifications from './components/Notifications';
import Appearance from './components/Appearance';
import DataPrivacy from './components/DataPrivacy';
import OpenSource from './components/OpenSource';
import Toast from './components/Toast';
import { useTheme } from './hooks/useTheme';
import { useSaveToast } from './hooks/useSaveToast';

export default function App() {
  useTheme();
  const { toast, dismiss } = useSaveToast();

  return (
    <div className="flex min-h-screen justify-center bg-bg px-6 pb-16 pt-11 font-sans text-fg antialiased">
      <div className="flex w-full max-w-180 flex-col gap-4.5">
        {/* Page header */}
        <div className="flex items-center gap-3.75 px-0.5 pb-1">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary shadow-[0_6px_18px_-6px_var(--primary)]">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
              <path d="M12 3s-6 6.7-6 11.3a6 6 0 1 0 12 0C18 9.7 12 3 12 3Z" fill="#fff" />
              <path
                d="M9 13.7a2.6 2.6 0 0 0 1.9 3.6"
                stroke="#fff"
                strokeOpacity=".5"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-[21px] font-semibold leading-tight">Open Hydration Settings</h1>
            <p className="mt-0.5 text-sm text-muted">Configure your hydration reminders and daily goals.</p>
          </div>
        </div>

        <DailyGoal />
        <ReminderSchedule />
        <Notifications />
        <Appearance />
        <DataPrivacy />
        <OpenSource />
      </div>

      {toast && <Toast message={toast} onDone={dismiss} />}
    </div>
  );
}
