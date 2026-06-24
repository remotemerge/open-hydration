// Extension-owned reminder page.
const REMINDER_PATH = '/reminder.html';

// Currently tracked reminder tab.
let reminderTabId: number | null = null;

/**
 * Opens the reminder page or reuses the existing reminder tab.
 */
export async function openReminderTab(): Promise<void> {
  const url = browser.runtime.getURL(REMINDER_PATH);

  if (reminderTabId !== null) {
    try {
      const existing = await browser.tabs.get(reminderTabId);

      // Refresh before bringing the tab forward.
      await browser.tabs.reload(existing.id!);
      await browser.tabs.update(existing.id!, {
        active: true,
      });

      if (existing.windowId !== undefined) {
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

  const tab = await browser.tabs.create({ url, active: true });
  reminderTabId = tab.id ?? null;

  if (tab.windowId !== undefined) {
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
