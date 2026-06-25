import { useEffect } from 'react';
import { useSettings } from './useSettings';

/**
 * Applies the user's theme preference to the document root.
 * For the "system" theme, listens to the `prefers-color-scheme` media query
 * and updates reactively when the OS preference changes.
 *
 * @returns {void}
 */
export function useTheme() {
  const settings = useSettings();

  useEffect(() => {
    if (!settings) return;

    const root = document.documentElement;

    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else if (settings.theme === 'light') {
      root.classList.remove('dark');
    } else {
      // "system" tracks the OS preference live; subscribe to the media query so the
      // theme follows changes made while a popup/options page is open.
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const apply = (e: MediaQueryListEvent | MediaQueryList) => {
        root.classList.toggle('dark', e.matches);
      };
      apply(mq);
      mq.addEventListener('change', apply);
      return () => mq.removeEventListener('change', apply);
    }
  }, [settings?.theme]);
}
