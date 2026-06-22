import { IconBrandOpenSource, IconBrandGithub, IconInfoCircle } from '@tabler/icons-react';
import Section from './Section';

const GITHUB_REPO = 'remotemerge/open-hydration';
const GITHUB_URL = `https://github.com/${GITHUB_REPO}`;
const appVersion = browser.runtime.getManifest().version;

function openTab(url: string) {
  browser.tabs.create({ url });
}

export default function OpenSource() {
  return (
    <Section title="Open source" icon={<IconBrandOpenSource className="h-4 w-4 text-primary" />}>
      <div className="flex items-center gap-5 border-t border-border px-5 py-3.5">
        <p className="flex-1 text-sm font-semibold">Repository</p>
        <button
          type="button"
          onClick={() => openTab(GITHUB_URL)}
          className="inline-flex cursor-pointer items-center gap-1.5 text-[13px] font-medium text-primary"
        >
          <IconBrandGithub className="h-3.75 w-3.75" />
          {GITHUB_REPO}
        </button>
      </div>
      <div className="flex items-center gap-5 border-t border-border px-5 py-3.5">
        <p className="flex-1 text-sm font-semibold">License</p>
        <p className="text-[13px] text-muted">MIT</p>
      </div>
      <div className="flex items-center gap-5 border-t border-border px-5 py-3.5">
        <p className="flex-1 text-sm font-semibold">Version</p>
        <p className="text-[13px] text-muted">v{appVersion}</p>
      </div>
      <div className="border-t border-border px-5 py-4">
        <button
          type="button"
          onClick={() => openTab(`${GITHUB_URL}/issues`)}
          className="inline-flex h-9.5 cursor-pointer items-center gap-1.5 rounded-[10px] border border-border bg-elevated px-4 text-[13px] font-semibold transition-colors hover:bg-border focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          <IconInfoCircle className="h-3.75 w-3.75" />
          Report an issue
        </button>
      </div>
    </Section>
  );
}
