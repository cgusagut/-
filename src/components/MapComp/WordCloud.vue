<template>
  <v-chart :option="option"></v-chart>
</template>

<script>
import "echarts-wordcloud";
import { getKeywordData } from "@/api";
export default {
  data() {
    return {
      option: {},
    };
  },
  methods: {
    renderChart(data) {
      this.option = {
        series: {
          type: "wordCloud",
          //词云图读取的数据内容 必须包括name value字段
          data,
          width: "100%",//设置热词的宽高
          heigth: "100%",
          textStyle: {
            color() {
              //random color
              return (//随机颜色
                "rgb(" +
                [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                ].join(",") +
                ")"
              );
            },
          },
          emphasis: {//移动上去样式
            focus: "self", //高亮显示策略
            textStyle: {
              textShadowBlur: 10,//加强阴影效果
              textShadowColor: "#333",
            },
          },
        },
        tooltip: {},
      };
    },
  },
  async mounted() {
    let { data } = await getKeywordData();
    //
    data = data
      .map((item) => {
        return {
          name: item.keyWord,
          value: item.totalSearch,
        };
      })
      .slice(0, 6);
    this.renderChart(data);
  },
};
</script>

<style scoped></style>
