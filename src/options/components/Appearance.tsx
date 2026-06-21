import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/db/db';
import type { Settings } from '@/db/settings';
import Section from './Section';
import ToggleSwitch from './ToggleSwitch';

function updateTheme(theme: Settings['theme']) {
  db.settings.update('settings', { theme });
}

export default function Appearance() {
  const settings = useLiveQuery(() => db.settings.get('settings'));

  if (!settings) return null;

  return (
    <Section
      title="Appearance"
      icon={
        <svg
          className="h-4 w-4 stroke-accent"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
        </svg>
      }
    >
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
          onChange={(checked) => db.settings.update('settings', { compactMode: checked })}
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
          onChange={(checked) => db.settings.update('settings', { reducedMotion: checked })}
          label="Reduced motion"
        />
      </div>
    </Section>
  );
}
