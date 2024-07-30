<template>
  <div class="total-sale">
    <CommonCard title="累计销售额" :value="reportData.salesToday">
      <!-- 默认插槽 -->
      <template #default>
        <div>
          <span>日同比</span>
          <span class="css-1">{{ reportData.salesGrowLastDay }}%</span>
          <!-- 利用标签绘制三角形 将宽高设置为0 然后设置一个border -->
          <span
            :class="{
              // 判断,数值大于或小于0,选择不同的三角形
              increase: reportData.salesGrowLastDay > 0,
              decrease: reportData.salesGrowLastDay < 0,
            }"
          ></span>
        </div>
        <div>
          <span>月同比</span>
          <span class="css-1">{{ reportData.saleSGrowLastMonth }}%</span>
          <span
            class="decrease"
          ></span>
        </div>
      </template>
      <!-- 底部插槽 -->
      <template #footer>
        <span>昨日销售额</span>
        <span class="css-1">￥{{ reportData.salesLastDay }}</span>
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
};
</script>

<style scoped></style>
