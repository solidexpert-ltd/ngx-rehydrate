/*
 * Public API Surface of @solidexpert/ngx-rehydrate
 */

// Modern standalone providers (Recommended)
export * from './lib/browser';
export * from './lib/server';

// Core functionality
export * from './lib/reducers';
export * from './lib/store';
export * from './lib/tokens';
export * from './lib/utils';
export * from './lib/rehydration-logger';

// RxJS operators
export * from './lib/transfer-state.operator';

// Legacy NgModule-based API (Deprecated - use standalone providers instead)
/**
 * @deprecated Use `provideRehydrateBrowser()` instead
 */
export * from './lib/ngrx-universal-rehydrate-browser.module';

/**
 * @deprecated Use `provideRehydrateServer()` instead
 */
export * from './lib/ser';

