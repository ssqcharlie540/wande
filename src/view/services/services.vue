<template>
  <div class="home">
    <!-- 浮动标签组件 -->
    <FloatingTabs
      v-if="tabsData && tabsData.length > 0"
      :tabsData="tabsData"
      @onLanguage="onLanguage"
    />
    <!-- 全景展示 -->
    <div class="homePage">
      <div>
        <aboutPageTop :data="qjzsData?.aboutTopImg" />
      </div>
      <div><quanjingtu :title="qjzsData?.qjzsTitle" /></div>
      <!-- 给我们留言 -->
      <lliuYan v-if="qjzsData?.liuyanData" :config="qjzsData?.liuyanData" />
    </div>
    <!-- 底部 -->
    <PageBottom :footerData="footerData" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getWebDatas } from "@/api/general";
import FloatingTabs from "@/components/FloatingTabs/index.vue";
import aboutPageTop from "./components/aboutPageTop.vue"; // 顶部关于万德
import lliuYan from "@/view/contact/components/lliuYan.vue"; // 给我们留言

// import { qjzsData, footerData } from "@/util/mockData.js";
import quanjingtu from "./components/quanjingtu.vue";
import PageBottom from "@/components/PageBottom/index.vue"; // 底部
const tabsData = ref([
  { title: "首页", path: "/" },
  { title: "关于万德", path: "/about" },
  { title: "公司新闻", path: "/news_list" },
  { title: "产品及服务", path: "/products" },
  { title: "全景展示", path: "/services" },
  { title: "联系我们", path: "/contact" },
  { title: "ENGLISH", path: "/en" },
]);
const footerData = ref();
const qjzsData = ref();
const submitData = async () => {
  try {
    const resData = await getWebDatas({
      pageNumber: 4,
      language: "zh",
    });
    footerData.value = resData.footerData;
    qjzsData.value = resData.qjzsData;
    tabsData.value = resData.tabsData;
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
}
</style>