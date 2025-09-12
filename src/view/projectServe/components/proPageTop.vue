<!-- 模块模板 -->
<template>
  <div class="homePageContent">
    <div class="content-wrapper">
      <!-- 左右布局 -->
      <div class="layout-container">
        <!-- 左侧标题部分 -->
        <div class="title-section">
          <h1 class="main-title">{{ data.mainTitl }}</h1>
          <h2 class="sub-title">{{ data.subtitle }}</h2>
        </div>

        <!-- 右侧图片部分 -->
        <div class="image-section">
          <div class="image-container">
            <img
              :src="getImageUrl(data.mainImage)"
              alt="主图片"
              class="main-image"
            />
            <img
              :src="getImageUrl(data.subImage)"
              alt="叠加图片"
              class="overlay-image"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { getImageUrl } from "@/util/utils.js";
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
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
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d0cdc6;
  padding: 20px;

  .content-wrapper {
    width: 100%;
    max-width: 1200px;

    .layout-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;

      // 左侧标题部分
      .title-section {
        flex: 1;
        padding-right: 40px;

        .main-title {
          color: #2c3e50;
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 15px;
          line-height: 1.2;
        }

        .sub-title {
          color: #34495e;
          font-size: 1.5rem;
          font-weight: 500;
          margin: 0;
        }
      }

      // 右侧图片部分
      .image-section {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        .image-container {
          position: relative;
          width: 300px;
          height: 300px;
          // background-color: #2c3e50;
          // position: relative;
          top: 70px;

          .main-image {
            position: absolute;
            width: 300px;
            // height: 220px;
            object-fit: cover;
            // 初始位置在左侧外部
            left: -100px;
            opacity: 0;
            // 动画效果
            animation: slideInLeft 1s ease-out forwards;
            animation-delay: 0.3s;
          }

          .overlay-image {
            position: absolute;
            width: 400px;
            // height: 180px;
            object-fit: cover;
            border-radius: 10px;
            // 定位在主图片中间
            top: 20px;
            left: -40px;
            z-index: 2;
            // 初始位置在下方外部
            transform: translateY(100px);
            opacity: 0;
            // 动画效果
            animation: slideInBottom 1s ease-out forwards;
            animation-delay: 0.8s;
          }
        }
      }
    }
  }
}

// 左侧滑入动画
@keyframes slideInLeft {
  0% {
    left: -100px;
    opacity: 0;
  }
  100% {
    left: 0;
    opacity: 1;
  }
}

// 底部滑入动画
@keyframes slideInBottom {
  0% {
    transform: translateY(100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .homePageContent {
    height: auto;
    min-height: 50vh;
    padding: 30px 20px;

    .content-wrapper {
      .layout-container {
        flex-direction: column;
        gap: 30px;

        .title-section {
          padding-right: 0;
          text-align: center;

          .main-title {
            font-size: 2.2rem;
          }

          .sub-title {
            font-size: 1.2rem;
          }
        }

        .image-section {
          .image-container {
            width: 250px;
            height: 250px;

            .main-image {
              width: 180px;
              height: 180px;
            }

            .overlay-image {
              width: 150px;
              height: 150px;
              top: 50px;
              left: 50px;
            }
          }
        }
      }
    }
  }
}
</style>