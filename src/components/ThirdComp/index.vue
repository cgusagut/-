<template>
  <div class="third-comp">
    <div class="left">
      <el-card shadow="hover">
        <template #header>
          <div class="css-2">关键词搜索</div>
        </template>
        <div class="main">
          <div class="charts">
            <div class="left-chart">
              <div class="title">搜索用户量</div>
              <div class="number">{{ totalUser }}</div>
              <v-chart :option="option1"></v-chart>
            </div>
            <div class="right-chart">
              <div class="title">搜索量</div>
              <div class="number">{{ totalSearch }}</div>
              <v-chart :option="option2"></v-chart>
            </div>
          </div>
          <div class="table">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="rank" label="排名" width="60">
              </el-table-column>
              <el-table-column prop="keyWord" label="关键词" align="center">
              </el-table-column>
              <el-table-column
                prop="totalSearch"
                label="总搜索量"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="totalUser"
                label="搜索用户数"
                align="center"
              >
              </el-table-column>
            </el-table>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="totleData.length"
              :page-size="pageSize"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
          </div>
        </div>
      </el-card>
    </div>
    <div class="right">
      <el-card shadow="hover">
        <template #header>
          <div class="css-2">分类销售排行</div>
          <el-radio-group v-model="radio" @input="handleInput">
            <el-radio-button label="品类"></el-radio-button>
            <el-radio-button label="商品"></el-radio-button>
          </el-radio-group>
        </template>
        <div class="chart">
          <v-chart :option="option3"></v-chart>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getKeywordData, getcategoryData } from "@/api/index.js";
export default {
  data() {
    return {
      option1: {},
      option2: {},
      tableData: [], //表格渲染的数据
      totleData: [], //后端返回的总数据
      pageSize: 6,
      radio: "品类",
      option3: {},
      categoryData: {},
    };
  },
  async mounted() {
    const { data } = await getKeywordData();
    this.totleData = data;
    this.tableData = this.totleData.slice(0, 6);
    // 折线图的数据 取的是对应字段前10条的数据 做一个升序排列
    const data1 = this.totleData
      .map((item) => item.totalUser)
      .slice(0, 10)
      .reverse();
    this.renderChart1(data1);
    const data2 = this.totleData
      .map((item) => item.totalSearch)
      .slice(0, 10)
      .reverse();
    this.renderChart2(data2);
    //请求饼状图的数据
    const res = await getcategoryData();
    this.categoryData = res.data;
    console.log(this.categoryData, "this.categoryData");
    this.renderChart3(this.categoryData.data1);
  },
  methods: {
    handleCurrentChange(page) {
      //拿到当前的页码之后 将总数据进行切割(slice)操作
      this.tableData = this.totleData.slice(
        this.pageSize * (page - 1),
        this.pageSize * page
      );
    },
    renderChart1(data) {
      this.option1 = {
        xAxis: {
          type: "category",
          show: false,
          boundaryGap: false,
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
          type: "line",
          data: data,
          itemStyle: {
            opacity: 0,
          },
          smooth: true,
          areaStyle: {
            color: "skyblue",
          },
        },
      };
    },
    renderChart2(data) {
      this.option2 = {
        xAxis: {
          type: "category",
          show: false,
          boundaryGap: false,
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
          type: "line",
          data: data,
          itemStyle: {
            opacity: 0,
          },
          smooth: true,
          areaStyle: {
            color: "skyblue",
          },
        },
      };
    },
    renderChart3(data) {
      //data数据 给他加上一个name字段
      let _data;
      _data = data.map((item) => {
        //title value =>增加一个name
        return {
          ...item,//保留原先的字段
          name: item.title + "|" + item.value,
        };
      });
      //计算出一个累积订单量
      let total = _data.reduce((acc, cur) => acc + cur.value, 0);
      this.option3 = {
        // 标题
        title: [
          {
            text: "品类分布",
            textStyle: {
              fontSize: 14,
              color: "#666",
            },
            left: 20,
            top: 20,
          },
          {
            text: "累计订单量",//主标题
            subtext: total,//副标题
            x: "40%",
            y: "45%",
            textAlign: "center",//整体（包括 text 和 subtext）的水平对齐。
            textStyle: {
              fontSize: 14,
              color: "#999",
            },
            subtextStyle: {
              fontSize: 28,
              color: "#333",
            },
          },
        ],
        tooltip: {//弹框
          formatter(params) {//自带的函数   marker自带小圆点
            const res =
              params.seriesName +
              "<br/>" +
              params.marker +
              params.data.title +
              "<br/>" +
              params.marker +
              "销售额:" +
              params.data.value;
            return res;
          },
        },
        legend: {//图例
          //legend这个配置项它会读取data数据的name的字段 然后显示在图例上,内部约定好的
          orient: "vertical",//垂直的  图例
          left: "80%",
          top: "top",
          textStyle: {
            color: "#888",
          },
        },
        series: {
          type: "pie",//饼状图
          name: "品类分布",
          data: _data,
          radius: ["45%", "60%"],//里面 外面
          center: ["40%", "50%"],//x轴  y轴
          label: {//文本的标识
            position: "outside",//标识出现在外围
            show: true,
            formatter(params) {
              //通过return的结构来表示文本内容
              return params.data.title;
            },
          },
          itemStyle: {//饼图之间的间距
            borderWidth: 8,
            borderColor: "#fff",
          },
        },
      };
    },
    handleInput(label) {
      if (label === "品类") {
        this.renderChart3(this.categoryData.data1);
      } else {
        this.renderChart3(this.categoryData.data2);
      }
    },
  },
  // 计算属性,计算总搜索量,用户量
  computed: {
    totalUser() {
      return this.totleData.reduce((acc, cur) => acc + cur.totalUser, 0);
    },
    totalSearch() {
      return this.totleData.reduce((acc, cur) => acc + cur.totalSearch, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.css-2 {
  font-weight: 600;
}
.third-comp {
  margin-top: 20px;
  display: flex;
  gap: 20px;
  & > div {
    flex: 1;
  }
  .left {
    .main {
      padding: 20px;
      .charts {
        display: flex;
        gap: 20px;
        & > div {
          flex: 1;
        }
        .echarts {
          height: 50px;
        }
        .title {
          font-size: 14px;
          color: #727171;
        }
        .number {
          font-size: 20px;
          font-weight: 600;
          margin-top: 10px;
        }
      }
      .table {
        .el-pagination {
          display: flex;
          justify-content: flex-end;
          margin-top: 16px;
        }
      }
    }
  }
  .right {
    .el-card {
      height: 100%;
      :deep(.el-card__body) {
        height: 558px;
        .chart {
          height: 100%;
        }
      }
      :deep(.el-card__header) {
        position: relative;
        .el-radio-group {
          position: absolute;
          right: 2%;
          top: 10%;
        }
      }
    }
  }
}
</style>
