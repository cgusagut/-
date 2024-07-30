<template>
  <v-chart :option="option"></v-chart>
</template>

<script>
//1.在html模版中引入百度地图的api链接
//2.在当前组件中引入echarts对于百度地图的支持的文件
import "echarts/extension/bmap/bmap";
import { getMapData } from "@/api/index.js";
//res.data =>{city,geodata}
//可以将后端返回的数据进行处理 =>[{city: '北京', value:[经度,纬度,销售额]}] 然后交给Echarts来渲染
function converData(city, geodata) {
  const res = [];
  city.forEach((city) => {
    const geo = geodata[city.name];//找到这个城市的经纬度
    if (geo) {
      res.push({
        name: city.name,
        value: geo.concat(city.value),//concat() 方法用于合并两个或多个数组，返回一个新的数组，原数组不会被改变。
      });
    }
  });
  return res;
}
export default {
  data() {
    return {
      option: {},
    };
  },
  methods: {
    renderChart(data) {
      //如果希望在百度地图上绘制散点图，需要对data中的数据做一些处理 [{city: '北京', value:[经度,纬度,销售额]},{}]
      this.option = {
        //当前需要在一个百度地图上绘制散点图 这里不再是坐标轴体系的
        bmap: {
          key: "9EL8yDqL35kdtjhrxts0oF1mAo53dRqq",
          center: [108.954355, 34.346721], //中心点坐标
          zoom: 5, //地图缩放级别
          roam: true, //是否开启鼠标缩放和平移漫游
          // 改变地图颜色
            // mapStyle: {
            //   styleJson: [
            //     {
            //       featureType: "water",
            //       elementType: "all",
            //       stylers: {
            //         color: "#d1d1d1",
            //       },
            //     },
            //     {
            //       featureType: "land",
            //       elementType: "all",
            //       stylers: {
            //         color: "#f3f3f3",
            //       },
            //     },
            //     {
            //       featureType: "railway",
            //       elementType: "all",
            //       stylers: {
            //         visibility: "off",
            //       },
            //     },
            //     {
            //       featureType: "highway",
            //       elementType: "all",
            //       stylers: {
            //         color: "#fdfdfd",
            //       },
            //     },
            //     {
            //       featureType: "highway",
            //       elementType: "labels",
            //       stylers: {
            //         visibility: "off",
            //       },
            //     },
            //     {
            //       featureType: "arterial",
            //       elementType: "geometry",
            //       stylers: {
            //         color: "#fefefe",
            //       },
            //     },
            //     {
            //       featureType: "arterial",
            //       elementType: "geometry.fill",
            //       stylers: {
            //         color: "#fefefe",
            //       },
            //     },
            //     {
            //       featureType: "poi",
            //       elementType: "all",
            //       stylers: {
            //         visibility: "off",
            //       },
            //     },
            //     {
            //       featureType: "green",
            //       elementType: "all",
            //       stylers: {
            //         visibility: "off",
            //       },
            //     },
            //     {
            //       featureType: "subway",
            //       elementType: "all",
            //       stylers: {
            //         visibility: "off",
            //       },
            //     },
            //     {
            //       featureType: "manmade",
            //       elementType: "all",
            //       stylers: {
            //         color: "#d1d1d1",
            //       },
            //     },
            //     {
            //       featureType: "local",
            //       elementType: "all",
            //       stylers: {
            //         color: "#d1d1d1",
            //       },
            //     },
            //     {
            //       featureType: "arterial",
            //       elementType: "labels",
            //       stylers: {
            //         visibility: "off",
            //       },
            //     },
            //     {
            //       featureType: "boundary",
            //       elementType: "all",
            //       stylers: {
            //         color: "#fefefe",
            //       },
            //     },
            //     {
            //       featureType: "building",
            //       elementType: "all",
            //       stylers: {
            //         color: "#d1d1d1",
            //       },
            //     },
            //     {
            //       featureType: "label",
            //       elementType: "labels.text.fill",
            //       stylers: {
            //         color: "#999999",
            //       },
            //     },
            //   ],
            // },
        },
        title: {
          text: "百度网点地图",
          left: "center",
        },
        tooltip: {},

        series: [
          {
            name: "团子外卖",
            type: "scatter",//普通散点图
            coordinateSystem: "bmap", //指定坐标系为百度地图
            data,
            //通过指定的数据来表达散点的大小     value:[经度,纬度,销售额]
            symbolSize(value) {
              return value[2] / 10;
            },
            encode: {//通过这个指定弹窗是哪一项
              value: 2, //指定第三列数据为散点大小
            },
          },
          {
            name: "团子外卖",
            type: "effectScatter",//带有涟漪效果的散点图
            coordinateSystem: "bmap", //指定坐标系为百度地图
            //根据value[2]销售额来降序排序，取前10个数据
            data: data.sort((a, b) => b.value[2] - a.value[2]).slice(0, 10),
            symbolSize(value) {
              return value[2] / 10;
            },
            encode: {
              value: 2, //指定第三列数据为散点大小
            },
            rippleEffect: {//控制涟漪效果
              brushType: "stroke",
              color: "purple",
            },
            // 想修改tooltip,直接在里面写
            tooltip: {//弹窗设置
              formatter(params) {
                return params.name + "销售额：" + params.value[2];
              },
              textStyle: {
                color: "green",
              },
            },
          },
        ],
      };
    },
  },
  async mounted() {
    const res = await getMapData();
    this.renderChart(converData(res.data.city, res.data.geodata));
  },
};
</script>

<style scoped></style>
