<template>
  <div class="today-user">
    <CommonCard title="今日用户交易数" :value="reportData.userToday">
      <v-chart :option="option"></v-chart>
      <template #footer>
        <span>退货率</span>
        <span class="css-1">{{ reportData.returnRate }}%</span>
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
    renderchart(data) {
      this.option = {
        xAxis: {
          type: "category",
          show: false,
          data: [
            "00:00",
            "03:00",
            "05:00",
            "07:00",
            "09:00",
            "11:00",
            "13:00",
            "15:00",
            "17:00",
            "19:00",
            "21:00",
            "23:00",
          ],
        },
        yAxis: {
          show: false,
        },
        grid: {//柱状图的上下左右距离
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
        tooltip: {},//移动到柱子上弹窗
        series: {
          name: "实时交易量",
          type: "bar",
          data,
          barWidth: "60%",//柱子的宽度
        },
      };
    },
  },
  //   mounted() {
  //     this.renderchart();
  //   },
  watch: {
    reportData(newValue) {
      this.renderchart(newValue.orderUserTrend);
    },
  },
};
</script>

<style scoped></style>
