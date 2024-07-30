//这里发送具体的axios请求
import request from "./axios";
//第一栏组件数据的请求方法
export const getReportData = () => {
  return request.get("/reportdata");
};
//第二栏组件数据的请求方法
export const getSaleData = () => {
  return request.get("/saledata");
};
//第三栏组件左边数据的请求方法
export const getKeywordData = () => {
  return request.get("/keyworddata");
};
//第三栏组件右边数据的请求方法
export const getcategoryData = () => {
  return request.get("/categorydata");
};
//地图数据请求方法
export const getMapData = () => {
  return request.get("/mapdata");
};
