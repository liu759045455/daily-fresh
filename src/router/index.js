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
    icon: 'inbox',
    hidden: false,
  },
  component: Home,
  children: [{
    path: 'list',
    name: 'ProductList',
    meta: {
      title: '商品列表',
      icon: 'unordered-list',
      hidden: false,
    },
    component: () => import('@/views/page/ProductList.vue'),
  }, {
    path: 'add',
    name: 'ProductAdd',
    meta: {
      title: '新增商品',
      icon: 'file-add',
      hidden: false,
    },
    component: () => import('@/views/page/ProductAdd.vue'),
  }, {
    path: 'category',
    name: 'Category',
    meta: {
      title: '类目管理',
      icon: 'project',
      hidden: false,
    },
    component: () => import('@/views/page/category.vue'),
  }],
}];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: { name: 'Index' },
    meta: {
      title: '首页',
      icon: 'home',
      hidden: false,
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        meta: {
          title: '统计',
          hidden: false,
          icon: 'number',
        },
        component: () => import('../views/page/index.vue'),
      }],
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登陆',
      hidden: true,
    },
    component: Login,
  },
];

const router = new VueRouter({
  routes,
});
let isAddRoutes = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.user.appkey && store.state.user.username && store.state.user.role) {
      if (!isAddRoutes) {
        const menuRoutes = getMenuRouters(store.state.user.role, asyncRouterMap);
        store.dispatch('changeMenuRouter', routes.concat(menuRoutes)).then(() => {
          router.addRoutes(menuRoutes);
          next();
        });
        isAddRoutes = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
