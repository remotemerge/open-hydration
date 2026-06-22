import { useCallback, useEffect, useRef, useState } from 'react';
import { useSettings } from './useSettings';

export function useSaveToast() {
  const settings = useSettings();
  const [toast, setToast] = useState<string | null>(null);
  const prev = useRef(settings);

  useEffect(() => {
    if (!settings || !prev.current) {
      prev.current = settings;
      return;
    }
    // Skip the first render and when nothing changed
    if (prev.current === settings) return;
    prev.current = settings;
    setToast('Settings saved');
  }, [settings]);

  const dismiss = useCallback(() => setToast(null), []);

  return { toast, dismiss };
}
