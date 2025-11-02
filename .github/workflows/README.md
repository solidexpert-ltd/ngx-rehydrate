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
- When a new GitHub release is created
- Manual trigger via workflow_dispatch (with optional version input)

**What it does:**
- Builds the library in production mode
- Publishes the package to npm with public access
- Creates a publish summary

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

#### Option A: Using GitHub Releases (Recommended)

1. Update the version in `package.json`
2. Commit and push the changes
3. Go to your GitHub repository → Releases
4. Click "Create a new release"
5. Create a new tag (e.g., `v1.0.1`)
6. Add release notes
7. Click "Publish release"
8. The workflow will automatically build and publish to npm

#### Option B: Manual Trigger

1. Go to your GitHub repository → Actions
2. Click on "Publish @solidexpert/ngx-rehydrate to npm"
3. Click "Run workflow"
4. Optionally specify a version (e.g., `1.0.1`)
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

