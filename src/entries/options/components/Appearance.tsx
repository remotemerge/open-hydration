import { IconSun } from '@tabler/icons-react';
import type { Settings } from '@/db/settings';
import { updateSettings, useSettings } from '../hooks/useSettings';
import Section from './Section';
import ToggleSwitch from './ToggleSwitch';

/**
 * Persist the selected theme
 */
function updateTheme(theme: Settings['theme']) {
  updateSettings({ theme });
}

export default function Appearance() {
  const settings = useSettings();

  if (!settings) return null;

  return (
    <Section title="Appearance" icon={<IconSun className="h-4 w-4 text-accent" />}>
      <div className="flex items-center gap-5 border-t border-border px-5 py-4">
        <div className="flex-1">
          <p className="text-sm font-semibold">Theme</p>
          <p className="mt-0.5 text-[13px] text-muted">Match your system or pick a side.</p>
        </div>
        <div className="inline-flex gap-0.5 rounded-[10px] border border-border bg-elevated p-0.5">
          {(['system', 'light', 'dark'] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => updateTheme(value)}
              className={`rounded-lg px-3.5 py-1.5 text-[13px] font-medium capitalize transition-colors ${settings.theme === value ? 'bg-surface text-fg shadow-[0_1px_2px_rgba(0,0,0,0.14)]' : 'text-muted'}`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-5 border-t border-border px-5 py-3.75">
        <div className="flex-1">
          <p className="text-sm font-semibold">Compact mode</p>
          <p className="mt-0.5 text-[13px] text-muted">Reduce padding for a denser popup.</p>
        </div>
        <ToggleSwitch
          checked={settings.compactMode}
          onChange={(checked) => updateSettings({ compactMode: checked })}
          label="Compact mode"
        />
      </div>
      <div className="flex items-center gap-5 border-t border-border px-5 py-3.75">
        <div className="flex-1">
          <p className="text-sm font-semibold">Reduced motion</p>
          <p className="mt-0.5 text-[13px] text-muted">Minimize animations and transitions.</p>
        </div>
        <ToggleSwitch
          checked={settings.reducedMotion}
          onChange={(checked) => updateSettings({ reducedMotion: checked })}
          label="Reduced motion"
        />
      </div>
    </Section>
  );
}
