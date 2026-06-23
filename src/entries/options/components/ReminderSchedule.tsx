import { useEffect, useState } from 'react';
import { IconClock, IconChevronDown } from '@tabler/icons-react';
import type { Settings } from '@/db/settings';
import { updateSettings, useSettings } from '@/hooks/useSettings';
import Section from './Section';
import SettingRow from './SettingRow';

const INTERVAL_LABELS: Record<Settings['reminderInterval'], string> = {
  '15m': '15 minutes',
  '20m': '20 minutes',
  '30m': '30 minutes',
  '45m': '45 minutes',
  '60m': '1 hour',
  '120m': '2 hours',
  '240m': '4 hours',
};

/**
 * Persist the selected reminder interval
 */
async function updateInterval(value: string) {
  await updateSettings({ reminderInterval: value as Settings['reminderInterval'] });
}

/**
 * Check the end time falls after the start time
 */
function isValidRange(start: string, end: string): boolean {
  return start < end;
}

/**
 * Persist the active hours start time
 */
async function updateActiveHoursStart(value: string) {
  await updateSettings({ activeHoursStart: value });
}

/**
 * Persist the active hours end time
 */
async function updateActiveHoursEnd(value: string) {
  await updateSettings({ activeHoursEnd: value });
}

export default function ReminderSchedule() {
  const settings = useSettings();

  // Hold an invalid selection without persisting it
  const [draftStart, setDraftStart] = useState<string | null>(null);
  const [draftEnd, setDraftEnd] = useState<string | null>(null);

  const persistedStart = settings?.activeHoursStart;
  const persistedEnd = settings?.activeHoursEnd;

  // Drop unsaved invalid drafts when the persisted hours change underneath
  useEffect(() => {
    setDraftStart(null);
    setDraftEnd(null);
  }, [persistedStart, persistedEnd]);

  const start = draftStart ?? persistedStart ?? '';
  const end = draftEnd ?? persistedEnd ?? '';
  const rangeError = !isValidRange(start, end);

  /**
   * Save the start time once the range is valid
   */
  async function handleStartChange(value: string) {
    setDraftStart(value);
    if (isValidRange(value, end)) {
      setDraftStart(null);
      await updateActiveHoursStart(value);
    }
  }

  /**
   * Save the end time once the range is valid
   */
  async function handleEndChange(value: string) {
    setDraftEnd(value);
    if (isValidRange(start, value)) {
      setDraftEnd(null);
      await updateActiveHoursEnd(value);
    }
  }

  return (
    <Section title="Schedule" icon={<IconClock className="h-4 w-4 text-accent" />} loading={!settings}>
      {settings && (
        <>
          <SettingRow title="Interval" description="How often you'd like a gentle nudge.">
            <div className="relative">
              <select
                value={settings.reminderInterval}
                onChange={(e) => updateInterval(e.target.value)}
                aria-label="Reminder interval"
                className="cursor-pointer appearance-none rounded-[10px] border border-border bg-elevated py-2.5 pl-3.5 pr-9 text-body font-medium text-fg focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              >
                {(Object.keys(INTERVAL_LABELS) as Settings['reminderInterval'][]).map((key) => (
                  <option key={key} value={key}>
                    {INTERVAL_LABELS[key]}
                  </option>
                ))}
              </select>
              <IconChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
            </div>
          </SettingRow>
          <SettingRow title="Active hours" description="Reminders only run between these times.">
            <div className="flex flex-col items-end gap-1.5">
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  value={start}
                  onChange={(e) => handleStartChange(e.target.value)}
                  aria-label="Active hours start"
                  aria-invalid={rangeError}
                  className="rounded-[10px] border border-border bg-elevated px-3 py-2 text-body font-semibold text-fg focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 aria-invalid:border-warning"
                />
                <span className="text-body text-muted">to</span>
                <input
                  type="time"
                  value={end}
                  onChange={(e) => handleEndChange(e.target.value)}
                  aria-label="Active hours end"
                  aria-invalid={rangeError}
                  className="rounded-[10px] border border-border bg-elevated px-3 py-2 text-body font-semibold text-fg focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 aria-invalid:border-warning"
                />
              </div>
              {rangeError && (
                <p role="alert" className="text-meta font-medium text-warning">
                  End time must be after the start time.
                </p>
              )}
            </div>
          </SettingRow>
        </>
      )}
    </Section>
  );
}
