import { IconBell } from '@tabler/icons-react';
import { updateSettings, useSettings } from '@/hooks/useSettings';
import Section from './Section';
import ToggleSwitch from './ToggleSwitch';

export default function Notifications() {
  const settings = useSettings();

  return (
    <Section title="Reminders" icon={<IconBell className="h-4 w-4 text-primary" />} loading={!settings}>
      {settings && (
        <>
          <div className="flex items-center gap-5 border-t border-border px-5 py-3.75">
            <div className="flex-1">
              <p className="text-sm font-semibold">Enable reminders</p>
              <p className="mt-0.5 text-[13px] text-muted">Receive a gentle reminder when it's time to drink.</p>
            </div>
            <ToggleSwitch
              checked={settings.remindersEnabled}
              onChange={async (checked) => {
                await updateSettings({ remindersEnabled: checked });
              }}
              label="Enable reminders"
            />
          </div>
          <div className="flex items-center gap-5 border-t border-border px-5 py-3.75">
            <div className="flex-1">
              <p className="text-sm font-semibold">Reminder sound</p>
              <p className="mt-0.5 text-[13px] text-muted">Play a soft chime with each reminder.</p>
            </div>
            <ToggleSwitch
              checked={settings.soundEnabled}
              onChange={async (checked) => {
                await updateSettings({ soundEnabled: checked });
              }}
              label="Reminder sound"
            />
          </div>
        </>
      )}
    </Section>
  );
}
