<template>
  <!-- 信息栏 - 只在顶部显示 选中的黄色字体色号：D8B280 -->
  <!-- <div class="message-container" :class="{ hidden: !isAtTop }">
    <Floatingmessage />
  </div> -->

  <!-- Tab栏 - 始终固定在顶部，位置动态调整 -->
  <!-- 新增: 根据滚动状态添加scrolled类 -->
  <div class="floating-tabs" :class="{ scrolled: isScrolled }">
    <!-- 桌面端布局 -->
    <div class="desktop-tabs">
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
              <span @click="navigateTo(tab.path, tab.title)">
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

    <!-- 移动端布局 -->
    <div class="mobile-header">
      <div class="mobile-logo-container">
        <img src="@/assets/万德logo.png" class="mobile-logo" alt="万德logo" />
      </div>

      <!-- 移动端菜单按钮 -->
      <div class="mobile-menu-button" @click="toggleMobileMenu">
        <el-icon v-if="!isMobileMenuOpen"><Expand /></el-icon>
        <el-icon v-else><Fold /></el-icon>
      </div>
    </div>

    <!-- 移动端菜单 - 全屏弹窗 -->
    <div
      class="mobile-menu"
      :class="{ 'mobile-menu-open': isMobileMenuOpen && isMobileView }"
    >
      <!-- 菜单遮罩 -->
      <div class="mobile-menu-overlay" @click="closeMobileMenu"></div>

      <!-- 菜单内容 -->
      <div class="mobile-menu-content">
        <!-- 简化头部 - 只有关闭按钮 -->
        <div class="mobile-menu-header">
          <div class="mobile-close-button" @click="closeMobileMenu">
            <el-icon><Close /></el-icon>
          </div>
        </div>

        <!-- 菜单项列表 -->
        <div class="mobile-menu-list">
          <div
            v-for="(tab, index) in tabsData"
            :key="index"
            class="mobile-menu-item"
            :class="{ 'mobile-active': isActive(tab) }"
            @click="handleMobileItemClick(tab)"
            @mouseenter="handleMobileItemHover(index)"
            @mouseleave="handleMobileItemLeave"
          >
            <span class="mobile-menu-text">{{ tab.title }}</span>
            <div class="mobile-menu-divider"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineEmits, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Expand, Fold, Close } from "@element-plus/icons-vue";

const props = defineProps({
  tabsData: {
    type: Array,
    required: true,
  },
});

const emits = defineEmits(["onLanguage"]);

const router = useRouter();
const route = useRoute();
const hoverIndex = ref(null);
const mobileHoverIndex = ref(null);
const dropdownWidth = 180;
const isAtTop = ref(true);
const isScrolled = ref(false);
const scrollY = ref(0);
const isMobileMenuOpen = ref(false);
const isMobileView = ref(false);

let dropdownTimer = null;

// 检查是否为移动端视图
const checkMobileView = () => {
  const wasMobileView = isMobileView.value;
  isMobileView.value = window.innerWidth < 992;

  // 如果从移动端切换到桌面端，自动关闭菜单
  if (wasMobileView && !isMobileView.value && isMobileMenuOpen.value) {
    closeMobileMenu();
  }
};

// 监听窗口大小变化
watch(isMobileView, (newVal) => {
  if (!newVal && isMobileMenuOpen.value) {
    closeMobileMenu();
  }
});

// 滚动处理
const handleScroll = () => {
  scrollY.value = window.scrollY;
  isAtTop.value = window.scrollY <= 10;
  isScrolled.value = window.scrollY > 50;
};

// 切换移动端菜单
const toggleMobileMenu = () => {
  // 只有在移动端视图下才能打开菜单
  if (!isMobileView.value) return;

  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

// 关闭移动端菜单
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  document.body.style.overflow = "";
  mobileHoverIndex.value = null;
};

// 处理移动端菜单项点击
const handleMobileItemClick = (tab) => {
  navigateTo(tab.path, tab.title);
  closeMobileMenu();
};

// 处理移动端菜单项悬浮
const handleMobileItemHover = (index) => {
  mobileHoverIndex.value = index;
};

// 处理移动端菜单项离开
const handleMobileItemLeave = () => {
  mobileHoverIndex.value = null;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", checkMobileView);
  handleScroll();
  checkMobileView();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", checkMobileView);
  document.body.style.overflow = "";
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

const navigateTo = (path, title) => {
  console.log("Navigating to:", path);
  console.log("title:", title);
  if (title === "ENGLISH") {
    emits("onLanguage", "en");
    return;
  } else if (title === "中文") {
    emits("onLanguage", "zh");
    return;
  }

  if (!path || path === route.path) {
    return;
  }

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
  z-index: 1000001;
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
  transition: all 0.3s ease;
  height: 105px;

  /* 点状背景 */
  --dot-color: rgba(56, 56, 56, 0.7);
  --dot-spacing: 2px;
  --bg-opacity: 0.6;
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
  background-image: none;
}

/* 当信息栏隐藏时，Tab栏紧贴顶部 */
.floating-tabs:has(~ .message-container.hidden) {
  --tab-top: 0;
}

/* 桌面端布局 */
.desktop-tabs {
  display: block;
}

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
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3); /* 添加文字阴影 */
}

