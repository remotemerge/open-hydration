// Path to the extension-owned reminder page.
const REMINDER_PATH = '/reminder.html';

// Tab ID of the currently tracked reminder tab, or null if none is open.
let reminderTabId: number | null = null;

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
      reminderTabId = null;
    }
  }

  const tab = await browser.tabs.create({ url, active });
  reminderTabId = tab.id ?? null;

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
 * @returns {void}
 */
export function forgetReminderTab(tabId: number): void {
  if (tabId === reminderTabId) {
    reminderTabId = null;
  }
}
