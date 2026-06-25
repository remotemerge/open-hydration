// Extension-owned reminder page.
const REMINDER_PATH = '/reminder.html';

// Currently tracked reminder tab.
let reminderTabId: number | null = null;

/**
 * Opens the reminder page or reuses the existing reminder tab.
 *
 * When `focusTab` is false, the tab opens without stealing focus, so the
 * reminder never interrupts the user's current window.
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
      // Tab no longer exists.
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
 * Clears the tracked reminder tab when it is closed.
 */
export function forgetReminderTab(tabId: number): void {
  if (tabId === reminderTabId) {
    reminderTabId = null;
  }
}
