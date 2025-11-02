import { isPlatformServer } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/core';
import { Observable, OperatorFunction, Subscriber } from 'rxjs';
import { createOperatorSubscriber } from 'rxjs/internal/operators/OperatorSubscriber';

export function isFunction(value: any): value is (...args: any[]) => any {
    return typeof value === 'function';
}

/**
 * Used to determine if an object is an Observable with a lift function.
 */
export function hasLift(source: any): source is { lift: InstanceType<typeof Observable>['lift'] } {
    return isFunction(source?.lift);
}

/**
 * Creates an `OperatorFunction`. Used to define operators throughout the library in a concise way.
 * @param init The logic to connect the liftedSource to the subscriber at the moment of subscription.
 */
export function operate<T, R>(
    init: (liftedSource: Observable<T>, subscriber: Subscriber<R>) => (() => void) | void
): OperatorFunction<T, R> {
    return (source: Observable<T>) => {
        if (hasLift(source)) {
            return source.lift(function (this: Subscriber<R>, liftedSource: Observable<T>) {
                try {
                    return init(liftedSource, this);
                } catch (err) {
                    this.error(err);
                }
            });
        }
        throw new TypeError('Unable to lift unknown Observable type');
    };
}

/**
 * Internal filter function that manages transfer state keys
 * @internal
 */
function filter<T>(key: string, platformId: Object, transferState: TransferState): boolean {
    const stateKey = makeStateKey<T>(key);

    if (isPlatformServer(platformId)) {
        // On server: mark that this request was made
        transferState.set(stateKey, true as any);
        return true;
    }

    if (transferState.hasKey(stateKey)) {
        // On browser: if key exists, remove it and skip this request
        transferState.remove(stateKey);
        return false;
    }

    // On browser: if key doesn't exist, allow the request
    return true;
}

/**
 * RxJS operator that prevents duplicate HTTP requests during SSR hydration.
 * 
 * This operator uses Angular's TransferState to track which HTTP requests were made on the server.
 * On the browser, it skips the initial request if it was already made on the server, preventing
 * duplicate calls during hydration.
 * 
 * **How it works:**
 * - **Server**: Allows the request and marks it in TransferState
 * - **Browser (first load)**: Skips the request if it was made on server
 * - **Browser (subsequent)**: Allows the request normally
 * 
 * @param key Unique identifier for this request (e.g., 'api-users-list')
 * @param platformId Angular PLATFORM_ID to detect server/browser
 * @param transferState Angular TransferState service
 * @returns RxJS operator function
 * 
 * @example
 * Basic usage in a service:
 * ```typescript
 * import { inject, PLATFORM_ID } from '@angular/core';
 * import { HttpClient } from '@angular/common/http';
 * import { TransferState } from '@angular/core';
 * import { withTransferState } from '@solidexpert/ngx-rehydrate';
 * 
 * @Injectable({ providedIn: 'root' })
 * export class UserService {
 *   private http = inject(HttpClient);
 *   private platformId = inject(PLATFORM_ID);
 *   private transferState = inject(TransferState);
 * 
 *   getUsers() {
 *     return this.http.get('/api/users').pipe(
 *       withTransferState('api-users', this.platformId, this.transferState)
 *     );
 *   }
 * }
 * ```
 * 
 * @example
 * With NgRx Effects:
 * ```typescript
 * @Injectable()
 * export class UserEffects {
 *   private actions$ = inject(Actions);
 *   private userService = inject(UserService);
 *   private platformId = inject(PLATFORM_ID);
 *   private transferState = inject(TransferState);
 * 
 *   loadUsers$ = createEffect(() =>
 *     this.actions$.pipe(
 *       ofType(UserActions.loadUsers),
 *       switchMap(() =>
 *         this.userService.getUsers().pipe(
 *           withTransferState('users-list', this.platformId, this.transferState),
 *           map(users => UserActions.loadUsersSuccess({ users })),
 *           catchError(error => of(UserActions.loadUsersFailure({ error })))
 *         )
 *       )
 *     )
 *   );
 * }
 * ```
 * 
 * @example
 * With parameters in the key:
 * ```typescript
 * getUserById(id: string) {
 *   return this.http.get(`/api/users/${id}`).pipe(
 *     withTransferState(`api-user-${id}`, this.platformId, this.transferState)
 *   );
 * }
 * ```
 * 
 * @example
 * Helper function for cleaner code:
 * ```typescript
 * @Injectable({ providedIn: 'root' })
 * export class ApiService {
 *   private http = inject(HttpClient);
 *   private platformId = inject(PLATFORM_ID);
 *   private transferState = inject(TransferState);
 * 
 *   // Helper method
 *   private withTransfer<T>(key: string) {
 *     return withTransferState<T>(key, this.platformId, this.transferState);
 *   }
 * 
 *   getUsers() {
 *     return this.http.get('/api/users').pipe(
 *       this.withTransfer('api-users')
 *     );
 *   }
 * 
 *   getPosts() {
 *     return this.http.get('/api/posts').pipe(
 *       this.withTransfer('api-posts')
 *     );
 *   }
 * }
 * ```
 * 
 * @see {@link https://angular.io/api/platform-browser/TransferState TransferState Documentation}
 * @see {@link https://angular.io/guide/universal Angular Universal Guide}
 */
export function withTransferState<T>(
    key: string,
    platformId: Object,
    transferState: TransferState
): OperatorFunction<T, T> {
    return operate((source, subscriber) => {
        // Subscribe to the source, all errors and completions are forwarded to the consumer
        source.subscribe(
            createOperatorSubscriber(
                subscriber,
                (value) => filter(key, platformId, transferState) && subscriber.next(value)
            )
        );
    });
}

