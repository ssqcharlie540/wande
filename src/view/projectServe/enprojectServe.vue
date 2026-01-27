<template>
  <div class="home">
    <!-- 浮动标签组件 -->
    <FloatingTabs
      v-if="tabsData && tabsData.length > 0"
      :tabsData="tabsData"
      @onLanguage="onLanguage"
    />
    <!-- 产品服务 -->
    <div class="homePage">
      <!-- <div style="height: 1000px;width: 100px;background-color: aqua;">111</div> -->
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
      <lliuYan
        v-if="projectData?.liuyanData"
        :config="projectData?.liuyanData"
      />
      <!-- <div style="background-color: aqua;">111</div> -->
    </div>
    <!-- 底部 -->
    <PageBottom :footerData="footerData" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getWebDatas } from "@/api/general";
import lliuYan from "@/view/contact/components/lliuYan.vue"; // 给我们留言
import FloatingTabs from "@/components/FloatingTabs/index.vue";
import proPageTop from "./components/proPageTop.vue";
import proPageBottom from "./components/proPageBottom.vue";
import HomePageChanpin from "@/view/homePage/components/homePageChanpin.vue"; // 我们的产品及优势
import HomePageChanpinYoushi from "@/view/homePage/components/HomePageChanpinYoushi.vue"; // 我们的产品及优势
import PageBottom from "@/components/PageBottom/index.vue"; // 底部
// import { projectData, footerData } from "@/util/mockData";
const loading = ref(false);
const footerData = ref();
const projectData = ref();
const tabsData = ref([
  { title: "HOME", path: "/en" },
  { title: "ABOUT US", path: "/aboutEN" },
  { title: "COMPANY NEWS", path: "/news_listEN" },
  { title: "PRODUCT AND SERVICE", path: "/productsEN" },
  { title: "FACTORY DISPLAY ", path: "/servicesEN" },
  { title: "CONTACT", path: "/contactEN" },
  { title: "中文", path: "/" },
]);
const submitData = async () => {
  loading.value = true;
  console.log("提交数据中...");

  try {
    const resData = await getWebDatas({
      pageNumber: 3,
      language: "en",
    });
    footerData.value = resData.footerData;
    projectData.value = resData.projectData;
    tabsData.value = resData.tabsData;
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
  .proPageBottomCla {
    height: calc(85vh);
  }
}
</style>