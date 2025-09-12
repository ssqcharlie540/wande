<template>
  <!-- 产品应用领域 -->
  <div class="homePageContent">
    <div class="container">
      <!-- 1. h1标题 -->
      <h1 class="main-title">{{ title }}</h1>
      <!-- 3. 内容区块 -->
      <div class="content-grid">
        <!-- 动态生成内容区块 -->
        <div
          v-for="(block, index) in contentData"
          :key="index"
          class="content-block"
        >
          <div class="image-container">
            <img
              :src="getImageUrl(block.image)"
              :alt="block.caption"
              class="block-image"
            />
            <div class="image-caption">{{ block.caption }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

// 定义组件属性
const props = defineProps({
  title: {
    type: String,
    default: "产品应用领域",
  },
  contentData: {
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
  padding: 20px 0;
  background-color: #fff;
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    .main-title {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 40px;
      color: #333;
      position: relative;
    }
  }
  .content {
    width: 100%;
    height: 600px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }
}

/* 带Logo的分割线样式 */
.divider-with-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
}

.divider-line {
  flex: 1;
  height: 2px;
  background-color: #ddd;
}

.divider-logo {
  width: 150px; /* 增大Logo尺寸 */
  height: 150px;
  margin: 0 30px;
  object-fit: contain;
}

/* 内容区块网格布局 */
.content-grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(350px, 1fr)
  ); /* 增大最小宽度 */
  gap: 40px; /* 增大间距 */
}

.content-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  border-radius: 8px;
  background-color: #ffffff;
  transition: transform 0.3s ease;
}

.image-container {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 8px;
}

.block-image {
  width: 100%;
  height: 300px; /* 固定高度 */
  object-fit: cover;
  transition: all 0.3s ease;
}

.image-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20%; /* 图片高度的1/5 */
  background-color: #ff2f00; /* 褐色背景 */
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  /* opacity: 0.9; */
}

.image-container:hover .image-caption {
  transform: translateY(0);
}

.image-container:hover .block-image {
  transform: scale(1.02);
}

/* 响应式调整 */
@media (max-width: 992px) {
  .container {
    max-width: 100%;
    padding: 15px;
  }

  .content-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }

  .block-image {
    height: 250px;
  }
}

@media (max-width: 576px) {
  .main-title {
    font-size: 2rem;
  }

  .divider-logo {
    width: 100px;
    height: 100px;
    margin: 0 15px;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .block-image {
    height: 200px;
  }

  .image-caption {
    font-size: 1.2rem;
  }
}
</style>