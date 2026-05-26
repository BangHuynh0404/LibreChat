import { Upload } from 'lucide-react';

export const dropzoneClassName =
  'group flex w-full flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-border-medium bg-surface-secondary px-4 py-6 text-sm font-medium text-text-secondary transition-colors hover:border-border-heavy hover:bg-surface-hover hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-primary disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-border-medium disabled:hover:bg-surface-secondary disabled:hover:text-text-secondary';

function DropzoneContent({ label, hint }: { label: string; hint?: string }) {
  return (
    <span className="pointer-events-none flex flex-col items-center justify-center gap-1.5 text-center">
      <Upload
        className="h-5 w-5 text-text-tertiary transition-colors group-hover:text-text-primary"
        strokeWidth={1.75}
        aria-hidden="true"
      />
      <span>{label}</span>
      {hint ? <span className="text-xs font-normal text-text-tertiary">{hint}</span> : null}
    </span>
  );
}

export default DropzoneContent;
