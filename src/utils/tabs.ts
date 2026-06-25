/**
 * Opens a URL in a new browser tab.
 *
 * @param {string} url - The destination URL to open.
 * @returns {void}
 */
export function openTab(url: string): void {
  browser.tabs.create({ url });
}
