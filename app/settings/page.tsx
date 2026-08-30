"use client";

import { useRouter } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";

export default function SettingsPage() {
  const store = useStore();
  const router = useRouter();

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Account</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        This first-run is a local demo. There is no shared testuser and no
        password to change.
      </p>
      <dl className="mt-8 space-y-4 rounded-xl border border-border bg-card px-4 py-4 text-sm">
        <div>
          <dt className="text-muted-foreground">Display name</dt>
          <dd className="mt-1 font-medium">Local visitor</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">User ID</dt>
          <dd className="mt-1 font-mono text-xs">local-demo</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Access</dt>
          <dd className="mt-1">
            Full first-run. Admin of production os.epictechai.app is not
            available from here.
          </dd>
        </div>
      </dl>
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          className={cn(buttonVariants({ variant: "outline" }))}
          onClick={() => {
            store.resetDemo();
            router.push("/");
          }}
        >
          Reset this browser
        </button>
      </div>
    </div>
  );
}
