import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      title: $t('组件'),
    },
    name: 'Components',
    path: '/components',
    children: [
      {
        meta: {
          title: $t('3DCarousel'),
        },
        name: '3DCarousel',
        path: '/components/3dCarousel',
        component: () => import('#/views/components/3d-carousel/index.vue'),
      },
    ],
  },
];

export default routes;
