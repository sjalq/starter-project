#!/usr/bin/env node

/**
 * Lamdera Log Reader
 *
 * Reads production logs from a deployed Lamdera app via the /_logs/read HTTP endpoint.
 *
 * Usage:
 *   node scripts/node/lamdera-logs.mjs read [options]
 *   node scripts/node/lamdera-logs.mjs count
 *   node scripts/node/lamdera-logs.mjs status
 *
 * Options:
 *   --app <name>          App name (default: from .lamdera-app or package.json)
 *   --key <key>           Raw log key (default: from LAMDERA_LOG_KEY env var or .env.logkey)
 *   --lines <n>           Number of lines to fetch (default: 100)
 *   --direction <d>       "tail" (default) or "head"
 *   --from <n>            Start line number
 *   --to <n>              End line number
 *   --grep <pattern>      Filter output lines (case-insensitive)
 *
 * Examples:
 *   node scripts/node/lamdera-logs.mjs read --lines 50
 *   node scripts/node/lamdera-logs.mjs read --lines 200 --grep "ERROR"
 *   node scripts/node/lamdera-logs.mjs read --from 1000 --to 1100
 *   node scripts/node/lamdera-logs.mjs count
 *   node scripts/node/lamdera-logs.mjs status
 */

import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "../..");

function findAppName() {
  // Try .lamdera-app file
  const lamderaAppFile = resolve(projectRoot, ".lamdera-app");
  if (existsSync(lamderaAppFile)) {
    return readFileSync(lamderaAppFile, "utf8").trim();
  }

  // Try package.json name field
  const pkgFile = resolve(projectRoot, "package.json");
  if (existsSync(pkgFile)) {
    try {
      const pkg = JSON.parse(readFileSync(pkgFile, "utf8"));
      if (pkg.name) return pkg.name;
    } catch {}
  }

  return null;
}

function findLogKey() {
  // 1. Environment variable
  if (process.env.LAMDERA_LOG_KEY) {
    return process.env.LAMDERA_LOG_KEY;
  }

  // 2. .env.logkey file
  const envFile = resolve(projectRoot, ".env.logkey");
  if (existsSync(envFile)) {
    return readFileSync(envFile, "utf8").trim();
  }

  return null;
}

function urlEncodeKey(rawKey) {
  return encodeURIComponent(rawKey);
}

function parseArgs(argv) {
  const args = { command: null };
  let i = 0;

  if (argv.length > 0 && !argv[0].startsWith("-")) {
    args.command = argv[0];
    i = 1;
  }

  while (i < argv.length) {
    const arg = argv[i];
    switch (arg) {
      case "--app":
        args.app = argv[++i];
        break;
      case "--key":
        args.key = argv[++i];
        break;
      case "--lines":
        args.lines = parseInt(argv[++i], 10);
        break;
      case "--direction":
        args.direction = argv[++i];
        break;
      case "--from":
        args.from = parseInt(argv[++i], 10);
        break;
      case "--to":
        args.to = parseInt(argv[++i], 10);
        break;
      case "--grep":
        args.grep = argv[++i];
        break;
      case "--help":
      case "-h":
        args.command = "help";
        break;
      default:
        console.error(`Unknown argument: ${arg}`);
        process.exit(1);
    }
    i++;
  }

  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.command || args.command === "help") {
    console.log(`Usage:
  node scripts/node/lamdera-logs.mjs read [options]    Read log lines
  node scripts/node/lamdera-logs.mjs count             Get total line count
  node scripts/node/lamdera-logs.mjs status            Check if logging is enabled

Options:
  --app <name>          App name (default: auto-detected)
  --key <key>           Raw log key (default: LAMDERA_LOG_KEY env or .env.logkey)
  --lines <n>           Number of lines (default: 100)
  --direction <d>       "tail" (default) or "head"
  --from <n>            Start line number
  --to <n>              End line number
  --grep <pattern>      Filter output (case-insensitive)`);
    process.exit(0);
  }

  const appName = args.app || findAppName();
  if (!appName) {
    console.error(
      "Could not determine app name. Use --app <name> or create a .lamdera-app file."
    );
    process.exit(1);
  }

  const baseUrl = `https://${appName}.lamdera.app`;

  // Status doesn't need a key
  if (args.command === "status") {
    const resp = await fetch(`${baseUrl}/_logs/status`);
    const text = await resp.text();
    console.log(`Logging enabled: ${text}`);
    return;
  }

  const rawKey = args.key || findLogKey();
  if (!rawKey) {
    console.error(
      "No log key found. Provide via --key, LAMDERA_LOG_KEY env var, or .env.logkey file."
    );
    process.exit(1);
  }

  const encodedKey = urlEncodeKey(rawKey);

  if (args.command === "count") {
    const resp = await fetch(
      `${baseUrl}/_logs/read/count?key=${encodedKey}`
    );
    if (!resp.ok) {
      console.error(`Error ${resp.status}: ${await resp.text()}`);
      process.exit(1);
    }
    const data = await resp.json();
    console.log(`Total log lines: ${data.count}`);
    return;
  }

  if (args.command === "read") {
    const params = new URLSearchParams({ key: rawKey });

    if (args.from !== undefined && args.to !== undefined) {
      params.set("from", args.from);
      params.set("to", args.to);
    } else {
      params.set("lines", args.lines || 100);
      params.set("direction", args.direction || "tail");
    }

    const resp = await fetch(`${baseUrl}/_logs/read?${params.toString()}`);
    if (!resp.ok) {
      console.error(`Error ${resp.status}: ${await resp.text()}`);
      process.exit(1);
    }

    const text = await resp.text();
    let lines = text.split("\n");

    if (args.grep) {
      const pattern = args.grep.toLowerCase();
      lines = lines.filter((l) => l.toLowerCase().includes(pattern));
    }

    console.log(lines.join("\n"));
    return;
  }

  console.error(`Unknown command: ${args.command}. Use read, count, or status.`);
  process.exit(1);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
