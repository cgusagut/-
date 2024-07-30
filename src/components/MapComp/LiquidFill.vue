<template>
  <v-chart :option="option"></v-chart>
</template>

<script>
import "echarts-liquidfill"; //新增了一个type为liquidFill的series
import { getReportData } from "@/api/index.js";
export default {
  data() {
    return {
      option: {},
    };
  },
  methods: {
    renderChart(data) {
      this.option = {
        series: {
          type: "liquidFill",//水球图
          //水球图读取的data是一个小数
          data: [data],
          radius: "80%",//设置半径
          color: ["red"],//波纹的颜色
          amplitude: "4%",//波纹的起伏
          outline: {//控制边框
            borderDistance: 2,//内外边框距离
            itemStyle: {//外边框改变
              borderWidth: 2,
            },
          },
        },
      };
    },
  },
  async mounted() {
    const res = await getReportData();
    this.renderChart((+res.data.salesGrowLastDay / 100).toFixed(2));
  },
};
</script>

<style scoped></style>
