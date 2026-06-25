import { useEffect } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { useTheme } from '@/hooks/useTheme';
import ReminderView from './components/ReminderView';

export default function App() {
  const settings = useSettings();
  useTheme();

  useEffect(() => {
    // Set dynamic page title
    document.title = browser.i18n.getMessage('extName');
  }, []);

  if (!settings) {
    return null;
  }

  return <ReminderView settings={settings} />;
}
