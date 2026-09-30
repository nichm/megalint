/* ─── Shared Rule Helpers ─── */

import { FileInfo } from "../types";

/**
 * Filter files to core agent files (non-compound, non-memory, .md only).
 * Used across clarity, consistency, and structure rules.
 */
export function getCoreFiles(files: FileInfo[]): FileInfo[] {
  return files.filter(
    (f) =>
      !f.name.startsWith("compound/") &&
      !f.name.startsWith("memory/") &&
      f.name.endsWith(".md"),
  );
}

/**
 * Find the main agent file (CLAUDE.md or AGENTS.md).
 */
export function findMainFile(files: FileInfo[]): FileInfo | undefined {
  return files.find((f) => f.name === "CLAUDE.md" || f.name === "AGENTS.md");
}

/**
 * Collect all non-memory/non-compound file content into a single string.
 */
function collectContent(files: FileInfo[]): string {
  return files
    .filter(
      (f) =>
        !f.name.startsWith("memory/") && !f.name.startsWith("compound/"),
    )
    .map((f) => f.content)
    .join("\n");
}

/**
 * Extract YAML frontmatter from a file's content.
 * Returns null if no frontmatter block is present.
 */
export function parseFrontmatter(content: string): string | null {
  if (!content.startsWith("---")) return null;
  return content.split("---")[1] || null;
}

/**
 * Extract a single field value from YAML frontmatter.
 * Handles optional quoting (single/double).
 */
export function getFrontmatterField(
  frontmatter: string,
  field: string,
): string | null {
  const match = frontmatter.match(
    new RegExp(`^${field}:\\s*["']?([^\\n"']+)["']?`, "m"),
  );
  return match ? match[1].trim() : null;
}

/**
 * Gather common context for remote-ready rules.
 * Returns null when no main or tools file exists (no diagnostics needed).
 */
export function getRemoteReadyContext(files: FileInfo[]) {
  const mainFile = findMainFile(files);
  const toolsFile = files.find((f) => f.name === "TOOLS.md");
  if (!mainFile && !toolsFile) return null;
  const allContent = collectContent(files);
  const targetFile = toolsFile?.name || mainFile?.name || "(workspace)";
  return { mainFile, toolsFile, allContent, targetFile };
}
