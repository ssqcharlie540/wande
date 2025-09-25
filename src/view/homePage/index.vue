<template>
  <!-- 首页 -->
  <div class="homePage">
    <VideoBackground
      :videoSrc="videoSrc"
      :fadeDuration="3000"
      poster="src\assets\wande_logo.png"
      :autoplay="true"
      :loop="true"
      :muted="true"
      filter="none"
    >
      <!-- 在视频上方添加的内容 -->
      <h2 class="title">万德包装</h2>
      <h2 class="subtitle">智造守护·包装未来</h2>

      <!-- 播放按钮  -->
      <!-- <button class="play-button">
        <span class="play-icon"></span>
      </button> -->
    </VideoBackground>

    <!-- 公司介绍 -->
    <homepageGongsi :pageData="homeData?.pageData" />
    <!-- 我们的产品 -->
    <HomePageChanpin
      :title="homeData?.productsData?.title"
      :product-items="homeData?.productsData?.productItems"
    />
    <!-- 产品优势 -->
    <HomePageChanpinYoushi
      :title="homeData?.tabsData?.title"
      :tabsData="homeData?.tabsData?.tabsItem"
    />
    <!-- 产品应用领域 -->
    <homePageContent2
      :title="homeData?.contentData.title"
      :contentData="homeData?.contentData?.contentItem"
    />
    <!-- 合作客户 -->
    <homePageHeZuoKeHu
      :title="homeData?.heZuoKeHuData?.title"
      :heZuoKeHuData="homeData?.heZuoKeHuData?.heZuoKeHuItem"
    />
    <!-- 底部 -->
    <PageBottom :footerData="footerData" />
  </div>
</template>

<script setup >
import { onMounted, ref, inject, watch } from "vue";
import { getWebDatas } from "@/api/general";
import aliplayer from "./components/homePagealiplayer.vue";

import VideoBackground from "@/components/videoBack/index.vue";
import homepageGongsi from "./components/homepageGongsi.vue"; // 公司介绍
import HomePageChanpin from "./components/homePageChanpin.vue"; // 我们的产品
import HomePageChanpinYoushi from "./components/HomePageChanpinYoushi.vue"; // 产品优势
import homePageContent2 from "./components/homePageContene2.vue"; // 产品应用领域
import homePageHeZuoKeHu from "./components/homePageHeZuoKeHu.vue"; // 合作客户
import PageBottom from "@/components/PageBottom/index.vue";
const videoSrc = ref(); // 视频地址
const homeData = ref();
const footerData = ref();
const aboutData = ref();

const submitData = async () => {
  try {
    const resData = await getWebDatas({
      pageNumber: 1,
      language: "zh",
    });
    footerData.value = resData.footerData;
    homeData.value = resData.homeData;
    videoSrc.value = resData.homeData?.videoSrc;
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
  // background-image: url("@/assets/首页背景图.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed; /* 背景固定 */
  background-position: center;
}
.title {
  font-weight: normal !important; /* 强制覆盖 */
  font-size: 2rem;
  text-align: center;
  margin: 0;
  padding: 10px 0;
  color: #ffffff;
  position: relative;
  /* 初始状态 - 隐藏在下部 */
  opacity: 0;
  transform: translateY(50px);

  /* 动画效果 */
  animation: riseUp 1s ease-out forwards;
  animation-delay: 0.3s; /* 延迟0.3秒开始 */
}

.subtitle {
  font-size: 2rem;
  text-align: center;
  margin: 0;
  padding: 10px 0;
  color: #ffffff;
  position: relative;
  /* 初始状态 - 隐藏在下部 */
  opacity: 0;
  transform: translateY(50px);
  /* 动画效果 */
  animation: riseUp 1s ease-out forwards;
  animation-delay: 0.3s; /* 延迟0.3秒开始 */
}

/* 定义上升动画 */
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

/* 响应式调整 */
@media (max-width: 768px) {
  .title {
    font-size: 2rem;
    animation: riseUp 0.8s ease-out forwards;
  }
}

.play-button {
  // 按钮基础样式
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

  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }

  // 使用边框创建镂空三角形
  .play-icon {
    width: 0;
    height: 0;
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
    border-left: 20px solid white;
    margin-left: 5px; // 微调位置
    position: relative;

    // 创建镂空效果
    &::after {
      content: "";
      position: absolute;
      top: -10px;
      left: -22px;
      width: 0;
      height: 0;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      // border-left: 16px solid rgba(211, 29, 29, 0.2); // 使用按钮背景色
      // border-left: 16px solid transparent;
    }
  }
}
/* 内容 */

.parentDiv {
  height: 80vh;

  display: flex;
  flex-direction: column;
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中（可选） */
  height: 100vh; /* 父级高度需设置，100vh 表示全屏高度 */
}
</style>