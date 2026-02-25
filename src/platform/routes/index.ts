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

export { PlatformLayout } from './PlatformLayout';
