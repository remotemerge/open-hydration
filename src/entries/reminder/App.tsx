import { useEffect } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { useTheme } from '@/hooks/useTheme';
import ReminderView from './components/ReminderView';

/**
 * Root component for the reminder tab entry point.
 * Renders the ReminderView once settings have loaded.
 *
 * @returns {JSX.Element | null} The reminder view, or null while settings load.
 */
export default function App() {
  const settings = useSettings();
  useTheme();

  useEffect(() => {
    document.title = browser.i18n.getMessage('extName');
  }, []);

  if (!settings) {
    return null;
  }

  return <ReminderView settings={settings} />;
}
