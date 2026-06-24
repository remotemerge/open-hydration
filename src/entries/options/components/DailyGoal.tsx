import { IconDroplet } from '@tabler/icons-react';
import type { Settings } from '@/db/settings';
import { ML_PER_GLASS, MIN_GOAL, MAX_GOAL } from '@/utils/constants';
import { syncTodayGoal } from '@/hooks/useDrinks';
import { updateSettings, useSettings } from '@/hooks/useSettings';
import Section from './Section';
import SettingRow from './SettingRow';

export default function DailyGoal() {
  const settings = useSettings();

  const { goalType, dailyGoal } = settings ?? {};

  /**
   * Update the goal type when it differs from the current value
   */
  async function updateGoalType(next: Settings['goalType']) {
    if (next !== goalType) {
      await updateSettings({ goalType: next });
    }
  }

  /**
   * Adjust the daily goal within bounds, skipping no-op changes
   */
  async function updateDailyGoal(delta: number) {
    if (dailyGoal === undefined) {
      return;
    }

    const next = Math.min(MAX_GOAL, Math.max(MIN_GOAL, dailyGoal + delta));
    if (next !== dailyGoal) {
      await updateSettings({ dailyGoal: next });
      await syncTodayGoal(next);
    }
  }

  const goalLabel =
    goalType === 'glasses'
      ? `${dailyGoal} ${dailyGoal === 1 ? 'glass' : 'glasses'}`
      : `${(dailyGoal ?? 0) * ML_PER_GLASS} ml`;

  return (
    <Section title="Daily goal" icon={<IconDroplet className="h-4 w-4 text-primary" />} loading={!settings}>
      {settings && (
        <>
          <SettingRow title="Goal type" description="Track your intake in glasses or millilitres.">
            <div className="inline-flex gap-0.5 rounded-[10px] border border-border bg-elevated p-0.5">
              <button
                type="button"
                aria-pressed={settings.goalType === 'glasses'}
                onClick={() => updateGoalType('glasses')}
                className={`rounded-lg px-4 py-1.5 text-body font-medium transition-colors ${settings.goalType === 'glasses' ? 'bg-surface text-fg shadow-[0_1px_2px_rgba(0,0,0,0.14)]' : 'text-muted'}`}
              >
                Glasses
              </button>
              <button
                type="button"
                aria-pressed={settings.goalType === 'ml'}
                onClick={() => updateGoalType('ml')}
                className={`rounded-lg px-4 py-1.5 text-body font-medium transition-colors ${settings.goalType === 'ml' ? 'bg-surface text-fg shadow-[0_1px_2px_rgba(0,0,0,0.14)]' : 'text-muted'}`}
              >
                Milliliters
              </button>
            </div>
          </SettingRow>
          <SettingRow title="Daily goal" description="How much water you aim to drink each day.">
            <div className="flex items-center overflow-hidden rounded-[10px] border border-border bg-elevated">
              <button
                type="button"
                aria-label="Decrease goal"
                onClick={() => updateDailyGoal(-1)}
                disabled={(dailyGoal ?? 0) <= MIN_GOAL}
                className="h-9.5 w-9.5 text-lg text-muted transition-colors hover:text-fg disabled:opacity-40"
              >
                −
              </button>
              <span className="min-w-22 text-center text-sm font-semibold">{goalLabel}</span>
              <button
                type="button"
                aria-label="Increase goal"
                onClick={() => updateDailyGoal(1)}
                disabled={(dailyGoal ?? 0) >= MAX_GOAL}
                className="h-9.5 w-9.5 text-lg text-muted transition-colors hover:text-fg disabled:opacity-40"
              >
                +
              </button>
            </div>
          </SettingRow>
        </>
      )}
    </Section>
  );
}
