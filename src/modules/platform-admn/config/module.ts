import { ModuleDefinition } from '@/shared/types/index';

export const platformAdmnModule: ModuleDefinition = {
  platformadm: {
    toplevelnav: {
      kind: 'group',
      description: 'Platform Admin',
      children: ['dashboards', 'masters'],
    },
    dashboards: {
      kind: 'group',
      description: 'Dashboards',
      children: ['1'],
    },
    masters: {
      kind: 'group',
      description: 'Masters',
      children: ['2'],
    },
    1: {
      kind: 'route',
      description: 'ERP central-view dashboard',
      routePath: '/',
      component: () => import('../ui/dashboard'),
    },
    2: {
      kind: 'route',
      description: 'Tenant Creation',
      routePath: '/admn/platform-admm/tenant',
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
