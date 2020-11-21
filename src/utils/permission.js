// 存储角色对应关系  对应权限名称
const roleToRouter = {
  coustomer: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }, {
    name: 'ProductEdit',
  }],
  admin: [{
    name: 'Product',
  }, {
    name: 'ProdictionList',
  }, {
    name: 'ProduciontAdd',
  }, {
    name: 'ProductEdit',
  }, {
    name: 'Category',
  }],
};

/**
 * 过滤掉没有权限的路由
 * @param {String} role
 * @param {Array} routes
 */
export default function getMenuRouter(role, routes) {
  const allowRouterName = roleToRouter[role].map((item) => item.name);
  const resultRoutes = routes.filter((item) => {
    const obj = item;
    if (allowRouterName.indexOf(item.name) !== -1) {
      const { children } = item;
      obj.children = children.filter((it) => allowRouterName.indexOf(it.name) !== -1);
      return true;
    }
    return false;
  });
  return resultRoutes;
}
