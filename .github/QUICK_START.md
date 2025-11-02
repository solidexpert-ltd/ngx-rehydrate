# Quick Start: Publishing @solidexpert/ngx-rehydrate

## 🚀 One-Time Setup

### Step 1: Add npm Token to GitHub

```bash
1. Go to npmjs.com → Settings → Access Tokens → Generate New Token
2. Select "Automation" token type
3. Copy the token
4. Go to GitHub Repository → Settings → Secrets and variables → Actions
5. Click "New repository secret"
6. Name: NPM_TOKEN
7. Paste your token
8. Click "Add secret"
```

✅ Done! You only need to do this once.

### Step 2: Install Dependencies

```bash
npm install
```

## 📦 Publishing a New Version

### Automatic Publishing (Every Push to Master)

**The library automatically publishes on every push to `master` branch!**

Version number is auto-generated as: `{angularVersion}.{buildNumber}`

**Example:**
- Angular version: `19.2.4`
- Build #42
- Published version: `19.2.42`

```bash
# Just commit and push your changes
git add .
git commit -m "feat: add new feature"
git push origin master
```

🎉 GitHub Actions will automatically:
1. Generate version number (e.g., `19.2.42`)
2. Build the library
3. Publish to npm

### Manual Publishing

You can also trigger publishing manually:

1. Go to GitHub → Actions
2. Select "Publish @solidexpert/ngx-rehydrate to npm"
3. Click "Run workflow"
4. Select branch
5. Click "Run workflow"

## 🧪 Test Build Locally

```bash
# Install dependencies (if not already done)
npm install

# Build library
npm run build

# Check output
ls -la dist/

# Create test package
cd dist
npm pack
```

## 📊 Version Numbering

Versions are automatically generated based on:
- **Angular version**: Extracted from `@angular/core` in `devDependencies`
- **Build number**: GitHub Actions run number

**Format:** `{angularMajor}.{angularMinor}.{buildNumber}`

**Examples:**
- Angular 19.2.x + Build #1 → `19.2.1`
- Angular 19.2.x + Build #50 → `19.2.50`
- Angular 20.0.x + Build #100 → `20.0.100`

## 🔍 Monitor

- **Workflow Status**: GitHub → Actions tab
- **npm Package**: https://npmjs.com/package/@solidexpert/ngx-rehydrate
- **Latest Version**: `npm view @solidexpert/ngx-rehydrate version`
- **Install Latest**: `npm install @solidexpert/ngx-rehydrate@latest`

## 📖 Full Documentation

- [Setup Summary](.github/SETUP_SUMMARY.md) - Complete overview
- [Publishing Guide](.github/PUBLISHING.md) - Detailed instructions
- [Workflows README](.github/workflows/README.md) - Workflow details
- [Contributing](../libs/solidexpert/ngx-rehydrate/CONTRIBUTING.md) - Development guide

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Version already exists | Run `npm version patch` |
| NPM_TOKEN error | Check GitHub Secrets settings |
| Build fails | Run `npm run build:rehydrate` locally first |
| Package not found | Wait 2-5 minutes after publishing |

---

**Need Help?** See [SETUP_SUMMARY.md](SETUP_SUMMARY.md) for detailed instructions.

