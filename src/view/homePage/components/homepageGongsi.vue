<!-- homepageGongsi.vue -->
<template>
  <div class="homePageContent">
    <div class="container">
      <!-- 1. h1标题 -->
      <h1 class="main-title">{{ pageData?.title }}</h1>

      <!-- 公司描述文字 -->
      <div class="company-description">
        {{ pageData?.description }}
        <span
          v-for="(word, index) in pageData?.highlightWords"
          :key="index"
          class="highlight-text"
        >
          {{ word }}{{ index < pageData.highlightWords.length - 1 ? "、" : "" }}
        </span>
        {{ pageData?.description2 }}
      </div>

      <!-- 图片展示区 -->
      <div class="image-gallery">
        <div
          class="image-item "
          v-for="(item, index) in pageData?.galleryItems"
          :key="index"
          :style="{ marginTop: index % 2 === 0 ? '0' : '40px' }"
        >
          <div class="image-wrapper ">
            <!-- <img
              :src="getImageUrl(item.image)"
              :alt="item.title"
              class="rect-image"
            /> -->
            <el-image class="img-hover" :src="getImageUrl(item?.image)" fit="fill" />
            <!-- <div class="image-description">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  pageData: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

// // 动态获取图片URL
// const getImageUrl = (name) => {
//   return new URL(`../assets/首页/${name}`, import.meta.url).href;
// };
// 获取图片URL的方法
const getImageUrl = (path) => {
    if (!path) {
    return "";
  }
  // 处理路径，如果是网络路径直接返回，否则使用require
  if (path.startsWith("http") || path.startsWith("//")) {
    return path;
  }

  // 这里使用Vite的import.meta.url方式处理静态资源
  try {
    return new URL(path, import.meta.url).href;
  } catch (e) {
    console.warn("无法解析图片路径:", path);
    return path;
  }
};
</script>

<style scoped>
/* 保持原有的样式不变 */
.homePageContent {
  width: 100%;
  padding: 20px 0;
  background-color: #fff;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
}

.main-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
}

.company-description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 40px;
  text-align: center;
  color: #555;
}

.highlight-text {
  font-weight: bold;
  color: #333;
}

.image-gallery {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 30px;
}

.image-item {
  width: 23%;
  position: relative;
}

.image-wrapper {
  position: relative;
  overflow: hidden;
  /* height: 340px; */
  /* clip-path: polygon(
    30px 0,
    100% 0,
    100% calc(100% - 30px),
    calc(100% - 30px) 100%,
    0 100%,
    0 30px
  ); */
  transition: all 0.3s ease;
}

/* .image-wrapper:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
} */

.rect-image {
  width: 100%;
  /* height: 100%; */
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

/* .image-wrapper:hover .rect-image {
  transform: scale(1.05);
} */

.image-description {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 15px;
  background-color: rgba(51, 51, 51, 0.8);
  color: white;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

/* .image-wrapper:hover .image-description {
  background-color: rgba(26, 115, 232, 0.9);
} */

.image-description h3 {
  font-size: 1.2rem;
  margin-bottom: 8px;
}

.image-description p {
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
}

@media (max-width: 768px) {
  .image-item {
    width: 48%;
    margin-bottom: 20px;
  }

  .image-wrapper {
    height: 200px;
  }
}

@media (max-width: 480px) {
  .image-item {
    width: 100%;
    margin-top: 0 !important;
  }
}
</style>