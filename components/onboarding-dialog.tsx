"use client";

import { useRouter } from "next/navigation";
import { Modal } from "@/components/modal";
import { buttonVariants } from "@/components/ui/button";
import { useHydrated } from "@/hooks/use-hydrated";
import { useAppState, useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function OnboardingDialog() {
  const hydrated = useHydrated();
  const state = useAppState();
  const store = useStore();
  const router = useRouter();
  const open = hydrated && !state.onboardingSeen;

  return (
    <Modal
      open={open}
      title="Three steps, then Grok can work"
      description="This is a local first-run of Epic OS. Nothing is signed in as a shared test account. Your work stays in this browser until you publish."
      onClose={() => store.markOnboardingSeen()}
    >
      <ol className="space-y-3 text-sm leading-6">
        <li>
          <span className="font-medium text-primary">1. Add a model.</span>{" "}
          Start with Workers AI (local demo) if you do not have an xAI key.
        </li>
        <li>
          <span className="font-medium text-primary">2. Create a workspace.</span>{" "}
          Docs, slides, or a sheet — a private gadget, not a template dump.
        </li>
        <li>
          <span className="font-medium text-primary">3. Talk to Grok.</span>{" "}
          Ask for a brief, a deck, or an edit. Connect GitHub or X only when you
          need them.
        </li>
      </ol>
      <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          className={cn(buttonVariants({ variant: "outline" }))}
          onClick={() => store.markOnboardingSeen()}
        >
          I will look around
        </button>
        <button
          type="button"
          className={cn(buttonVariants())}
          onClick={() => {
            store.markOnboardingSeen();
            router.push("/providers");
          }}
        >
          Add an AI provider
        </button>
      </div>
    </Modal>
  );
}
