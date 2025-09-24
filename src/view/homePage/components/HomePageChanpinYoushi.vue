<!-- 产品优势 -->
<template>
  <div class="homePageContent">
    <div class="container">
      <!-- 1. h1标题 -->
      <h1 class="main-title">{{ title }}</h1>

      <!-- Tab栏 -->
      <div class="tabs-container">
        <div
          v-for="(tab, index) in tabsData"
          :key="index"
          class="tab-item"
          :class="{ active: activeTab === index }"
          @mouseenter="activeTab = index"
        >
          <div class="tab-icon">
            <img
              :src="
                activeTab === index
                  ? getImageUrl(tab.activeIcon)
                  : getImageUrl(tab.inactiveIcon)
              "
              :alt="tab.title"
            />
          </div>
          <div class="tab-title">{{ tab.title }}</div>
        </div>
      </div>

      <!-- Tab内容区域 -->
      <div class="tab-content">
        <transition name="fade" mode="out-in">
          <div :key="activeTab" class="content-item">
            <p>{{ tabsData[activeTab].content }}</p>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  tabsData: {
    type: Array,
    required: true,
    default: () => [],
  },
});

// 当前激活的Tab
const activeTab = ref(0);

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
  margin-bottom: 40px;
  color: #333;
  position: relative;
}

// Tab栏样式
.tabs-container {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #e5e5e5;
  padding: 5px;
  flex-wrap: wrap;

  .tab-item {
    flex: 1;
    min-width: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 8px;
    min-height: 120px;

    &.active {
      background: linear-gradient(
        90deg,
        rgba(255, 88, 51, 1),
        rgba(253, 136, 0, 1)
      );

      .tab-title {
        color: white;
      }
    }

    .tab-icon {
      width: 40px;
      height: 40px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .tab-title {
      font-size: 16px;
      font-weight: 600;
      color: #666;
      transition: color 0.3s ease;
      text-align: center;
    }
  }
}

// 内容区域样式
.tab-content {
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  min-height: 120px;
  display: flex;
  align-items: center;

  .content-item {
    width: 100%;

    p {
      font-size: 38px;
      line-height: 1.8;
      color: #333;
      text-align: center;
      margin: 0;
    }
  }
}

// 动画效果
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

// 响应式设计
@media (max-width: 768px) {
  .tabs-container {
    flex-direction: row;
    flex-wrap: wrap;

    .tab-item {
      flex: 0 0 calc(50% - 10px);
      margin: 5px;
      flex-direction: row;
      min-height: auto;
      padding: 15px;

      .tab-icon {
        margin-bottom: 0;
        margin-right: 12px;
        width: 30px;
        height: 30px;
      }

      .tab-title {
        font-size: 14px;
      }
    }
  }

  .main-title {
    font-size: 2rem;
  }

  .tab-content {
    padding: 20px;

    .content-item p {
      font-size: 16px;
    }
  }
}

@media (max-width: 480px) {
  .tabs-container {
    .tab-item {
      flex: 0 0 100%;
    }
  }
}
</style>