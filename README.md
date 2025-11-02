# @solidexpert/ngx-rehydrate

NgRx state rehydration library for Angular Universal SSR applications.

## Features

- 🚀 Seamless state transfer between server and browser
- 🔄 Configurable merge strategies for state rehydration
- 📦 Selective state slice rehydration
- 🛠️ Easy to integrate with existing NgRx applications
- 🎯 Full TypeScript support
- ⚡ Modern standalone API (no modules required)
- 🔧 Backward compatible with NgModule-based apps

## Installation

```bash
npm install @solidexpert/ngx-rehydrate
```

## Usage (Modern Standalone API)

### Browser Configuration

In your `app.config.ts`:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { 
  provideRehydrateBrowser, 
  MergeStrategy 
} from '@solidexpert/ngx-rehydrate';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(/* your reducers */),
    // Add rehydration
    provideRehydrateBrowser({
      stores: ['auth', 'user', 'settings'],
      mergeStrategy: MergeStrategy.OVERWRITE,
      disableWarnings: false,
    }),
  ],
};
```

### Server Configuration

In your `app.config.server.ts`:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideRehydrateServer } from '@solidexpert/ngx-rehydrate';
import { appConfig } from './app.config';

export const serverConfig: ApplicationConfig = {
  providers: [
    ...appConfig.providers,
    provideServerRendering(),
    provideRehydrateServer(),
  ],
};
```

### Feature-Level Rehydration

For lazy-loaded routes or features:

```typescript
import { Routes } from '@angular/router';
import { provideRehydrateFeature } from '@solidexpert/ngx-rehydrate';

export const routes: Routes = [
  {
    path: 'admin',
    providers: [
      provideRehydrateFeature(['adminUsers', 'adminSettings'])
    ],
    loadChildren: () => import('./admin/routes'),
  },
];
```

## Configuration Options

```typescript
interface RehydrationRootConfig {
  // Array of store slice names to rehydrate
  stores: string[] | undefined;
  
  // Disable console warnings
  disableWarnings: boolean;
  
  // Strategy for merging server and client state
  mergeStrategy: MergeStrategy;
}
```

## Merge Strategies

- `MergeStrategy.OVERWRITE`: Replace browser state with server state (recommended for most cases)
- `MergeStrategy.MERGE_OVER`: Merge server state over browser state (server wins on conflicts)
- `MergeStrategy.MERGE_UNDER`: Merge browser state over server state (browser wins on conflicts)

## Legacy NgModule-based API (Deprecated)

<details>
<summary>Click to expand legacy usage</summary>

### Browser Module (Deprecated)

```typescript
import { NgrxUniversalRehydrateBrowserModule } from '@solidexpert/ngx-rehydrate';

@NgModule({
  imports: [
    NgrxUniversalRehydrateBrowserModule.forRoot({
      stores: ['auth', 'user'],
      mergeStrategy: MergeStrategy.OVERWRITE,
    }),
  ],
})
export class AppModule {}
```

### Server Module (Deprecated)

```typescript
import { NgrxUniversalRehydrateServerModule } from '@solidexpert/ngx-rehydrate';

@NgModule({
  imports: [
    NgrxUniversalRehydrateServerModule.forServer(),
  ],
})
export class AppServerModule {}
```

**Note:** The NgModule-based API is deprecated. Please migrate to the standalone provider functions for better tree-shaking and simpler configuration.

</details>

## API Reference

### `provideRehydrateBrowser(config?)`

Provides rehydration for browser/client-side rendering.

**Parameters:**
- `config` (optional): Partial configuration object

**Returns:** `EnvironmentProviders`

### `provideRehydrateServer()`

Provides rehydration for server-side rendering.

**Returns:** `EnvironmentProviders`

### `provideRehydrateFeature(stores)`

Provides additional store slices for feature modules or lazy-loaded routes.

**Parameters:**
- `stores`: Array of store slice names

**Returns:** `EnvironmentProviders`

## Development

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines.

To build the library locally:

```bash
npm run build:rehydrate
```

## Publishing

This library is automatically published to npm via GitHub Actions. See [Publishing Guide](../../.github/PUBLISHING.md) for details.

## Changelog

See [GitHub Releases](https://github.com/yourusername/one-portal-angular/releases) for version history.

## Support

- 📝 [Documentation](https://github.com/yourusername/one-portal-angular/tree/main/libs/solidexpert/ngx-rehydrate)
- 🐛 [Report Issues](https://github.com/yourusername/one-portal-angular/issues)
- 💬 [Discussions](https://github.com/yourusername/one-portal-angular/discussions)

## License

MIT

Copyright (c) 2025 Solidexpert LTD

