import { financeModuleDefinition } from '@/finance/index';
import { platformAdmnModule } from '@/admn/index';
import { ModuleDefinition } from '@/src/shared';

const RoutesRegistry: ModuleDefinition = {
  erp: {
    toplevelnav: {
      description: 'erp all',
      children: ['finance', 'platformadm'],
    },
  },
  ...financeModuleDefinition,
  ...platformAdmnModule,
};

export default RoutesRegistry;
