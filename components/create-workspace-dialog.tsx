"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/modal";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BLUEPRINTS } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function CreateWorkspaceDialog({
  open,
  onOpenChange,
  defaultBlueprintId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultBlueprintId?: string;
}) {
  const router = useRouter();
  const store = useStore();
  const initial = defaultBlueprintId ?? BLUEPRINTS[0].id;
  const [blueprintId, setBlueprintId] = useState(initial);
  const [title, setTitle] = useState("");
  const selected = blueprintId || initial;

  function create() {
    const workspace = store.createWorkspace(selected, title);
    onOpenChange(false);
    router.push(`/workspaces/${workspace.id}`);
  }

  return (
    <Modal
      open={open}
      title="Create a workspace"
      description="Pick a starting gadget. You get a private copy — not a shared SaaS file."
      onClose={() => onOpenChange(false)}
    >
      <div className="grid gap-2">
        {BLUEPRINTS.map((blueprint) => {
          const active = blueprint.id === selected;
          return (
            <button
              key={blueprint.id}
              type="button"
              onClick={() => setBlueprintId(blueprint.id)}
              className={`rounded-lg border px-3 py-3 text-left transition-colors ${
                active
                  ? "border-primary bg-primary/10"
                  : "border-border hover:bg-accent"
              }`}
            >
              <div className="text-sm font-medium">{blueprint.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">
                {blueprint.description}
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-4 grid gap-2">
        <Label htmlFor="workspace-title">Name (optional)</Label>
        <Input
          id="workspace-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Q3 customer review"
        />
      </div>
      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          className={cn(buttonVariants({ variant: "outline" }))}
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </button>
        <button type="button" className={cn(buttonVariants())} onClick={create}>
          Create gadget
        </button>
      </div>
    </Modal>
  );
}
