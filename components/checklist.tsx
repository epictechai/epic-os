"use client";

import Link from "next/link";
import { Check, X } from "lucide-react";
import { useAppState, useStore } from "@/lib/store";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

const STEPS = [
  {
    key: "addProvider" as const,
    label: "Add an AI provider",
    href: "/providers",
  },
  {
    key: "createWorkspace" as const,
    label: "Create your first workspace",
    href: "/workspaces",
  },
  {
    key: "chatWithGrok" as const,
    label: "Have a conversation with Grok",
    href: "/",
  },
  {
    key: "connectIntegration" as const,
    label: "Connect an integration",
    href: "/integrations",
  },
];

export function GettingStartedChecklist({ className = "" }: { className?: string }) {
  const state = useAppState();
  const store = useStore();
  if (state.checklist.dismissed) return null;

  const done = STEPS.filter((step) => state.checklist[step.key]).length;
  const complete = done === STEPS.length;

  return (
    <aside className={`rounded-xl border border-border bg-card p-4 ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold tracking-tight">Getting started</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            {complete
              ? "First-run is done. You can hide this."
              : `${done} of ${STEPS.length} — a model, a workspace, a chat.`}
          </p>
        </div>
        <button
          type="button"
          className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
          aria-label="Dismiss getting started"
          onClick={() => store.dismissChecklist()}
        >
          <X />
        </button>
      </div>
      <Progress value={(done / STEPS.length) * 100} className="mt-3" />
      <ol className="mt-3 space-y-1.5">
        {STEPS.map((step, index) => {
          const checked = state.checklist[step.key];
          return (
            <li key={step.key}>
              <Link
                href={step.href}
                className="flex items-center gap-2 rounded-md px-1 py-1.5 text-sm hover:bg-accent"
              >
                <span
                  className={`flex size-5 shrink-0 items-center justify-center rounded-full border text-[11px] ${
                    checked
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {checked ? <Check className="size-3" /> : index + 1}
                </span>
                <span className={checked ? "text-muted-foreground line-through" : ""}>
                  {step.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
