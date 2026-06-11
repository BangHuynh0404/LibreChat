import { CircleHelpIcon, HoverCardTrigger } from '@librechat/client';
import type { ReactNode } from 'react';
import { useLocalize } from '~/hooks';

export const sectionLabelClass =
  'text-[11px] font-medium uppercase tracking-wide text-text-secondary';

/** Prominent heading for a top-level settings group (Essentials, Orchestration). */
export const groupHeadingClass = 'text-sm font-semibold text-text-primary';

/** Small count chip, e.g. "2 / 10". */
export function CountPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-4 items-center justify-center whitespace-nowrap rounded-full bg-surface-tertiary px-1.5 text-[10px] font-medium tabular-nums text-text-secondary">
      {children}
    </span>
  );
}

/** "Beta" accent pill. */
export function BetaPill() {
  const localize = useLocalize();
  return (
    <span className="rounded-full border border-purple-600/40 bg-purple-500/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-purple-700 dark:text-purple-400">
      {localize('com_ui_beta')}
    </span>
  );
}

/**
 * Focusable help trigger for an info HoverCard. Must be rendered inside a
 * `HoverCard` so the popover opens on hover or keyboard focus.
 */
export function InfoTrigger() {
  const localize = useLocalize();
  return (
    <HoverCardTrigger asChild>
      <button
        type="button"
        aria-label={localize('com_ui_more_info')}
        className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded text-text-tertiary transition-colors hover:text-text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring-primary"
      >
        <CircleHelpIcon className="h-3.5 w-3.5" aria-hidden={true} />
      </button>
    </HoverCardTrigger>
  );
}
