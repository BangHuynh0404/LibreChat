import { useState } from 'react';
import { Pencil, Trash2, Workflow } from 'lucide-react';
import { Button } from '@librechat/client';
import type { ActionItem } from '../items/types';
import { useLocalize } from '~/hooks';
import ActionEditorPopout from '../popouts/ActionEditorPopout';

interface Props {
  item: ActionItem;
  agentId: string;
  onRemove: () => void;
}

export default function ActionDetail({ item, agentId, onRemove }: Props) {
  const localize = useLocalize();
  const [editorOpen, setEditorOpen] = useState(false);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2 rounded-xl border border-border-light bg-surface-secondary px-3 py-2.5">
        <Workflow className="size-4 text-text-tertiary" aria-hidden="true" />
        <span className="text-sm text-text-primary">
          {localize(
            item.endpointCount === 1
              ? 'com_ui_tools_endpoint_count_one'
              : 'com_ui_tools_endpoint_count',
            { count: item.endpointCount },
          )}
        </span>
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-border-light pt-4">
        <Button variant="outline" size="sm" onClick={() => setEditorOpen(true)}>
          <Pencil className="size-4" aria-hidden="true" />
          {localize('com_ui_edit')}
        </Button>
        <Button variant="destructive" size="sm" onClick={onRemove}>
          <Trash2 className="size-4" aria-hidden="true" />
          {localize('com_ui_tools_remove')}
        </Button>
      </div>
      <ActionEditorPopout open={editorOpen} onOpenChange={setEditorOpen} agentId={agentId} />
    </div>
  );
}
