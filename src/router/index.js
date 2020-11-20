import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import getMenuRouters from '@/utils/permission';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';

Vue.use(VueRouter);

const asyncRouterMap = [{
  path: '/product',
  name: 'Product',
  meta: {
    title: '商品',
  },
  component: Home,
  children: [{
    path: 'list',
    name: 'ProdictionList',
    meta: {
      title: '商品列表',
    },
    component: () => import('@/views/page/ProdictionList.vue'),
  }, {
    path: 'add',
    name: 'ProduciontAdd',
    meta: {
      title: '新增商品',
    },
    component: () => import('@/views/page/ProduciontAdd.vue'),
  }, {
    path: 'category',
    name: 'Category',
    meta: {
      title: '管理商品',
    },
    component: () => import('@/views/page/category.vue'),
  }],
}];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        meta: {
          title: '统计',
        },
        component: () => import('../views/page/Index.vue'),
      }],
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登陆',
    },
    component: Login,
  },
];

const router = new VueRouter({
  routes,
});
const isAddRoutes = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.user.appkey && store.state.user.username && store.state.user.role) {
      if (!isAddRoutes) {
        const menuRoutes = getMenuRouters(store.state.user.role, asyncRouterMap);
        router.addRoutes(menuRoutes);
        store.dispatch('changeMenuRouter', routes.concat(menuRoutes));
        // isAddRoutes = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
