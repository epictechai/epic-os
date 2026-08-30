"use client";

import Link from "next/link";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { EmptyState } from "@/components/empty-state";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { INTEGRATION_CATALOG } from "@/lib/catalog";
import { kindLabel, useAppState, useStore } from "@/lib/store";

export default function WorkspaceEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const state = useAppState();
  const store = useStore();
  const router = useRouter();
  const workspace = state.workspaces.find((item) => item.id === id);
  const [fileName, setFileName] = useState("README.md");

  if (!workspace) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12">
        <EmptyState
          title="Workspace not found"
          what="This gadget is not in this browser."
          why="Workspaces are stored locally for this first-run demo."
          next="Go back to Workspaces and create one."
          action={{ href: "/workspaces", label: "Workspaces" }}
        />
      </div>
    );
  }

  const file =
    workspace.files.find((item) => item.name === fileName) ?? workspace.files[0];

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6">
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link href="/workspaces" className="hover:text-foreground">
          Workspaces
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-foreground">{workspace.title}</span>
        <span className="rounded-full border border-border px-2 py-0.5 text-xs">
          {kindLabel(workspace.kind)}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Input
          value={workspace.title}
          onChange={(event) =>
            store.updateWorkspace(workspace.id, { title: event.target.value })
          }
          className="max-w-md text-base font-medium"
          aria-label="Workspace title"
        />
        <button
          type="button"
          className={cn(buttonVariants({ variant: "outline" }))}
          onClick={() => {
            store.deleteWorkspace(workspace.id);
            router.push("/workspaces");
          }}
        >
          Delete
        </button>
      </div>

      <Tabs defaultValue="doc" className="mt-6">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="doc">Doc</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
        </TabsList>
        <TabsContent value="doc" className="mt-3">
          <Textarea
            value={workspace.body}
            onChange={(event) =>
              store.updateWorkspace(workspace.id, { body: event.target.value })
            }
            className="min-h-[420px] font-mono text-sm leading-6"
            aria-label="Document body"
          />
        </TabsContent>
        <TabsContent value="code" className="mt-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <ul className="w-full shrink-0 space-y-1 sm:w-44">
              {workspace.files.map((item) => (
                <li key={item.name}>
                  <button
                    type="button"
                    onClick={() => setFileName(item.name)}
                    className={`w-full rounded-md px-2 py-2 text-left text-sm ${
                      item.name === file.name
                        ? "bg-primary/15 text-primary"
                        : "hover:bg-accent"
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
            <Textarea
              value={file?.content ?? ""}
              onChange={(event) => {
                store.updateWorkspace(workspace.id, {
                  files: workspace.files.map((item) =>
                    item.name === file.name
                      ? { ...item, content: event.target.value }
                      : item,
                  ),
                });
              }}
              className="min-h-[360px] flex-1 font-mono text-sm"
              aria-label={`Code for ${file?.name ?? "file"}`}
            />
          </div>
        </TabsContent>
        <TabsContent value="connections" className="mt-3">
          {state.integrations.every((item) => !item.connected) ? (
            <EmptyState
              title="No connections on this gadget"
              what="Connections are integrations you introduce to this workspace only."
              why="Grok cannot touch GitHub, email, or X until you connect one."
              next="Open Integrations, connect a service, then come back."
              action={{ href: "/integrations", label: "Open integrations" }}
            />
          ) : (
            <ul className="space-y-2">
              {state.integrations
                .filter((item) => item.connected)
                .map((item) => {
                  const meta = INTEGRATION_CATALOG.find((entry) => entry.id === item.id);
                  return (
                    <li
                      key={item.id}
                      className="rounded-lg border border-border px-3 py-3 text-sm"
                    >
                      <div className="font-medium">{meta?.name ?? item.id}</div>
                      <p className="text-muted-foreground">{meta?.summary}</p>
                    </li>
                  );
                })}
            </ul>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
