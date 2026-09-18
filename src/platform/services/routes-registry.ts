import { financeModuleDefinition } from '@/finance/index';
import { platformAdmnModule } from '@/admn/index';
import { ModuleDefinition } from '@/src/shared';

const RoutesRegistry: ModuleDefinition = {
  erp: {
    toplevelnav: {
      kind: 'group',
      description: 'erp all',
      // children: ['finance', 'platformadm'],
      children: ['platformadm'],
    },
  },
  // ...financeModuleDefinition,
  ...platformAdmnModule,
};

export default RoutesRegistry;
