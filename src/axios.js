import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/',
});

instance.interceptors.request.use((config) => {
  console.log(config);
  return config;
}, (error) => Promise.reject(error));

instance.interceptors.response.use((config) => {
  if (config.data.status === 'fail') {
    return Promise.reject(config.data.msg);
  }
  return config.data.data;
}, (error) => Promise.reject(error));

export default instance;
