import { ModuleRegistry } from '../services/ModuleRegistry';
import { FinanceModule } from '@/modules/finance/manifest';

let registered = false;

export function registerModules() {
  if (registered) return;
  ModuleRegistry.resgister(FinanceModule);
  registered = true;
}
