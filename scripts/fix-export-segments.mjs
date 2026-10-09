// Works around a Windows-only bug in Next.js 16.4 static export.
//
// The client router prefetches flat files such as
//   out/contact/__next.contact.__PAGE__.txt
// but on Windows the exporter joins segment paths with "\" instead of "/",
// so the files are written as nested folders instead:
//   out/contact/__next.contact/__PAGE__.txt
// Every prefetch then 404s. This script flattens those folders back into the
// expected file names. On Linux/macOS builds there is nothing to fix.
//
// It only applies when this build actually ran a static export. Hosts such as
// Hostinger's Node.js hosting replace `output: "export"` with
// `output: "standalone"` before building, so no `out/` is produced and there is
// nothing to fix. A real export that fails to produce `out/` is still an error.
import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve(process.argv[2] ?? "out");
const distDir = path.resolve(".next");
let fixed = 0;

/** True when the build that just finished ran `output: "export"`. */
function exportRanThisBuild() {
  // Next writes BUILD_ID on every build and export-detail.json only when it
  // exports. Comparing times ignores a leftover file from an earlier build.
  const detail = path.join(distDir, "export-detail.json");
  const buildId = path.join(distDir, "BUILD_ID");
  if (!fs.existsSync(detail) || !fs.existsSync(buildId)) return false;
  return fs.statSync(detail).mtimeMs >= fs.statSync(buildId).mtimeMs;
}

function filesUnder(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? filesUnder(p) : [p];
  });
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === "_next") continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith("__next.")) {
      for (const file of filesUnder(full)) {
        const parts = path.relative(full, file).split(path.sep);
        const flat = path.join(dir, [entry.name, ...parts].join("."));
        fs.renameSync(file, flat);
        fixed++;
      }
      fs.rmSync(full, { recursive: true, force: true });
    } else {
      walk(full);
    }
  }
}

if (!exportRanThisBuild()) {
  console.log("fix-export-segments: this build did not run a static export (e.g. a server/standalone build); nothing to fix");
  process.exit(0);
}
if (!fs.existsSync(outDir)) {
  console.error(`fix-export-segments: static export ran but ${outDir} does not exist`);
  process.exit(1);
}
walk(outDir);
console.log(`fix-export-segments: flattened ${fixed} prefetch file(s)`);
