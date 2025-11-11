<!-- 模块模板 -->
<template>
  <div
    class="homePageContent"
    :style="{
      backgroundImage: `url(${getImageUrl(data.backgroundImg)})`,
    }"
  >
    <div class="content-wrapper">
      <!-- 这里可以放置其他内容，如标题等 -->
      <h1 class="main-title">{{ data.maintitle }}</h1>
    </div>
  </div>
</template>

<script setup>
import { getImageUrl } from "@/util/utils.js";
// 可以在这里添加组件逻辑
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style scoped lang="scss">
.homePageContent {
  width: 100%;
  height: 40vh;
  background-image: url("@/assets/关于万德/分组 1.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center; /* 新增：垂直居中 */

  .content-wrapper {
    text-align: center;

    .main-title {
      color: white;
      font-size: 3rem;
      text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
      margin: 0;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .homePageContent {
    height: 30vh;

    .content-wrapper {
      .main-title {
        font-size: 2rem;
      }
    }
  }
}
</style>