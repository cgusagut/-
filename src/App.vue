<template>
  <div class="app">
    <TopComp />
    <SecondComp />
    <ThirdComp />
    <MapComp />
  </div>
</template>

<script>
import TopComp from "@/components/TopComp/index.vue";
import SecondComp from "@/components/SecondComp/index.vue";
import ThirdComp from "@/components/ThirdComp/index.vue";
import MapComp from "@/components/MapComp/index.vue";
export default {
  components: {
    TopComp,
    SecondComp,
    ThirdComp,
    MapComp,
  },
};
</script>

<style scoped>
.app {
  padding: 20px;
  background-color: #eee;
}
</style>
