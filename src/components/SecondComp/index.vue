<template>
  <div class="second-comp">
    <el-card shadow="hover">
      <template #header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">销售额</el-menu-item>
          <el-menu-item index="2">访问量</el-menu-item>
        </el-menu>
        <!-- 选择日期 -->
        <div class="right">
          <el-radio-group v-model="radio">
            <el-radio-button label="今日"></el-radio-button>
            <el-radio-button label="本周"></el-radio-button>
            <el-radio-button label="本月"></el-radio-button>
            <el-radio-button label="今年"></el-radio-button>
          </el-radio-group>
          <el-date-picker
            v-model="time"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
      </template>
      <div class="content">
        <div class="left-chart">
          <v-chart :option="option"></v-chart>
        </div>
        <div class="right-list">
          <div class="title">排行榜</div>
          <div class="list-item" v-for="(item, index) in list" :key="item.no">
            <span
              :class="{
                'top-3': index < 3,
              }"
              >{{ item.no }}</span
            >
            <span>{{ item.title }}</span>
            <span>{{ item.sales }}</span>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getSaleData } from "@/api/index.js";
export default {
  data() {
    return {
      activeIndex: "1",
      radio: "今日",
      time: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      option: {},//echarts图表
      listData: {},
      list: [],
    };
  },
  methods: {
    // 在这里面处理渲染不同柱状图
    handleSelect(index) {
      //Index 1:销售额 2:访问量
      this.activeIndex = index;
      if (this.activeIndex === "1") {
        this.list = this.listData.saleRank;
        this.renderChart(
          this.listData.saleFulleYearAxis,
          this.listData.saleFulleYear
        );
      } else {
        this.list = this.listData.visitRank;
        this.renderChart(
          this.listData.visitFullYeadAxis,
          this.listData.visitFullYear
        );
      }
    },
    renderChart(v1, v2) {
      this.option = {
        title: {
          text: "年度销售额",
          textStyle: {
            fontSize: 14,
            fontWeight: 500,
          },
        },
        grid: {//图形上下左右的间距
          left: 40,
          // right: 0,
        },
        xAxis: {
          type: "category",
          data: v1,//月份
          axisTick: {//标题在x轴中间
            alignWithLabel: true,
          },
        },
        yAxis: {
          type: "value",
          splitLine: {//split分割,把Y轴的描述线变成虚线
            lineStyle: {
              type: "dotted",
            },
          },
        },
        tooltip: {},
        series: {
          type: "bar",
          data: v2,//Y轴数据
          barWidth: "40%",
        },
        color: "skyblue",
      };
    },
  },
  async mounted() {
    const res = await getSaleData();
    this.listData = res.data;
    this.list = this.listData.saleRank;
    this.renderChart(
      this.listData.saleFulleYearAxis,
      this.listData.saleFulleYear
    );
  },
};
</script>

<style lang="scss" scoped>
.second-comp {
  position: relative;
  margin-top: 20px;
  .el-card {
    // 样式穿透，修改原样式
    :deep(.el-card__header) {
      padding: 0;
      border-bottom: none;
      .el-menu {
        padding-left: 50px;
      }
      .right {
        position: absolute;
        right: 2%;
        top: 10px;
        .el-radio-group {
          margin-right: 20px;
        }
      }
    }
  }
  .content {
    display: flex;
    .left-chart {
      flex: 0 0 70%;
      height: 434px;
    }
    .right-list {
      flex: 1;
      .title {
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 600;
      }
      .list-item {
        display: flex;
        gap: 20px;
        margin: 20px 0;
        span:nth-child(2) {
          flex: 1;
        }
        span:nth-child(1) {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          text-align: center;
          line-height: 20px;
        }
        span.top-3 {
          background-color: #09b3f7;
          color: #fff;
        }
      }
    }
  }
}
</style>
