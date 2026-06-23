import { useEffect } from 'react';
import { useSettings } from './useSettings';

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
      // System preference
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
