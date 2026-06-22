import { useCallback, useState } from 'react';
import { useOnSettingsSaved } from './useSettings';

export function useSaveToast() {
  const [toast, setToast] = useState<string | null>(null);

  useOnSettingsSaved(useCallback(() => setToast('Settings saved'), []));

  const dismiss = useCallback(() => setToast(null), []);

  return { toast, dismiss };
}
