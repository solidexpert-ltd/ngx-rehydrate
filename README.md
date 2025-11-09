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

## Angular Compatibility

| Library version | Angular version |
| --------------- | ---------------- |
| `20.x.x`        | 20               |
| `19.x.x`        | 19               |

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

## Preventing Duplicate HTTP Requests

Use the `withTransferState` operator to prevent duplicate HTTP requests during SSR hydration:

```typescript
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferState } from '@angular/core';
import { withTransferState } from '@solidexpert/ngx-rehydrate';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private transferState = inject(TransferState);

  getUsers() {
    return this.http.get('/api/users').pipe(
      withTransferState('api-users', this.platformId, this.transferState)
    );
  }

  getUserById(id: string) {
    return this.http.get(`/api/users/${id}`).pipe(
      withTransferState(`api-user-${id}`, this.platformId, this.transferState)
    );
  }
}
```

**How it works:**
- **Server**: HTTP request is made and marked in TransferState
- **Browser (initial load)**: Request is skipped if already made on server
- **Browser (subsequent)**: Request proceeds normally

**Benefits:**
- ⚡ Reduces unnecessary API calls
- 🚀 Improves initial page load performance
- 💾 Saves bandwidth and server resources
- 🎯 Works seamlessly with NgRx Effects

### Advanced Usage with Helper Function

Create a base service with a helper method for cleaner code:

```typescript
@Injectable({ providedIn: 'root' })
export class BaseApiService {
  protected http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private transferState = inject(TransferState);

  // Helper method for transfer state
  protected withTransfer<T>(key: string) {
    return withTransferState<T>(key, this.platformId, this.transferState);
  }
}

@Injectable({ providedIn: 'root' })
export class UserService extends BaseApiService {
  getUsers() {
    return this.http.get<User[]>('/api/users').pipe(
      this.withTransfer('api-users')
    );
  }

  getPosts() {
    return this.http.get<Post[]>('/api/posts').pipe(
      this.withTransfer('api-posts')
    );
  }
}
```

### Usage with NgRx Effects

```typescript
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TransferState } from '@angular/core';
import { withTransferState } from '@solidexpert/ngx-rehydrate';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private platformId = inject(PLATFORM_ID);
  private transferState = inject(TransferState);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          withTransferState('users-list', this.platformId, this.transferState),
          map(users => UserActions.loadUsersSuccess({ users })),
          catchError(error => of(UserActions.loadUsersFailure({ error })))
        )
      )
    )
  );

  loadUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      switchMap(({ id }) =>
        this.userService.getUserById(id).pipe(
          withTransferState(`user-${id}`, this.platformId, this.transferState),
          map(user => UserActions.loadUserSuccess({ user })),
          catchError(error => of(UserActions.loadUserFailure({ error })))
        )
      )
    )
  );
}
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

### `withTransferState<T>(key, platformId, transferState)`

RxJS operator that prevents duplicate HTTP requests during SSR hydration.

**Parameters:**
- `key`: Unique identifier for the request
- `platformId`: Angular PLATFORM_ID injection token
- `transferState`: Angular TransferState service

**Returns:** `OperatorFunction<T, T>`

## Development

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines.

To build the library locally:

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Create package for testing
npm run pack
```

## Publishing

This library is automatically published to npm via GitHub Actions. See [Publishing Guide](.github/PUBLISHING.md) for details.

## Changelog

See [GitHub Releases](https://github.com/yourusername/ngx-rehydrate/releases) for version history.

## Support

- 📝 [Documentation](https://github.com/yourusername/ngx-rehydrate#readme)
- 🐛 [Report Issues](https://github.com/yourusername/ngx-rehydrate/issues)
- 💬 [Discussions](https://github.com/yourusername/ngx-rehydrate/discussions)

## License

MIT

Copyright (c) 2025 Solidexpert LTD

