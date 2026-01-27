<template>
  <!-- Tab栏 - 始终固定在顶部 -->

  <div class="floating-tabs" :class="{ scrolled: isScrolled }">
    <!-- 桌面端布局 -->
    <div class="desktop-tabs">
      <div class="tabs-container">
        <!-- Logo -->
        <div class="tab-item-container" @click="navigateTo('/', '首页')">
          <div class="tab-item logo-tab">
            <img
              src="https://www.wandepack.com/api/getImage?image=logo_wande_1.png"
              class="tab-logo"
              alt="万德logo"
            />
          </div>
        </div>

        <!-- 其他tab项 -->
        <template v-for="(tab, index) in tabsData" :key="index">
          <div
            class="tab-item-container"
            @mouseenter="handleMouseEnter(index)"
            @mouseleave="handleMouseLeave"
            :class="{ 'active-tab-container': isActive(tab) }"
          >
            <!-- 常规tab项 -->
            <div class="tab-item" @click="navigateTo(tab.path, tab.title)">
              <span>{{ tab.title }}</span>
            </div>
            <!-- <a :href="tab.path">{{ tab.title }}</a> -->
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
                @click="navigateTo(item.path, item.text)"
              >
                {{ item.text }}
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- 移动端布局 -->
    <div class="mobile-header">
      <div class="mobile-logo-container" @click="navigateTo('/', '首页')">
        <img
          src="https://www.wandepack.com/api/getImage?image=logo_wande_1.png"
          class="mobile-logo"
          alt="万德logo"
        />
      </div>

      <!-- 移动端菜单按钮 -->
      <div class="mobile-menu-button" @click="toggleMobileMenu">
        <i v-if="!isMobileMenuOpen" class="icon-expand">≡</i>
        <i v-else class="icon-fold">×</i>
      </div>
    </div>

    <!-- 移动端菜单 -->
    <div
      class="mobile-menu"
      :class="{ 'mobile-menu-open': isMobileMenuOpen && isMobileView }"
    >
      <div class="mobile-menu-overlay" @click="closeMobileMenu"></div>
      <div class="mobile-menu-content">
        <div class="mobile-menu-header">
          <div class="mobile-close-button" @click="closeMobileMenu">
            <i class="icon-close">×</i>
          </div>
        </div>
        <div class="mobile-menu-list">
          <div
            v-for="(tab, index) in tabsData"
            :key="index"
            class="mobile-menu-item"
            :class="{ 'mobile-active': isActive(tab) }"
            @click="handleMobileItemClick(tab)"
          >
            <span class="mobile-menu-text">{{ tab.title }}</span>
            <div class="mobile-menu-divider"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 给内容区域添加顶部边距 -->
  <div class="content-margin"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  tabsData: {
    type: Array,
    required: true,
  },
});

const emits = defineEmits(["onLanguage"]);

const hoverIndex = ref(null);
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const isMobileView = ref(false);

let dropdownTimer = null;

// 检查是否为移动端视图
const checkMobileView = () => {
  isMobileView.value = window.innerWidth < 992;
};

// 滚动处理
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

// 移动端菜单控制
const toggleMobileMenu = () => {
  if (!isMobileView.value) return;
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  document.body.style.overflow = isMobileMenuOpen.value ? "hidden" : "";
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  document.body.style.overflow = "";
};

const handleMobileItemClick = (tab) => {
  navigateTo(tab.path, tab.title);
  closeMobileMenu();
};

// 悬停控制
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

