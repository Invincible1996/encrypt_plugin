import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  exportStatic:{
    htmlSuffix: true,
    dynamicRoot: true,
  },
  locale: { antd: true },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
});
