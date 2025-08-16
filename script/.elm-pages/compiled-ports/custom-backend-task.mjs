// custom-backend-task.ts
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
var expandHome = (p) => p.startsWith("~") ? path.join(process.env.HOME || process.env.USERPROFILE || "", p.slice(1)) : p;
var resolveTargetPath = (inputPath, cleanName) => {
  const origCwd = process.env.EP_ORIG_CWD || process.cwd();
  const suggestion = path.resolve(origCwd, "..", cleanName);
  if (!inputPath || inputPath.trim() === "") return suggestion;
  const expanded = expandHome(inputPath.trim());
  if (path.isAbsolute(expanded)) return path.normalize(expanded);
  return path.resolve(origCwd, expanded);
};
async function defaultTarget(cleanName) {
  const origCwd = process.env.EP_ORIG_CWD || process.cwd();
  return path.resolve(origCwd, "..", cleanName);
}
async function cloneTo(args) {
  const repoRoot = path.resolve(process.cwd(), "..");
  const target = resolveTargetPath(args.target, args.cleanName);
  const rel = path.relative(repoRoot, target);
  const isInsideRepo = rel === "" || !rel.startsWith("..") && !path.isAbsolute(rel);
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
      `rsync -a --exclude ".git" --exclude ".gitmodules" --exclude "clone.sh" --exclude "script" "${repoRoot}/" "${target}/"`,
      { stdio: "inherit" }
    );
  } else {
    execSync(
      `bash -c 'shopt -s dotglob;         mkdir -p "${target}" &&         for f in "${repoRoot}"/*; do           base="$(basename "$f")";           if [ "$base" != ".git" ] && [ "$base" != ".gitmodules" ] && [ "$base" != "script" ]; then             cp -R "$f" "${target}/";           fi;         done'`,
      { stdio: "inherit" }
    );
  }
  execSync(`bash -c 'cd "${target}" && git init'`, { stdio: "ignore" });
  execSync(`bash -c 'cd "${target}" && git submodule add https://github.com/sjalq/auth.git auth'`, { stdio: "ignore" });
  execSync(
    `bash -c 'cd "${target}" && git submodule add https://github.com/sjalq/lamdera-websocket.git lamdera-websocket-package'`,
    { stdio: "ignore" }
  );
  execSync(`bash -c 'cd "${target}" && git submodule update --init --recursive'`, { stdio: "ignore" });
  try {
    execSync(`bash -c 'cd "${target}" && git add . && git commit -m "Initial commit from starter project with submodules"'`, {
      stdio: "ignore"
    });
  } catch {
  }
}
export {
  cloneTo,
  defaultTarget
};