// 简化激活状态判断
const isActive = (tab) => {
  const tabPath = tab.path || "";
  const currentPath = window.location.pathname;

  // console.log('激活检查:', { tabPath, currentPath });

  // 首页特殊处理
  if (tabPath === "/" || tabPath === "/index.html") {
    return currentPath === "/" || currentPath === "/index.html";
  }

  // 关于页特殊处理
  if (tabPath === "/about" || tabPath === "/about.html") {
    return currentPath === "/about" || currentPath === "/about.html";
  }

  // 简单匹配
  const normalize = (path) => {
    return path.replace(".html", "").replace(/^\//, "");
  };

  return normalize(tabPath) === normalize(currentPath);
};

// 导航函数
const navigateTo = (path, title) => {
  console.log("导航:", { path, title });

  // 普通导航 - 简化处理
  if (!path) return;

  // 确保路径格式正确
  let targetPath = path;

  // 确保以 / 开头
  if (!targetPath.startsWith("/")) {
    targetPath = "/" + targetPath;
  }

  // 首页特殊处理
  if (targetPath === "/") {
    targetPath = "/index.html";
  }

  console.log("最终跳转路径:", targetPath);

  // 执行跳转
  window.location.href = targetPath;
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
</script>



<style scoped>
/* Tab栏基础样式 */
.floating-tabs {
  position: fixed;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 110px !important; /* 固定高度 */
  z-index: 1000 !important;
  margin: 0 !important;
  padding: 0;

  /* 灰色背景 */
  background-color: #333333 !important;

  /* 点状效果 */
  /* background-image: radial-gradient(
    circle at 1px 1px,
    rgba(255, 255, 255, 0.15) 1px,
    transparent 0
  ) !important;
  background-size: 20px 20px !important; */

  /* 毛玻璃效果 */
  /* backdrop-filter: blur(10px) !important; */
  /* -webkit-backdrop-filter: blur(10px) !important; */

  /* 边框和阴影 */
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1) !important;

  /* 过渡效果 */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;

  /* 确保内容不溢出 */
  overflow: hidden !important;
}

/* 滚动时的样式 */
.floating-tabs.scrolled {
  height: 70px; /* 滚动时稍微矮一点 */
  background-color: rgba(51, 51, 51, 0.95);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

/* 桌面端容器 - 确保内容居中且不溢出 */
.desktop-tabs {
  display: block;
  height: 100%;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
}

.tabs-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 20px;
  position: relative;
  overflow: visible; /* 允许下拉菜单溢出 */
}

/* Tab项容器 */
.tab-item-container {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
}

/* Tab项 */
.tab-item {
  position: relative;
  padding: 0 20px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tab-item:hover {
  color: #d8b280;
}

/* Logo样式 */
.logo-tab {
  padding: 0 30px;
}

.tab-logo {
  height: 36px;
  width: auto;
  transition: all 0.3s ease;
  filter: brightness(1) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.tab-logo:hover {
  transform: scale(1.05);
  filter: brightness(1.2) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
}

/* 激活状态 */
.active-tab-container .tab-item {
  color: #d8b280;
  font-weight: 600;
}

.active-tab-container .tab-item::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 3px;
  background: linear-gradient(90deg, #d8b280, #f0d6a7);
  border-radius: 1.5px;
}

/* 下拉菜单 - 确保位置正确且不产生滚动条 */
.dropdown-menu {
  position: absolute;
  top: 100%; /* 紧贴tab底部 */
  left: 50%;
  transform: translateX(-50%) translateY(-10px);
  width: 200px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  padding: 8px 0;
  z-index: 1001;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden; /* 防止内容溢出 */
}

.tab-item-container:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

.dropdown-item {
  padding: 12px 24px;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  white-space: nowrap;
  border-left: 3px solid transparent;
}

.dropdown-item:hover {
  background: rgba(216, 178, 128, 0.1);
  color: #d8b280;
  border-left-color: #d8b280;
  padding-left: 27px;
}

/* 移动端布局 */
.mobile-header {
  display: none;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  width: 100%;
}

.mobile-logo {
  height: 30px;
  width: auto;
  filter: brightness(1) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.mobile-menu-button {
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  transition: all 0.3s ease;
}

.mobile-menu-button:hover {
  color: #d8b280;
  transform: rotate(90deg);
}

/* 内容边距 */
.content-margin {
  height: 80px;
  width: 100%;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .desktop-tabs {
    max-width: 100%;
    padding: 0 15px;
  }

  .tab-item {
    padding: 0 15px;
    font-size: 15px;
  }

  .logo-tab {
    padding: 0 20px;
  }
}

@media (max-width: 992px) {
  .desktop-tabs {
    display: none;
  }

  .mobile-header {
    display: flex;
  }

  .floating-tabs {
    height: 70px;
  }

  .content-margin {
    height: 70px;
  }

  .mobile-logo {
    height: 28px;
  }
}

/* 小屏幕手机 */
@media (max-width: 576px) {
  .floating-tabs {
    height: 65px;
  }

  .content-margin {
    height: 65px;
  }

  .mobile-header {
    padding: 0 15px;
  }

  .mobile-logo {
    height: 26px;
  }

  .mobile-menu-button {
    font-size: 22px;
  }
}

/* 修复可能的问题 - 确保没有意外的滚动条 */
.floating-tabs {
  -webkit-overflow-scrolling: touch;
  overflow-x: hidden;
  overflow-y: hidden;
}

.tabs-container {
  overflow: visible;
}

/* 如果还有侧边内容，添加这个修复 */
* {
  box-sizing: border-box;
}

html,
body {
  overflow-x: hidden;
  width: 100%;
  position: relative;
}
</style>



