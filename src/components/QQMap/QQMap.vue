<template>
  <div class="content">
    <div style="padding: 0 0 20px 0">
      <div style="color: #333;">公司地址：{{ gongsiData.gongsiLocation }}</div>
    </div>
    <!--     @click="onClick" -->
    <tlbs-map
      v-loading="loading"
      class="qqmap"
      ref="mapRef"
      api-key="5HRBZ-ANIC4-ZKRUW-FDXQ3-2LZRV-7CBGD"
      :center="center"
      :zoom="zoom"
      :control="control"
      @map_inited="onMapInited"
    >
      <tlbs-multi-marker
        ref="markerRef"
        :geometries="geometries"
        :styles="styles"
        :options="options"
      />
    </tlbs-map>
  </div>
</template>
<script setup>
import {
  ref,
  onMounted,
  defineExpose,
  defineEmits,
  reactive,
  defineProps,
} from "vue";
import { ElMessage } from "element-plus";
import { debounce } from "lodash-es";
// 定义组件属性
const props = defineProps({
  gongsiData: {
    type: Object,
    default: () => ({
      gongsilatlng: {},
      gongsiLocation: "",
    }),
  },
});
const emit = defineEmits(["selectLocation", "selectaddress"]); // 定义事件
const mapRef = ref(null);
const center = ref(); // 地图中心点经纬度
const zoom = ref(19); // 地图缩放级别，支持3～20。
const control = {
  // 地图控件的配置
  scale: {},
  zoom: {
    position: "topRight",
  },
};
const markerRef = ref(null);
const originalcenter = ref(null);
// 点
const geometries = ref([
  {
    position: { lat: 39.944921016751934, lng: 116.29997067430213 },
  },
]); // 标点
const options = ref({
  minZoom: 2,
  maxZoom: 20,
});
const styles = {
  marker: {
    width: 20,
    height: 30,
    anchor: { x: 10, y: 30 },
  },
};
const loading = ref(false);
const selectCity = ref();

const generateFrom = () => {
  return {
    address: null,
  };
};

const formModel = reactive(generateFrom());

const showModal = (data) => {};

const onMapInited = () => {
  // 地图加载完成后，可以获取地图实例、点标记实例，调用地图实例、点标记实例方法
  console.log(mapRef.value.map);
  geometries.value = [{ position: props.gongsiData.gongsilatlng }];
  center.value = props.gongsiData.gongsilatlng;
};

const onClick = (e) => {
  geometries.value = [{ position: e.latLng }];
  emit("selectLocation", e.latLng);
};
defineExpose({ showModal });

onMounted(() => {
  // 渲染地图
});
</script>

<style lang="scss" scoped>
.content {
  padding: 20px;
}
.qqmap {
  width: 100%;
  height: 90%;
}
.control-container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1001;
  display: flex;
  align-items: center;
}
button {
  padding: 4px;
  background-color: #fff;
  margin-right: 5px;
  border: 1px solid #ddd;
}
.polymerization {
  border-radius: 50%;
  color: #fff;
  font-weight: 500;
  text-align: center;
  opacity: 0.95;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0px;
  left: 0px;
  cursor: pointer;
}

.formatClolr {
  background: linear-gradient(
    138.59deg,
    rgba(255, 118, 118, 0.9) 11.12%,
    rgba(255, 61, 61, 0.9) 75.89%
  );
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12), 0px 0px 8px rgba(0, 0, 0, 0.08);
}
.point_logo {
  width: 42px;
  height: 49px;
  position: absolute;
  text-align: center;
  line-height: 42px;
}
.point_logo_polka_dot {
  width: 16px;
  height: 16px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
  background: #f36d78;
  border-radius: 50%;
}
</style>
