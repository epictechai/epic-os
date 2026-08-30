import { EmptyState } from "@/components/empty-state";
import { SCHEDULE_EXAMPLES } from "@/lib/catalog";

export default function SchedulesPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Schedules</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Recurring work Grok should do without you opening chat. Examples only
        in this first-run — they need a provider, and some need an integration.
      </p>
      <div className="mt-8">
        <EmptyState
          title="No schedules running"
          what="A schedule is a prompt that runs on a clock: briefs, roundups, monitors."
          why="This is how the OS works while you are away. Chat is for now."
          next="Add a provider first. Then come back and pick a pattern."
          action={{ href: "/providers", label: "Add an AI provider" }}
        />
      </div>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {SCHEDULE_EXAMPLES.map((item) => (
          <li
            key={item.title}
            className="rounded-xl border border-border bg-card px-4 py-4"
          >
            <h2 className="font-medium">{item.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{item.when}</p>
            <p className="mt-2 text-xs text-muted-foreground">{item.needs}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
