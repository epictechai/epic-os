"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BookOpen,
  Bot,
  Boxes,
  CalendarClock,
  Home,
  Layers3,
  Menu,
  Plug,
  Settings,
  Sparkles,
  UserRound,
} from "lucide-react";
import { OnboardingDialog } from "@/components/onboarding-dialog";
import { GettingStartedChecklist } from "@/components/checklist";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppState, useDefaultProvider } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/workspaces", label: "Workspaces", icon: Layers3 },
  { href: "/outputs", label: "Outputs", icon: Boxes },
  { href: "/explore", label: "Explore", icon: Sparkles },
  { href: "/knowledge", label: "Knowledge", icon: BookOpen },
  { href: "/schedules", label: "Schedules", icon: CalendarClock },
  { href: "/integrations", label: "Integrations", icon: Plug },
  { href: "/providers", label: "Providers", icon: Bot },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const state = useAppState();
  const provider = useDefaultProvider();
  const [open, setOpen] = useState(false);
  const recent = state.workspaces.slice(0, 5);

  const nav = (
    <nav className="flex min-h-0 flex-1 flex-col" aria-label="Main">
      <div className="px-3 pt-4">
        <Link href="/" className="flex items-center gap-2 px-1">
          <span className="flex size-8 items-center justify-center rounded-lg border border-cyan-400/60 bg-[#0a0a0a] text-cyan-300 shadow-[0_0_16px_#00f3ff33]">
            <span className="size-3 rounded-sm bg-cyan-300" />
          </span>
          <span>
            <span className="block text-sm font-semibold tracking-tight">
              Epic OS
            </span>
            <span className="block text-[11px] text-muted-foreground">
              Local first-run
            </span>
          </span>
        </Link>
      </div>
      <ul className="mt-4 space-y-0.5 px-2">
        {NAV.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm",
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 px-3">
        <p className="px-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          Recent workspaces
        </p>
        {recent.length === 0 ? (
          <p className="mt-2 px-1 text-xs text-muted-foreground">
            None yet. Create one from Workspaces.
          </p>
        ) : (
          <ul className="mt-1 space-y-0.5">
            {recent.map((workspace) => (
              <li key={workspace.id}>
                <Link
                  href={`/workspaces/${workspace.id}`}
                  onClick={() => setOpen(false)}
                  className="block truncate rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  {workspace.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/workspaces"
                className="block px-2 py-1 text-xs text-primary hover:underline"
                onClick={() => setOpen(false)}
              >
                Show all
              </Link>
            </li>
          </ul>
        )}
      </div>
      <div className="mt-auto space-y-3 p-3">
        <GettingStartedChecklist />
        <Separator />
        <div className="flex items-center justify-between gap-2">
          <ToolbarLink href="/integrations" label="Integrations">
            <Plug />
          </ToolbarLink>
          <ToolbarLink href="/" label="Home chat">
            <Home />
          </ToolbarLink>
          <ToolbarLink href="/settings" label="Account">
            <UserRound />
          </ToolbarLink>
          <ToolbarLink href="/settings" label="Settings">
            <Settings />
          </ToolbarLink>
        </div>
      </div>
    </nav>
  );

  return (
    <div className="flex min-h-dvh bg-background">
      <OnboardingDialog />
      <aside className="hidden w-64 shrink-0 border-r border-border bg-sidebar md:flex md:flex-col">
        {nav}
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-background/90 px-3 py-2.5 backdrop-blur md:px-6">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open navigation"
                />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              {nav}
            </SheetContent>
          </Sheet>
          <p className="min-w-0 flex-1 text-sm text-muted-foreground">
            Build a workspace. Connect a tool. Ship a gadget.
          </p>
          <Link
            href="/providers"
            className="shrink-0 rounded-full border border-border px-2.5 py-1 text-xs"
          >
            {provider ? provider.displayName : "No agent — add a provider"}
          </Link>
        </header>
        <main id="main-content" className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

function ToolbarLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Link
            href={href}
            aria-label={label}
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
          />
        }
      >
        {children}
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
