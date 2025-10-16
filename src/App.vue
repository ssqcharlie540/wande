<template>
  <!-- 顶部tab -->
  <FloatingTabs
    v-if="showFloatingTabs"
    :tabsData="tabsData"
    @onLanguage="onLanguage"
  />
  <div class="content">
    <router-view :key="routeKey"></router-view>
  </div>
</template>

<script setup>
import { onMounted, ref, provide, watch } from "vue";
import { useRoute } from "vue-router";
import { getWebDatas } from "@/api/general";
import FloatingTabs from "@/components/FloatingTabs/index.vue";
const resDataNumber1 = ref(null);
provide("resDataNumber1", resDataNumber1);
// 添加路由key
const routeKey = ref(0);
// 添加加载状态
const isLoading = ref(false);
// 获取当前路由对象
const route = useRoute();
// 是否显示顶部tab
const showFloatingTabs = ref(true);
// 获取数据
const tabsData = ref([]);
const submitData = async () => {
  try {
    const resData = await getWebDatas({
      pageNumber: 1,
      language: localStorage.getItem("Language") || "zh",
    });
    tabsData.value = resData.tabsData;
    resDataNumber1.value = resData;
    console.log("提交结果:", resData);
  } catch (error) {
    console.error("提交失败:", error);
  }
};
// 语言切换
const onLanguage = (lang) => {
  console.log("语言切换为:", lang);
  localStorage.setItem("Language", lang);

  // 更新key强制重新渲染
  routeKey.value++;
  submitData();
};
// 添加判断 如果当前路由是 getInquiries 则不显示顶部tab
if (window.location.pathname === "/getInquiries") {
  tabsData.value = [];
} else {
  submitData();
}

// 监听路由变化
watch(
  () => route.path,
  (newPath, oldPath) => {
    console.log("路径变化了", oldPath, "->", newPath);
    if (newPath === "/getInquiries") {
      showFloatingTabs.value = false;
    } else {
      showFloatingTabs.value = true;
    }
  }
);
onMounted(() => {
  localStorage.setItem("Language", "zh");
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