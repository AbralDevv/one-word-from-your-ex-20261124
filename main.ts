import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const word = "Preventable";

const candidates = [
  process.argv[2],
  process.env.MAKEFUN_OUTPUT_DIR,
  "/output",
  "./output",
].filter((d): d is string => Boolean(d));

let written = false;
for (const dir of candidates) {
  try {
    const out = resolve(dir);
    mkdirSync(out, { recursive: true });
    writeFileSync(join(out, "entry.txt"), word, "utf8");
    written = true;
    break;
  } catch {
    // Try the next candidate.
  }
}

if (!written) {
  console.error("could not write entry.txt to any output directory");
  process.exit(1);
}
