<template>
  <!-- 信息栏 - 只在顶部显示 -->
  <!-- <div class="message-container" :class="{ hidden: !isAtTop }">
    <Floatingmessage />
  </div> -->

  <!-- Tab栏 - 始终固定在顶部，位置动态调整 -->
  <!-- 新增: 根据滚动状态添加scrolled类 -->
  <div class="floating-tabs" :class="{ scrolled: isScrolled }">
    <!-- 修正调试信息 -->
    <!-- <div style="position: absolute; top: 0; right: 0; color: red; font-size: 12px; padding: 5px;">
      Scroll: {{ scrollY }}, isScrolled: {{ isScrolled }}
    </div> -->
    <div class="tabs-container">
      <!-- 首先插入logo -->
      <div class="tab-item-container">
        <div class="tab-item logo-tab">
          <img src="@/assets/万德logo.png" class="tab-logo" alt="万德logo" />
        </div>
      </div>

      <!-- 然后循环其他tab项 -->
      <template v-for="(tab, index) in tabsData" :key="index">
        <!-- 外层容器包裹整个Tab项 -->
        <div
          class="tab-item-container"
          @mouseenter="handleMouseEnter(index)"
          @mouseleave="handleMouseLeave"
          :class="{ 'active-tab-container': isActive(tab) }"
        >
          <!-- 常规tab项 -->
          <div class="tab-item">
            <span @click="navigateTo(tab.path)">
              {{ tab.title }}
            </span>
          </div>

          <!-- 下拉框 -->
          <div
            v-if="tab.hasDropdown && hoverIndex === index"
            class="dropdown-menu"
            @mouseenter="keepDropdownOpen(index)"
            @mouseleave="handleMouseLeave"
          >
            <div
              v-for="(item, i) in tab.dropdownItems"
              :key="i"
              class="dropdown-item"
              @click="navigateTo(item.path)"
              :style="{ '--i': i }"
            >
              {{ item.text }}
            </div>
          </div>

          <!-- 底部白色分割线 -->
          <div class="tab-underline"></div>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";
import { tabsData } from "@/util/mockData";
// import Floatingmessage from "@/components/FloatingTabs/message.vue";

const router = useRouter();
const route = useRoute();
const hoverIndex = ref(null);
const dropdownWidth = 180;
const isAtTop = ref(true);
const isScrolled = ref(false); // 新增：控制滚动状态
const scrollY = ref(0); // 新增：存储滚动位置
let dropdownTimer = null;

// 滚动处理
const handleScroll = () => {
  scrollY.value = window.scrollY; // 更新滚动位置
  isAtTop.value = window.scrollY <= 10;
  isScrolled.value = window.scrollY > 50;

  // console.log(
  //   "Scroll position:",
  //   window.scrollY,
  //   "isScrolled:",
  //   isScrolled.value
  // );
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  // 初始检查一次
  handleScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

// 原有Tab逻辑保持不变
const tabs = ref([
  {
    title: "首页",
    path: "/",
    hasDropdown: false,
  },
  {
    title: "关于万德",
    path: "/about",
    hasDropdown: false,
  },
  {
    title: "产品及服务",
    path: "/products",
    hasDropdown: false,
  },
  {
    title: "全景展示",
    path: "/services",
    hasDropdown: false,
  },
  {
    title: "联系我们",
    path: "/contact",
    hasDropdown: false,
  },
  {
    title: "ENGLISH",
    path: "/ENGLISH",
    hasDropdown: false,
  },
]);

const isActive = (tab) => {
  return (
    route.path === tab.path ||
    (tab.path !== "/" && route.path.startsWith(tab.path))
  );
};

const handleMouseEnter = (index) => {
  clearTimeout(dropdownTimer);
  hoverIndex.value = index;
};

const handleMouseLeave = () => {
  dropdownTimer = setTimeout(() => {
    hoverIndex.value = null;
  }, 200);
};

const keepDropdownOpen = (index) => {
  clearTimeout(dropdownTimer);
  hoverIndex.value = index;
};

const navigateTo = (path) => {
  router.push(path);
};
</script>

<style scoped>
/* 信息栏样式 */
.message-container {
  background-color: #333333;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1001;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.message-container.hidden {
  transform: translateY(-100%);
  opacity: 0;
  pointer-events: none;
}

/* Tab栏基础样式 - 始终固定在顶部 */
.floating-tabs {
  position: fixed;
  top: var(--tab-top);
  left: 0;
  width: 100%;
  z-index: 1000;
  margin: 0;
  padding: 0;
  transition: all 0.3s ease; /* 修改为all以包含背景变化 */
  height: 8vh;

  /* 点状背景 */
  --dot-color: rgba(56, 56, 56, 0.7); /* 将这里的0.5改为更小的值增加透明度 */
  --dot-spacing: 2px;
  --bg-opacity: 0.6; /* 降低背景透明度 */
  --dot-size: 0.2px;

  background-color: rgba(51, 51, 51, var(--bg-opacity));
  background-image: radial-gradient(
    circle at center center,
    var(--dot-color) var(--dot-size),
    transparent calc(var(--dot-size) + 1px)
  );
  background-size: var(--dot-spacing) var(--dot-spacing);
}

/* 新增：滚动时的纯色背景样式 */
.floating-tabs.scrolled {
  background-color: #333333;
  background-image: none; /* 移除点状背景 */
}

/* 当信息栏隐藏时，Tab栏紧贴顶部 */
.floating-tabs:has(~ .message-container.hidden) {
  --tab-top: 0;
}

/* 原有其他样式保持不变 */
.tabs-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
  flex-wrap: wrap;
}

