import Section from './Section';
import { version } from '~/package.json';

const GITHUB_REPO = 'remotemerge/open-hydration';
const GITHUB_URL = `https://github.com/${GITHUB_REPO}`;

function openTab(url: string) {
  browser.tabs.create({ url });
}

export default function OpenSource() {
  return (
    <Section
      title="Open source"
      icon={
        <svg
          className="h-4 w-4 stroke-primary"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m8 9-3 3 3 3" />
          <path d="m16 9 3 3-3 3" />
          <path d="M13 6 11 18" />
        </svg>
      }
    >
      <div className="flex items-center gap-5 border-t border-border px-5 py-3.5">
        <p className="flex-1 text-sm font-semibold">Repository</p>
        <button
          type="button"
          onClick={() => openTab(GITHUB_URL)}
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-primary hover:underline"
        >
          <svg className="h-3.75 w-3.75" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
          </svg>
          {GITHUB_REPO}
        </button>
      </div>
      <div className="flex items-center gap-5 border-t border-border px-5 py-3.5">
        <p className="flex-1 text-sm font-semibold">License</p>
        <p className="text-[13px] text-muted">MIT</p>
      </div>
      <div className="flex items-center gap-5 border-t border-border px-5 py-3.5">
        <p className="flex-1 text-sm font-semibold">Version</p>
        <p className="text-[13px] text-muted">v{version}</p>
      </div>
      <div className="border-t border-border px-5 py-4">
        <button
          type="button"
          onClick={() => openTab(`${GITHUB_URL}/issues`)}
          className="inline-flex h-9.5 items-center gap-1.5 rounded-[10px] border border-border bg-elevated px-4 text-[13px] font-semibold transition-colors hover:bg-border focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          <svg
            className="h-3.75 w-3.75"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5M12 16.5v.01" />
          </svg>
          Report an issue
        </button>
      </div>
    </Section>
  );
}
