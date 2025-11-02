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

### Quick Method (3 steps):

```bash
# 1. Bump version
npm version patch  # or: minor, major

# 2. Commit and push
git add .
git commit -m "chore: bump to v1.0.1"
git push origin main

# 3. Create GitHub Release
# Go to: https://github.com/YOUR_ORG/ngx-rehydrate/releases/new
# Tag: v1.0.1
# Title: @solidexpert/ngx-rehydrate v1.0.1
# Click "Publish release"
```

🎉 GitHub Actions will automatically publish to npm!

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

## 📊 Version Types

- `npm version patch` → 1.0.0 → 1.0.1 (bug fixes)
- `npm version minor` → 1.0.0 → 1.1.0 (new features)
- `npm version major` → 1.0.0 → 2.0.0 (breaking changes)

## 🔍 Monitor

- **Workflow Status**: GitHub → Actions tab
- **npm Package**: https://npmjs.com/package/@solidexpert/ngx-rehydrate
- **Test Install**: `npm install @solidexpert/ngx-rehydrate@latest`

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

