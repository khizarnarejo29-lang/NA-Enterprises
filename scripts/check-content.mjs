// Pre-launch gate: fails while any content is still marked PLACEHOLDER.
// Run with `npm run check:content` before deploying to production.
import fs from "node:fs";
import path from "node:path";

const hits = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(tsx?|mdx?)$/.test(e.name)) {
      fs.readFileSync(p, "utf8").split("\n").forEach((line, i) => {
        // Real markers start a comment ("// PLACEHOLDER", "/* PLACEHOLDER"); prose that merely
        // mentions the word (e.g. documentation) is not counted.
        if (/(\/\/|\/\*)\s*PLACEHOLDER/.test(line)) hits.push(`${p}:${i + 1}: ${line.trim()}`);
      });
    }
  }
})("src");

if (hits.length) {
  console.error(`${hits.length} placeholder(s) must be replaced before launch:\n\n${hits.join("\n")}`);
  process.exit(1);
}
console.log("No placeholders found.");
