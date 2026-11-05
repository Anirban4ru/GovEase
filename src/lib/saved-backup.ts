/**
 * Unified Life Services Platform - Saved Services Portability Utility
 *
 * Implements citizen data portability in alignment with India DPDP Act 2023.
 * Validates, serializes, and deserializes saved service backups without network transmission.
 */

import { getAllServices } from "./catalogue";

export interface SavedBackupPayload {
  format: "unified-life-services-backup-v1";
  exportedAt: string;
  savedServiceIds: string[];
}

export interface ImportResult {
  success: boolean;
  count: number;
  message: string;
  error?: string;
}

/**
 * Serializes saved service IDs into a structured, validated backup payload.
 */
export function createBackupPayload(savedIds: string[]): SavedBackupPayload {
  const validServiceIds = new Set(getAllServices().map((s) => s.id));
  const filtered = savedIds.filter((id) => validServiceIds.has(id));

  return {
    format: "unified-life-services-backup-v1",
    exportedAt: new Date().toISOString(),
    savedServiceIds: filtered,
  };
}

/**
 * Validates and parses an imported backup JSON string.
 * Strictly verifies format and filters out unknown or corrupted service IDs.
 */
export function parseAndValidateBackup(rawJson: string): ImportResult & { ids?: string[] } {
  if (!rawJson || typeof rawJson !== "string") {
    return {
      success: false,
      count: 0,
      message: "Empty or invalid backup file.",
      error: "INVALID_INPUT",
    };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawJson);
  } catch {
    return {
      success: false,
      count: 0,
      message: "The selected file is not a valid JSON document.",
      error: "MALFORMED_JSON",
    };
  }

  if (
    typeof parsed !== "object" ||
    parsed === null ||
    !("format" in parsed) ||
    (parsed as { format: unknown }).format !== "unified-life-services-backup-v1" ||
    !("savedServiceIds" in parsed) ||
    !Array.isArray((parsed as { savedServiceIds: unknown }).savedServiceIds)
  ) {
    return {
      success: false,
      count: 0,
      message:
        "Invalid backup structure. The file must be a valid Unified Life Services backup file.",
      error: "INVALID_SCHEMA",
    };
  }

  const rawIds = (parsed as { savedServiceIds: unknown[] }).savedServiceIds;
  const validCatalogueIds = new Set(getAllServices().map((s) => s.id));

  const validIds: string[] = [];
  for (const item of rawIds) {
    if (typeof item === "string" && validCatalogueIds.has(item)) {
      if (!validIds.includes(item)) {
        validIds.push(item);
      }
    }
  }

  return {
    success: true,
    count: validIds.length,
    message: `Successfully validated ${validIds.length} service reference${validIds.length === 1 ? "" : "s"}.`,
    ids: validIds,
  };
}
