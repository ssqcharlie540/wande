<!-- 模块模板 -->
<template>
  <ImageTab
    :images="projectData.Imagedata.Images"
    :title="projectData.Imagedata.ImagesTitle"
    height="85vh"
  />
</template>

<script setup>
import { ref } from "vue";
import ImageTab from "@/components/ImageTab/ImageTab.vue";
import { projectData } from "@/util/mockData.js";
</script>

<style scoped lang="scss">

</style>