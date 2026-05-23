import { useState } from 'react';
import { KeyRound, Trash2 } from 'lucide-react';
import { Button } from '@librechat/client';
import type { ToolItem } from '../items/types';
import { useLocalize } from '~/hooks';
import PluginAuthPopout from '../popouts/PluginAuthPopout';

interface Props {
  item: ToolItem;
  onRemove: () => void;
}

export default function ToolDetail({ item, onRemove }: Props) {
  const localize = useLocalize();
  const [authOpen, setAuthOpen] = useState(false);
  const needsAuth =
    Array.isArray(item.plugin.authConfig) &&
    item.plugin.authConfig.length > 0 &&
    item.plugin.authenticated !== true;
  return (
    <div className="flex flex-col gap-5">
      {item.description && (
        <p className="text-sm leading-relaxed text-text-secondary">{item.description}</p>
      )}
      <div className="flex items-center justify-between gap-2 border-t border-border-light pt-4">
        <div>
          {needsAuth && (
            <Button variant="outline" size="sm" onClick={() => setAuthOpen(true)}>
              <KeyRound className="size-4" aria-hidden="true" />
              {localize('com_ui_configure')}
            </Button>
          )}
        </div>
        <Button variant="destructive" size="sm" onClick={onRemove}>
          <Trash2 className="size-4" aria-hidden="true" />
          {localize('com_ui_tools_remove')}
        </Button>
      </div>
      <PluginAuthPopout
        open={authOpen}
        onOpenChange={setAuthOpen}
        plugin={item.plugin}
        onSubmit={() => setAuthOpen(false)}
      />
    </div>
  );
}
