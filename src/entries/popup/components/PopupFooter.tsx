import { IconBrandGithub, IconBulb } from '@tabler/icons-react';
import { GITHUB_URL } from '@/utils/constants';

/**
 * Open a URL in a new browser tab
 */
function openTab(url: string) {
  browser.tabs.create({ url });
}

export default function PopupFooter() {
  return (
    <footer className="grid grid-cols-[1fr_auto_1fr] items-stretch border-t border-border text-caption font-medium text-muted">
      <button
        type="button"
        onClick={() => openTab(`${GITHUB_URL}/issues/new`)}
        className="inline-flex cursor-pointer items-center justify-center gap-1.5 py-3 transition-colors hover:text-primary"
      >
        <IconBulb className="h-3.5 w-3.5" />
        Feature Request
      </button>
      <span aria-hidden="true" className="w-px self-stretch bg-border" />
      <button
        type="button"
        onClick={() => openTab(GITHUB_URL)}
        className="inline-flex cursor-pointer items-center justify-center gap-1.5 py-3 transition-colors hover:text-primary"
      >
        <IconBrandGithub className="h-3.5 w-3.5" />
        Star on GitHub
      </button>
    </footer>
  );
}
