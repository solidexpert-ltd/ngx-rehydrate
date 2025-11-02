# Publishing Guide for @solidexpert/ngx-rehydrate

This guide walks you through the process of publishing a new version of the `@solidexpert/ngx-rehydrate` library to npm.

## 🚀 Automatic Publishing (Default)

**The library automatically publishes on every push to `master` or `main` branch!**

### Prerequisites

1. ✅ You have npm publish permissions for the `@solidexpert` scope
2. ✅ The `NPM_TOKEN` secret is configured in GitHub (see [workflows README](workflows/README.md))
3. ✅ The build passes locally (`npm run build`)

### Publishing Steps

**Just push to master:**

```bash
# 1. Make your changes
git add .
git commit -m "feat: add new feature"

# 2. Push to master
git push origin master
```

That's it! The workflow will automatically:
1. Generate version number (e.g., `19.2.42`)
2. Build the library
3. Publish to npm

### Version Numbering

Versions are **automatically generated** in the format:

```
{angularMajor}.{angularMinor}.{buildNumber}
```

**Example:**
- Angular version in `package.json`: `19.2.4`
- GitHub Actions build #42
- Published version: **`19.2.42`**

**The version increases automatically with each push!**

### When You Update Angular

When you update Angular in `devDependencies`, the version automatically adjusts:

```bash
# Before: Angular 19.2.x → Publishing v19.2.42
npm install @angular/core@20.0.0
git commit -m "chore: update to Angular 20"
git push origin master
# After: Angular 20.0.x → Publishing v20.0.43 (next build)
```

The version major/minor follows Angular, while patch follows your build number!

## 📋 Manual Publishing (Optional)

You can also trigger publishing manually without pushing:

1. Go to your GitHub repository → Actions
2. Click on "Publish @solidexpert/ngx-rehydrate to npm"
3. Click "Run workflow"
4. Select the branch (usually `master`)
5. Click "Run workflow"

The same automatic versioning applies.

### Release Notes Template

```markdown
## What's Changed

### Features
- ✨ Add new feature X
- ✨ Improve Y functionality

### Bug Fixes
- 🐛 Fix issue with Z
- 🐛 Resolve problem in A

### Documentation
- 📝 Update README with examples
- 📝 Add migration guide

### Dependencies
- ⬆️ Update Angular to v19.2.4
- ⬆️ Update @ngrx/store to v19.1.0

**Full Changelog**: https://github.com/yourusername/one-portal-angular/compare/ngx-rehydrate-v1.0.0...ngx-rehydrate-v1.0.1
```

## Manual Publishing (Alternative)

If you need to publish manually without creating a release:

1. Go to **Actions** tab on GitHub
2. Select **"Publish @solidexpert/ngx-rehydrate to npm"**
3. Click **"Run workflow"**
4. Select the branch (usually `main`)
5. Optionally enter a version number
6. Click **"Run workflow"**

## Verifying the Publication

After publishing, verify the package:

1. Check npm: https://www.npmjs.com/package/@solidexpert/ngx-rehydrate
2. Test installation:

```bash
npm install @solidexpert/ngx-rehydrate@latest
```

3. View package contents:

```bash
npm view @solidexpert/ngx-rehydrate
```

## Troubleshooting

### Error: Version already published

npm doesn't allow republishing the same version. You need to bump the version number.

```bash
cd libs/solidexpert/ngx-rehydrate
npm version patch
```

### Error: 403 Forbidden

- Check that `NPM_TOKEN` is correctly set in GitHub Secrets
- Verify you have publish permissions for the `@solidexpert` scope
- Ensure the token hasn't expired

### Error: Package not found after publishing

Wait a few minutes. npm's CDN can take time to propagate changes globally.

### Build fails in CI

1. Run build locally first: `npm run build:rehydrate`
2. Check the Action logs for specific errors
3. Ensure all dependencies are listed in `peerDependencies` or `dependencies`

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0   | TBD  | Initial release |

## Best Practices

1. **Test before publishing**: Always run `npm run build:rehydrate` locally
2. **Write clear release notes**: Help users understand what changed
3. **Follow semantic versioning**: Breaking changes require major version bumps
4. **Keep a changelog**: Update CHANGELOG.md with each release
5. **Tag appropriately**: Use consistent tag naming (`ngx-rehydrate-vX.X.X`)

## Need Help?

- Check the [GitHub Actions logs](../../actions)
- Review the [workflows README](workflows/README.md)
- Contact the maintainers

---

**Last updated**: November 2, 2025

