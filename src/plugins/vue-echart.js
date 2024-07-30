// eslint-disable-next-line no-unused-vars
import * as echarts from "echarts"; // 引入echarts
import Vue from "vue";
//引入vue-echarts组件 可以让我们更加高效的在vue项目中绘制echarts图表
import vueEcharts from "vue-echarts";

Vue.component("v-chart", vueEcharts); //注册一个全局组件 v-chart
