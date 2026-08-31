import { financeModuleDefinition } from '@/finance/index';
import { platformAdmnModule } from '@/admn/index';
import { ModuleDefinition } from '@/src/shared';

const RoutesRegistry: ModuleDefinition = {
  ...financeModuleDefinition,
  ...platformAdmnModule,
};

export default RoutesRegistry;
