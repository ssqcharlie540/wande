<template>
  <!-- 产品服务 -->
  <div class="homePage">
    <div style="height: 105px"></div>
    <proPageTop :data="projectData.proPageTopData" />
    <!-- 我们的产品及优势 -->
    <HomePageChanpin
      title="我们的产品优势"
      :product-items="projectData.productsData"
    />
    <!-- 产品优势 -->
    <HomePageChanpinYoushi :tabsData="projectData.tabsData" />
    <div class="proPageBottomCla">
      <!-- 图片切换 -->
      <proPageBottom />
    </div>
    <!-- <div style="background-color: aqua;">111</div> -->
    <!-- 底部 -->
    <PageBottom :footerData="footerData" />
  </div>
</template>

<script setup>
import proPageTop from "./components/proPageTop.vue";
import proPageBottom from "./components/proPageBottom.vue";
import HomePageChanpin from "@/view/homePage/components/homePageChanpin.vue"; // 我们的产品及优势
import HomePageChanpinYoushi from "@/view/homePage/components/HomePageChanpinYoushi.vue"; // 我们的产品及优势
import PageBottom from "@/components/PageBottom/index.vue"; // 底部
import { projectData, footerData } from "@/util/mockData";
</script>
<style lang="scss" scoped>
.homePage {
  position: relative;
  .proPageBottomCla {
    height: calc(70vh + 160px);
  }
}
</style>