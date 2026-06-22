import { useLiveQuery } from 'dexie-react-hooks';
import { IconDropletFilled } from '@tabler/icons-react';
import { db } from '@/db/db';
import type { Settings } from '@/db/settings';
import Section from './Section';

function updateGoalType(goalType: Settings['goalType']) {
  db.settings.update('settings', { goalType });
}

export default function DailyGoal() {
  const settings = useLiveQuery(() => db.settings.get('settings'));

  if (!settings) return null;

  function updateDailyGoal(delta: number) {
    const next = Math.min(16, Math.max(1, settings!.dailyGoal + delta));
    db.settings.update('settings', { dailyGoal: next });
  }

  const goalLabel =
    settings.goalType === 'glasses' ? `${settings.dailyGoal} glasses` : `${settings.dailyGoal * 250} ml`;

  return (
    <Section title="Daily goal" icon={<IconDropletFilled className="h-4 w-4 text-primary" />}>
      <div className="flex items-center gap-5 border-t border-border px-5 py-4">
        <div className="flex-1">
          <p className="text-sm font-semibold">Goal type</p>
          <p className="mt-0.5 text-[13px] text-muted">Track your intake in glasses or millilitres.</p>
        </div>
        <div className="inline-flex gap-0.5 rounded-[10px] border border-border bg-elevated p-0.5">
          <button
            type="button"
            onClick={() => updateGoalType('glasses')}
            className={`rounded-lg px-4 py-1.5 text-[13px] font-medium transition-colors ${settings.goalType === 'glasses' ? 'bg-surface text-fg shadow-[0_1px_2px_rgba(0,0,0,0.14)]' : 'text-muted'}`}
          >
            Glasses
          </button>
          <button
            type="button"
            onClick={() => updateGoalType('ml')}
            className={`rounded-lg px-4 py-1.5 text-[13px] font-medium transition-colors ${settings.goalType === 'ml' ? 'bg-surface text-fg shadow-[0_1px_2px_rgba(0,0,0,0.14)]' : 'text-muted'}`}
          >
            Milliliters
          </button>
        </div>
      </div>
      <div className="flex items-center gap-5 border-t border-border px-5 py-4">
        <div className="flex-1">
          <p className="text-sm font-semibold">Daily goal</p>
          <p className="mt-0.5 text-[13px] text-muted">How much water you aim to drink each day.</p>
        </div>
        <div className="flex items-center overflow-hidden rounded-[10px] border border-border bg-elevated">
          <button
            type="button"
            aria-label="Decrease goal"
            onClick={() => updateDailyGoal(-1)}
            className="h-9.5 w-9.5 text-lg text-muted transition-colors hover:text-fg"
          >
            −
          </button>
          <span className="min-w-22 text-center text-sm font-semibold">{goalLabel}</span>
          <button
            type="button"
            aria-label="Increase goal"
            onClick={() => updateDailyGoal(1)}
            className="h-9.5 w-9.5 text-lg text-muted transition-colors hover:text-fg"
          >
            +
          </button>
        </div>
      </div>
    </Section>
  );
}
