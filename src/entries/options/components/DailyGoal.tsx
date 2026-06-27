import { IconDroplet } from '@tabler/icons-react';
import type { Settings } from '@/db/settings';
import { ML_PER_GLASS, MIN_GOAL, MAX_GOAL } from '@/utils/constants';
import { syncTodayGoal } from '@/hooks/useDrinks';
import { updateSettings, useSettings } from '@/hooks/useSettings';
import Section from './Section';
import SettingRow from './SettingRow';

/**
 * Settings section for configuring the tracking unit and daily hydration goal.
 *
 * @returns {JSX.Element} The rendered daily goal settings section.
 */
export default function DailyGoal() {
  const settings = useSettings();

  const { trackingUnit, dailyGoal } = settings ?? {};

  /**
   * Updates the tracking unit only when it differs from the current value.
   *
   * @param {Settings['trackingUnit']} next - Target tracking unit ("glasses" or "ml").
   * @returns {Promise<void>} Resolves once the change is persisted, or immediately if unchanged.
   */
  async function updateTrackingUnit(next: Settings['trackingUnit']) {
    if (next !== trackingUnit) {
      await updateSettings({ trackingUnit: next });
    }
  }

  /**
   * Adjusts the daily goal within bounds, persisting the change and syncing
   * today's frozen goal so the popup and reminder views stay consistent.
   *
   * @param {number} delta - Amount to adjust by (+1 or -1).
   * @returns {Promise<void>} Resolves once the change is persisted, or immediately if at a bound.
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

  const glassUnit = dailyGoal === 1 ? 'glass' : 'glasses';
  const goalLabel = trackingUnit === 'glasses' ? `${dailyGoal} ${glassUnit}` : `${(dailyGoal ?? 0) * ML_PER_GLASS} ml`;

  return (
    <Section title="Daily goal" icon={<IconDroplet className="h-4 w-4 text-primary" />} loading={!settings}>
      {settings && (
        <>
          <SettingRow title="Tracking unit" description="Choose whether to track your water in glasses or millilitres.">
            <div className="inline-flex gap-0.5 rounded-[10px] border border-border bg-elevated p-0.5">
              <button
                type="button"
                aria-pressed={settings.trackingUnit === 'glasses'}
                onClick={() => updateTrackingUnit('glasses')}
                className={`rounded-lg px-4 py-1.5 text-body font-medium transition-colors ${settings.trackingUnit === 'glasses' ? 'bg-surface text-fg shadow-[0_1px_2px_rgba(0,0,0,0.14)]' : 'text-muted'}`}
              >
                Glasses
              </button>
              <button
                type="button"
                aria-pressed={settings.trackingUnit === 'ml'}
                onClick={() => updateTrackingUnit('ml')}
                className={`rounded-lg px-4 py-1.5 text-body font-medium transition-colors ${settings.trackingUnit === 'ml' ? 'bg-surface text-fg shadow-[0_1px_2px_rgba(0,0,0,0.14)]' : 'text-muted'}`}
              >
                Milliliters
              </button>
            </div>
          </SettingRow>
          <SettingRow title="Daily goal" description="Set how much water you want to drink each day.">
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
