<!-- 模块模板 -->
<template>
  <div class="homePageContent">
    <div class="container">
      <!-- 1. h1标题 -->
      <h1 class="main-title">公司地址</h1>
      <div class="content">
        <QQMap :gongsiData="gongsiData" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import QQMap from "@/components/QQMap/QQMap.vue";
// 定义组件属性
const props = defineProps({
  gongsiData: {
    type: Object,
    default: () => ({
      gongsilatlng: {},
      gongsiLocation: "",
    }),
  },
});
</script>

<style scoped lang="scss">
.homePageContent {
  width: 100%;
  padding: 20px 0;
  background-color: #fff;
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    .main-title {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 20px;
      color: #333;
    }
  }
  .content {
    width: 100%;
    height: 600px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }
}
</style>