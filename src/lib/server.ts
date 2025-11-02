import { APP_BOOTSTRAP_LISTENER, EnvironmentProviders, Provider, TransferState, inject, makeEnvironmentProviders } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { selectStateToTransfer } from './store';
import { REHYDRATE_TRANSFER_STATE } from './tokens';

/**
 * Provides NgRx state rehydration for server-side rendering
 * 
 * This provider sets up the necessary hooks to transfer state from the server to the client
 * during Angular Universal SSR.
 * 
 * @returns Environment providers for server-side rehydration
 * 
 * @example
 * ```typescript
 * // app.config.server.ts
 * export const serverConfig: ApplicationConfig = {
 *   providers: [
 *     provideServerRendering(),
 *     provideRehydrateServer(),
 *   ],
 * };
 * ```
 */
export function provideRehydrateServer(): EnvironmentProviders {
    const providers: Provider[] = [
        {
            provide: APP_BOOTSTRAP_LISTENER,
            multi: true,
            useFactory: () => {
                const store = inject(Store);
                const transferState = inject(TransferState);

                return async () => {
                    try {
                        const state = await store
                            .select(selectStateToTransfer)
                            .pipe(take(1))
                            .toPromise();

                        if (state) {
                            transferState.set(REHYDRATE_TRANSFER_STATE, state);
                        }
                    } catch (error) {
                        console.error('Error transferring state:', error);
                    }
                };
            },
        },
    ];

    return makeEnvironmentProviders(providers);
}

