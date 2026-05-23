import { useState } from 'react';
import type { McpItem } from '../items/types';
import { useLocalize } from '~/hooks';
import McpVarsPopout from '../popouts/McpVarsPopout';

interface Props {
  item: McpItem;
  onRemove: () => void;
}

export default function McpDetail({ item, onRemove }: Props) {
  const localize = useLocalize();
  const [varsOpen, setVarsOpen] = useState(false);
  const isConfigured = item.server.isConfigured === true;
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-base font-semibold text-text-primary">{item.name}</h3>
      <p className="text-sm text-text-secondary">{item.toolCount}</p>
      {!isConfigured && (
        <button
          type="button"
          onClick={() => setVarsOpen(true)}
          className="self-start rounded-lg border border-border-light px-3 py-1.5 text-sm text-text-primary transition-colors hover:bg-surface-secondary"
        >
          {localize('com_ui_configure')}
        </button>
      )}
      <button
        type="button"
        onClick={onRemove}
        className="self-start rounded-lg border border-red-500/40 px-3 py-1.5 text-sm text-red-500 transition-colors hover:bg-red-500/10"
      >
        {localize('com_ui_tools_remove')}
      </button>
      <McpVarsPopout
        open={varsOpen}
        onOpenChange={setVarsOpen}
        serverName={item.id}
        fields={{}}
        onSave={() => setVarsOpen(false)}
        onRevoke={() => setVarsOpen(false)}
      />
    </div>
  );
}
