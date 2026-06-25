import { IconSun } from '@tabler/icons-react';
import type { Settings } from '@/db/settings';
import { updateSettings, useSettings } from '@/hooks/useSettings';
import Section from './Section';
import SettingRow from './SettingRow';

/**
 * Persists the selected theme preference.
 *
 * @param {Settings['theme']} theme - The theme to apply ("system", "light", or "dark").
 * @returns {Promise<void>} Resolves once the theme is persisted.
 */
async function updateTheme(theme: Settings['theme']) {
  await updateSettings({ theme });
}

/**
 * Settings section for choosing between system, light, and dark themes.
 *
 * @returns {JSX.Element} The rendered appearance settings section.
 */
export default function Appearance() {
  const settings = useSettings();

  return (
    <Section title="Appearance" icon={<IconSun className="h-4 w-4 text-accent" />} loading={!settings}>
      {settings && (
        <SettingRow title="Theme" description="Match your system or pick a side.">
          <div className="inline-flex gap-0.5 rounded-[10px] border border-border bg-elevated p-0.5">
            {(['system', 'light', 'dark'] as const).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={settings.theme === value}
                onClick={() => updateTheme(value)}
                className={`rounded-lg px-3.5 py-1.5 text-body font-medium capitalize transition-colors ${settings.theme === value ? 'bg-surface text-fg shadow-[0_1px_2px_rgba(0,0,0,0.14)]' : 'text-muted'}`}
              >
                {value}
              </button>
            ))}
          </div>
        </SettingRow>
      )}
    </Section>
  );
}
