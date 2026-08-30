"use client";

import { useState } from "react";
import Link from "next/link";
import { CreateWorkspaceDialog } from "@/components/create-workspace-dialog";
import { EmptyState } from "@/components/empty-state";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BLUEPRINTS } from "@/lib/catalog";
import { kindLabel, useAppState } from "@/lib/store";

export default function WorkspacesPage() {
  const state = useAppState();
  const [open, setOpen] = useState(false);
  const [blueprintId, setBlueprintId] = useState<string | undefined>();

  function openCreate(id?: string) {
    setBlueprintId(id);
    setOpen(true);
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Workspaces</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            A workspace is a gadget — your private copy of a doc, deck, sheet,
            or app. Blueprints are the starting code.
          </p>
        </div>
        <button
          type="button"
          className={cn(buttonVariants())}
          onClick={() => openCreate()}
        >
          Create workspace
        </button>
      </div>

      <CreateWorkspaceDialog
        key={`${open}-${blueprintId ?? "any"}`}
        open={open}
        onOpenChange={setOpen}
        defaultBlueprintId={blueprintId}
      />

      {state.workspaces.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No workspaces yet"
            what="A workspace is a private gadget you own. Not a file on someone else's server."
            why="This is where Grok writes documents, decks, and small apps you can keep."
            next="Choose a blueprint below, or use Create workspace. You will land in the editor."
            action={{ label: "Create workspace", onClick: () => openCreate() }}
          />
        </div>
      ) : (
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {state.workspaces.map((workspace) => (
            <li key={workspace.id}>
              <Link
                href={`/workspaces/${workspace.id}`}
                className="block rounded-xl border border-border bg-card px-4 py-4 hover:border-primary/50"
              >
                <div className="text-xs text-muted-foreground">
                  {kindLabel(workspace.kind)}
                </div>
                <div className="mt-1 font-medium">{workspace.title}</div>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {workspace.body}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <section className="mt-10">
        <h2 className="text-sm font-semibold">Start from a blueprint</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {BLUEPRINTS.map((blueprint) => (
            <div
              key={blueprint.id}
              className="flex flex-col rounded-xl border border-border bg-card p-4"
            >
              <div className="text-sm font-medium">{blueprint.title}</div>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">
                {blueprint.description}
              </p>
              <button
                type="button"
                className={cn(buttonVariants({ variant: "outline" }), "mt-4")}
                onClick={() => openCreate(blueprint.id)}
              >
                Create gadget
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
