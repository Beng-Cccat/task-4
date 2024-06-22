<template>
  <div>
    <el-row :gutter="18" class="mgb20">
      <el-col :span="16">
        <el-card shadow="hover">
          <template v-slot:header>
            <div style="height: 10px;">
              <h3 class="card-title">监控视频</h3>
            </div>
          </template>
          <!--选择按钮-->
          <el-button-group class="mgb5">
            <el-button type="text" icon="CaretLeft" disabled style="width:20px"></el-button>
            <el-button icon="VideoCameraFilled"  @click="selectedVideoButton('video1')">video1</el-button>
            <el-button icon="CameraFilled" @click="selectedVideoButton('video2')">video2</el-button>
            <el-button type="text" icon="CaretRight" disabled style="width='20px'"></el-button>
          </el-button-group>
        
          <!--视频-->
          <div>
            <video controls v-if="selectedVideo === 'video1'" style="max-width: 100%;margin-bottom: 20px;">
              <source src="../../assets/videos/WeChat_20230626101618.mp4" type="video/mp4">
            </video>
            <video controls v-else-if="selectedVideo === 'video2'" style="max-width: 100%;margin-bottom: 20px;">
              <source src="../../assets/videos/211e67feb7fa466aa9bbd36961bdc34d.mp4" type="video/mp4">
            </video>
          </div>
          <!--单选框：是否需要打开-->
          <el-row :gutter="4">
            <el-col :span="6">
              <el-card shadow="hover">
                <div class="card-header">
                  <span>摄像头</span>

                  <el-switch
                    v-model="switchCamera"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="changeCamera"
                  />
                </div>
                <div class="card-body">
                  <el-icon class="card-icon color1">
                    <Camera />
                  </el-icon>
                </div>
              </el-card>
            </el-col>

            <el-col :span="6">
              <el-card shadow="hover">
                <div class="card-header">
                  <span>灯光</span>

                  <el-switch
                    v-model="switchLight"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="changeLight"
                  />
                </div>
                <div class="card-body">
                  <el-icon class="card-icon color1">
                    <Opportunity />
                  </el-icon>
                </div>
              </el-card>
            </el-col>

            <el-col :span="6">
              <el-card shadow="hover">
                <div class="card-header">
                  <span>清洁刷</span>

                  <el-switch
                    v-model="switchBrush"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="changeBrush"
                  />
                </div>
                <div class="card-body">
                  <el-icon class="card-icon color1">
                    <Brush />
                  </el-icon>
                </div>
              </el-card>
            </el-col>

            <el-col :span="6">
              <el-card shadow="hover">
                <div class="card-header">
                  <span>预警</span>

                  <el-switch
                    v-model="switchOthers"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="changeOthers"
                  />
                </div>
                <div class="card-body">
                  <el-icon class="card-icon color1">
                    <BellFilled />
                  </el-icon>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
        
      <el-col :span="8">
        <!--天气状况-->
        <el-row :gutter="6" class="mgb20">
          <el-card style="width: 100%;">
            <template v-slot:header>
              <div style="height: 10px;">
                <h3 class="card-title">水文气象</h3>
              </div>
            </template>
          
            <div class="rank-item" v-for="(rank, index) in ranks" :key="index">
              <div class="rank-item-content">
                  <div class="rank-item-top">
                      <div class="rank-item-title">{{ rank.title }}</div>
                      <div class="rank-item-desc">{{ rank.value }}</div>
                  </div>
                  <el-progress
                      :show-text="false"
                      striped
                      :stroke-width="10"
                      :percentage="rank.percent"
                      :color="generateRandomColor()"
                  />
              </div>
            </div>
          </el-card>
        </el-row>
        <!--地图-->
        <el-row gutter="8">
          <el-card shadow="hover" style="width: 100%;"><!--这里的width:100%很重要！！-->
            <template v-slot:header>
              <div style="height: 10px;">
                <h3 class="card-title">定位</h3>
              </div>
            </template>
            <!--通过id进行初始化绑定-->
            <div id="myMap" class="map-chart"></div>
          </el-card>
        </el-row>
      </el-col>
    </el-row>
  
    <el-row :gutter="18" class="mgb20">
      <el-col :span="8">
        <!--鱼群总数量变化折线图-->
        <el-card shadow="hover">
          <div class="chart-header">
            <p class="chart-header-title">鱼群总数量变化</p>
            <p style="margin-top: 50px;margin-bottom: -40px;margin-top: 40px;">单位：尾</p>
          </div>
          <v-chart class="chart" :option="numberOpt" />
        </el-card>
      </el-col>
      <el-col :span="16">
        <!--鱼群属性分布曲线变化图-->
        <el-card shadow="hover">
          <div>
            <p class="chart-header-title">鱼群属性分布曲线</p>
            <p class="chart-header-desc">鱼群重量、尺寸信息统计</p>
          </div>
          <div class="selection-type bordradius">
            <el-button-group>
              <div class="bordradius">
                <el-button @click="updateDateType1('weight')">weight</el-button>
                <el-button @click="updateDateType1('size')">size</el-button>
              </div>
            </el-button-group>
          </div>
          <v-chart class="chart" :option="fishOpt"/>
          <div class="selection-fish-type">
            <el-button-group>
              <el-button class="bordradius mr10" @click="updateDateType2('fish1')">fish1</el-button>
              <el-button class="bordradius mr10" @click="updateDateType2('fish2')">fish2</el-button>
              <el-button class="bordradius mr10" @click="updateDateType2('fish3')">fish3</el-button>
            </el-button-group>

          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';
