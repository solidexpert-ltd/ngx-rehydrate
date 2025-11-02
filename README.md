# @solidexpert/ngx-rehydrate

NgRx state rehydration library for Angular Universal SSR applications.

## Features

- 🚀 Seamless state transfer between server and browser
- 🔄 Configurable merge strategies for state rehydration
- 📦 Selective state slice rehydration
- 🛠️ Easy to integrate with existing NgRx applications
- 🎯 TypeScript support

## Installation

```bash
npm install @solidexpert/ngx-rehydrate
```

## Usage

### Browser Configuration

In your `app.config.ts` (or `app.module.ts` for module-based apps):

```typescript
import { 
  MergeStrategy, 
  RehydrationRootConfig,
  browserRehydrateReducer,
  REHYDRATE_ROOT_CONFIG,
  rehydrateFeature,
  addSlice,
  RehydrationLogger
} from '@solidexpert/ngx-rehydrate';

// Configure which store slices to rehydrate
const rehydrateConfig: RehydrationRootConfig = {
  stores: ['auth', 'user', 'settings'],
  mergeStrategy: MergeStrategy.OVERWRITE,
  disableWarnings: false,
};

export const appConfig: ApplicationConfig = {
  providers: [
    // Provide rehydrate configuration
    {
      provide: REHYDRATE_ROOT_CONFIG,
      useValue: rehydrateConfig,
    },
    // Add rehydrate feature to store
    provideStore({
      [rehydrateFeature.name]: rehydrateFeature.reducer,
    }),
    // Add rehydrate meta-reducer
    {
      provide: META_REDUCERS,
      deps: [PLATFORM_ID, TransferState, REHYDRATE_ROOT_CONFIG],
      useFactory: browserRehydrateReducer,
      multi: true,
    },
    // Initialize slices on server
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        const platformId = inject(PLATFORM_ID);
        const store = inject(Store);
        const config = inject(REHYDRATE_ROOT_CONFIG);
        
        return () => {
          if (isPlatformServer(platformId)) {
            store.dispatch(addSlice({ slices: config.stores ?? [] }));
          }
        };
      },
      multi: true,
    },
    RehydrationLogger,
  ],
};
```

### Server Configuration

In your `app.config.server.ts`:

```typescript
import { NgrxUniversalRehydrateServerModule } from '@solidexpert/ngx-rehydrate';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    importProvidersFrom(NgrxUniversalRehydrateServerModule.forServer()),
  ]
};
```

## Merge Strategies

- `MergeStrategy.OVERWRITE`: Replace browser state with server state
- `MergeStrategy.MERGE_OVER`: Merge server state over browser state (server wins)
- `MergeStrategy.MERGE_UNDER`: Merge browser state over server state (browser wins)

## License

MIT

