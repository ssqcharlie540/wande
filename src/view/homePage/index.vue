<template>
  <!-- 首页 -->
  <div class="homePage">
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
      <!-- <el-icon><CaretRight /></el-icon> -->
      <!-- 播放按钮 -->
      <button class="play-button" @click="handlePlayClick">
        <!-- <span class="play-icon" :class="{ playing: isVideoPlaying }"></span> -->
        <el-icon v-if="!isVideoPlaying" style="font-size: 50px; color: #fff"
          ><CaretRight
        /></el-icon>
        <img
          v-if="isVideoPlaying"
          src="@/assets/icon/pause2.png"
          class="tab-logo"
          alt="万德logo"
        />
        <!-- <el-icon><CaretRight /></el-icon> -->
      </button>
      <!-- <el-button :icon="CaretRight" circle size="large" /> -->
    </VideoBackground>

    <!-- 其他组件保持不变 -->
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
    <PageBottom :footerData="footerData" />
  </div>
</template>

<script setup>
import { onMounted, ref, inject, watch } from "vue";
import { getWebDatas } from "@/api/general";
import { CaretRight } from "@element-plus/icons-vue";
import aliplayer from "./components/homePagealiplayer.vue";
import lliuYan from "@/view/contact/components/lliuYan.vue";

import VideoBackground from "@/components/videoBack/index.vue";
import homepageGongsi from "./components/homepageGongsi.vue";
import HomePageChanpin from "./components/homePageChanpin.vue";
import HomePageChanpinYoushi from "./components/HomePageChanpinYoushi.vue";
import homePageContent2 from "./components/homePageContene2.vue";
import homePageHeZuoKeHu from "./components/homePageHeZuoKeHu.vue";
import PageBottom from "@/components/PageBottom/index.vue";

const videoBackground = ref(null);
const videoSrc = ref();
const poster = ref("src/assets/wande_logo.png");
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
      language: localStorage.getItem("Language") || "zh",
    });
    footerData.value = resData.footerData;
    homeData.value = resData.homeData;
    videoSrc.value = resData.homeData?.videoData?.videoSrc;
    poster.value = ''
    videoTitle.value = resData.homeData?.videoData?.videoTitle;
    videoSubTitle.value = resData.homeData?.videoData?.videoSubTitle;
    console.log("提交结果:", resData);
  } catch (error) {
    console.error("提交失败:", error);
  }
};

onMounted(() => {
  console.log("aboutData:", aboutData);
  submitData();
});
</script>

<style scoped lang="scss">
.homePage {
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
}

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
    font-size: 2rem;
    animation: riseUp 0.8s ease-out forwards;
  }
}

.parentDiv {
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>