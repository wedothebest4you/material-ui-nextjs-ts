import { ModuleDefinition } from '@/shared/types/index';

export const platformModule: ModuleDefinition = {
  finance: {
    routesbyId: {
      pft: {
        routeId: 'pft',
        parentId: null,
        lineItemId: 1,
        segment: 'platform',
        fullPath: '/platform',
        component: () =>
          import('@/modules/platform/features/tenant/command/workspace.jsx'),
        shortDescription: 'Finance dashboard',
        longDescription: 'Finance operational dashboard',
        showInNavigation: true,
      },
    },
    routesbyPath: {},
    navigation: {},
  },
};

export default platformModule;
