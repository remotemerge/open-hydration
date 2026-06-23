import { IconDroplet } from '@tabler/icons-react';
import type { Settings } from '@/db/settings';
import { syncTodayGoal } from '@/hooks/useDrinks';
import { updateSettings, useSettings } from '@/hooks/useSettings';
import Section from './Section';

// Goal bounds mirror the schema validation
const MIN_GOAL = 1;
const MAX_GOAL = 16;

// Millilitres per glass for the ml equivalent display
const ML_PER_GLASS = 250;

export default function DailyGoal() {
  const settings = useSettings();

  if (!settings) return null;

  const { goalType, dailyGoal } = settings;

  /**
   * Update the goal type when it differs from the current value
   */
  function updateGoalType(next: Settings['goalType']) {
    if (next !== goalType) {
      updateSettings({ goalType: next });
    }
  }

  /**
   * Adjust the daily goal within bounds, skipping no-op changes
   */
  function updateDailyGoal(delta: number) {
    const next = Math.min(MAX_GOAL, Math.max(MIN_GOAL, dailyGoal + delta));
    if (next !== dailyGoal) {
      updateSettings({ dailyGoal: next });
      syncTodayGoal(next).catch(() => {
        //
      });
    }
  }

  const goalLabel =
    goalType === 'glasses' ? `${dailyGoal} ${dailyGoal === 1 ? 'glass' : 'glasses'}` : `${dailyGoal * ML_PER_GLASS} ml`;

  return (
    <Section title="Daily goal" icon={<IconDroplet className="h-4 w-4 text-primary" />}>
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
