import { Trash2 } from 'lucide-react';
import { Button } from '@librechat/client';
import type { SkillItem } from '../items/types';
import { useLocalize } from '~/hooks';

interface Props {
  item: SkillItem;
  onRemove: () => void;
}

export default function SkillDetail({ item, onRemove }: Props) {
  const localize = useLocalize();
  return (
    <div className="flex flex-col gap-5">
      {item.description && (
        <p className="text-sm leading-relaxed text-text-secondary">{item.description}</p>
      )}
      <div className="flex items-center justify-end gap-2 border-t border-border-light pt-4">
        <Button variant="destructive" size="sm" onClick={onRemove}>
          <Trash2 className="size-4" aria-hidden="true" />
          {localize('com_ui_tools_remove')}
        </Button>
      </div>
    </div>
  );
}
