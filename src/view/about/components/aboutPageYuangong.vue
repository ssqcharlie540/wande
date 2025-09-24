<!-- 模块模板 -->
<template>
  <div class="homePageContent">
    <div class="container">
      <!-- 1. h1标题 -->
      <h1 class="main-title">{{ title }}</h1>

      <!-- 图片展示区域 -->
      <div class="image-gallery">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="image-item"
          @mouseenter="hoverIndex = index"
          @mouseleave="hoverIndex = -1"
        >
          <div class="image-wrapper" :class="{ active: hoverIndex === index }">
            <!-- @/assets/关于万德/背景图.jpg  :src="getImageUrl(image.src)"-->
            <img
              :src="getImageUrl(image.src)"
              :alt="image.alt"
              class="gallery-image img-hover"
              object-fit="contain"
            />
            <!-- {{image.src}} -->
            <!-- <el-image
              style="width: 50px"
              :src="getImageUrl(image.src)"
              fit="contain"
            /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { getImageUrl } from "@/util/utils.js";
import { ref } from "vue";

// 当前悬停的图片索引
const hoverIndex = ref(-1);

// 从父组件传递过来的图片数据
const props = defineProps({
  title: {
    type: String,
    default: "员工风采",
  },
  images: {
    type: Array,
    default: () => [],
  },
});

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

<style scoped lang="scss">
.homePageContent {
  width: 100%;
  padding: 40px 0;
  background-color: #ffffff;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;

    .main-title {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 50px;
      color: #2c3e50;
      position: relative;
      font-weight: 600;
    }

    .image-gallery {
      display: flex;
      justify-content: center;
      gap: 30px;
      flex-wrap: wrap;

      .image-item {
        flex: 0 0 calc(33.333% - 30px);
        max-width: calc(33.333% - 30px);

        .image-wrapper {
          position: relative;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;

          // &::before {
          //   content: "";
          //   position: absolute;
          //   top: 0;
          //   left: 0;
          //   right: 0;
          //   bottom: 0;

          //   opacity: 0;
          //   transition: opacity 0.3s ease;
          //   z-index: 1;
          // }

          // &:hover,
          // &.active {
          //   transform: translateY(-12px) scale(1.05);
          //   box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);

          //   &::before {
          //     opacity: 1;
          //   }
          // }

          .gallery-image {
            width: 100%;
            // height: 280px;
            object-fit: cover;
            transition: all 0.5s ease;
            display: block;
          }
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 1024px) {
  .homePageContent {
    .container {
      .image-gallery {
        .image-item {
          flex: 0 0 calc(50% - 20px);
          max-width: calc(50% - 20px);
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .homePageContent {
    padding: 30px 0;

    .container {
      padding: 15px;

      .main-title {
        font-size: 2rem;
        margin-bottom: 40px;

        &::after {
          width: 60px;
          height: 3px;
          margin: 15px auto 0;
        }
      }

      .image-gallery {
        gap: 20px;

        .image-item {
          flex: 0 0 100%;
          max-width: 100%;

          .image-wrapper {
            .gallery-image {
              height: 250px;
            }
          }
        }
      }
    }
  }
}

// 动画效果
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.image-item {
  animation: fadeInUp 0.6s ease forwards;

  &:nth-child(1) {
    animation-delay: 0.1s;
  }
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.3s;
  }
}
</style>