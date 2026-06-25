interface ToggleSwitchProps {
  checked: boolean;
  label: string;
  onChange?: (checked: boolean) => void;
}

/**
 * Renders an accessible on/off toggle switch using the `role="switch"` pattern.
 *
 * @param {ToggleSwitchProps} props - Checked state, accessible label, and change handler.
 * @returns {JSX.Element} The rendered toggle switch.
 */
export default function ToggleSwitch({ checked, label, onChange }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange?.(!checked)}
      className={`flex h-6 w-10.5 shrink-0 items-center rounded-full p-0.5 transition-colors ${checked ? 'bg-primary' : 'bg-border'}`}
    >
      <span
        className={`h-5 w-5 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.35)] transition-transform ${checked ? 'translate-x-4.5' : ''}`}
      />
    </button>
  );
}
