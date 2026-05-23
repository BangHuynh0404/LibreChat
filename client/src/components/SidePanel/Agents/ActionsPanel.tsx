import { ChevronLeft } from 'lucide-react';
import { useAgentPanelContext } from '~/Providers/AgentPanelContext';
import ActionEditor from './Tools/ActionEditor';
import { Panel } from '~/common';
import { useLocalize } from '~/hooks';

export default function ActionsPanel() {
  const localize = useLocalize();
  const { setActivePanel, setAction, agent_id, action } = useAgentPanelContext();

  const handleClose = () => {
    setActivePanel(Panel.builder);
    setAction(undefined);
  };

  return (
    <div className="flex h-full flex-col px-2 pt-1">
      <header className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
        <button
          type="button"
          onClick={handleClose}
          aria-label={localize('com_ui_back_to_builder')}
          className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-border-light text-text-secondary transition-colors hover:bg-surface-secondary hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring-primary"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
        </button>
        <h2 className="text-center text-base font-semibold text-text-primary">
          {action
            ? localize('com_assistants_edit_actions')
            : localize('com_assistants_add_actions')}
        </h2>
        <span aria-hidden="true" className="h-10 w-10" />
      </header>
      <ActionEditor agentId={agent_id ?? ''} onClose={handleClose} />
    </div>
  );
}
