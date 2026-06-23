import { useEffect, useId, useRef, useState } from 'react';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
}

/**
 * A themed, accessible confirmation modal for destructive actions.
 *
 * Renders nothing until opened, traps focus on the cancel button, closes on
 * Escape or backdrop click, and disables both buttons while the action runs.
 */
export default function ConfirmDialog({ open, title, message, confirmLabel, onConfirm, onCancel }: ConfirmDialogProps) {
  const titleId = useId();
  const messageId = useId();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [running, setRunning] = useState(false);

  // Move focus into the dialog and restore it to the trigger on close.
  useEffect(() => {
    if (!open) {
      return;
    }
    const previous = document.activeElement as HTMLElement | null;
    cancelRef.current?.focus();
    return () => previous?.focus();
  }, [open]);

  // Escape cancels, but never while the action is mid-flight.
  useEffect(() => {
    if (!open) {
      return;
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && !running) {
        onCancel();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, running, onCancel]);

  if (!open) {
    return null;
  }

  async function confirm() {
    setRunning(true);
    try {
      await onConfirm();
    } finally {
      setRunning(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onMouseDown={() => {
        if (!running) {
          onCancel();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={messageId}
        onMouseDown={(event) => event.stopPropagation()}
        className="w-full max-w-sm rounded-2xl border border-border bg-surface p-5 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.45)]"
      >
        <h2 id={titleId} className="text-base font-semibold">
          {title}
        </h2>
        <p id={messageId} className="mt-2 text-body leading-relaxed text-muted">
          {message}
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            ref={cancelRef}
            type="button"
            disabled={running}
            onClick={onCancel}
            className="rounded-lg border border-border px-3.5 py-1.5 text-body font-medium text-muted transition-colors hover:text-fg disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={running}
            onClick={confirm}
            className="rounded-lg bg-warning/15 px-3.5 py-1.5 text-body font-semibold text-warning transition-colors hover:bg-warning/25 disabled:opacity-60"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
