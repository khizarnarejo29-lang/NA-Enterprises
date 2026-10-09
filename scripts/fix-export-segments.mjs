// Works around a Windows-only bug in Next.js 16.4 static export.
//
// The client router prefetches flat files such as
//   out/contact/__next.contact.__PAGE__.txt
// but on Windows the exporter joins segment paths with "\" instead of "/",
// so the files are written as nested folders instead:
//   out/contact/__next.contact/__PAGE__.txt
// Every prefetch then 404s. This script flattens those folders back into the
// expected file names. On Linux/macOS builds there is nothing to fix.
import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve(process.argv[2] ?? "out");
let fixed = 0;

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

if (!fs.existsSync(outDir)) {
  console.error(`fix-export-segments: ${outDir} does not exist`);
  process.exit(1);
}
walk(outDir);
console.log(`fix-export-segments: flattened ${fixed} prefetch file(s)`);
