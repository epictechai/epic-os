"use client";

import { EmptyState } from "@/components/empty-state";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { INTEGRATION_CATALOG } from "@/lib/catalog";
import { useAppState, useStore } from "@/lib/store";

export default function IntegrationsPage() {
  const state = useAppState();
  const store = useStore();
  const connected = state.integrations.filter((item) => item.connected);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Integrations</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        These are Gatekeepers in Cloudflare OS: a connector that scopes what
        Grok can touch. Nothing is ambient. You introduce a resource when you
        need it.
      </p>
      {connected.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No integrations connected"
            what="An integration is a gated connection to GitHub, Google, email, X, or similar."
            why="Without one, Grok can write gadgets but cannot act on a real repo or inbox."
            next="Connect GitHub or X first. You can disconnect anytime."
          />
        </div>
      ) : null}
      <ul className="mt-8 grid gap-3">
        {INTEGRATION_CATALOG.map((item) => {
          const status = state.integrations.find((entry) => entry.id === item.id);
          const on = Boolean(status?.connected);
          return (
            <li
              key={item.id}
              className="flex flex-col gap-3 rounded-xl border border-border bg-card px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-medium">{item.name}</h2>
                  {on ? <Badge>Connected</Badge> : null}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{item.summary}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.why}</p>
              </div>
              <button
                type="button"
                className={cn(buttonVariants({ variant: on ? "outline" : "default" }))}
                onClick={() => store.toggleIntegration(item.id)}
              >
                {on ? "Disconnect" : "Connect"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
