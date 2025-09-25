<template>
  <!-- 顶部tab -->
  <FloatingTabs :tabsData="tabsData" />
  <div class="content">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted, ref, provide } from "vue";
import { getWebDatas } from "@/api/general";
import FloatingTabs from "@/components/FloatingTabs/index.vue";
const resDataNumber1 = ref(null);
provide("resDataNumber1", resDataNumber1);
// 获取数据
const tabsData = ref([]);
const submitData = async () => {
  try {
    const resData = await getWebDatas({
      pageNumber: 1,
      language: "zh",
    });
    tabsData.value = resData.tabsData;
    resDataNumber1.value = resData;
    console.log("提交结果:", resData);
  } catch (error) {
    console.error("提交失败:", error);
  }
};
onMounted(() => {
  submitData();
});
</script>

<style scoped>
/* 全局重置 */
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.content {
  margin: 0;
  width: 100vw;
  min-height: 100vh; /* 改为min-height而不是固定height */
  box-sizing: border-box;
  padding: 0 !important;
  position: relative;
  /* 移除 margin-left 居中补偿，除非特别需要 */
  margin-left: calc(-50vw + 50%);
}
</style>