import { useRef } from 'react';
import { IconBell, IconPlayerPlayFilled } from '@tabler/icons-react';
import { updateSettings, useSettings } from '@/hooks/useSettings';
import Section from './Section';
import SettingRow from './SettingRow';
import ToggleSwitch from './ToggleSwitch';

/**
 * Settings section for enabling reminders, sound, and the focus-tab behavior.
 *
 * @returns {JSX.Element} The rendered reminders settings section.
 */
export default function Reminders() {
  const settings = useSettings();
  const previewRef = useRef<HTMLAudioElement | null>(null);

  /**
   * Plays the reminder chime so users can preview the sound before enabling.
   *
   * @returns {void}
   */
  const playPreview = () => {
    if (!previewRef.current) {
      previewRef.current = new Audio(browser.runtime.getURL('/audios/water-bubble.wav'));
    }

    // Rewind to the start so repeated previews always play from the beginning.
    previewRef.current.currentTime = 0;

    // Swallow autoplay rejections silently; the user explicitly clicked play.
    void previewRef.current.play().catch(() => {});
  };

  return (
    <Section title="Reminders" icon={<IconBell className="h-4 w-4 text-primary" />} loading={!settings}>
      {settings && (
        <>
          <SettingRow title="Enable reminders" description="Get a reminder when it's time to drink water.">
            <ToggleSwitch
              checked={settings.remindersEnabled}
              onChange={async (checked) => {
                await updateSettings({ remindersEnabled: checked });
              }}
              label="Enable reminders"
            />
          </SettingRow>
          <SettingRow title="Reminder sound" description="Play a gentle sound with each reminder.">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={playPreview}
                aria-label="Preview reminder sound"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-elevated text-muted transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              >
                <IconPlayerPlayFilled className="h-3.5 w-3.5 translate-x-px" />
              </button>
              <ToggleSwitch
                checked={settings.soundEnabled}
                onChange={async (checked) => {
                  await updateSettings({ soundEnabled: checked });
                }}
                label="Reminder sound"
              />
            </div>
          </SettingRow>
          <SettingRow
            title="Bring reminder to front"
            description="Automatically switch to the reminder tab when it's time to drink."
          >
            <ToggleSwitch
              checked={settings.focusTab}
              onChange={async (checked) => {
                await updateSettings({ focusTab: checked });
              }}
              label="Bring reminder to front"
            />
          </SettingRow>
        </>
      )}
    </Section>
  );
}
