<template>
  <div
    class="container"
    :style="{ backgroundImage: `url(${resolvedBackgroundImage})` }"
  >
    <!-- 标题部分 -->
    <h1 class="title">
      <el-image style="height: 100px" :src="props.titleImg" fit="contain" />
    </h1>

    <!-- Tab部分 -->
    <div class="tabs-container" v-if="tabs && tabs.length">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['tab', { active: activeTab === index }]"
        @mouseenter="changeTab(index)"
      >
        {{ tab.name }}
      </div>
    </div>

    <!-- 内容部分 -->
    <div
      v-if="tabs && tabs.length"
      class="content"
      :style="{ color: contentColor }"
    >
      <div style="white-space: pre-line">{{ activecontent }}</div>
      <!-- <span>{{ activecontent }}</span> -->
    </div>

    <!-- 非tab部分 -->
    <div v-if="content" class="content" :style="{ color: contentColor }">
      <div style="white-space: pre-line">{{ content }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

// 定义props
const props = defineProps({
  titleImg: {
    type: String,
    default: "",
  },
  backgroundImage: {
    type: String,
    default: "",
  },
  tabs: {
    type: Array,
    default: () => [],
  },
  content: {
    type: String,
    default: "",
  },
  initialTab: {
    type: Number,
    default: 0,
  },
  contentColor: {
    type: String,
    default: "#000", // 默认颜色
  },
});

// 当前激活的Tab索引
const activeTab = ref(props.initialTab);
// const activecontent = ref(props?.tabs[0]?.props?.content);
// 使用 computed 计算当前内容
const activecontent = computed(() => {
  if (!props.tabs || props.tabs.length === 0) {
    return "暂无内容"; // 或者返回默认值
  }

  const currentTab = props.tabs[activeTab.value];
  return currentTab?.props?.content || "内容加载中...";
});

// 解析背景图片路径
const resolvedBackgroundImage = computed(() => {
  if (!props.backgroundImage) return "";

  // 如果是网络图片
  if (
    props.backgroundImage.startsWith("http") ||
    props.backgroundImage.startsWith("//")
  ) {
    return props.backgroundImage;
  }

  // 如果是本地图片，使用相对路径或require
  try {
    // 方法1: 使用import.meta.url (Vite)
    if (import.meta.env?.MODE !== "production") {
      return new URL(props.backgroundImage, import.meta.url).href;
    }

    // 方法2: 在生产环境中使用相对路径
    return props.backgroundImage;
  } catch (e) {
    console.warn("图片路径解析失败:", e);
    return props.backgroundImage;
  }
});

// 切换Tab
const changeTab = (index) => {
  activeTab.value = index;
  // activecontent.value = props.tabs[index].props.content;
  console.log("tabs---", props.tabs);
  console.log("activeTab---", activeTab.value);
};
// 监听 tabs 数据变化，确保初始显示正确
watch(
  () => props.tabs,
  (newTabs) => {
    if (newTabs && newTabs.length > 0) {
      // 如果当前 activeTab 超出范围，重置为 0
      if (activeTab.value >= newTabs.length) {
        activeTab.value = 0;
      }
      console.log("tabs数据已更新:", newTabs);
    }
  },
  { immediate: true } // 立即执行一次
);
// 监听背景图片变化
watch(
  () => props.backgroundImage,
  (newVal) => {
    console.log("背景图片路径:", newVal);
  }
);
</script>

<style scoped lang="scss">
.container {
  height: 600px;
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  // padding: 40px 20px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  // 添加覆盖层增强文字可读性
  // &::before {
  //   content: "";
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  //   bottom: 0;
  //   background: rgba(0, 0, 0, 0.4);
  //   z-index: 0;
  // }
}

// 标题样式
.title {
  height: 20%;
  flex: 1;
  color: white;
  font-size: 2.5rem;
  text-align: center;
  margin: 20px 0 40px;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
  z-index: 1;
  position: relative;
  display: flex;
  align-items: center;
}

// Tab容器样式
.tabs-container {
  height: 10%;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  z-index: 1;
  position: relative;
}

// Tab样式
.tab {
  //   flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 22px 60px;
  font-size: 30px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  position: relative;

  // 未选中状态 - 透明磨砂白色背景
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid transparent;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  // 选中状态 - 黑色背景，红色边框
  &.active {
    background: rgba(0, 0, 0, 0.8);
    border: 2px solid #ff4757;
    box-shadow: 0 0 15px rgba(255, 71, 87, 0.5);
  }
}

// 内容区域样式
.content {
  flex: 1;
  height: 30%;
  width: 70%;
  text-align: center;
  // max-width: 900px;
  // background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 30px;
  //   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(6px);
  z-index: 1;
  margin-bottom: 40px;
  position: relative;
  font-size: 35px;
  display: flex;
  justify-content: center;
}

// 响应式设计
@media (max-width: 768px) {
  .container {
    padding: 20px 10px;
    min-height: 500px;
  }

  .title {
    font-size: 2rem;
    margin: 15px 0 30px;
  }

  .tabs-container {
    gap: 10px;
    margin-bottom: 30px;
  }

  .tab {
    padding: 10px 20px;
    font-size: 0.9rem;
  }

  .content {
    width: 95%;
    padding: 20px;
    margin-bottom: 20px;
  }
}
</style>