<template>
  <div class="top-banner">
    <div class="banner-content">
      {{ bannerText }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const bannerText = ref("xxxx（证券代码：xxxxx）");
</script>

<style scoped>
.top-banner {
  height: 40px;
  position: fixed; /* 固定定位 */
  top: 0; /* 固定在顶部 */
  left: 0;
  width: 100%; /* 全宽 */
  z-index: 1000; /* 确保在其他内容之上 */
  /* background-color: rgba(0, 0, 0, 0.3); 透明黑色背景 */
  background-color: #333333;
  color: white; /* 文字颜色 */
  font-size: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 轻微阴影增强层次感 */
  backdrop-filter: blur(2px); /* 可选：背景模糊效果 */
  -webkit-backdrop-filter: blur(2px); /* Safari支持 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-content {
  max-width: 1200px; /* 内容最大宽度 */
  margin: 0 auto; /* 居中 */
  padding: 0 20px; /* 左右内边距 */
}
</style>