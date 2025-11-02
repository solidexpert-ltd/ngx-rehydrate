import { isPlatformServer } from '@angular/common';
import { APP_INITIALIZER, EnvironmentProviders, PLATFORM_ID, Provider, TransferState, inject, makeEnvironmentProviders } from '@angular/core';
import { META_REDUCERS, Store, provideState } from '@ngrx/store';
import { browserRehydrateReducer } from './reducers';
import { RehydrationLogger } from './rehydration-logger';
import { addSlice, rehydrateFeature } from './store';
import { REHYDRATE_ROOT_CONFIG } from './tokens';
import { RehydrationRootConfig, defaultRehydrationRootConfig } from './utils';

/**
 * Provides NgRx state rehydration for browser
 * 
 * @param config Configuration for rehydration
 * @returns Environment providers for rehydration
 * 
 * @example
 * ```typescript
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideRehydrateBrowser({
 *       stores: ['auth', 'user', 'settings'],
 *       mergeStrategy: MergeStrategy.OVERWRITE,
 *     }),
 *   ],
 * };
 * ```
 */
export function provideRehydrateBrowser(
    config: Partial<RehydrationRootConfig> = {}
): EnvironmentProviders {
    const mergedConfig = {
        ...defaultRehydrationRootConfig,
        ...config,
    };

    const providers: (Provider | EnvironmentProviders)[] = [
        // Provide the rehydrate configuration
        {
            provide: REHYDRATE_ROOT_CONFIG,
            useValue: mergedConfig,
        },
        // Provide the rehydrate feature reducer
        provideState(rehydrateFeature),
        // Provide the meta-reducer for rehydration
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
                const rehydrateConfig = inject(REHYDRATE_ROOT_CONFIG);

                return () => {
                    if (isPlatformServer(platformId)) {
                        console.log('adding slices', rehydrateConfig.stores);
                        store.dispatch(addSlice({ slices: rehydrateConfig.stores ?? [] }));
                    }
                };
            },
            multi: true,
        },
        // Provide the rehydration logger
        RehydrationLogger,
    ];

    return makeEnvironmentProviders(providers);
}

/**
 * Provides additional store slices for rehydration
 * Use this in lazy-loaded routes or feature modules
 * 
 * @param stores Array of store slice names to rehydrate
 * @returns Environment providers
 * 
 * @example
 * ```typescript
 * export const routes: Routes = [
 *   {
 *     path: 'admin',
 *     providers: [
 *       provideRehydrateFeature(['adminUsers', 'adminSettings'])
 *     ],
 *     loadChildren: () => import('./admin/routes'),
 *   },
 * ];
 * ```
 */
export function provideRehydrateFeature(stores: string[]): EnvironmentProviders {
    const providers: (Provider | EnvironmentProviders)[] = [
        {
            provide: APP_INITIALIZER,
            useFactory: () => {
                const platformId = inject(PLATFORM_ID);
                const store = inject(Store);

                return () => {
                    if (isPlatformServer(platformId)) {
                        store.dispatch(addSlice({ slices: stores }));
                    }
                };
            },
            multi: true,
        },
    ];

    return makeEnvironmentProviders(providers);
}

