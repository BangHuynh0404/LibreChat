import { useState } from 'react';
import { X } from 'lucide-react';
import type { AgentItem } from './items/types';
import type { TranslationKeys } from '~/hooks/useLocalize';
import { getIconForItem } from './items/icons';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';

interface Props {
  item: AgentItem;
  onClick: (item: AgentItem) => void;
  onRemove: (item: AgentItem) => void;
}

const KIND_LABEL_KEYS: Record<AgentItem['kind'], TranslationKeys> = {
  builtin: 'com_ui_tools_kind_official',
  tool: 'com_ui_tools_kind_tools',
  skill: 'com_ui_tools_kind_skills',
  mcp: 'com_ui_tools_kind_mcp',
  action: 'com_ui_tools_kind_actions',
};

function getSuffix(item: AgentItem): string | null {
  if (item.kind === 'mcp' && item.toolCount > 0) return `· ${item.toolCount}`;
  if (item.kind === 'action' && item.endpointCount > 0) return `· ${item.endpointCount}`;
  return null;
}

function RowIcon({ item }: { item: AgentItem }) {
  const { Icon, colorClass, iconUrl } = getIconForItem(item);
  const [imgError, setImgError] = useState(false);

  if (iconUrl && !imgError) {
    return (
      <span
        className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-surface-secondary"
        aria-hidden="true"
      >
        <img
          src={iconUrl}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      </span>
    );
  }

  return (
    <span
      className={cn('flex size-8 shrink-0 items-center justify-center rounded-lg', colorClass)}
      aria-hidden="true"
    >
      <Icon className="size-4" strokeWidth={1.75} />
    </span>
  );
}

export default function ToolRow({ item, onClick, onRemove }: Props) {
  const localize = useLocalize();
  const suffix = getSuffix(item);
  const displayName = item.kind === 'builtin' ? localize(item.name as TranslationKeys) : item.name;
  const kindLabel = localize(KIND_LABEL_KEYS[item.kind]);

  return (
    <div
      className={cn(
        'group relative flex w-full items-center gap-2.5 rounded-lg border border-border-light bg-surface-primary p-2 transition-colors',
        'hover:border-border-medium hover:bg-surface-secondary',
      )}
    >
      <button
        type="button"
        onClick={() => onClick(item)}
        className="flex min-w-0 flex-1 items-center gap-2.5 text-left focus:outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ring-primary"
      >
        <RowIcon item={item} />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="flex items-center gap-1 truncate text-sm font-medium text-text-primary">
            <span className="truncate">{displayName}</span>
            {suffix && <span className="text-text-tertiary">{suffix}</span>}
          </span>
          <span className="truncate text-[11px] uppercase tracking-wide text-text-tertiary">
            {kindLabel}
          </span>
        </span>
      </button>
      {item.status === 'needs_setup' && (
        <span
          aria-label={localize('com_ui_tools_needs_setup')}
          className="size-1.5 shrink-0 rounded-full bg-red-500"
        />
      )}
      <button
        type="button"
        onClick={() => onRemove(item)}
        aria-label={localize('com_ui_tools_remove')}
        className={cn(
          'flex size-7 shrink-0 items-center justify-center rounded-md text-text-tertiary opacity-0',
          'transition-opacity duration-150 hover:bg-surface-tertiary hover:text-text-primary',
          'group-focus-within:opacity-100 group-hover:opacity-100',
          'focus:outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ring-primary',
        )}
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
