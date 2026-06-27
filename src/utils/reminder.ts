import { db } from '@/db/db';

// Path to the extension-owned reminder page.
const REMINDER_PATH = '/reminder.html';

/**
 * Reads the tracked reminder tab ID from persistent storage.
 *
 * The ID is persisted because the MV3 service worker is torn down between
 * alarms; an in-memory value would reset on restart and spawn a new tab
 * instead of reusing the open one.
 *
 * @returns {Promise<number | null>} The stored tab ID, or null if none is tracked.
 */
async function getReminderTabId(): Promise<number | null> {
  const entry = await db.meta.get('reminderTabId');
  return typeof entry?.value === 'number' ? entry.value : null;
}

/**
 * Persists the tracked reminder tab ID so it survives service worker teardown.
 *
 * @param {number | null} id - The tab ID to store, or null to clear it.
 * @returns {Promise<void>} Resolves once the value is written.
 */
async function setReminderTabId(id: number | null): Promise<void> {
  await db.meta.put({ key: 'reminderTabId', value: id });
}

/**
 * Opens the reminder page or reuses the existing reminder tab.
 *
 * When `focusTab` is false, the tab opens without stealing focus, so the
 * reminder never interrupts the user's current window. When the tab already
 * exists, it is reloaded to reflect the latest hydration state.
 *
 * @param {boolean} focusTab - Whether to activate the tab and focus its window.
 * @returns {Promise<void>} Resolves once the reminder tab is opened or refreshed.
 */
export async function openReminderTab(focusTab: boolean): Promise<void> {
  const url = browser.runtime.getURL(REMINDER_PATH);
  const active = focusTab;

  const reminderTabId = await getReminderTabId();

  if (reminderTabId !== null) {
    try {
      const existing = await browser.tabs.get(reminderTabId);

      // Refresh so the prompt and progress reflect the current state.
      await browser.tabs.reload(existing.id!);
      await browser.tabs.update(existing.id!, { active });

      if (active && existing.windowId !== undefined) {
        await browser.windows.update(existing.windowId, {
          focused: true,
        });
      }

      return;
    } catch {
      // Tab was closed externally; clear the stale reference.
      await setReminderTabId(null);
    }
  }

  const tab = await browser.tabs.create({ url, active });
  await setReminderTabId(tab.id ?? null);

  if (active && tab.windowId !== undefined) {
    await browser.windows.update(tab.windowId, {
      focused: true,
    });
  }
}

/**
 * Clears the tracked reminder tab reference when the tab is closed.
 * This prevents stale tab IDs from being reused if the user manually closes the reminder.
 *
 * @param {number} tabId - The identifier of the tab that was removed.
 * @returns {Promise<void>}
 */
export async function forgetReminderTab(tabId: number): Promise<void> {
  const reminderTabId = await getReminderTabId();
  if (tabId === reminderTabId) {
    await setReminderTabId(null);
  }
}
