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
 * Themed confirmation modal for destructive actions, built on the native
 * `<dialog>` element so focus trapping, Escape handling, and focus restoration
 * come from the browser for free.
 *
 * @param {ConfirmDialogProps} props - Open state, dialog copy, and the confirm/cancel handlers.
 * @returns {JSX.Element} The rendered confirmation dialog.
 */
export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
}: Readonly<ConfirmDialogProps>) {
  const titleId = useId();
  const messageId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [running, setRunning] = useState(false);

  // Mirror the React `open` prop onto the native dialog element.
  // showModal() and close() must be called on the live DOM node.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  async function confirm() {
    setRunning(true);
    try {
      await onConfirm();
    } finally {
      setRunning(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={messageId}
      // Escape fires cancel; suppress the native close and route through onCancel.
      onCancel={(event) => {
        event.preventDefault();
        if (!running) {
          onCancel();
        }
      }}
      // A click on the dialog itself (the backdrop, not the inner card) cancels.
      onClick={(event) => {
        if (event.target === event.currentTarget && !running) {
          onCancel();
        }
      }}
      className="m-auto w-full max-w-sm rounded-2xl border border-border bg-surface p-5 text-fg shadow-[0_16px_48px_-12px_rgba(0,0,0,0.45)] backdrop:bg-black/40"
    >
      <h2 id={titleId} className="text-base font-semibold">
        {title}
      </h2>
      <p id={messageId} className="mt-2 text-body leading-relaxed text-muted">
        {message}
      </p>
      <div className="mt-5 flex justify-end gap-2">
        <button
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
    </dialog>
  );
}
