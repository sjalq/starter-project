#!/usr/bin/env -S npx -y elm-pages run

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";

const COLORS = {
  red: "\x1b[0;31m",
  green: "\x1b[0;32m",
  yellow: "\x1b[1;33m",
  blue: "\x1b[0;34m",
  bold: "\x1b[1m",
  nc: "\x1b[0m",
} as const;

const println = (msg = "") => process.stdout.write(msg + "\n");

const prompt = async (question: string): Promise<string> => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = await new Promise<string>((resolve) => rl.question(question, resolve));
  rl.close();
  return answer;
};

const cleanProjectName = (name: string): string => name.replace(/[^a-zA-Z0-9-]/g, "-").toLowerCase();

const expandHome = (p: string): string => (p.startsWith("~") ? path.join(process.env.HOME || process.env.USERPROFILE || "", p.slice(1)) : p);

const resolveTargetPath = (inputPath: string | undefined, defaultPath: string): string => {
  if (!inputPath || inputPath.trim() === "") return path.resolve(defaultPath);
  const expanded = expandHome(inputPath.trim());
  if (path.isAbsolute(expanded)) return path.normalize(expanded);
  return path.resolve(process.cwd(), expanded);
};

const run = (cmd: string, silent = false) => {
  execSync(cmd, { stdio: silent ? "ignore" : "inherit" });
};

const main = async () => {
  println(`${COLORS.blue}${COLORS.bold}🚀 Lamdera Starter Project Setup${COLORS.nc}`);
  println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  println("");

  const argName = process.argv[2];
  let projectName = argName;
  if (!projectName) {
    projectName = await prompt(`${COLORS.yellow}What would you like to name your project?${COLORS.nc}\nProject name: `);
    if (!projectName) {
      println(`${COLORS.red}❌ Project name cannot be empty${COLORS.nc}`);
      process.exit(1);
    }
  }

  const cleanName = cleanProjectName(projectName);
  const defaultSuggestion = path.resolve(process.cwd(), "..", cleanName);

  println("");
  println(`${COLORS.yellow}Where would you like to create your project? ${COLORS.blue}(absolute, ~, or relative)${COLORS.nc}`);
  println(`${COLORS.blue}Default: ${defaultSuggestion}${COLORS.nc}`);
  const customPath = await prompt("Project path (press Enter for default): ");

  const target = resolveTargetPath(customPath, defaultSuggestion);

  if (fs.existsSync(target)) {
    const overwrite = await prompt(`${COLORS.red}⚠️  Directory '${target}' already exists!${COLORS.nc}\nContinue anyway? This may overwrite existing files. (y/N): `);
    if (!/^y(es)?$/i.test(overwrite.trim())) {
      println(`${COLORS.yellow}Cancelled.${COLORS.nc}`);
      process.exit(1);
    }
  }

  println("");
  println(`${COLORS.green}${COLORS.bold}📋 Creating '${projectName}' at: ${target}${COLORS.nc}`);
  println("");

  fs.mkdirSync(target, { recursive: true });

  println(`${COLORS.blue}📋 Copying project files...${COLORS.nc}`);
  const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");

  let hasRsync = true;
  try {
    execSync("rsync --version", { stdio: "ignore" });
  } catch {
    hasRsync = false;
  }
  if (hasRsync) {
    run(`rsync -a --exclude ".git" --exclude "clone.sh" --exclude "scripts/clone.*" "${repoRoot}/" "${target}/"`);
  } else {
    run(`bash -c 'shopt -s dotglob; \
      mkdir -p "${target}" && \
      for f in "${repoRoot}"/*; do \
        base="$(basename "$f")"; \
        if [ "$base" != ".git" ] && [ "$base" != "scripts" ]; then \
          cp -R "$f" "${target}/"; \
        fi; \
      done'`);
  }

  println(`${COLORS.blue}🔧 Initializing git repository...${COLORS.nc}`);
  run(`bash -c 'cd "${target}" && git init'`, true);

  println(`${COLORS.blue}📦 Setting up submodules...${COLORS.nc}`);
  run(`bash -c 'cd "${target}" && git submodule add https://github.com/sjalq/auth.git auth'`, true);
  run(`bash -c 'cd "${target}" && git submodule add https://github.com/sjalq/lamdera-websocket.git lamdera-websocket-package'`, true);
  run(`bash -c 'cd "${target}" && git submodule update --init --recursive'`, true);

  println(`${COLORS.blue}💾 Creating initial commit...${COLORS.nc}`);
  try {
    run(`bash -c 'cd "${target}" && git add . && git commit -m "Initial commit from starter project with submodules"'`, true);
  } catch {}

  println("");
  println(`${COLORS.green}${COLORS.bold}✅ Success! Project '${projectName}' created!${COLORS.nc}`);
  println(`${COLORS.green}   📁 Location: ${target}${COLORS.nc}`);
  println("");
  println(`${COLORS.yellow}${COLORS.bold}🚀 Next steps:${COLORS.nc}`);
  println(`${COLORS.blue}1.${COLORS.nc} cd "${target}"`);
  println(`${COLORS.blue}2.${COLORS.nc} ./compile.sh`);
  println(`${COLORS.blue}3.${COLORS.nc} lamdera live`);
  println(`${COLORS.blue}4.${COLORS.nc} Test login with: ${COLORS.bold}sys@admin.com${COLORS.nc} / ${COLORS.bold}admin${COLORS.nc}`);
  println("");
  println(`${COLORS.green}Happy coding! 🎉${COLORS.nc}`);
};

main().catch((err) => {
  console.error(`${COLORS.red}❌ Error: ${err?.message || err}${COLORS.nc}`);
  process.exit(1);
});

