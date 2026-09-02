import { ModuleDefinition } from '@/shared/types/index';

export const platformAdmnModule: ModuleDefinition = {
  platformadm: {
    toplevelnav: {
      description: 'Platform Admin',
      children: ['dashboards', 'masters'],
    },
    dashboards: {
      description: 'Dashboards',
      children: ['1'],
    },
    masters: {
      description: 'Masters',
      children: ['2'],
    },
    1: {
      description: 'ERP central-view dashboard',
      fullPath: '/',
      component: () => import('../ui/dashboard'),
    },
    2: {
      description: 'Tenant Creation',
      fullPath: '/admn/platform-admm/tenant',
      component: () => import('../features/tenant/command/page'),
    },
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