import VChart from 'vue-echarts';
import { numberOpt, fishOpt } from '../chart/options';
import { graphic, use, registerMap } from 'echarts/core';
import { MapChart } from 'echarts/charts';
import chinaMap from '@/utils/china';
import { VisualMapComponent } from 'echarts/components';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Provider from '../../components/chinatmsproviders.js'
import { Opportunity } from '@element-plus/icons-vue';

use([
  VisualMapComponent,
  MapChart,
]);
registerMap('china', chinaMap);

/* 由于找不到颜色于是选择随机生成颜色 */
const generateRandomColor = () => {
  // 生成随机的R、G、B分量
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  // 拼接成颜色字符串
  return `rgb(${r}, ${g}, ${b})`;
};

/* 监控选中的视频 */
const selectedVideo = ref('video1');
const selectedVideoButton=(button)=>{
  selectedVideo.value = button;
}

/* 四个开关 */
const switchCamera = ref(true);
//打开摄像头或者关闭摄像头所要进行的操作
const changeCamera=async()=>{

}

const switchLight = ref(true);
//打开灯光或者关闭灯光所要进行的操作
const changeLight=async()=>{

}

const switchBrush = ref(false);
//打开清洁刷或者关闭清洁刷所要进行的操作
const changeBrush=async()=>{

}

const switchOthers = ref(true);
//打开其他另一个东西或者关闭其他另一个东西所要进行的操作
const changeOthers=async()=>{

}

/* 水文气象 */
//默认值，响应式数组变量(ref)
const ranks = ref([
    {
      title:'盐度(%)',
      value:34.16,
      percent:80,
    },
    {
      title:'溶解氧(mg/L)',
      value:7.00,
      percent:30,
    },
    {
      title:'pH',
      value:8.37,
      percent:18,
    },
    {
      title:'水温(°C)',
      value:15,
      percent:89,
    }
  ]);
// 设置 watch 来监听每个对象的value属性变化，并更新 percent 属性
ranks.value.forEach(rank => {
  watch(
    () => rank.value,
    (newValue) => {
      switch (rank.title) {
        case '盐度(%)':
          rank.percent = newValue / 40 * 100;
          break;
        case '溶解氧(mg/L)':
          rank.percent = newValue / 10 * 100;
          break;
        case 'pH':
          rank.percent = newValue / 7*100;
          break;
        case '水温(°C)':
          rank.percent = newValue / 30*100;
          break;
        default:
          rank.percent = 0;
      }
    },
    { immediate: true } // 立即执行一次以初始化 percent
  );
});

// title已经确定，此时需要确定value和percent
const fetchRanks = async () => {
  try {
    const response = await axios.get('/api/ranks');
    // 将后台返回的数据填充到ranks中的每个对象中
    // response.data包含了每个指标的值和百分比
    // rank表示ranks中的每个对象，index表示索引
    ranks.value.forEach((rank, index) => {
      rank.value = response.data[index].value;
      rank.percent = response.data[index].percent;
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

/* 地图 */
//const map = ref(null);
const initMap = () => {
  /*map.value = L.map('map',{attributionControl: false}).setView([29.04656, 112.86254], 8);
  L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}').addTo(map.value);
  L.marker([29.04656, 112.86254]).addTo(map.value)
    .bindPopup('渔场在这里！')
    .openPopup();*/
  let myCenter = new L.LatLng(39.0015772, 117.7116387) // 设置地图中心
  let map = L.map('myMap',{
      center: myCenter,
      zoom: 8,
      attributionControl: false
  })
  L.tileLayer.chinaProvider('TianDiTu.Satellite.Map',{maxZoom:18,minZoom:5,key:'e6372a5333c4bac9b9ef6097453c3cd6'}).addTo(map);
  L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion',{maxZoom:18,minZoom:5,key:'e6372a5333c4bac9b9ef6097453c3cd6'}).addTo(map); // 设置地图图层，按需引入
  let marker=L.marker([39.0015772, 117.7116387]).addTo(map)
  .bindPopup('渔场在这里！')
  .openPopup();
  map.addLayer(marker);
};

/* 鱼群总数量变化折线图 */
const getfishnumber=async()=>{
  try {
    const response = await axios.get('/api/fishnumber');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
const updateNumber=async()=>{
  const data=await getfishnumber();
  if(data){
    numberOpt.value = {
      xAxis: {
        type: 'category',
        data: data.categories,
      },
      yAxis: {
        type: 'value',
      },
      color: '#009688',
      series: [
        {
          data: data.values,
          type: 'line',
          smooth:true,
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(0, 150, 136,0.8)',
              },
              {
                offset: 1,
                color: 'rgba(0, 150, 136,0.2)',
              },
            ]),
          },
        },
      ],
    };
  } else {
    numberOpt.value = {
      xAxis: {
      type: 'category',
      data: ['1990', '2000', '2005', '2010', '2015', '2020'],
      },
      yAxis: {
        type: 'value',
      },
      color: '#009688',
      series: [
        {
          data: [1001, 2021, 1955, 1376, 2285, 1710,1777],
          type: 'line',
          smooth: true,
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                  offset: 0,
                  color: 'rgba(0, 150, 136,0.8)',
              },
              {
                  offset: 1,
                  color: 'rgba(0, 150, 136,0.2)',
              },
            ]),
          },
        },
      ],
    };
  }
}

