<template>
  <!-- 关于万德 -->
  <div class="homePage">
    <div style="height: 105px"></div>

    <!-- 固定在右侧的锚点 -->
    <div class="anchor-container">
      <el-anchor class="fixed-anchor" :offset="100" @click="handleAnchorClick">
        <el-anchor-link
          v-for="(item, index) in aboutData?.anchorlinkData"
          :key="index"
          :href="item.href"
          :title="item.title"
        />
      </el-anchor>
    </div>

    <!-- 内容部分 -->
    <div>
      <aboutPageTop :data="aboutData?.aboutTopImg" />
    </div>

    <div id="aboutPageBrief">
      <!-- 公司简介 -->
      <aboutPageBrief :aboutPageBrirfData="aboutData?.gongSiJianJie" />
    </div>
    <div id="aboutPageCourse">
      <!-- 发展历程 -->
      <aboutPageCourse
        :title="aboutData?.shijianxianData.title"
        :list="aboutData?.shijianxianData.shijianxianItem"
      />
    </div>
    <div id="aboutPageBrief2">
      <!-- 公司介绍 -->
      <aboutPageGongsiwenhua :tablistData="aboutData?.gongsiwenhuaData" />
    </div>
    <div id="aboutPageBrief3" v-if="aboutData?.employeeImagesData">
      <!-- 员工风采 -->
      <aboutPageYuangong
        :title="aboutData?.employeeImagesData?.title"
        :images="aboutData?.employeeImagesData?.employeeImagesItem"
      />
    </div>
    <!-- 我们的资质及荣誉 -->
    <div id="aboutPageBrief4">
      <aboutPageGongsizizhi
        :images="aboutData?.gongsizizhiData?.images"
        :title="aboutData?.gongsizizhiData?.title"
        :backgroundImage="aboutData?.gongsizizhiData?.backgroundImage"
      />
    </div>
    <!-- 给我们留言 -->
    <lliuYan v-if="aboutData?.liuyanData" :config="aboutData?.liuyanData" />
    <!-- 底部 -->
    <PageBottom :footerData="footerData" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getWebDatas } from "@/api/general";
import lliuYan from "@/view/contact/components/lliuYan.vue"; // 给我们留言

import aboutPageTop from "./components/aboutPageTop.vue"; // 顶部关于万德
import aboutPageBrief from "./components/aboutPageBrief.vue"; // 公司简介
import aboutPageCourse from "./components/aboutPageCourse.vue"; // 创新历程
import aboutPageGongsiwenhua from "./components/aboutPageGongsiwenhua.vue"; // 公司介绍
import aboutPageYuangong from "./components/aboutPageYuangong.vue"; // 员工风采
import aboutPageGongsizizhi from "./components/aboutPageGongsizizhi.vue"; // 公司资质
import PageBottom from "@/components/PageBottom/index.vue"; // 底部

// import { aboutData, footerData } from "@/util/mockData.js";
const footerData = ref();
const aboutData = ref();

const submitData = async () => {
  try {
    const resData = await getWebDatas({
      pageNumber: 2,
      language: localStorage.getItem("Language") || "zh",
    });
    footerData.value = resData.footerData;
    aboutData.value = resData.aboutData;
    console.log("提交结果:", resData);
  } catch (error) {
    console.error("提交失败:", error);
  }
};
onMounted(() => {
  console.log("aboutData:", aboutData);
  submitData();
});

// 替换原有的 handleChange 方法
const handleAnchorClick = (event) => {
  // 阻止默认的锚点跳转行为
  event.preventDefault();

  const target = event.target.closest("a");
  // 使用 closest 方法找到点击事件最近的祖先 <a> 元素
  // 这样可以确保即使点击的是 <a> 元素内部的子元素，也能正确找到锚点链接
  if (target && target.hash) {
    // 检查是否成功找到了 <a> 元素，并且该元素有 hash 属性（即包含 # 的锚点标识）
    // target.hash 返回的是类似 "#aboutPageBrief" 这样的字符串
    const element = document.querySelector(target.hash);
    // 使用 querySelector 通过 CSS 选择器找到页面中对应的目标元素
    // target.hash 就是选择器，例如 "#aboutPageBrief"
    if (element) {
      const offset = 100; // 与你的 offset 保持一致
      const elementPosition = element.getBoundingClientRect().top;
      // 获取目标元素相对于视口（viewport）顶部的位置
      // getBoundingClientRect() 返回元素的大小及其相对于视口的位置
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      // 计算最终的滚动位置：
      // elementPosition - 元素相对于视口的位置
      // window.pageYOffset - 当前页面的垂直滚动距离
      // - offset - 减去偏移量，让滚动位置在目标元素上方一些

      // 平滑滚动到目标位置
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }
};

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
:deep(.el-anchor__link) {
  font-size: 18px;
  margin: 5px 0;
}
</style>