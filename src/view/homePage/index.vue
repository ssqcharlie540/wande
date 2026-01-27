<template>
  <div class="home">
    <!-- 浮动标签组件 -->
    <FloatingTabs
      v-if="tabsData && tabsData.length > 0"
      :tabsData="tabsData"
      @onLanguage="onLanguage"
    />

    <!-- 首页 -->
    <div class="homePage">
      <!-- 视频容器 -->
      <div class="video-container">
        <VideoBackground
          ref="videoBackground"
          :videoSrc="videoSrc"
          :fadeDuration="3000"
          :poster="poster"
          :autoplay="false"
          :loop="true"
          :muted="true"
          filter="none"
        >
          <!-- 在视频上方添加的内容 -->
          <h2 class="title">{{ videoTitle }}</h2>
          <h2 class="subtitle">{{ videoSubTitle }}</h2>
          <!-- 播放按钮 -->
          <button class="play-button" @click="handlePlayClick">
            <el-icon v-if="!isVideoPlaying" style="font-size: 50px; color: #fff"
              ><CaretRight
            /></el-icon>
            <img
              v-if="isVideoPlaying"
              src="/src/assets/icon/pause2.png"
              class="tab-logo"
              alt="万德logo"
            />
          </button>
        </VideoBackground>
      </div>
      <!-- 其他组件 -->

      <homepageGongsi :pageData="homeData?.pageData" />

      <HomePageChanpin
        :title="homeData?.productsData?.title"
        :product-items="homeData?.productsData?.productItems"
      />
      <HomePageChanpinYoushi
        :title="homeData?.tabsData?.title"
        :tabsData="homeData?.tabsData?.tabsItem"
      />
      <homePageContent2
        :title="homeData?.contentData.title"
        :contentData="homeData?.contentData?.contentItem"
      />
      <homePageHeZuoKeHu
        :title="homeData?.heZuoKeHuData?.title"
        :heZuoKeHuData="homeData?.heZuoKeHuData?.heZuoKeHuItem"
      />
      <lliuYan v-if="homeData?.liuyanData" :config="homeData?.liuyanData" />
    </div>
    <PageBottom :footerData="footerData" />
  </div>
</template>

<script setup>
import { onMounted, ref, inject, watch, getCurrentInstance } from "vue";
import { getWebDatas } from "@/api/general";
import { CaretRight } from "@element-plus/icons-vue";
import FloatingTabs from "@/components/FloatingTabs/index.vue";
import aliplayer from "./components/homePagealiplayer.vue";
import lliuYan from "@/view/contact/components/lliuYan.vue";

import VideoBackground from "@/components/videoBack/index.vue";
import homepageGongsi from "./components/homepageGongsi.vue";
import HomePageChanpin from "./components/homePageChanpin.vue";
import HomePageChanpinYoushi from "./components/HomePageChanpinYoushi.vue";
import homePageContent2 from "./components/homePageContene2.vue";
import homePageHeZuoKeHu from "./components/homePageHeZuoKeHu.vue";
import PageBottom from "@/components/PageBottom/index.vue";

// const { proxy } = getCurrentInstance();

// 从原 App.vue 迁移的变量和函数
const showFloatingTabs = ref(true);
// 检查是否需要显示浮动标签
// const path = window.location.pathname;
// if (path.includes("/getInquiries")) {
//   showFloatingTabs.value = false;
// }
const tabsData = ref([
  { title: "首页", path: "/" },
  { title: "关于万德", path: "/about" },
  { title: "公司新闻", path: "/news_list" },
  { title: "产品及服务", path: "/products" },
  { title: "全景展示", path: "/services" },
  { title: "联系我们", path: "/contact" },
  { title: "ENGLISH", path: "/en" },
]);

const videoBackground = ref(null);
const videoSrc = ref();
const poster = ref(
  "https://www.wandepack.com/api/getImage?image=logo_wande_1.png"
);
const videoTitle = ref("万德包装");
const videoSubTitle = ref("智造守护·包装未来");
const isVideoPlaying = ref(false);

const homeData = ref();
const footerData = ref();
const aboutData = ref();

// 处理播放按钮点击
const handlePlayClick = () => {
  if (videoBackground.value) {
    videoBackground.value.togglePlay();
    isVideoPlaying.value = !isVideoPlaying.value;
  }
};

const submitData = async () => {
  try {
    const resData = await getWebDatas({
      pageNumber: 1,
      language: "zh",
    });
    footerData.value = resData.footerData;
    homeData.value = resData.homeData;
    videoSrc.value = resData.homeData?.videoData?.videoSrc;
    poster.value = "";
    videoTitle.value = resData.homeData?.videoData?.videoTitle;
    videoSubTitle.value = resData.homeData?.videoData?.videoSubTitle;
    tabsData.value = resData.tabsData;
    console.log("提交结果:", resData);
  } catch (error) {
    console.error("提交失败:", error);
  }
};

// 语言切换函数（从原 App.vue 迁移）
const onLanguage = (lang) => {
  console.log("语言切换为:", lang);
  localStorage.setItem("Language", lang);

  // 调用 HTML 中的全局函数
  if (typeof window.switchLanguage === "function") {
    window.switchLanguage(lang);
  }
};
onMounted(() => {
  console.log("aboutData:", aboutData);
  // 方式2：使用全局 $seo 方法
  // proxy.$seo({
  //   title: "首页 - 我的网站",
  //   description: "了解更多关于我们的信息",
  //   keywords: "关于,我们,公司",
  // });

  submitData();
});
</script>

<!-- homepage index.vue -->
<style scoped lang="scss">
/* 重置所有边距 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.home {
  width: 100vw;
  background-color: #ffffff;
  position: absolute;
  top: 0;
  left: 0;
}
.homePage {
  display: flex;
  justify-content: center;
  flex-direction: column;
  // position: relative;
  // width: 100vw; /* 使用视口宽度 */
  // margin: 0;
  // padding: 0;
  // overflow: hidden; /* 防止内容溢出 */
  /* 关键：使用负 margin 拉回页面 */
  // margin-top: 5022px !important;
  /* 视频容器样式 */
  .video-container {
    width: 100vw;
    height: calc(100vh - 60px); /* 减去浮动标签高度 */
    position: relative;
    left: 0;
    right: 0;
  }
  /* 浮动标签样式 */
  :deep(.floating-tabs) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100vw;
    z-index: 1000;
    background: white;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    height: 60px;

    /* 强制显示 */
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
  }
}
.components-section {
  overflow: hidden;
}

/* 标题样式 */
.title {
  font-weight: normal !important;
  font-size: 2rem;
  text-align: center;
  margin: 0;
  padding: 10px 0;
  color: #ffffff;
  position: relative;
  opacity: 0;
  transform: translateY(50px);
  animation: riseUp 1s ease-out forwards;
  animation-delay: 0.3s;
}

.subtitle {
  font-size: 2rem;
  text-align: center;
  margin: 0;
  padding: 10px 0;
  color: #ffffff;
  position: relative;
  opacity: 0;
  transform: translateY(50px);
  animation: riseUp 1s ease-out forwards;
  animation-delay: 0.3s;
}

.play-button {
  margin-top: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  opacity: 0;
  transform: translateY(50px);
  animation: riseUp 1s ease-out forwards;
  animation-delay: 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
}

@keyframes riseUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 1.5rem;
  }

  .homePage {
    :deep(.floating-tabs) {
      height: 50px !important;
    }

    .video-container {
      height: calc(100vh - 50px);
      margin-top: 50px;
    }
  }
}
</style>