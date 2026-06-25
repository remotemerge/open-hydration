import { useState } from 'react';
import { IconShieldLock } from '@tabler/icons-react';
import { resetSettings } from '@/hooks/useSettings';
import { clearDrinks } from '@/hooks/useDrinks';
import Section from './Section';
import SettingRow from './SettingRow';
import ConfirmDialog from './ConfirmDialog';
import Toast from './Toast';

interface DangerAction {
  title: string;
  description: string;
  actionLabel: string;
  confirmLabel: string;
  confirmTitle: string;
  confirmMessage: string;
  successToast: string;
  run: () => Promise<void>;
}

const dangerActions: DangerAction[] = [
  {
    title: 'Reset settings to defaults',
    description: 'Restore goals, reminders, and appearance to their defaults. Your hydration history is kept.',
    actionLabel: 'Reset',
    confirmLabel: 'Reset settings',
    confirmTitle: 'Reset settings to defaults?',
    confirmMessage:
      'Goals, reminders, and appearance will return to their defaults. Your hydration history stays untouched.',
    successToast: 'Settings reset to defaults',
    run: resetSettings,
  },
  {
    title: 'Clear all hydration data',
    description: 'Permanently delete every recorded day. This cannot be undone.',
    actionLabel: 'Clear data',
    confirmLabel: 'Clear data',
    confirmTitle: 'Clear all hydration data?',
    confirmMessage: 'Every recorded day will be permanently deleted. This cannot be undone.',
    successToast: 'Hydration data cleared',
    run: clearDrinks,
  },
];

export default function DataPrivacy() {
  const [pending, setPending] = useState<DangerAction | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  async function confirmPending() {
    if (!pending) {
      return;
    }
    await pending.run();
    setToast(pending.successToast);
    setPending(null);
  }

  return (
    <Section title="Data & privacy" icon={<IconShieldLock className="h-4 w-4 text-success" />}>
      <div className="px-5 pb-5 pt-1.5">
        <p className="mt-1 text-body leading-relaxed text-muted">
          All data is stored locally in your browser. No tracking. No analytics. No account required.
        </p>
      </div>

      {dangerActions.map((action) => (
        <SettingRow key={action.title} title={action.title} description={action.description}>
          <button
            type="button"
            onClick={() => setPending(action)}
            className="shrink-0 rounded-lg border border-border px-3.5 py-1.5 text-body font-medium text-muted transition-colors hover:border-warning/40 hover:text-warning"
          >
            {action.actionLabel}
          </button>
        </SettingRow>
      ))}

      <ConfirmDialog
        open={pending !== null}
        title={pending?.confirmTitle ?? ''}
        message={pending?.confirmMessage ?? ''}
        confirmLabel={pending?.confirmLabel ?? ''}
        onConfirm={confirmPending}
        onCancel={() => setPending(null)}
      />

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </Section>
  );
}
