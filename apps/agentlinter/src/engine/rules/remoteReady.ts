/* ─── Remote-Ready Score Rules (5%) ─── */
/* Checks if the workspace is ready for remote/headless agent execution */

import { Rule, Diagnostic } from "../types";
import { getRemoteReadyContext } from "./helpers";

export const remoteReadyRules: Rule[] = [
  {
    id: "remote-ready/workspace-path-specified",
    category: "remoteReady",
    severity: "warning",
    description:
      "Workspace path should be explicitly documented for remote execution",
    check(files) {
      const ctx = getRemoteReadyContext(files);
      if (!ctx) return [];

      const hasWorkspacePath =
        /workspace.*[:=]\s*[`'"]?\/[^\s`'"]+/i.test(ctx.allContent) ||
        /repo.*[:=]\s*[`'"]?\/[^\s`'"]+/i.test(ctx.allContent) ||
        /working\s+dir(?:ectory)?.*[:=]\s*[`'"]?\/[^\s`'"]+/i.test(ctx.allContent) ||
        /cwd.*[:=]\s*[`'"]?\/[^\s`'"]+/i.test(ctx.allContent) ||
        /\bworkdir\b.*\/[^\s]+/i.test(ctx.allContent) ||
        /(?:repo|workspace|workdir|cwd)\s*=\s*\/[^\s]+/i.test(ctx.allContent);

      if (!hasWorkspacePath) {
        return [
          {
            severity: "warning",
            category: "remoteReady",
            rule: this.id,
            file: ctx.targetFile,
            message:
              "No explicit workspace path found. Remote/headless agents need a documented workspace path to operate correctly.",
            fix: 'Add workspace path in TOOLS.md or AGENTS.md Runtime section. Example: "repo=/Users/username/project"',
          },
        ];
      }
      return [];
    },
  },

  {
    id: "remote-ready/env-vars-documented",
    category: "remoteReady",
    severity: "warning",
    description: "Required environment variables should be documented",
    check(files) {
      const ctx = getRemoteReadyContext(files);
      if (!ctx) return [];

      const hasEnvVarUsage =
        /\$\{?[A-Z][A-Z0-9_]{2,}\}?/.test(ctx.allContent) ||
        /process\.env\.[A-Z_]+/.test(ctx.allContent) ||
        /os\.environ/i.test(ctx.allContent);

      const hasEnvDocumentation =
        /env(?:ironment)?\s+var(?:iable)?s?/i.test(ctx.allContent) ||
        /required.*(?:env|environment)/i.test(ctx.allContent) ||
        /\.env\s+(?:file|setup|config)/i.test(ctx.allContent) ||
        /export\s+[A-Z_]+=/.test(ctx.allContent) ||
        /\bENV:\b/i.test(ctx.allContent);

      if (hasEnvVarUsage && !hasEnvDocumentation) {
        return [
          {
            severity: "warning",
            category: "remoteReady",
            rule: this.id,
            file: ctx.targetFile,
            message:
              "Environment variables are used but not documented. Remote agents may fail if required env vars are missing.",
            fix: "Add an 'Environment Variables' section listing all required env vars with descriptions and setup instructions.",
          },
        ];
      }
      return [];
    },
  },

  {
    id: "remote-ready/model-settings-specified",
    category: "remoteReady",
    severity: "info",
    description:
      "Model settings should be explicitly configured for reproducible remote execution",
    check(files) {
      const ctx = getRemoteReadyContext(files);
      if (!ctx) return [];

      const hasModelConfig =
        /default[_-]?model\s*[:=]/i.test(ctx.allContent) ||
        /model\s*[:=]\s*["']?(?:anthropic|openai|google|xai|gpt|claude|gemini|grok)/i.test(ctx.allContent) ||
        /\bmodel\s*=\s*[a-z]+\/[a-z-]+/i.test(ctx.allContent) ||
        /claude-(?:opus|sonnet|haiku)/i.test(ctx.allContent) ||
        /gpt-4/i.test(ctx.allContent) ||
        /Runtime.*model=/i.test(ctx.allContent);

      if (!hasModelConfig) {
        return [
          {
            severity: "info",
            category: "remoteReady",
            rule: this.id,
            file: ctx.targetFile,
            message:
              "No model settings found. Specifying the model ensures consistent behavior across remote runs.",
            fix: "Document the default model in TOOLS.md. Example: 'default_model: anthropic/claude-opus-4-5'",
          },
        ];
      }
      return [];
    },
  },
];
