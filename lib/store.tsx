"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import { BLUEPRINTS, INTEGRATION_CATALOG, KNOWLEDGE_SEED } from "./catalog";
import type {
  AppState,
  ChatMessage,
  Integration,
  IntegrationId,
  Provider,
  Workspace,
  WorkspaceKind,
} from "./types";

const STORAGE_KEY = "epic-os-v1";

const emptyState = (): AppState => ({
  onboardingSeen: false,
  checklist: {
    addProvider: false,
    createWorkspace: false,
    chatWithGrok: false,
    connectIntegration: false,
    dismissed: false,
  },
  providers: [],
  workspaces: [],
  integrations: INTEGRATION_CATALOG.map((item) => ({
    id: item.id,
    connected: false,
  })),
  messages: [],
  knowledge: KNOWLEDGE_SEED,
});

const SERVER_SNAPSHOT = emptyState();
let memory = emptyState();
let hydrated = false;
let clientReady = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function persist(next: AppState) {
  clientReady = true;
  hydrated = true;
  memory = next;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  emit();
}

function read(): AppState {
  if (typeof window === "undefined" || !clientReady) return SERVER_SNAPSHOT;
  if (!hydrated) {
    hydrated = true;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) memory = { ...emptyState(), ...JSON.parse(raw) };
    } catch {
      memory = emptyState();
    }
  }
  return memory;
}

function getServerSnapshot() {
  return SERVER_SNAPSHOT;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36)}`;
}

function grokReply(prompt: string, hasProvider: boolean, workspaceCount: number) {
  if (!hasProvider) {
    return "I cannot run until you add an AI provider. Open Providers and start with Workers AI (local demo) — no key required.";
  }
  if (/slide|deck/i.test(prompt)) {
    return workspaceCount
      ? "I would open Workspace Slides and draft a four-slide outline: why we are here, what changed, the ask, next steps. Create that gadget from Workspaces if you want a file to keep."
      : "Create a Workspace Slides gadget first. Then I can write the outline into it instead of leaving it in this chat.";
  }
  if (/doc|brief|meeting/i.test(prompt)) {
    return "Here is a one-page brief: what shipped, what is stuck, and the first action. Save it into a Workspace Docs gadget so it is not stuck in chat.";
  }
  return "Ready. Say what to build or edit. If you need GitHub, Google, or X, connect that integration first so I am not guessing.";
}

export function useAppState() {
  return useSyncExternalStore(subscribe, read, getServerSnapshot);
}

type StoreApi = {
  markOnboardingSeen: () => void;
  dismissChecklist: () => void;
  addProvider: (provider: Omit<Provider, "id" | "isDefault">) => void;
  setDefaultProvider: (id: string) => void;
  removeProvider: (id: string) => void;
  createWorkspace: (blueprintId: string, title?: string) => Workspace;
  updateWorkspace: (id: string, patch: Partial<Pick<Workspace, "title" | "body" | "files">>) => void;
  deleteWorkspace: (id: string) => void;
  toggleIntegration: (id: IntegrationId) => void;
  sendMessage: (content: string) => void;
  resetDemo: () => void;
};

const StoreContext = createContext<StoreApi | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    clientReady = true;
    read();
    emit();
  }, []);

  const api = useMemo<StoreApi>(() => {
    const update = (fn: (state: AppState) => AppState) => persist(fn(read()));

    return {
      markOnboardingSeen() {
        update((state) => ({ ...state, onboardingSeen: true }));
      },
      dismissChecklist() {
        update((state) => ({
          ...state,
          checklist: { ...state.checklist, dismissed: true },
        }));
      },
      addProvider(provider) {
        update((state) => {
          const next: Provider = {
            ...provider,
            id: uid("prov"),
            isDefault: state.providers.length === 0,
          };
          return {
            ...state,
            providers: [...state.providers, next],
            checklist: { ...state.checklist, addProvider: true },
          };
        });
      },
      setDefaultProvider(id) {
        update((state) => ({
          ...state,
          providers: state.providers.map((item) => ({
            ...item,
            isDefault: item.id === id,
          })),
        }));
      },
      removeProvider(id) {
        update((state) => {
          const providers = state.providers.filter((item) => item.id !== id);
          if (providers.length && !providers.some((item) => item.isDefault)) {
            providers[0].isDefault = true;
          }
          return { ...state, providers };
        });
      },
      createWorkspace(blueprintId, title) {
        const blueprint = BLUEPRINTS.find((item) => item.id === blueprintId) ?? BLUEPRINTS[0];
        const workspace: Workspace = {
          id: uid("ws"),
          title: title?.trim() || blueprint.title,
          kind: blueprint.kind,
          blueprintId: blueprint.id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          body: blueprint.starter,
          files: blueprint.files.map((file) => ({ ...file })),
        };
        update((state) => ({
          ...state,
          workspaces: [workspace, ...state.workspaces],
          checklist: { ...state.checklist, createWorkspace: true },
        }));
        return workspace;
      },
      updateWorkspace(id, patch) {
        update((state) => ({
          ...state,
          workspaces: state.workspaces.map((item) =>
            item.id === id
              ? { ...item, ...patch, updatedAt: new Date().toISOString() }
              : item,
          ),
        }));
      },
      deleteWorkspace(id) {
        update((state) => ({
          ...state,
          workspaces: state.workspaces.filter((item) => item.id !== id),
        }));
      },
      toggleIntegration(id) {
        update((state) => {
          const integrations: Integration[] = state.integrations.map((item) =>
            item.id === id
              ? {
                  ...item,
                  connected: !item.connected,
                  connectedAt: !item.connected ? new Date().toISOString() : undefined,
                }
              : item,
          );
          return {
            ...state,
            integrations,
            checklist: {
              ...state.checklist,
              connectIntegration: integrations.some((item) => item.connected),
            },
          };
        });
      },
      sendMessage(content) {
        const trimmed = content.trim();
        if (!trimmed) return;
        update((state) => {
          const user: ChatMessage = {
            id: uid("msg"),
            role: "user",
            content: trimmed,
            createdAt: new Date().toISOString(),
          };
          const assistant: ChatMessage = {
            id: uid("msg"),
            role: "assistant",
            content: grokReply(
              trimmed,
              state.providers.length > 0,
              state.workspaces.length,
            ),
            createdAt: new Date().toISOString(),
          };
          return {
            ...state,
            messages: [...state.messages, user, assistant],
            checklist: {
              ...state.checklist,
              chatWithGrok: state.providers.length > 0 ? true : state.checklist.chatWithGrok,
            },
          };
        });
      },
      resetDemo() {
        persist(emptyState());
      },
    };
  }, []);

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export function useDefaultProvider() {
  const state = useAppState();
  return state.providers.find((item) => item.isDefault) ?? state.providers[0] ?? null;
}

export function kindLabel(kind: WorkspaceKind) {
  if (kind === "docs") return "Doc";
  if (kind === "slides") return "Slides";
  if (kind === "sheets") return "Sheet";
  return "App";
}
