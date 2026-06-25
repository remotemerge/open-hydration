import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  onDone: () => void;
}

/**
 * A transient notification that fades in, displays briefly, then auto-dismisses.
 * Uses `role="status"` and `aria-live="polite"` for screen reader accessibility.
 *
 * @param {ToastProps} props - The message to display and the callback fired after auto-dismiss.
 * @returns {JSX.Element} The rendered toast notification.
 */
export default function Toast({ message, onDone }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    // Fade out after 1.8s, then remove from DOM after the transition completes.
    const t1 = setTimeout(() => setVisible(false), 1800);
    const t2 = setTimeout(onDone, 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-border bg-surface px-4 py-2.5 text-body font-medium text-fg shadow-[0_8px_24px_-6px_rgba(0,0,0,0.35)] transition-all duration-300 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
    >
      {message}
    </div>
  );
}
