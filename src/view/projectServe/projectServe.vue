<template>
  <!-- 产品服务 -->
  <div class="homePage">
    <div style="height: 105px"></div>
    <proPageTop :data="projectData?.proPageTopData" />
    <!-- 我们的产品及优势 -->
    <HomePageChanpin
      :title="projectData?.productsData?.title"
      :product-items="projectData?.productsData?.productItems"
    />
    <!-- 产品优势 -->
    <HomePageChanpinYoushi
      :title="projectData?.tabsData?.title"
      :tabsData="projectData?.tabsData?.tabsItem"
    />
    <div class="proPageBottomCla">
      <!-- 图片切换 -->
      <proPageBottom :Imagedata="projectData?.Imagedata" />
    </div>
    <!-- 给我们留言 -->
    <lliuYan v-if="projectData?.liuyanData" :config="projectData?.liuyanData" />
    <!-- <div style="background-color: aqua;">111</div> -->
    <!-- 底部 -->
    <PageBottom :footerData="footerData" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getWebDatas } from "@/api/general";
import lliuYan from "@/view/contact/components/lliuYan.vue"; // 给我们留言

import proPageTop from "./components/proPageTop.vue";
import proPageBottom from "./components/proPageBottom.vue";
import HomePageChanpin from "@/view/homePage/components/homePageChanpin.vue"; // 我们的产品及优势
import HomePageChanpinYoushi from "@/view/homePage/components/HomePageChanpinYoushi.vue"; // 我们的产品及优势
import PageBottom from "@/components/PageBottom/index.vue"; // 底部
// import { projectData, footerData } from "@/util/mockData";
const loading = ref(false);
const footerData = ref();
const projectData = ref();
const submitData = async () => {
  loading.value = true;
  console.log("提交数据中...");

  try {
    const resData = await getWebDatas({
      pageNumber: 3,
      language: localStorage.getItem("Language") || "zh",
    });
    footerData.value = resData.footerData;
    projectData.value = resData.projectData;
    loading.value = false;

    console.log("提交结果:", resData);
  } catch (error) {
    console.error("提交失败:", error);
  }
};
onMounted(() => {
  submitData();
});
</script>
<style lang="scss" scoped>
.homePage {
  position: relative;
  .proPageBottomCla {
    height: calc(85vh);
  }
}
</style>