.tab-item-container {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 30px 5px;
}

.tab-item {
  position: relative;
  padding: 8px 12px;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  white-space: nowrap;
  
}
.tab-item:hover{
  color: #D8B280;
}

.tab-item span {
  position: relative;
  padding-bottom: 10px;
}

/* logo作为单独tab的样式 */
.logo-tab {
  padding: 0 15px;
  margin: 0 10px;
}

.tab-logo {
  height: 28px;
  width: auto;
  transition: all 0.3s;
  margin-bottom: 12px;
}

.active-tab-container .tab-item span::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 25%;
  width: 50%;
  height: 2px;
  background: rgb(255, 0, 0);
  transform: scaleX(1) !important;
  opacity: 1 !important;
}

.active-tab-container .tab-item span {
  font-weight: bold;
  transition: all 0.3s ease;
  color: #D8B280;
}

/* .active-tab-container .tab-item {
  color: #ffffff;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
} */

.dropdown-item.active {
  color: #d4af37;
  position: relative;
}

.dropdown-item.active::after {
  content: "";
  position: absolute;
  left: 10px;
  bottom: 5px;
  width: calc(100% - 20px);
  height: 1px;
  background: #d4af37;
}

.tab-item:hover span::after {
  transform: scaleX(1);
}

.tab-item span::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: rgb(255, 0, 0);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.3s ease;
}

/* 下拉菜单动画优化 */
.dropdown-menu {
  position: absolute;
  top: calc(100% + 1px);
  left: 50%;
  transform: translateX(-50%);
  width: v-bind(dropdownWidth + "px");
  background: white;
  border-radius: 8px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
  padding: 12px 0;
  z-index: 1001;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease;
  transform: translate(-50%, 10px);
}

.tab-item-container:hover .dropdown-menu,
.tab-item-container:focus-within .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, 0);
  cursor: pointer;
}

/* 下拉项动画 */
.dropdown-item {
  padding: 10px 24px;
  color: #555;
  transition: all 0.2s;
  font-size: 15px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  font-weight: 500;
  transform: translateY(-5px);
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease, color 0.2s ease;
  transition-delay: calc(0.05s * var(--i));
}

.tab-item-container:hover .dropdown-item,
.tab-item-container:focus-within .dropdown-item {
  transform: translateY(0);
  opacity: 1;
}

.dropdown-item:hover {
  color: #d4af37;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .tabs-container {
    gap: 15px;
    padding: 0 20px;
    justify-content: flex-start;
    overflow-x: auto;
    flex-wrap: nowrap;
  }

  .logo-tab {
    margin: 0 5px;
    padding: 0 10px;
  }

  .dropdown-menu {
    left: 50% !important;
  }
}

@media (max-width: 576px) {
  .tab-item {
    font-size: 14px;
    padding: 8px 10px;
  }

  .dropdown-menu {
    width: 180px;
  }

  .dropdown-item {
    padding: 8px 16px;
  }
}
</style>