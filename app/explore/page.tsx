"use client";

import { useState } from "react";
import { CreateWorkspaceDialog } from "@/components/create-workspace-dialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { BLUEPRINTS } from "@/lib/catalog";

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [blueprintId, setBlueprintId] = useState<string | undefined>();
  const items = BLUEPRINTS.filter((item) =>
    `${item.title} ${item.description}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Explore</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Featured blueprints. Creating one makes a gadget in your workspace list.
      </p>
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search blueprints"
        className="mt-4 max-w-md"
        aria-label="Search blueprints"
      />
      <CreateWorkspaceDialog
        key={`${open}-${blueprintId ?? "any"}`}
        open={open}
        onOpenChange={setOpen}
        defaultBlueprintId={blueprintId}
      />
      {items.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">
          No blueprints match that search. Clear it or create a docs workspace.
        </p>
      ) : (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col rounded-xl border border-border bg-card p-4"
            >
              <div className="aspect-[16/9] rounded-lg bg-gradient-to-br from-cyan-500/20 to-fuchsia-600/20" />
              <h2 className="mt-3 font-medium">{item.title}</h2>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">
                {item.description}
              </p>
              <button
                type="button"
                className={cn(buttonVariants(), "mt-4")}
                onClick={() => {
                  setBlueprintId(item.id);
                  setOpen(true);
                }}
              >
                Create gadget
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
