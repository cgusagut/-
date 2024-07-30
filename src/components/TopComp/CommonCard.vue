<template>
  <div class="common-card">
    <!-- 自己二次封装了一下el-card 设置了2个props和2个slots 然后这些所有的内容又作为视图结构传入了el-card内的默认插槽中 -->
    <el-card shadow="hover">
      <div class="title">{{ title }}</div>
      <div class="value">{{ value }}</div>
      <div class="chart">
        <!-- 默认插槽 -->
        <slot />
      </div>
      <div class="line"></div>
      <div class="footer">
        <!-- 具名插槽 -->
        <slot name="footer" />
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ["title", "value"],
};
</script>

<style lang="scss" scoped>
.common-card {
  .title {
    font-size: 12px;
    color: #777;
    letter-spacing: 1px;
  }
  .value {
    font-size: 24px;
    font-weight: 600;
    margin-top: 10px;
  }
  .chart {
    height: 50px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
  }
  .line {
    margin-top: 18px;
    border-top: 1px solid #ddd;
  }
  .footer {
    margin-top: 10px;
  }
}
</style>
