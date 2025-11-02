# Contributing to @solidexpert/ngx-rehydrate

Thank you for your interest in contributing! This document provides guidelines for developing and contributing to this library.

## Development Setup

### Prerequisites

- Node.js 18 or 20
- npm 9+
- Angular CLI

### Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd one-portal-angular
```

2. Install dependencies:

```bash
npm install
```

3. Build the library:

```bash
npm run build:rehydrate
```

## Making Changes

### Project Structure

```
libs/solidexpert/ngx-rehydrate/
├── src/
│   ├── lib/
│   │   ├── browser.ts              # Browser-side providers
│   │   ├── server.ts               # Server-side providers
│   │   ├── reducers.ts             # State merge logic
│   │   ├── store.ts                # State transfer utilities
│   │   ├── tokens.ts               # Injection tokens
│   │   └── utils.ts                # Helper functions
│   └── public-api.ts               # Public API surface
├── package.json                     # Package configuration
├── ng-package.json                  # ng-packagr configuration
├── tsconfig.lib.json                # TypeScript config
└── README.md                        # Documentation
```

### Development Workflow

1. Make your changes in the `src/lib/` directory
2. Build the library to test:

```bash
npm run build:rehydrate
```

3. Test the build output:

```bash
cd dist/solidexpert/ngx-rehydrate
npm pack
# This creates a .tgz file you can install in test projects
```

4. Test in a real application (recommended):

```bash
# In your test Angular app
npm install /path/to/dist/solidexpert/ngx-rehydrate
```

### Code Style

- Follow Angular style guide
- Use TypeScript strict mode
- Write clear, descriptive comments
- Keep functions small and focused

## Testing

Currently, the library doesn't have automated tests. When adding new features:

1. Test manually in a real Angular SSR application
2. Verify both browser and server rendering work correctly
3. Test different merge strategies
4. Test with lazy-loaded modules

## Building for Production

Before submitting a PR, ensure the production build succeeds:

```bash
npm run build:rehydrate
```

Check the output in `dist/solidexpert/ngx-rehydrate/` for:
- ✅ Proper TypeScript declarations (`.d.ts` files)
- ✅ ES2022 modules
- ✅ Metadata files for Angular
- ✅ README and LICENSE files

## Submitting Changes

### Pull Request Process

1. Create a feature branch:

```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit:

```bash
git add .
git commit -m "feat: add new feature"
```

Use conventional commit messages:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

3. Push your branch:

```bash
git push origin feature/your-feature-name
```

4. Open a Pull Request on GitHub

### PR Guidelines

- Include a clear description of the changes
- Reference any related issues
- Ensure the build passes
- Update documentation if needed
- Add examples for new features

## Release Process

Releases are handled by maintainers. See [PUBLISHING.md](../../.github/PUBLISHING.md) for details.

## Questions?

- Open an issue for bugs or feature requests
- Use discussions for questions
- Contact maintainers directly for sensitive issues

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

