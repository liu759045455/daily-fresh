import axios from '@/axios';

export default {
  list(params) { // 查询产品列表请求
    return axios.get('/products/all', { params });
  },
  remove(params) { // 删除商品请求;
    return axios.delete(`/products/${params.id}`);
  },
};
