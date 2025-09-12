<!-- 模块模板 -->
<template>
  <div class="homePageContent">
    <div class="container">
      <!-- 1. h1标题 -->
      <!-- <h1 class="main-title">匠心工艺，一流制袋生产线</h1> -->
      <ImageTab
        :images="projectData.Imagedata.Images"
        :title="projectData.Imagedata.ImagesTitle"
        height="85vh"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ImageTab from "@/components/ImageTab/ImageTab.vue";
import { projectData } from "@/util/mockData.js";
</script>

<style scoped lang="scss">
.homePageContent {
  width: 100%;
  background-color: #fff;
  .container {
    margin: 0;
    background-color: #ffffff;

    .main-title {
      text-align: center;
      font-size: 2.5rem;
      color: #333;
      height: 50px;
    }
  }
}
</style>