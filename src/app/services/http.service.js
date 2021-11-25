import axios from 'axios';
import { toast } from 'react-toastify';
import configFile from '../config.json';

axios.defaults.baseURL = configFile.apiEndPoint;

axios.interceptors.request.use(
  function (config) {
    if (configFile.isFireBase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url = (containSlash ? config.url.slice(0, -1) : config.url) + '.json';
    }
    console.log('config', config.url);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function TransformData(data) {
  return data ? Object.values(data) : [];
}

axios.interceptors.response.use(
  (res) => {
    if (configFile.isFireBase) {
      res.data = { content: TransformData(res.data) };
    }
    console.log(res.data);
    return res;
  },
  function (error) {
    const expectedErrors =
      error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedErrors) {
      console.log(error);
      toast.error('Something was wrong. Try it later');
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};

export default httpService;
