# Publishing Guide for @solidexpert/ngx-rehydrate

This guide walks you through the process of publishing a new version of the `@solidexpert/ngx-rehydrate` library to npm.

## Prerequisites

Before you can publish, ensure:

1. ✅ You have npm publish permissions for the `@solidexpert` scope
2. ✅ The `NPM_TOKEN` secret is configured in GitHub (see [workflows README](.github/workflows/README.md))
3. ✅ All changes are committed and pushed to the repository
4. ✅ The build passes locally (`npm run build:rehydrate`)

## Publishing Steps

### Step 1: Update Version

Update the version in the library's `package.json`:

```bash
cd libs/solidexpert/ngx-rehydrate
npm version patch  # or minor, or major
```

This will update the version according to [semver](https://semver.org/):
- `patch` (1.0.0 → 1.0.1): Bug fixes
- `minor` (1.0.0 → 1.1.0): New features, backward compatible
- `major` (1.0.0 → 2.0.0): Breaking changes

### Step 2: Commit Version Change

```bash
git add libs/solidexpert/ngx-rehydrate/package.json
git commit -m "chore: bump @solidexpert/ngx-rehydrate to vX.X.X"
git push origin main
```

### Step 3: Create a GitHub Release

1. Go to your repository on GitHub
2. Click on **"Releases"** (right sidebar)
3. Click **"Draft a new release"**
4. Fill in the details:
   - **Tag**: Create a new tag (e.g., `ngx-rehydrate-v1.0.1`)
   - **Release title**: `@solidexpert/ngx-rehydrate v1.0.1`
   - **Description**: Add release notes (see template below)
5. Click **"Publish release"**

The GitHub Action will automatically trigger and publish to npm.

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

