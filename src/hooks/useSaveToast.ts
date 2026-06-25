import { useCallback, useState } from 'react';
import { useOnSettingsSaved } from './useSettings';

/**
 * Manages a transient "Settings saved" toast that appears after each settings save.
 *
 * @returns {{ toast: string | null; dismiss: () => void }} The current toast message and a dismiss handler.
 */
export function useSaveToast() {
  const [toast, setToast] = useState<string | null>(null);

  useOnSettingsSaved(useCallback(() => setToast('Settings saved'), []));

  const dismiss = useCallback(() => setToast(null), []);

  return { toast, dismiss };
}
