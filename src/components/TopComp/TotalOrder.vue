<template>
  <div class="total-order">
    <CommonCard title="累计订单额" :value="reportData.orderToday">
      <v-chart :option="option"></v-chart>
      <template #footer>
        <span>昨日销售额</span>
        <span class="css-1">￥ {{ reportData.orderLastDay }} </span>
      </template>
    </CommonCard>
  </div>
</template>

<script>
import CommonCard from "./CommonCard.vue";

export default {
  props: ["reportData"],
  components: {
    CommonCard,
  },
  data() {
    return {
      option: {},
    };
  },
  methods: {
    //写一个方法,把option赋值给折线图
    renderChart(data) {
      this.option = {
        xAxis: {
          type: "category",
          show: false,
          boundaryGap: false,//边界间距
        },
        yAxis: {
          type: "value",
          show: false,
        },
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
        series: {
          type: "line",//线
          data,//数据
          areaStyle: {
            color: "purple",//设置颜色
          },
          itemStyle: {//拐点
            opacity: 0,
          },
          lineStyle: {//折现宽度
            width: 0,
          },
          smooth: true,//平滑的显示
        },
      };
    },
  },
  //   mounted() {
  //     this.renderChart();
  //   },
  watch: {
    reportData(newValue) {
      //   console.log(newValue, "123");
      this.renderChart(newValue.orderTrend);
    },
  },
};
</script>

<style scoped></style>
