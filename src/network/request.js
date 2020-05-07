import Axios from "axios";

export function request(config) {
  //1、创建Axios的实例
  const instance = Axios.create({
    //公共url前缀(接口)
    baseURL: 'http://152.136.185.210:8000/api/n3',
    //超时时间
    timeout: 10000
  });

  //2.1、Axios的请求拦截器的作用
  instance.interceptors.request.use(config => {
    return config;
  }, err => {
    console.log(err);
  })

  //2.2、Axios的响应拦截器
  instance.interceptors.response.use(result => {
    //可以过滤掉我们不需要的内容
    return result.data;
  }, err => {
    console.log(err);
  })

  //3、发送网络请求，axios本身的返回值就是Promise
  return instance(config);
}
