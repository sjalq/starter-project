#!/usr/bin/env node
// Turns this checkout into your own live app on the sjalq.app box.
//
//   node scripts/node/new-app.js <name> [--team <team>]
//
// Creates the project on the box (it starts with the shared Auth0 config), makes
// you its SysAdmin (sysAdminEmail = your account) with a fresh modelKey, renames
// the kit, points the `lamdera` git remote at the box, commits and deploys.
// Prints https://<name>.sjalq.app. Needs `lam login` first. Safe to re-run.

'use strict'

const { spawnSync } = require('node:child_process')
const crypto = require('node:crypto')
const fs = require('node:fs')
const path = require('node:path')

const root = path.join(__dirname, '..', '..')
const say = (m) => process.stderr.write(m + '\n')
const fail = (m) => {
  say(`new-app: ${m}`)
  process.exit(1)
}

const run = (cmd, args, opts = {}) => spawnSync(cmd, args, { cwd: root, encoding: 'utf8', ...opts })

const api = (endpoint, body) => {
  const r = run('lam', ['api', endpoint, '-'], { input: JSON.stringify(body) })
  if (r.error) fail(`could not run lam: ${r.error.message}`)
  try {
    return JSON.parse(r.stdout)
  } catch {
    fail(`lam api ${endpoint} said: ${r.stdout || r.stderr}`)
  }
}

const args = process.argv.slice(2)
const name = args[0]
const teamAt = args.indexOf('--team')
const team = teamAt >= 0 ? args[teamAt + 1] : undefined

if (!name || !/^[a-z0-9-]{4,60}$/.test(name)) {
  fail('usage: node scripts/node/new-app.js <name> [--team <team>]   (4-60 chars of a-z, 0-9, -)')
}

// 1. Who am I? (also proves we're signed in)
const boot = api('agentBoot', {})
if (!boot.ok) fail(`${boot.error?.message} Run \`lam login\` first.`)
const email = boot.you.username

// 2. The project, with its own admin and model key. Re-runs keep the existing key.
const existing = api('agentProject', { project: name })
const modelKey = crypto.randomBytes(32).toString('hex')
const ops = [
  ...(existing.ok ? [] : [{ op: 'create_project', project: name, ...(team ? { team } : {}) }]),
  { op: 'set_env', project: name, key: 'sysAdminEmail', value: email, public: true },
  ...(existing.ok && existing.project.env.some((e) => e.key === 'modelKey')
    ? []
    : [{ op: 'set_env', project: name, key: 'modelKey', value: modelKey }]),
]
const applied = api('agentApply', { ops })
if (!applied.ok) fail(applied.error.message)
say(existing.ok ? `Project ${name} already exists; config updated.` : `Created project ${name}.`)

// Keep the model key locally (gitignored) so scripts/node/lamdera-cli can back up and read logs.
const cliConfig = path.join(root, '.lamdera-cli.json')
if (!fs.existsSync(cliConfig) && ops.some((o) => o.key === 'modelKey')) {
  fs.writeFileSync(
    cliConfig,
    JSON.stringify(
      {
        environments: {
          local: { url: 'http://localhost:8000', modelKey: '1234567890' },
          prod: { url: `https://${name}.sjalq.app`, modelKey },
        },
        defaultEnv: 'prod',
      },
      null,
      2,
    ) + '\n',
    { mode: 0o600 },
  )
}

// 3. Rename the kit.
const pkgPath = path.join(root, 'package.json')
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
pkg.name = name
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
fs.writeFileSync(path.join(root, '.lamdera-app'), name + '\n')
const headPath = path.join(root, 'head.html')
fs.writeFileSync(
  headPath,
  fs.readFileSync(headPath, 'utf8').replace(/content="A Lamdera application built with lamdera-starter-kit"/, `content="${name}"`),
)

// 4. Git: keep the kit as `template`, deploy through `lamdera`.
const remotes = run('git', ['remote']).stdout.split('\n')
if (remotes.includes('origin') && !remotes.includes('template')) run('git', ['remote', 'rename', 'origin', 'template'])
const remote = `lamdera-git@127.0.0.1:${name}.git`
if (run('git', ['remote']).stdout.split('\n').includes('lamdera')) run('git', ['remote', 'set-url', 'lamdera', remote])
else run('git', ['remote', 'add', 'lamdera', remote])
run('git', ['add', '-A'])
run('git', ['commit', '-q', '-m', `Start ${name} from the starter kit`])

// 5. Build and deploy.
const compiled = run('./compile.sh', [], { stdio: 'inherit' })
if (compiled.status !== 0) fail('./compile.sh failed; fix that, commit, then `lam deploy`.')
run('git', ['add', '-A'])
run('git', ['commit', '-q', '-m', 'Regenerate function index'])
const deployed = run('lam', ['deploy'], { stdio: 'inherit' })
if (deployed.status !== 0) fail('`lam deploy` failed; fix what it reports, commit, then `lam deploy` again.')

say(`\nLive: https://${name}.sjalq.app  (sign in with Google as ${email} for /admin)`)
