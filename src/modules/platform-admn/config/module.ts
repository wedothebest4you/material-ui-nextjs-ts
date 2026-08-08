import { ModuleDefinition } from '@/shared/types/index';

export const platformAdmnModule: ModuleDefinition = {
  admn: {
    moduleDisplayName: 'Platform Admin.',
    routesbyId: {
      att: {
        routeId: 'att',
        parentId: null,
        lineItemId: 1,
        segment: '/platform-adm',
        fullPath: '/admn/platform-admm/tenant',
        component: () => import('../features/tenant/command/page'),
        shortDescription: 'Tenant',
        longDescription: 'Tenant workspace',
        showInNavigation: true,
      },
    },
    routesbyPath: {},
    navigation: {},
  },
};

// const dashboard: ModuleDefinition = {
//   dashboard: {
//     routesbyId: {
//       db1: {
//         routeId: 'db1',
//         parentId: null,
//         lineItemId: 1,
//         segment: '/',
//         fullPath: '/',
//         component: () => import('../ui/dashboard'),
//         shortDescription: 'ERP dashboard',
//         longDescription: 'ERP central dashboard',
//         showInNavigation: true,
//       },
//     },
//     routesbyPath: {},
//     navigation: {},
//   },
// };

export default platformAdmnModule;
