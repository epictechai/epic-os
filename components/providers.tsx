"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { StoreProvider } from "@/lib/store";
import { AppShell } from "@/components/app-shell";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <StoreProvider>
        <AppShell>{children}</AppShell>
      </StoreProvider>
    </TooltipProvider>
  );
}
