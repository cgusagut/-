<template>
  <div class="total-user">
    <CommonCard title="累计用户数" :value="reportData.totalUser">
      <v-chart :option="option"></v-chart>
      <template #footer>
        <div class="wrapper">
          <div>
            <span>日同比</span>
            <span class="css-1"> {{ reportData.userGrowLastDay }}%</span>
            <span class="increase"></span>
          </div>
          <div>
            <span>月同比</span>
            <span class="css-1"> {{ reportData.userGrowLastMonth }}%</span>
            <span class="decrease"></span>
          </div>
        </div>
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
    renderChart(v1, v2) {
      this.option = {
        // 把xy轴交换
        xAxis: {
          type: "value",
          show: false,
        },
        yAxis: {
          type: "category",
          show: false,
        },
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
        series: [
          // 绘制两个柱子
          {
            type: "bar",
            data: [v1],//只能写数组
            barWidth: 10,//调整柱子的宽度
            itemStyle: {
              color: "green",
            },
            stack: "总量",//名字一样,两个柱子叠在一起
          },
          {
            type: "bar",
            data: [v2],
            barWidth: 10,
            itemStyle: {
              color: "#ddd",
            },
            stack: "总量",
          },
          //第三个图表对象绘制的就是那2个三角形
          {
            type: "custom",//自定义
            renderItem(params, api) {
              //确定三角形绘制的位置
              const endPoint = api.coord([api.value(0), 0]);//echarts自带的方法
              return {
                type: "group",//绘制多个,写这个类型
                children: [
                  {
                    type: "path",
                    shape: {
                      d: "M511.744 319.999l-383.744 383.744h767.488l-383.744-383.744z",
                      x: endPoint[0] - 5,
                      y: 35,
                      width: 10,
                      height: 10,
                      layout: "cover",//修改三角形的形状
                    },
                    style: {
                      fill: "green",
                    },
                  },
                  {
                    type: "path",
                    shape: {
                      d: "M889.696 320.8H158.848l365.504 365.536 365.344-365.536z",
                      x: endPoint[0] - 5,
                      y: 5,
                      width: 10,
                      height: 10,
                      layout: "cover",
                    },
                    style: {
                      fill: "green",
                    },
                  },
                ],
              };
            },
            data: [v1],
          },
        ],
      };
    },
  },
  //   mounted() {
  //     this.renderChart();
  //   },
  watch: {
    reportData(newValue) {
      this.renderChart(newValue.userLastMonth, newValue.userToday);
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  gap: 10px;
}
</style>
