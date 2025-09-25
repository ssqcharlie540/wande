<template>
  <!-- 全景展示 -->
  <div class="homePage">
    <div style="height: 8vh"></div>
    <div>
      <aboutPageTop :data="qjzsData?.aboutTopImg" />
    </div>
    <div><quanjingtu /></div>
    <!-- 底部 -->
    <PageBottom :footerData="footerData" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getWebDatas } from "@/api/general";
import aboutPageTop from "./components/aboutPageTop.vue"; // 顶部关于万德
// import { qjzsData, footerData } from "@/util/mockData.js";
import quanjingtu from "./components/quanjingtu.vue";
import PageBottom from "@/components/PageBottom/index.vue"; // 底部


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
}
</style>