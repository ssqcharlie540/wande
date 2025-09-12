<template>
  <!-- 全景展示 -->
  <div class="homePage">
    <div style="height: 8vh"></div>
    <div>
      <aboutPageTop :data="qjzsData.aboutTopImg" />
    </div>
    <div><quanjingtu /></div>
    <!-- 底部 -->
    <PageBottom :footerData="footerData" />
  </div>
</template>

<script setup>
import aboutPageTop from "./components/aboutPageTop.vue"; // 顶部关于万德
import { qjzsData, footerData } from "@/util/mockData.js";
import quanjingtu from "./components/quanjingtu.vue";
import PageBottom from "@/components/PageBottom/index.vue"; // 底部
</script>

<style lang="scss" scoped>
.homePage {
  position: relative;
}
</style>