.tab-item:hover {
  color: #d8b280;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4); /* 悬停时阴影加深 */
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
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3)); /* 给logo也添加阴影 */
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
  color: #d8b280;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5); /* 激活状态阴影 */
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
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.05); /* 下拉项文字阴影 */
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
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 下拉项悬停阴影 */
  cursor: pointer;
}

/* 移动端布局 */
.mobile-header {
  display: none;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 100%;
  width: 100%;
}

.mobile-logo-container {
  display: flex;
  align-items: center;
}

.mobile-logo {
  height: 24px;
  width: auto;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3)); /* 移动端logo阴影 */
}

/* 移动端菜单按钮 */
.mobile-menu-button {
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  transition: all 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3); /* 菜单按钮阴影 */
}

.mobile-menu-button:hover {
  color: #d8b280;
  transform: scale(1.1);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4); /* 悬停时阴影加深 */
}

/* 移动端菜单 - 全屏弹窗 */
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1002;
  visibility: hidden;
  opacity: 0;
  transition: all 0.6s ease;
}

.mobile-menu-open {
  visibility: visible;
  opacity: 1;
}

/* 菜单遮罩 */
.mobile-menu-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(2px);
  transition: opacity 0.6s ease;
}

/* 菜单内容 - 从右侧滑入 */
.mobile-menu-content {
  position: absolute;
  top: 0;
  right: -100%;
  width: 85%;
  max-width: 400px;
  height: 100%;
  background: #ffffff;
  box-shadow: -2px 0 20px rgba(0, 0, 0, 0.3);
  transition: right 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.mobile-menu-open .mobile-menu-content {
  right: 0;
}

/* 简化头部 - 只有关闭按钮 */
.mobile-menu-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 25px;
  border-bottom: 1px solid #e5e5e5;
  background: #ffffff;
  flex-shrink: 0;
  height: 60px;
}

.mobile-close-button {
  color: #333333;
  font-size: 24px;
  cursor: pointer;
  padding: 8px 12px;
  transition: all 0.4s ease;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); /* 关闭按钮阴影 */
}

.mobile-close-button:hover {
  color: #d8b280;
  background: rgba(0, 0, 0, 0.05);
  transform: scale(1.1);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2); /* 悬停时阴影加深 */
}

/* 菜单项列表 */
.mobile-menu-list {
  flex: 1;
  overflow-y: auto;
  padding: 0;
}

.mobile-menu-item {
  position: relative;
  padding: 0;
  cursor: pointer;
  transition: all 0.4s ease;
  background: #ffffff;
}

.mobile-menu-text {
  display: block;
  padding: 20px 25px;
  color: #333333;
  font-size: 18px;
  font-weight: 500;
  transition: all 0.4s ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); /* 移动端菜单文字阴影 */
}

/* 悬浮效果 - 只修改文字颜色 */
.mobile-menu-item:hover .mobile-menu-text {
  color: #d8b280;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2); /* 悬停时阴影加深 */
}

/* 选中状态 */
.mobile-menu-item.mobile-active .mobile-menu-text {
  color: #d8b280;
  font-weight: 600;
  text-shadow: 0 1px 3px rgba(216, 178, 128, 0.3); /* 选中状态使用黄色阴影 */
}

/* 分割线 */
.mobile-menu-divider {
  height: 1px;
  background: #e5e5e5;
  margin: 0 25px;
  transition: all 0.4s ease;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05); /* 分割线阴影 */
}

/* 最后一个菜单项不需要分割线 */
.mobile-menu-item:last-child .mobile-menu-divider {
  display: none;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .desktop-tabs {
    display: none;
  }

  .mobile-header {
    display: flex;
  }

  /* .floating-tabs {
    height: 70px;
  } */
}

@media (max-width: 576px) {
  .mobile-menu-content {
    width: 90%;
    max-width: none;
  }

  .mobile-menu-text {
    padding: 18px 20px;
    font-size: 17px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.08); /* 小屏幕阴影调整 */
  }

  .mobile-menu-divider {
    margin: 0 20px;
  }

  .mobile-menu-header {
    padding: 18px 20px;
    height: 55px;
  }

  .mobile-header {
    padding: 0 15px;
  }
}

/* 小屏幕手机优化 */
@media (max-width: 375px) {
  .mobile-menu-text {
    padding: 16px 18px;
    font-size: 16px;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.06); /* 更小屏幕阴影调整 */
  }

  .mobile-menu-divider {
    margin: 0 18px;
  }

  .mobile-menu-header {
    padding: 16px 18px;
    height: 50px;
  }
}

/* 原有的响应式样式保持不变 */
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