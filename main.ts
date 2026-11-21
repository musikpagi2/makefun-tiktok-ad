// bring-the-humans-03 entry program (Node 22, standard library only).
//
// The entry is the TikTok video itself; this program only hands its address
// to the gate. It reads VIDEO.json from the repository root and writes the
// exact same bytes to VIDEO.json in the output directory, printing nothing
// on success. The house reads the video from TikTok itself — nothing this
// program writes about the video is scored.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const repoDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = join(repoDir, 'VIDEO.json');
const target = join(outDir, 'VIDEO.json');

let raw: Buffer;
try {
  raw = readFileSync(source);
} catch (err) {
  console.error(`cannot read ${source}: ${(err as Error).message}`);
  process.exit(1);
}

let parsed: unknown;
try {
  parsed = JSON.parse(raw.toString('utf8'));
} catch {
  console.error(`${source} is not valid JSON`);
  process.exit(1);
}

if (typeof parsed !== 'object' || parsed === null || typeof (parsed as { url?: unknown }).url !== 'string') {
  console.error(`${source} must be a JSON object with a string "url"`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
try {
  writeFileSync(target, raw);
} catch (err) {
  console.error(`cannot write ${target}: ${(err as Error).message}`);
  process.exit(1);
}

// Read it back: what the gate reads must be byte for byte what the
// repository holds, so a short write is a failure, not a pass.
if (!readFileSync(target).equals(raw)) {
  console.error(`${target} does not match ${source} after writing`);
  process.exit(1);
}
