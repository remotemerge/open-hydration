import { IconBell } from '@tabler/icons-react';
import { updateSettings, useSettings } from '../hooks/useSettings';
import Section from './Section';
import ToggleSwitch from './ToggleSwitch';

export default function Notifications() {
  const settings = useSettings();

  if (!settings) return null;

  return (
    <Section title="Notifications" icon={<IconBell className="h-4 w-4 text-primary" />}>
      <div className="flex items-center gap-5 border-t border-border px-5 py-3.75">
        <div className="flex-1">
          <p className="text-sm font-semibold">Enable notifications</p>
          <p className="mt-0.5 text-[13px] text-muted">Receive a gentle reminder when it's time to drink.</p>
        </div>
        <ToggleSwitch
          checked={settings.notificationsEnabled}
          onChange={(checked) => updateSettings({ notificationsEnabled: checked })}
          label="Enable notifications"
        />
      </div>
      <div className="flex items-center gap-5 border-t border-border px-5 py-3.75">
        <div className="flex-1">
          <p className="text-sm font-semibold">Reminder sound</p>
          <p className="mt-0.5 text-[13px] text-muted">Play a soft chime with each reminder.</p>
        </div>
        <ToggleSwitch
          checked={settings.reminderSound}
          onChange={(checked) => updateSettings({ reminderSound: checked })}
          label="Reminder sound"
        />
      </div>
    </Section>
  );
}
