import { IconClock, IconChevronDown } from '@tabler/icons-react';
import type { Settings } from '@/db/settings';
import { updateSettings, useSettings } from '../hooks/useSettings';
import Section from './Section';

const INTERVAL_LABELS: Record<Settings['reminderInterval'], string> = {
  '15m': '15 minutes',
  '20m': '20 minutes',
  '30m': '30 minutes',
  '45m': '45 minutes',
  '60m': '1 hour',
  '120m': '2 hours',
  '240m': '4 hours',
};

function updateInterval(value: string) {
  updateSettings({ reminderInterval: value as Settings['reminderInterval'] });
}

function updateActiveHoursStart(value: string) {
  updateSettings({ activeHoursStart: value });
}

function updateActiveHoursEnd(value: string) {
  updateSettings({ activeHoursEnd: value });
}

export default function ReminderSchedule() {
  const settings = useSettings();

  if (!settings) return null;

  return (
    <Section title="Reminder schedule" icon={<IconClock className="h-4 w-4 text-accent" />}>
      <div className="flex items-center gap-5 border-t border-border px-5 py-4">
        <div className="flex-1">
          <p className="text-sm font-semibold">Reminder interval</p>
          <p className="mt-0.5 text-[13px] text-muted">How often you'd like a gentle nudge.</p>
        </div>
        <div className="relative">
          <select
            value={settings.reminderInterval}
            onChange={(e) => updateInterval(e.target.value)}
            className="cursor-pointer appearance-none rounded-[10px] border border-border bg-elevated py-2.5 pl-3.5 pr-9 text-[13px] font-medium text-fg focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            {(Object.keys(INTERVAL_LABELS) as Settings['reminderInterval'][]).map((key) => (
              <option key={key} value={key}>
                {INTERVAL_LABELS[key]}
              </option>
            ))}
          </select>
          <IconChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
        </div>
      </div>
      <div className="flex items-center gap-5 border-t border-border px-5 py-4">
        <div className="flex-1">
          <p className="text-sm font-semibold">Active hours</p>
          <p className="mt-0.5 text-[13px] text-muted">Reminders only run between these times.</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="time"
            value={settings.activeHoursStart}
            onChange={(e) => updateActiveHoursStart(e.target.value)}
            className="rounded-[10px] border border-border bg-elevated px-3 py-2 text-[13px] font-semibold text-fg focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          />
          <span className="text-[13px] text-muted">to</span>
          <input
            type="time"
            value={settings.activeHoursEnd}
            onChange={(e) => updateActiveHoursEnd(e.target.value)}
            className="rounded-[10px] border border-border bg-elevated px-3 py-2 text-[13px] font-semibold text-fg focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          />
        </div>
      </div>
    </Section>
  );
}
