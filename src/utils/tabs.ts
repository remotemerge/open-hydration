/**
 * Opens a URL in a new browser tab.
 * @param url - The URL to open
 */
export function openTab(url: string): void {
  browser.tabs.create({ url });
}
