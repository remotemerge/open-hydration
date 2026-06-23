import type { ReactNode } from 'react';

interface SettingRowProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function SettingRow({ title, description, children }: SettingRowProps) {
  return (
    <div className="flex items-center gap-5 border-t border-border px-5 py-4">
      <div className="flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-0.5 text-[13px] text-muted">{description}</p>
      </div>
      {children}
    </div>
  );
}
