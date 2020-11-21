import axios from 'axios';
import store from './store';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/',
});

instance.interceptors.request.use((config) => {
  if (config.url.includes('/passport')) {
    return config;
  }
  return {
    ...config,
    params: { // params对象会将请求参数拼接在url上
      ...config.params,
      appkey: store.state.user.appkey,
    },
  };
}, (error) => Promise.reject(error));

instance.interceptors.response.use((config) => {
  if (config.data.status === 'fail') {
    return Promise.reject(config.data.msg);
  }
  return config.data.data;
}, (error) => Promise.reject(error));

export default instance;
