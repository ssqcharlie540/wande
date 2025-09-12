<template>
  <!-- 关于万德 -->
  <div class="homePage">
    <div style="height: 8vh"></div>

    <!-- 固定在右侧的锚点 -->
    <div class="anchor-container">
      <el-anchor class="fixed-anchor" :offset="100" @change="handleChange">
        <el-anchor-link href="#aboutPageBrief" title="公司简介" />
        <el-anchor-link href="#aboutPageCourse" title="创新历程" />
        <el-anchor-link href="#aboutPageBrief2" title="公司文化" />
        <el-anchor-link href="#aboutPageBrief3" title="员工风采" />
      </el-anchor>
    </div>

    <!-- 内容部分 -->
    <div>
      <aboutPageTop :data="aboutData.aboutTopImg" />
    </div>

    <div id="aboutPageBrief">
      <!-- 公司简介 -->
      <aboutPageBrief :aboutPageBrirfData="aboutData.gongSiJianJie" />
    </div>
    <div id="aboutPageCourse">
      <!-- 发展历程 -->
      <aboutPageCourse :list="aboutData.shijianxianData" />
    </div>
    <div id="aboutPageBrief2">
      <!-- 公司介绍 -->
      <aboutPageGongsiwenhua :tablistData="aboutData.gongsiwenhuaData" />
    </div>
    <div id="aboutPageBrief3">
      <!-- 员工风采 -->
      <aboutPageYuangong :images="aboutData.employeeImages" />
    </div>
    <div id="aboutPageBrief3">
      <aboutPageGongsizizhi
        :images="aboutData.gongsizizhiData.images"
        :title="aboutData.gongsizizhiData.title"
        :backgroundImage="aboutData.gongsizizhiData.backgroundImage"
      />
    </div>
    <!-- 底部 -->
    <PageBottom :footerData="footerData" />
  </div>
</template>

<script setup>
import aboutPageTop from "./components/aboutPageTop.vue"; // 顶部关于万德
import aboutPageBrief from "./components/aboutPageBrief.vue"; // 公司简介
import aboutPageCourse from "./components/aboutPageCourse.vue"; // 创新历程
import aboutPageGongsiwenhua from "./components/aboutPageGongsiwenhua.vue"; // 公司介绍
import aboutPageYuangong from "./components/aboutPageYuangong.vue"; // 员工风采
import aboutPageGongsizizhi from "./components/aboutPageGongsizizhi.vue"; // 公司资质
import PageBottom from "@/components/PageBottom/index.vue"; // 底部

import { aboutData, footerData } from "@/util/mockData.js";

const handleChange = (href) => {
  console.log(`anchor change: ${href}`);
};
</script>

<style scoped>
.homePage {
  position: relative;
}

.anchor-container {
  position: fixed;
  right: 40px;
  top: 30%;
  transform: translateY(-50%);
  z-index: 100;
}

.fixed-anchor {
  background: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* 如果是垂直锚点，可以添加更多样式 */
.fixed-anchor .el-anchor {
  display: flex;
  flex-direction: column;
}

/* 响应式设计 - 在小屏幕上隐藏或调整位置 */
@media (max-width: 768px) {
  .anchor-container {
    display: none; /* 或调整到其他位置 */
  }
}
</style>