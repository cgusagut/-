<template>
  <div class="top-comp">
    <el-row :gutter="20">
      <el-col :span="6"><TotalSale :reportData="reportData" /></el-col>
      <el-col :span="6"><TotalOrder :reportData="reportData" /></el-col>
      <el-col :span="6"><TodayUser :reportData="reportData" /></el-col>
      <el-col :span="6"><TotalUser :reportData="reportData" /></el-col>
    </el-row>
  </div>
</template>

<script>
import TotalSale from "@/components/TopComp/TotalSale.vue";
import TotalOrder from "@/components/TopComp/TotalOrder.vue";
import TodayUser from "@/components/TopComp/TodayUser.vue";
import TotalUser from "@/components/TopComp/TotalUser.vue";
import { getReportData } from "@/api/index.js";
export default {
  components: {
    TotalSale,
    TotalOrder,
    TodayUser,
    TotalUser,
  },
  data() {
    return {
      reportData: {},
    };
  },
  async mounted() {
    //发送请求获取数据 不要在每个卡片里面发送请求 不然的话要发送4次 http请求太多是影响网页性能的重要指标
    const res = await getReportData();
    this.reportData = res.data;
  },
};
</script>

<style>
span {
  font-size: 14px !important;
  color: #464545;
}
.css-1 {
  margin-left: 8px;
  font-weight: 550;
}
span.increase {
  display: inline-block;
  width: 0;
  height: 0;
  border-width: 4px;
  border-style: solid;
  border-color: transparent transparent green transparent;
  margin-left: 10px;
  transform: translateY(-50%);
}
span.decrease {
  display: inline-block;
  width: 0;
  height: 0;
  border-width: 4px;
  border-style: solid;
  border-color: red transparent transparent transparent;
  margin-left: 10px;
}
</style>
