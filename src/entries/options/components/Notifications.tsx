import { IconBell } from '@tabler/icons-react';
import { updateSettings, useSettings } from '@/hooks/useSettings';
import Section from './Section';
import SettingRow from './SettingRow';
import ToggleSwitch from './ToggleSwitch';

export default function Notifications() {
  const settings = useSettings();

  return (
    <Section title="Reminders" icon={<IconBell className="h-4 w-4 text-primary" />} loading={!settings}>
      {settings && (
        <>
          <SettingRow title="Enable reminders" description="Receive a gentle reminder when it's time to drink.">
            <ToggleSwitch
              checked={settings.remindersEnabled}
              onChange={async (checked) => {
                await updateSettings({ remindersEnabled: checked });
              }}
              label="Enable reminders"
            />
          </SettingRow>
          <SettingRow title="Reminder sound" description="Play a soft chime with each reminder.">
            <ToggleSwitch
              checked={settings.soundEnabled}
              onChange={async (checked) => {
                await updateSettings({ soundEnabled: checked });
              }}
              label="Reminder sound"
            />
          </SettingRow>
        </>
      )}
    </Section>
  );
}
