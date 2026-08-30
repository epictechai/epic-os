export type WorkspaceKind = "docs" | "slides" | "sheets" | "app";

export type ProviderVendor =
  | "cloudflare"
  | "xai"
  | "anthropic"
  | "openai"
  | "google";

export type Provider = {
  id: string;
  vendor: ProviderVendor;
  modelId: string;
  displayName: string;
  isDefault: boolean;
};

export type WorkspaceFile = {
  name: string;
  content: string;
};

export type Workspace = {
  id: string;
  title: string;
  kind: WorkspaceKind;
  blueprintId: string;
  createdAt: string;
  updatedAt: string;
  body: string;
  files: WorkspaceFile[];
};

export type IntegrationId =
  | "github"
  | "google"
  | "email"
  | "x"
  | "slack"
  | "notion"
  | "linear"
  | "supabase";

export type Integration = {
  id: IntegrationId;
  connected: boolean;
  connectedAt?: string;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

export type ChecklistState = {
  addProvider: boolean;
  createWorkspace: boolean;
  chatWithGrok: boolean;
  connectIntegration: boolean;
  dismissed: boolean;
};

export type KnowledgeDoc = {
  id: string;
  title: string;
  summary: string;
};

export type AppState = {
  onboardingSeen: boolean;
  checklist: ChecklistState;
  providers: Provider[];
  workspaces: Workspace[];
  integrations: Integration[];
  messages: ChatMessage[];
  knowledge: KnowledgeDoc[];
};
