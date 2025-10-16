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
              v-if="data.subImage"
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
  min-height: 40vh; /* 使用min-height而不是固定height */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d0cdc6;
  padding: 20px;
  box-sizing: border-box; /* 确保padding不会增加总高度 */

  .content-wrapper {
    width: 100%;
    max-width: 1200px;

    .layout-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 300px; /* 设置最小高度 */

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
        min-height: 300px; /* 确保图片区域有最小高度 */

        .image-container {
          position: relative;
          width: 90%;
          // max-width: 700px; /* 限制最大宽度 */
          height: 100%;
          min-height: 300px; /* 设置最小高度 */
          display: flex;
          justify-content: center;
          align-items: center;

          .main-image {
            position: absolute;
            width: 95%; /* 使用百分比而不是固定宽度 */
            max-width: 600px;
            height: auto; /* 高度自适应 */
            object-fit: contain; /* 保持图片比例 */
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0;
            // 动画效果
            animation: slideInLeft 1s ease-out forwards;
            animation-delay: 0.3s;
          }

          .overlay-image {
            position: absolute;
            width: 60%; /* 使用百分比而不是固定宽度 */
            max-width: 350px;
            height: auto; /* 高度自适应 */
            object-fit: contain; /* 保持图片比例 */
            border-radius: 10px;
            // 定位在主图片中间
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 2;
            // 初始位置在下方外部
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
    left: 30%; /* 调整动画起始位置 */
    opacity: 0;
  }
  100% {
    left: 50%;
    opacity: 1;
  }
}

// 底部滑入动画
@keyframes slideInBottom {
  0% {
    transform: translate(-50%, calc(-50% + 50px));
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
}

// 响应式设计 - 平板
@media (max-width: 1024px) {
  .homePageContent {
    min-height: 35vh;
    
    .content-wrapper {
      .layout-container {
        min-height: 250px;
        
        .title-section {
          .main-title {
            font-size: 2.5rem;
          }
          
          .sub-title {
            font-size: 1.3rem;
          }
        }
        
        .image-section {
          min-height: 250px;
          
          .image-container {
            .main-image {
              width: 70%;
            }
            
            .overlay-image {
              width: 50%;
            }
          }
        }
      }
    }
  }
}

// 响应式设计 - 手机
@media (max-width: 768px) {
  .homePageContent {
    height: auto;
    min-height: 50vh;
    padding: 30px 20px;

    .content-wrapper {
      .layout-container {
        flex-direction: column;
        gap: 30px;
        min-height: auto;

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
          min-height: 200px;
          width: 100%;
          
          .image-container {
            width: 100%;
            min-height: 200px;

            .main-image {
              width: 70%;
              max-width: 300px;
            }

            .overlay-image {
              width: 50%;
              max-width: 200px;
            }
          }
        }
      }
    }
  }
}

// 超小屏幕优化
@media (max-width: 480px) {
  .homePageContent {
    min-height: 60vh;
    padding: 20px 15px;
    
    .content-wrapper {
      .layout-container {
        .title-section {
          .main-title {
            font-size: 1.8rem;
          }
          
          .sub-title {
            font-size: 1rem;
          }
        }
        
        .image-section {
          min-height: 180px;
          
          .image-container {
            min-height: 180px;
            
            .main-image {
              width: 80%;
            }
            
            .overlay-image {
              width: 60%;
            }
          }
        }
      }
    }
  }
}
</style>