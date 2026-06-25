import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/db/db';
import { type DrinkDay } from '@/db/drinks';
import { dateIdFor, getTodayId } from '@/utils/time';

/**
 * Subscribes to today's drink record via Dexie's live query.
 * Returns `undefined` while loading and the `DrinkDay` row once available.
 *
 * @returns {DrinkDay | undefined} Today's drink record, or `undefined` while loading.
 */
export function useTodayGlasses() {
  const today = getTodayId();
  return useLiveQuery(() => db.drinks.get(today), [today]);
}

/**
 * Returns whether a day's goal has been met, using the frozen goal or falling back to the live value.
 *
 * @param {DrinkDay} day - The day record whose progress is evaluated.
 * @param {number} dayGoal - Fallback goal used when the record has no frozen goal.
 * @returns {boolean} True when the day's glasses meet or exceed its goal.
 */
function metGoal(day: DrinkDay, dayGoal: number): boolean {
  return day.glasses >= (day.goal ?? dayGoal);
}

/**
 * Returns the number of consecutive days the user has met their goal.
 * Today is excluded from the streak while still below goal, so a streak
 * earned yesterday survives until today's goal is met.
 *
 * @param {number} dailyGoal - Current daily hydration goal in glasses.
 * @returns {number} The count of consecutive goal-meeting days.
 */
export function useStreak(dailyGoal: number): number {
  return (
    useLiveQuery(async () => {
      const today = getTodayId();
      // Date that the next row must match for the streak to remain unbroken.
      const expected = new Date();
      let streak = 0;

      // Reverse cursor stops at the first break, reading only streak-length rows.
      await db.drinks
        .where('id')
        .belowOrEqual(today)
        // oxlint-disable-next-line unicorn/no-array-reverse
        .reverse()
        .until((day: DrinkDay) => {
          const expectedId = dateIdFor(expected);

          // Today still below goal doesn't break a streak earned yesterday.
          if (day.id === today && !metGoal(day, dailyGoal)) {
            expected.setDate(expected.getDate() - 1);
            return false;
          }

          // A missing day (id gap) or an unmet goal ends the streak.
          if (day.id !== expectedId || !metGoal(day, dailyGoal)) {
            return true;
          }

          streak++;
          expected.setDate(expected.getDate() - 1);
          return false;
        }, false)
        .each(() => {});

      return streak;
    }, [dailyGoal]) ?? 0
  );
}

/**
 * Records a single glass for the current day within a transaction.
 * The day's goal is frozen at the time of logging for historical accuracy.
 *
 * @param {number} dailyGoal - Current daily hydration goal, frozen into the drink record.
 * @returns {Promise<void>} Resolves once the glass has been persisted.
 */
export async function logDrink(dailyGoal: number) {
  const today = getTodayId();
  await db.transaction('rw', db.drinks, async () => {
    const day = await db.drinks.get(today);
    await db.drinks.put({ id: today, glasses: (day?.glasses ?? 0) + 1, goal: dailyGoal });
  });
}

/**
 * Updates the current day's recorded goal if an entry exists.
 *
 * @param {number} dailyGoal - Updated daily goal to persist into today's record.
 * @returns {Promise<void>} Resolves once today's goal has been updated.
 */
export async function syncTodayGoal(dailyGoal: number) {
  await db.drinks.update(getTodayId(), { goal: dailyGoal });
}

/**
 * Removes every recorded day, wiping all hydration history.
 *
 * @returns {Promise<void>} Resolves once all drink records have been cleared.
 */
export async function clearDrinks() {
  await db.drinks.clear();
}
