import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/db/db';
import { dateIdFor, getTodayId, type DrinkDay } from '@/db/drinks';

export function useTodayGlasses() {
  const today = getTodayId();
  return useLiveQuery(() => db.drinks.get(today), [today]);
}

// Uses the day's frozen goal, falling back to the live goal for legacy rows.
function metGoal(day: DrinkDay, dayGoal: number): boolean {
  return day.glasses >= (day.goal ?? dayGoal);
}

export function useStreak(dailyGoal: number): number {
  return (
    useLiveQuery(async () => {
      const today = getTodayId();
      // The date the next row must have for the run to stay unbroken.
      const expected = new Date();
      let streak = 0;

      // Reverse cursor stops at the first break, so it reads only streak-length rows.
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
 * Records a glass for the current day.
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
 */
export async function syncTodayGoal(dailyGoal: number) {
  await db.drinks.update(getTodayId(), { goal: dailyGoal });
}
