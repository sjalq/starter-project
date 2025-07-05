# How to Publish to NPM

## Prerequisites

1. **NPM Account**: Create account at [npmjs.com](https://npmjs.com)
2. **Package Name**: Verify `lamdera-websocket` is available (or change name in package.json)
3. **Git Repository**: Push code to GitHub/GitLab for repository URL

## Quick Publish Steps

```bash
# 1. Login to npm
npm login

# 2. Update package.json with your details
# - Change "author" field
# - Update "repository.url" 
# - Verify package name availability

# 3. Build the package
npm run build

# 4. Test locally (optional)
npm pack  # Creates .tgz file for testing

# 5. Publish
npm publish
```

## Detailed Steps

### 1. Configure Package

Update `package.json`:
```json
{
  "name": "your-package-name",
  "author": "Your Name <email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/your-repo"
  }
}
```

### 2. Pre-publish Checklist

- [ ] README.md is complete and accurate
- [ ] Version number is correct (start with 1.0.0)
- [ ] All dependencies listed correctly
- [ ] TypeScript declarations work
- [ ] Both CommonJS and ESM builds work
- [ ] .npmignore excludes dev files

### 3. Version Management

```bash
# Patch version (1.0.0 → 1.0.1)
npm version patch

# Minor version (1.0.0 → 1.1.0)
npm version minor  

# Major version (1.0.0 → 2.0.0)
npm version major
```

### 4. Publishing

```bash
# First time publish
npm publish

# For scoped packages
npm publish --access public

# For beta versions
npm publish --tag beta
```

### 5. Verify Publication

```bash
# Check if published
npm view your-package-name

# Install in test project
npm install your-package-name
```

## Package Structure Generated

```
dist/
├── index.js      # CommonJS build
├── index.mjs     # ESM build  
└── index.d.ts    # TypeScript declarations

src/
├── index.js      # Source code
└── index.d.ts    # Type definitions
```

## Troubleshooting

**Package name taken**: Change name in package.json
**Permission denied**: Run `npm login` first
**Build fails**: Check Node.js version (requires 16+)
**TypeScript errors**: Verify .d.ts file syntax

## Updating

For updates:
1. Make changes
2. `npm version patch/minor/major`
3. `npm publish`

The package is now ready for `npm install lamdera-websocket`! 