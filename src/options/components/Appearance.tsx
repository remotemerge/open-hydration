import Section from './Section';
import ToggleSwitch from './ToggleSwitch';

export default function Appearance() {
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
          <button
            type="button"
            className="rounded-lg px-3.5 py-1.5 text-[13px] font-medium text-muted transition-colors"
          >
            System
          </button>
          <button
            type="button"
            className="rounded-lg bg-surface px-3.5 py-1.5 text-[13px] font-medium text-fg shadow-[0_1px_2px_rgba(0,0,0,0.14)] transition-colors"
          >
            Light
          </button>
          <button
            type="button"
            className="rounded-lg px-3.5 py-1.5 text-[13px] font-medium text-muted transition-colors"
          >
            Dark
          </button>
        </div>
      </div>
      <div className="flex items-center gap-5 border-t border-border px-5 py-3.75">
        <div className="flex-1">
          <p className="text-sm font-semibold">Compact mode</p>
          <p className="mt-0.5 text-[13px] text-muted">Reduce padding for a denser popup.</p>
        </div>
        <ToggleSwitch checked={false} label="Compact mode" />
      </div>
      <div className="flex items-center gap-5 border-t border-border px-5 py-3.75">
        <div className="flex-1">
          <p className="text-sm font-semibold">Reduced motion</p>
          <p className="mt-0.5 text-[13px] text-muted">Minimize animations and transitions.</p>
        </div>
        <ToggleSwitch checked={false} label="Reduced motion" />
      </div>
    </Section>
  );
}
