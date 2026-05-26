import { memo } from 'react';
import {
  HoverCard,
  CircleHelpIcon,
  HoverCardPortal,
  HoverCardContent,
  HoverCardTrigger,
} from '@librechat/client';
import { ESide } from '~/common';

function SectionHeader({ title, info }: { title: string; info: string }) {
  return (
    <div className="mb-3">
      <HoverCard openDelay={50}>
        <div className="flex items-center gap-1.5">
          <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
          <HoverCardTrigger asChild>
            <button type="button" className="inline-flex items-center" aria-label={info}>
              <CircleHelpIcon className="h-4 w-4 text-text-tertiary" />
            </button>
          </HoverCardTrigger>
          <HoverCardPortal>
            <HoverCardContent side={ESide.Top} className="w-80">
              <p className="text-sm text-text-secondary">{info}</p>
            </HoverCardContent>
          </HoverCardPortal>
        </div>
      </HoverCard>
      <div className="mt-2 h-px w-full bg-border-light" aria-hidden="true" />
    </div>
  );
}

export default memo(SectionHeader);
