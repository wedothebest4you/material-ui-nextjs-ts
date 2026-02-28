/**
 * PLATFORM PUBLIC API
 *
 * Responsibility:
 * Defines the public entry point for Platform route adapters.
 *
 * Architectural role:
 * Platform Route Layer public surface
 *
 * Rules:
 * - App must import ONLY from this file
 * - Prevents direct access to internal platform implementation
 */

export { default as PlatformShell } from './shell/PlatformShell';
export { default as ShellLayout } from './shell/ShellLayout';
export { default as modules } from './services/ModuleRegistry';
export { default as PlatformRouteRenderer } from './routes/PlatformRouteRenderer';
