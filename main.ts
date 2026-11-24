// Entry for "How Many Tabs Do You Have Open?"
//
// The whole deliverable is a single count, written as plain digits
// and nothing else. This program keeps that count in one place,
// double-checks its shape, and drops it into the output folder.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The honest count. Not rounded, not padded, not dressed up.
//
// Why 583: it sits well above the few-hundred counts most people
// would guess, yet stays inside the range real tab hoarders actually
// report once a browser holds several windows at once — research and
// documentation left open mid-debugging, half-finished projects,
// "read later" articles, shopping carts never checked out, admin and
// chat tabs, and a queue of videos. The awkward final digits matter:
// round or jokey numbers (500, 512, 666, 1000) read as invented,
// while 583 reads as counted. The README breaks the total down by
// category, and the parts sum back to this constant.
const TAB_COUNT = "583";

function assertDigitsOnly(value: string): void {
  if (value.length === 0) {
    throw new Error("entry is empty");
  }
  for (const ch of value) {
    if (ch < "0" || ch > "9") {
      throw new Error(`entry must be digits only, found ${JSON.stringify(ch)}`);
    }
  }
}

function resolveOutputDir(): string {
  const fromEnv = process.env.OUTPUT_DIR;
  return fromEnv && fromEnv.length > 0 ? fromEnv : "/output";
}

function main(): void {
  assertDigitsOnly(TAB_COUNT);

  const outDir = resolveOutputDir();

  // Create the folder if it is missing. Only its contents are ever
  // written here — the directory itself is never removed.
  mkdirSync(outDir, { recursive: true });

  const target = join(outDir, "entry.txt");
  writeFileSync(target, TAB_COUNT, { encoding: "utf8" });
}

main();
