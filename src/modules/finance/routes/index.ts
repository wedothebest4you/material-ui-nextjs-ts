/**
 * FINANCE MODULE ROUTE PUBLIC API
 *
 * Responsibility:
 * Exposes module pages to App layer.
 *
 * Architectural role:
 * Module Route Layer
 *
 * Rules:
 * - App must import ONLY from here
 * - Prevents App from accessing module internals
 */

export { LedgerCreateForm as LedgerCreatePage } from '../ui/LedgerCreateForm';
export { default as LedgerPage } from '../ui/LedgerListPage';
