import { IconShieldCheck, IconShield } from '@tabler/icons-react';
import Section from './Section';

export default function DataPrivacy() {
  return (
    <Section title="Data & privacy" icon={<IconShieldCheck className="h-4 w-4 text-success" />}>
      <div className="px-5 pb-5 pt-1.5">
        <div className="flex gap-3 rounded-xl border border-border bg-card px-4 py-4">
          <IconShield className="mt-0.5 h-5 w-5 shrink-0 text-success" />
          <div>
            <p className="text-sm font-semibold">Your data stays on your device</p>
            <p className="mt-1 text-[13px] leading-relaxed text-muted">
              All data is stored locally in your browser. No tracking. No analytics. No account required.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
