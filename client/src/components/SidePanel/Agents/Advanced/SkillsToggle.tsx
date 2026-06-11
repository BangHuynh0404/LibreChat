import { Switch, HoverCard, HoverCardPortal, HoverCardContent } from '@librechat/client';
import { useFormContext, Controller } from 'react-hook-form';
import type { AgentForm } from '~/common';
import { InfoTrigger } from './ui';
import { useLocalize } from '~/hooks';
import { ESide } from '~/common';

const id = 'skills_enabled_killswitch';

export default function SkillsToggle() {
  const localize = useLocalize();
  const { control } = useFormContext<AgentForm>();

  return (
    <HoverCard openDelay={50}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <label htmlFor={id} className="text-xs font-medium text-text-secondary">
            {localize('com_ui_tools_skills_enabled_kill_switch')}
          </label>
          <InfoTrigger />
        </div>
        <Controller
          name="skills_enabled"
          control={control}
          render={({ field }) => (
            <Switch
              id={id}
              checked={field.value === true}
              onCheckedChange={(v: boolean) => field.onChange(Boolean(v))}
              aria-label={localize('com_ui_tools_skills_enabled_kill_switch')}
            />
          )}
        />
      </div>
      <HoverCardPortal>
        <HoverCardContent side={ESide.Top} className="w-80">
          <p className="text-sm text-text-secondary">
            {localize('com_ui_tools_skills_enabled_kill_switch_hint')}
          </p>
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCard>
  );
}
