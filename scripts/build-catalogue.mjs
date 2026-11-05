import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const servicesDir = path.join(rootDir, "catalogue", "services");
const outputDir = path.join(rootDir, "src", "data");
const outputPath = path.join(outputDir, "catalogue.json");

console.log("--- Compiling Service Catalogue Snapshot ---");

const files = fs.readdirSync(servicesDir).filter((f) => f.endsWith(".json"));
const services = [];

for (const file of files) {
  const filePath = path.join(servicesDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  services.push(data);
}

// Sort services by ecosystem then title
services.sort((a, b) => {
  if (a.ecosystem !== b.ecosystem) {
    return a.ecosystem.localeCompare(b.ecosystem);
  }
  return a.title.en.localeCompare(b.title.en);
});

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(services, null, 2), "utf8");

console.log(`✅ Compiled ${services.length} services into ${outputPath}`);

