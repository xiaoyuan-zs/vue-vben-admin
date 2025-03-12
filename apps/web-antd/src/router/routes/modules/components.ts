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
          title: $t('demos.components.carousel'),
        },
        name: 'Carousel',
        path: '/components/carousel',
        component: () => import('#/views/components/carousel/index.vue'),
      },
      {
        meta: {
          title: $t('demos.components.photo-wall'),
        },
        name: 'PhotoWall',
        path: '/components/photo-wall',
        component: () => import('#/views/components/photo-wall/index.vue'),
      },
    ],
  },
];

export default routes;
