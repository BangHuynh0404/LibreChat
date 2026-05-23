import { useState } from 'react';
import { Settings, Trash2, Wrench } from 'lucide-react';
import { Button } from '@librechat/client';
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
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2 rounded-xl border border-border-light bg-surface-secondary px-3 py-2.5">
        <Wrench className="size-4 text-text-tertiary" aria-hidden="true" />
        <span className="text-sm text-text-primary">
          {localize(item.toolCount === 1 ? 'com_ui_tools_count_one' : 'com_ui_tools_count', {
            count: item.toolCount,
          })}
        </span>
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-border-light pt-4">
        <div>
          {!isConfigured && (
            <Button variant="outline" size="sm" onClick={() => setVarsOpen(true)}>
              <Settings className="size-4" aria-hidden="true" />
              {localize('com_ui_configure')}
            </Button>
          )}
        </div>
        <Button variant="destructive" size="sm" onClick={onRemove}>
          <Trash2 className="size-4" aria-hidden="true" />
          {localize('com_ui_tools_remove')}
        </Button>
      </div>
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
