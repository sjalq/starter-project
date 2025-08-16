import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const expandHome = (p: string): string => (p.startsWith("~") ? path.join(process.env.HOME || process.env.USERPROFILE || "", p.slice(1)) : p);

const resolveTargetPath = (inputPath: string, cleanName: string): string => {
  const origCwd = process.env.EP_ORIG_CWD || process.cwd();
  const suggestion = path.resolve(origCwd, "..", cleanName);
  if (!inputPath || inputPath.trim() === "") return suggestion;
  const expanded = expandHome(inputPath.trim());
  if (path.isAbsolute(expanded)) return path.normalize(expanded);
  return path.resolve(origCwd, expanded);
};

export async function defaultTarget(cleanName: string): Promise<string> {
  const origCwd = process.env.EP_ORIG_CWD || process.cwd();
  return path.resolve(origCwd, "..", cleanName);
}

export async function cloneTo(args: { target: string; cleanName: string }): Promise<void> {
  const repoRoot = path.resolve(process.cwd(), "..");

  const target = resolveTargetPath(args.target, args.cleanName);

  // Prevent creating inside the starter-project repo
  const rel = path.relative(repoRoot, target);
  const isInsideRepo = rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
  if (isInsideRepo) {
    const suggestion = path.resolve(repoRoot, "..", args.cleanName);
    throw new Error(
      `Refusing to create inside the starter-project repo. Choose a path outside. For example: ${suggestion}`
    );
  }

  fs.mkdirSync(target, { recursive: true });

  let hasRsync = true;
  try {
    execSync("rsync --version", { stdio: "ignore" });
  } catch {
    hasRsync = false;
  }

  if (hasRsync) {
    execSync(
      `rsync -a --exclude ".git" --exclude ".gitmodules" --exclude "clone.sh" --exclude "clone.ps1" --exclude "script" --exclude "scripts" "${repoRoot}/" "${target}/"`,
      { stdio: "inherit" }
    );
  } else {
    execSync(
      `bash -c 'shopt -s dotglob; \
        mkdir -p "${target}" && \
        for f in "${repoRoot}"/*; do \
          base="$(basename "$f")"; \
          if [ "$base" != ".git" ] && [ "$base" != ".gitmodules" ] && [ "$base" != "clone.sh" ] && [ "$base" != "clone.ps1" ] && [ "$base" != "script" ] && [ "$base" != "scripts" ]; then \
            cp -R "$f" "${target}/"; \
          fi; \
        done'`,
      { stdio: "inherit" }
    );
  }

  execSync(`bash -c 'cd "${target}" && git init'`, { stdio: "ignore" });
  
  // Copy auth and lamdera-websocket directly instead of submodules
  if (fs.existsSync(path.join(repoRoot, 'auth'))) {
    execSync(`cp -R "${repoRoot}/auth" "${target}/auth"`, { stdio: "inherit" });
  }
  if (fs.existsSync(path.join(repoRoot, 'lamdera-websocket-package'))) {
    execSync(`cp -R "${repoRoot}/lamdera-websocket-package" "${target}/lamdera-websocket-package"`, { stdio: "inherit" });
  }
  try {
    execSync(`bash -c 'cd "${target}" && git add . && git commit -m "Initial commit from starter project with submodules"'`, {
      stdio: "ignore",
    });
  } catch {}
}
