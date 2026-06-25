import { IconBrandOpenSource, IconBrandGithub, IconInfoCircle } from '@tabler/icons-react';
import { GITHUB_REPO, GITHUB_URL } from '@/utils/constants';
import { openTab } from '@/utils/tabs';
import Section from './Section';

/**
 * Renders the open source section with repository link, license, and version details.
 *
 * @returns {JSX.Element} The rendered open source settings section.
 */
export default function OpenSource() {
  const appVersion = browser.runtime.getManifest().version;

  return (
    <Section title="Open source" icon={<IconBrandOpenSource className="h-4 w-4 text-primary" />}>
      <div className="flex items-center gap-5 border-t border-border px-5 py-3.5">
        <p className="flex-1 text-sm font-semibold">Repository</p>
        <button
          type="button"
          onClick={() => openTab(GITHUB_URL)}
          className="inline-flex cursor-pointer items-center gap-1.5 text-body font-medium text-primary"
        >
          <IconBrandGithub className="h-4 w-4" />
          {GITHUB_REPO}
        </button>
      </div>
      <div className="flex items-center gap-5 border-t border-border px-5 py-3.5">
        <p className="flex-1 text-sm font-semibold">License</p>
        <p className="text-body text-muted">MIT</p>
      </div>
      <div className="flex items-center gap-5 border-t border-border px-5 py-3.5">
        <p className="flex-1 text-sm font-semibold">Version</p>
        <p className="text-body text-muted">v{appVersion}</p>
      </div>
      <div className="border-t border-border px-5 py-4">
        <button
          type="button"
          onClick={() => openTab(`${GITHUB_URL}/issues`)}
          className="inline-flex h-9.5 cursor-pointer items-center gap-1.5 rounded-[10px] border border-border bg-elevated px-4 text-body font-semibold transition-colors hover:bg-border focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          <IconInfoCircle className="h-4 w-4" />
          Report an issue
        </button>
      </div>
    </Section>
  );
}
