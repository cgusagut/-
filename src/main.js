import Vue from "vue";
import App from "./App.vue";
import "./plugins/element-ui.js";
import "./plugins/vue-echart.js";
import "reset-css"; // 引入reset.css样式文件 清除浏览器的默认样式
import "./main.css";
new Vue({
  render: (h) => h(App),
}).$mount("#app");
