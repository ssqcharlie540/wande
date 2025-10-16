<!-- 模块模板 -->
<template>
  <!-- 有数据时显示组件 -->
  <ImageTab
    v-if="hasData"
    :images="newImagedata?.Images"
    :title="newImagedata?.ImagesTitle"
    height="85vh"
  />
  <!-- 数据加载完成但为空 -->
  <!-- <div v-else class="empty-state">
    <p>暂无图片数据</p>
  </div> -->
</template>

<script setup>
import { ref, computed, watch, nextTick } from "vue";
import ImageTab from "@/components/ImageTab/ImageTab.vue";
const newImagedata = ref();

const props = defineProps({
  Imagedata: {
    type: Object,
    default: () => ({}),
  },
});

// 加载状态管理
const hasData = ref(false);

watch(
  () => props.Imagedata,
  (newVal) => {
    console.log("pageBottom changed:", newVal);
    newImagedata.value = newVal;
    nextTick(() => {
      // 确保DOM更新后再进行操作
      hasData.value = newVal?.Images?.length > 0;
    });
  },
  { immediate: true, deep: true }
);

</script>

<style scoped lang="scss">
.loading-state {
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

.skeleton-loader {
  width: 300px;

  .skeleton-image {
    width: 100%;
    height: 200px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 8px;
    margin-bottom: 16px;
  }

  .skeleton-text {
    width: 60%;
    height: 20px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 4px;
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 85vh;
  background-color: #f9f9f9;

  .empty-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  p {
    color: #999;
    font-size: 16px;
  }
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>