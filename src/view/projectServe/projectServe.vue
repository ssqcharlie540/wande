<template>
  <!-- 产品服务 -->
  <div class="homePage">
    <div style="height: 105px"></div>
    <proPageTop :data="projectData?.proPageTopData" />
    <!-- 我们的产品及优势 -->
    <HomePageChanpin
      title="我们的产品优势"
      :product-items="projectData?.productsData"
    />
    <!-- 产品优势 -->
    <HomePageChanpinYoushi :tabsData="projectData?.tabsData" />
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
import { onMounted, ref } from "vue";
import { getWebDatas } from "@/api/general";
import proPageTop from "./components/proPageTop.vue";
import proPageBottom from "./components/proPageBottom.vue";
import HomePageChanpin from "@/view/homePage/components/homePageChanpin.vue"; // 我们的产品及优势
import HomePageChanpinYoushi from "@/view/homePage/components/HomePageChanpinYoushi.vue"; // 我们的产品及优势
import PageBottom from "@/components/PageBottom/index.vue"; // 底部
// import { projectData, footerData } from "@/util/mockData";
const footerData = ref();
const projectData = ref();
const submitData = async () => {
  try {
    const resData = await getWebDatas({
      pageNumber: 3,
      language: "zh",
    });
    footerData.value = resData.footerData;
    projectData.value = resData.projectData;
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