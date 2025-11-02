# GitHub Actions Workflows for @solidexpert/ngx-rehydrate

This directory contains GitHub Actions workflows for building and publishing the `@solidexpert/ngx-rehydrate` library to npm.

## Workflows

### 1. Build and Test (`build-rehydrate.yml`)

**Triggers:**
- Pull requests that modify the library code
- Pushes to `main` or `master` branches
- Manual trigger via workflow_dispatch

**What it does:**
- Builds the library on multiple Node.js versions (18, 20)
- Verifies the build output
- Uploads build artifacts for inspection
- Creates a build summary

### 2. Publish to npm (`publish-rehydrate.yml`)

**Triggers:**
- Every push to `master` or `main` branch
- Manual trigger via workflow_dispatch

**What it does:**
- Auto-generates version number: `{angularVersion}.{buildNumber}`
- Updates package.json with the new version
- Builds the library in production mode
- Publishes the package to npm with public access
- Creates a publish summary

**Version Format:**
- Extracts Angular version from `@angular/core` (e.g., `19.2.4`)
- Uses GitHub run number as build number
- Example: Angular 19.2.x + Build #42 = Version `19.2.42`

## Setup Instructions

### 1. Configure npm Token

To publish to npm, you need to add your npm token to GitHub Secrets:

1. Go to [npmjs.com](https://www.npmjs.com) and log in
2. Click on your profile → Access Tokens
3. Generate a new **Automation** token (or use an existing one)
4. Go to your GitHub repository → Settings → Secrets and variables → Actions
5. Click "New repository secret"
6. Name: `NPM_TOKEN`
7. Value: Paste your npm token
8. Click "Add secret"

### 2. Publishing Workflow

#### Automatic Publishing (Default)

**The library publishes automatically on every push to `master` or `main` branch.**

1. Make your changes
2. Commit and push:
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push origin master
   ```
3. The workflow automatically:
   - Generates version (e.g., `19.2.42`)
   - Builds the library
   - Publishes to npm

#### Manual Trigger (Optional)

1. Go to your GitHub repository → Actions
2. Click on "Publish @solidexpert/ngx-rehydrate to npm"
3. Click "Run workflow"
4. Select the branch
5. Click "Run workflow"

## Local Testing

Before publishing, test the build locally:

```bash
# Install dependencies
npm install

# Build the library
npm run build
# or
ng-packagr -p ng-package.json

# Navigate to build output
cd dist

# Test the package
npm pack

# The command above creates a .tgz file you can test in other projects
```

## Version Management

The library version is controlled in `libs/solidexpert/ngx-rehydrate/package.json`. 

When using the manual workflow dispatch, you can override the version by providing it as input.

## Troubleshooting

### Build Fails

- Ensure all dependencies are properly listed in `package.json`
- Check that TypeScript compilation succeeds locally
- Review the Angular configuration in `angular.json`

### Publish Fails

- Verify `NPM_TOKEN` secret is correctly set
- Ensure you have publish permissions for the `@solidexpert` scope
- Check that the version number hasn't been published before (npm doesn't allow republishing the same version)

### Package Not Found After Publishing

- npm packages can take a few minutes to be available after publishing
- Check the package page: https://www.npmjs.com/package/@solidexpert/ngx-rehydrate

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [npm Publishing Guide](https://docs.npmjs.com/cli/v8/commands/npm-publish)
- [ng-packagr Documentation](https://github.com/ng-packagr/ng-packagr)

