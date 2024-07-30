//对请求做一些二次封装
import axios from "axios";
// 创建axios实例 并且可以传入一些具体配置
const request = axios.create({
  baseURL: "http://project.x-zd.net:3001/apis", //请求的基本路径
  timeout: 3000, //请求超时时间
});
export default request;
