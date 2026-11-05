import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const servicesDir = path.join(rootDir, "catalogue", "services");
const reportPath = path.join(rootDir, "docs", "catalogue", "STALENESS_REPORT.md");

const today = new Date();
const todayStr = today.toISOString().split("T")[0];

console.log(`--- Catalogue Staleness Audit Starting [as of ${todayStr}] ---`);

const files = fs.readdirSync(servicesDir).filter((f) => f.endsWith(".json"));
const entries = [];

for (const file of files) {
  const filePath = path.join(servicesDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const nextReview = new Date(data.verification.next_review_due);

  const diffTime = nextReview.getTime() - today.getTime();
  const daysUntilReview = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let statusLabel = "FRESH";
  if (data.status === "draft-pending-human-review") {
    statusLabel = "DRAFT_PENDING_HUMAN_REVIEW";
  } else if (daysUntilReview < 0) {
    statusLabel = "OVERDUE";
  } else if (daysUntilReview <= 30) {
    statusLabel = "NEEDS_REVIEW_SOON";
  }

  entries.push({
    id: data.id,
    titleEn: data.title.en,
    ecosystem: data.ecosystem,
    status: data.status,
    lastVerifiedOn: data.verification.last_verified_on,
    verifiedBy: data.verification.verified_by,
    nextReviewDue: data.verification.next_review_due,
    daysUntilReview,
    statusLabel,
  });
}

// Generate report markdown
let report = `# Catalogue Staleness & Review Register\n\n`;
report += `**Project:** Unified Life Services Platform  \n`;
report += `**Purpose:** Living audit of catalogue freshness, review schedules, and staleness alerts  \n`;
report += `**Audit Date:** ${todayStr}  \n`;
report += `**Total Services Tracked:** ${entries.length}  \n\n`;

report += `Per \`PROMPT_FINAL.md\` §6.3:  \n`;
report += `> "An entry past next_review_due is shown with a visible 'may be out of date' notice and is flagged in a maintenance report. Entries more than twice past due are auto-hidden from search ranking until reviewed."\n\n`;

report += `---\n\n`;
report += `## Summary by Status\n\n`;

const draftCount = entries.filter((e) => e.statusLabel === "DRAFT_PENDING_HUMAN_REVIEW").length;
const freshCount = entries.filter((e) => e.statusLabel === "FRESH").length;
const soonCount = entries.filter((e) => e.statusLabel === "NEEDS_REVIEW_SOON").length;
const overdueCount = entries.filter((e) => e.statusLabel === "OVERDUE").length;

report += `- **Draft (Pending Human Review):** ${draftCount}\n`;
report += `- **Fresh (>30 days until due):** ${freshCount}\n`;
report += `- **Needs Review Soon (<=30 days):** ${soonCount}\n`;
report += `- **Overdue:** ${overdueCount}\n\n`;

report += `---\n\n`;
report += `## Service Review Schedule\n\n`;
report += `| Service ID | Title | Ecosystem | Last Verified | Review Due | Days Left | Review Status |\n`;
report += `| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;

for (const e of entries) {
  const badge =
    e.statusLabel === "FRESH"
      ? "🟢 Fresh"
      : e.statusLabel === "NEEDS_REVIEW_SOON"
        ? "🟡 Needs Review Soon"
        : e.statusLabel === "OVERDUE"
          ? "🔴 OVERDUE"
          : "⏳ Draft (Pending Review)";

  report += `| \`${e.id}\` | ${e.titleEn} | ${e.ecosystem} | ${e.lastVerifiedOn} | ${e.nextReviewDue} | ${e.daysUntilReview}d | ${badge} |\n`;
}

report += `\n---\n*Report generated automatically by \`scripts/catalogue-staleness.mjs\`*\n`;

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report, "utf8");

console.log(`Generated staleness report at ${reportPath}`);
console.log(
  `Summary: ${freshCount} Fresh, ${draftCount} Drafts, ${soonCount} Needs Review, ${overdueCount} Overdue.`,
);

if (overdueCount > 0) {
  console.warn(`⚠️ Warning: ${overdueCount} services are overdue for human review.`);
} else {
  console.log(`✅ All services within active review windows.`);
}
