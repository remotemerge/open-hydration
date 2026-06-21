export default function SaveBar() {
  return (
    <div className="sticky bottom-4 flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-3.5 shadow-[0_-2px_24px_-8px_rgba(0,0,0,0.4)]">
      <p className="flex-1 text-[13px] text-muted">Changes apply instantly and save locally.</p>
      <button
        type="button"
        className="h-10 rounded-[11px] border border-border bg-elevated px-4.5 text-[13.5px] font-semibold transition-colors hover:bg-border focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      >
        Reset to defaults
      </button>
      <button
        type="button"
        className="h-10 rounded-[11px] bg-primary px-5.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      >
        Save changes
      </button>
    </div>
  );
}
