import type { IntegrationId, ProviderVendor, WorkspaceKind } from "./types";

export const BLUEPRINTS: {
  id: string;
  title: string;
  kind: WorkspaceKind;
  description: string;
  starter: string;
  files: { name: string; content: string }[];
}[] = [
  {
    id: "docs",
    title: "Workspace Docs",
    kind: "docs",
    description: "A private document you can share, then ask Grok to edit.",
    starter:
      "# Untitled brief\n\nWhat this is for, who it is for, and what has to be true by Friday.",
    files: [
      {
        name: "README.md",
        content: "# Workspace Docs\n\nPlain-language notes. Edit the Doc tab.",
      },
      {
        name: "client.js",
        content: "export function render(root, doc) {\n  root.textContent = doc.title;\n}\n",
      },
      {
        name: "server.js",
        content: "export default class DocGadget {\n  constructor() {\n    this.title = \"Untitled brief\";\n  }\n}\n",
      },
    ],
  },
  {
    id: "slides",
    title: "Workspace Slides",
    kind: "slides",
    description: "A deck for a meeting. Start from an outline, not a blank canvas.",
    starter:
      "# Meeting deck\n\n1. Why we are here\n2. What changed\n3. The ask\n4. Next steps",
    files: [
      {
        name: "README.md",
        content: "# Workspace Slides\n\nOutline first. Slides follow.",
      },
      {
        name: "client.js",
        content: "export function render(root, deck) {\n  root.textContent = deck.title;\n}\n",
      },
      {
        name: "server.js",
        content: "export default class SlidesGadget {\n  constructor() {\n    this.title = \"Meeting deck\";\n  }\n}\n",
      },
    ],
  },
  {
    id: "sheets",
    title: "Workspace Sheets",
    kind: "sheets",
    description: "A table for tracking work: owners, dates, and status.",
    starter:
      "Item | Owner | Status | Due\n--- | --- | --- | ---\nKickoff notes | You | Open | This week",
    files: [
      {
        name: "README.md",
        content: "# Workspace Sheets\n\nA lightweight tracker, not a spreadsheet product.",
      },
      {
        name: "client.js",
        content: "export function render(root, sheet) {\n  root.textContent = sheet.title;\n}\n",
      },
      {
        name: "server.js",
        content: "export default class SheetsGadget {\n  constructor() {\n    this.title = \"Tracker\";\n  }\n}\n",
      },
    ],
  },
];

export const INTEGRATION_CATALOG: {
  id: IntegrationId;
  name: string;
  summary: string;
  why: string;
}[] = [
  {
    id: "github",
    name: "GitHub",
    summary: "Repos, issues, and pull requests the agent can act on.",
    why: "Needed before Grok can open or change a repository.",
  },
  {
    id: "google",
    name: "Google",
    summary: "Docs and Calendar, scoped to what you introduce.",
    why: "Needed to edit a doc or check a calendar without leaving the OS.",
  },
  {
    id: "email",
    name: "Email",
    summary: "Draft and send from a workspace, with approval.",
    why: "Needed for follow-up monitors and briefs.",
  },
  {
    id: "x",
    name: "X",
    summary: "Read a timeline or draft a post. Nothing posts until you approve.",
    why: "Needed if Grok Bot is going to work with X at all.",
  },
  {
    id: "slack",
    name: "Slack",
    summary: "Channels you introduce, not the whole workspace.",
    why: "Needed for team follow-ups.",
  },
  {
    id: "notion",
    name: "Notion",
    summary: "Pages and databases you pick, one at a time.",
    why: "Needed to pull company notes into a gadget.",
  },
  {
    id: "linear",
    name: "Linear",
    summary: "Issues and projects the agent can list or update.",
    why: "Needed for an issue dashboard.",
  },
  {
    id: "supabase",
    name: "Supabase",
    summary: "A project you introduce for app gadgets.",
    why: "Needed when a gadget has to persist more than a document.",
  },
];

export const PROVIDER_PRESETS: {
  vendor: ProviderVendor;
  modelId: string;
  displayName: string;
  blurb: string;
  demo?: boolean;
}[] = [
  {
    vendor: "cloudflare",
    modelId: "workers-ai-demo",
    displayName: "Workers AI (local demo)",
    blurb: "Runs here without an API key. Use this to finish first-run.",
    demo: true,
  },
  {
    vendor: "xai",
    modelId: "grok-4.6",
    displayName: "Grok 4.6",
    blurb: "Default chat model when an xAI key is present.",
  },
  {
    vendor: "anthropic",
    modelId: "claude-sonnet-4-5",
    displayName: "Claude Sonnet 4.5",
    blurb: "For long documents and careful edits.",
  },
  {
    vendor: "openai",
    modelId: "gpt-5.6",
    displayName: "GPT 5.6",
    blurb: "General fallback if you already have an OpenAI key.",
  },
];

export const STARTER_PROMPTS = [
  {
    id: "brief",
    title: "Daily brief",
    prompt:
      "Write a one-page daily brief for Epic Tech AI: what shipped, what is stuck, and what I should do first.",
  },
  {
    id: "doc",
    title: "Write a doc",
    prompt:
      "Create a Workspace Docs gadget for a customer meeting. Include agenda, risks, and the ask.",
  },
  {
    id: "deck",
    title: "Draft a deck",
    prompt:
      "Create a Workspace Slides outline for a 15-minute product review. Four slides, no fluff.",
  },
];

export const KNOWLEDGE_SEED: { id: string; title: string; summary: string }[] = [
  {
    id: "sota",
    title: "Epic Tech AI — how the OS should talk",
    summary:
      "Company brief for Grok Bot. Short answers. Name the next action. Do not invent connectors.",
  },
];

export const SCHEDULE_EXAMPLES = [
  {
    title: "Daily brief",
    when: "Weekdays at 8:00 AM",
    needs: "An AI provider. Email if you want it sent.",
  },
  {
    title: "Weekly roundup",
    when: "Fridays at 4:00 PM",
    needs: "An AI provider and at least one workspace.",
  },
  {
    title: "Follow-up monitor",
    when: "Weekdays at 9:00 AM",
    needs: "Email or Slack connected.",
  },
  {
    title: "Metrics snapshot",
    when: "Mondays at 8:00 AM",
    needs: "A Sheets workspace or a connected tracker.",
  },
];