/* 鱼群属性分布曲线变化图 */
// 创建响应式状态
const selectedDataType1 = ref('weight'); // 默认选中的属性
const selectedDataType2 = ref('fish1');  // 默认选中的类型

//更新之后被watch监视到，调用updateChart函数
const updateDateType1=async(type:string)=>{
  selectedDataType1.value=type;
}
const updateDateType2 =async(fishType:string)=>{
  selectedDataType2.value=fishType;
}


// 根据选中的属性和类型获取图表数据
const fetchChartData = async (type: string, fishType: string) => {
  try {
    const response = await axios.get(`/api/chart-data`,{params:{type,fishType}}); //带参数
    return response.data;
  } catch (error) {
    console.error('Error fetching chart data:', error);
    return null;
  }
};

// 获取数据并处理信息
const updateChart = async () => {
  const type = selectedDataType1.value;
  const fishType = selectedDataType2.value;

  const data = await fetchChartData(type, fishType);
  if (data) {
    fishOpt.value = {
      xAxis: {
        type: 'category',
        data: data.categories,
      },
      yAxis: {
        type: 'value',
      },
      color: '#688BD5',
      series: [
        {
          data: data.values,
          type: 'line',
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(104, 139, 213,0.8)',
              },
              {
                offset: 1,
                color: 'rgba(104, 139, 213,0.2)',
              },
            ]),
          },
        },
      ],
    };
  } else {
    // 后端没有响应时的默认图表配置
    fishOpt.value = {
      xAxis: {
        type: 'category',
        data: ['1990', '2000', '2005', '2010', '2015', '2020'],
      },
      yAxis: {
        type: 'value',
      },
      color: '#688BD5',
      series: [
        {
          data: [100, 201, 195, 36, 225, 410],
          type: 'line',
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(104, 139, 213,0.8)',
              },
              {
                offset: 1,
                color: 'rgba(104, 139, 213,0.2)',
              },
            ]),
          },
        },
      ],
    };
  }
};

// 监听选择变化
watch([selectedDataType1, selectedDataType2], updateChart);

// 组件挂载时初始化图表:当一个组件被实例化并且其模板被渲染后，他就可以被称为挂载
onMounted(() => {
  updateChart();
  updateNumber();

  Provider(L);  //挂载插件
  initMap();    //先挂载了才能进行初始化

  fetchRanks();
});
/*
< 我不太确定但是就我理解来看应该或许可能大概是这样的 >
所有需要获取的信息及url和返回的数据格式：
url: /api/ranks
response:[ [value,percent], [value,percent], [value,percent], [value,percent] ]
(顺序：盐度、溶解氧、pH、水温)

url: /api/fishnumber
response: {categories:[],values:[]}
(鱼群总数量变化，categories为时间，values为数量)

url: /api/chart-data
params: {type,fishType}
response: {categories:[],values:[]}
(鱼群属性分布曲线变化，type表示重量或者尺寸，fishType是鱼的名字，categories为时间，values为值)
*/
</script>

<style scoped>
.chart-header {
  padding-left: 10px;
  margin-bottom: 20px;
}
.chart-header-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  text-align: center;
}
.chart-header-desc {
  font-size: 14px;
  color: #787878;
  text-align: center;
}
.chart {
  width: 100%;
  height: 400px;
}
.selection-type {
  display: block;
  text-align: right;
  margin-right: 20px;
  margin-top: -5px;
  margin-bottom: -5px;
}
.selection-fish-type {
  display: block;
  text-align: center;
  margin-top: -30px;
}
.map-chart {
  width: 100%;
  height: 300px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -18px;
}

.card-body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}

.card-icon {
  margin-bottom: -25px;
  font-size: 55px;
  color: #2d8cf0;
}
.color1 {
    color: #2d8cf0;
}
.bg1{
  background-color:#3572ef;
}
.card-title{
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  margin-top: -5px;
}
.rank-item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
}
.rank-item-content {
    flex: 1;
}

.rank-item-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #343434;
    margin-bottom: 5px;
}
.rank-item-title{
  font-size:16px;
}
.rank-item-desc {
    font-size: 14px;
    color: #999;
}
.bordradius{
  border-radius:5px !important;
}
</style>

