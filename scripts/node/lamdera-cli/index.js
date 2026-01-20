#!/usr/bin/env node

/**
 * Lamdera CLI - Tools for managing Lamdera applications
 *
 * Usage:
 *   node scripts/node/lamdera-cli/index.js logs           # Recent logs
 *   node scripts/node/lamdera-cli/index.js logs -f        # Tail/follow
 *   node scripts/node/lamdera-cli/index.js logs -f -r     # Resume tail from last position
 *   node scripts/node/lamdera-cli/index.js logs --env prod
 *   node scripts/node/lamdera-cli/index.js backup         # Backup model locally
 *   node scripts/node/lamdera-cli/index.js backup --env prod -o ./prod-backup.bin
 *   node scripts/node/lamdera-cli/index.js envs           # List environments
 */

import { program } from 'commander';
import { logsCommand } from './commands/logs.js';
import { backupCommand } from './commands/backup.js';
import { loadConfig, listEnvironments } from './lib/config.js';

// ============================================================================
// Constants
// ============================================================================

const RESET = '\x1b[0m';
const DIM = '\x1b[2m';
const BOLD = '\x1b[1m';
const CYAN = '\x1b[36m';

// ============================================================================
// Commands
// ============================================================================

program
  .name('lamdera-cli')
  .description('🦩 CLI tools for Lamdera starter project')
  .version('1.0.0');

// Logs command
program
  .command('logs')
  .description('📋 Fetch and display logs from backend')
  .option('-e, --env <name>', 'environment (local, prod, preview)')
  .option('-n, --limit <number>', 'number of logs to fetch', parseInt, 50)
  .option('-l, --level <level>', 'minimum log level (DEBUG, INFO, WARN, ERROR)')
  .option('-f, --follow', 'follow/tail mode - continuously poll for new logs')
  .option('-r, --resume', 'resume from last known position (use with -f)')
  .option('-i, --interval <ms>', 'poll interval in milliseconds', parseInt, 2000)
  .option('--no-color', 'disable colored output')
  .action(logsCommand);

// Backup command
program
  .command('backup')
  .description('📦 Backup BackendModel to a file')
  .option('-e, --env <name>', 'environment (local, prod, preview)')
  .option('-o, --output <path>', 'output file path (default: backups/backup-{env}-{timestamp}.bin)')
  .action(backupCommand);

// Envs command
program
  .command('envs')
  .description('🌍 List available environments')
  .action(() => {
    const config = loadConfig();
    const envs = listEnvironments(config);

    console.log(`${BOLD}Available Environments${RESET}\n`);

    if (config._configPath) {
      console.log(`${DIM}Config: ${config._configPath}${RESET}\n`);
    }

    envs.forEach(env => {
      const marker = env.isDefault ? `${CYAN}*${RESET}` : ' ';
      const defaultLabel = env.isDefault ? ` ${DIM}(default)${RESET}` : '';
      console.log(`  ${marker} ${BOLD}${env.name}${RESET}${defaultLabel}`);
      console.log(`    ${DIM}${env.url}${RESET}`);
    });

    console.log('');

    if (!config._configPath) {
      console.log(`${DIM}💡 No .lamdera-cli.json found - using defaults${RESET}`);
      console.log(`${DIM}   Copy .lamdera-cli.example.json to add prod/preview environments${RESET}`);
    }
  });

// Parse and execute
program.parse();
