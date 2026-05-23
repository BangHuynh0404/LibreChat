import { ListFilter, Star, User, Layers, Wrench, Server, Zap, Workflow, Plus } from 'lucide-react';
import type { ReactNode } from 'react';
import type { AgentItemKind, ItemFilter } from './items/types';
import { useLocalize, useCategories } from '~/hooks';
import { cn } from '~/utils';

type View = NonNullable<ItemFilter['view']>;
type Kind = AgentItemKind | 'all';

interface MarketplaceSidebarProps {
  activeView: View;
  activeKind: Kind;
  activeCategory: string | 'all';
  onSelectView: (view: View) => void;
  onSelectKind: (kind: Kind) => void;
  onSelectCategory: (category: string | 'all') => void;
  counts: Record<AgentItemKind, number>;
}

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  count?: number;
}

function SidebarItem({ icon, label, active, onClick, count }: SidebarItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors',
        active
          ? 'bg-surface-active text-text-primary'
          : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
      )}
    >
      <span className="flex size-4 shrink-0 items-center justify-center">{icon}</span>
      <span className="flex-1 truncate">{label}</span>
      {count !== undefined && count > 0 && (
        <span className="text-[10px] text-text-tertiary">{count}</span>
      )}
    </button>
  );
}

interface Category {
  value: string;
  label: string;
  icon?: ReactNode;
}

export default function MarketplaceSidebar({
  activeView,
  activeKind,
  activeCategory,
  onSelectView,
  onSelectKind,
  onSelectCategory,
  counts,
}: MarketplaceSidebarProps) {
  const localize = useLocalize();
  const { categories } = useCategories({ className: 'size-4', hasAccess: true });
  const typedCategories = (categories ?? []) as Category[];

  return (
    <aside className="flex w-56 shrink-0 flex-col gap-1 border-r border-border-light bg-surface-primary-alt p-3">
      <h2 className="px-2.5 pb-1.5 pt-1 text-base font-bold text-text-primary">
        {localize('com_ui_tools_marketplace')}
      </h2>
      <button
        type="button"
        className="mb-1 flex w-full items-center justify-center gap-2 rounded-lg border border-border-light bg-transparent px-2.5 py-1.5 text-center text-sm text-text-primary transition-colors hover:border-border-medium hover:bg-surface-hover"
      >
        <Plus className="size-4 shrink-0" aria-hidden="true" />
        <span className="truncate">{localize('com_ui_tools_create_new')}</span>
      </button>

      <SidebarItem
        icon={<Layers className="size-4" />}
        label={localize('com_ui_tools_view_marketplace')}
        active={activeView === 'marketplace'}
        onClick={() => onSelectView('marketplace')}
      />
      <SidebarItem
        icon={<Star className="size-4" />}
        label={localize('com_ui_tools_view_favorites')}
        active={activeView === 'favorites'}
        onClick={() => onSelectView('favorites')}
      />
      <SidebarItem
        icon={<User className="size-4" />}
        label={localize('com_ui_tools_view_made_by_you')}
        active={activeView === 'mine'}
        onClick={() => onSelectView('mine')}
      />

      <div className="my-2 h-px bg-border-light" />

      <SidebarItem
        icon={<ListFilter className="size-4" />}
        label={localize('com_ui_tools_kind_official')}
        active={activeKind === 'builtin'}
        onClick={() => onSelectKind('builtin')}
        count={counts.builtin}
      />
      <SidebarItem
        icon={<Wrench className="size-4" />}
        label={localize('com_ui_tools_kind_tools')}
        active={activeKind === 'tool'}
        onClick={() => onSelectKind('tool')}
        count={counts.tool}
      />
      <SidebarItem
        icon={<Zap className="size-4" />}
        label={localize('com_ui_tools_kind_skills')}
        active={activeKind === 'skill'}
        onClick={() => onSelectKind('skill')}
        count={counts.skill}
      />
      <SidebarItem
        icon={<Server className="size-4" />}
        label={localize('com_ui_tools_kind_mcp')}
        active={activeKind === 'mcp'}
        onClick={() => onSelectKind('mcp')}
        count={counts.mcp}
      />
      <SidebarItem
        icon={<Workflow className="size-4" />}
        label={localize('com_ui_tools_kind_actions')}
        active={activeKind === 'action'}
        onClick={() => onSelectKind('action')}
        count={counts.action}
      />

      <div className="my-2 h-px bg-border-light" />

      {typedCategories.map((cat) => {
        if (!cat.value) return null;
        return (
          <SidebarItem
            key={cat.value}
            icon={cat.icon ?? <ListFilter className="size-4" />}
            label={cat.label}
            active={activeCategory === cat.value}
            onClick={() => onSelectCategory(cat.value)}
          />
        );
      })}
    </aside>
  );
}
