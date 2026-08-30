import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Action = {
  href?: string;
  label: string;
  onClick?: () => void;
};

export function EmptyState({
  title,
  what,
  why,
  next,
  action,
  secondary,
}: {
  title: string;
  what: string;
  why: string;
  next: string;
  action?: Action;
  secondary?: Action;
}) {
  return (
    <div className="rounded-xl border border-border bg-card px-5 py-8 sm:px-8">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <dl className="mt-4 space-y-3 text-sm leading-6">
        <div>
          <dt className="text-muted-foreground">What this is</dt>
          <dd>{what}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Why you need it</dt>
          <dd>{why}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">What to do next</dt>
          <dd>{next}</dd>
        </div>
      </dl>
      {(action || secondary) && (
        <div className="mt-6 flex flex-wrap gap-2">
          {action ? <ActionButton action={action} /> : null}
          {secondary ? (
            <ActionButton action={secondary} variant="outline" />
          ) : null}
        </div>
      )}
    </div>
  );
}

function ActionButton({
  action,
  variant = "default",
}: {
  action: Action;
  variant?: "default" | "outline";
}) {
  if (action.href) {
    return (
      <Link
        href={action.href}
        className={cn(buttonVariants({ variant }))}
      >
        {action.label}
      </Link>
    );
  }
  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant }))}
      onClick={action.onClick}
    >
      {action.label}
    </button>
  );
}
