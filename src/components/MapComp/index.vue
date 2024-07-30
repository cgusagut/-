<template>
  <div class="map-comp">
    <div class="left">
      <!-- 百度地图 -->
      <BMapScatter />
    </div>
    <div class="right">
      <el-card shadow="hover">
        <template #header> <h2>订单同比增长</h2> </template>
        <!-- 水球图 -->
        <LiquidFill />
      </el-card>
      <el-card shadow="hover">
        <template #header> <h2>热门搜索</h2> </template>
        <!-- 词云图 -->
        <WordCloud />
      </el-card>
    </div>
  </div>
</template>

<script>
import BMapScatter from "./BMapScatter.vue";
import LiquidFill from "./LiquidFill.vue";
import WordCloud from "./WordCloud.vue";
export default {
  components: {
    BMapScatter,
    LiquidFill,
    WordCloud,
  },
};
</script>

<style lang="scss" scoped>
.map-comp {
  display: flex;
  margin-top: 20px;
  gap: 20px;
  justify-content: space-between;
  .left {
    flex: 0 0 78%;
    height: 600px;
    position: relative;
  }
  .right {
    flex: 0 0 20%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .el-card {
      height: 280px;
      h2 {
        font-weight: 600;
      }
      :deep(.el-card__body) {
        height: 227px;
      }
    }
  }
}
</style>
