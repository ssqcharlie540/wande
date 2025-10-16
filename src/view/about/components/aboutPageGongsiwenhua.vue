<template>
  <div class="homePageContent">
    <div class="container">
      <!-- 1. h1标题 -->
      <!-- <h1 class="main-title">公司介绍</h1> -->
      <tabModel
        :titleImg="tablistData.tabs1?.titleImg"
        :background-image="getImageUrl(tablistData.tabs1?.backimg1)"
        :tabs="tablistData.tabs1?.tabsData1"
        :content="tablistData.tabs1?.content"
        :initial-tab="0"
        content-color="#fff"
      />
      <tabModel
        :titleImg="tablistData.tabs2?.titleImg"
        :background-image="getImageUrl(tablistData.tabs2?.backimg2)"
        :tabs="tablistData.tabs2?.tabsData2"
        :content="tablistData.tabs2?.content"
        :initial-tab="0"
        content-color="#fff"
      />
      <tabModel
        :titleImg="tablistData.tabs3?.titleImg"
        :background-image="getImageUrl(tablistData.tabs3?.backimg3)"
        :tabs="tablistData.tabs3?.tabsData3"
        :content="tablistData.tabs3?.content"
        :initial-tab="0"
        content-color="#fff"
      />
    </div>
  </div>
</template>

<script setup>
import tabModel from "@/components/tabModel/tabModel.vue";
import { getImageUrl } from "@/util/utils.js";
const props = defineProps({
  tablistData: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style scoped lang="scss">
.homePageContent {
  width: 100%;
  // padding: 20px 0;
  background-color: #fff;
  .container {
    // max-width: 1200px;
    margin: 0 auto;
    // padding: 20px;
    background-color: #fff;
    .main-title {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 20px;
      color: #333;
    }
  }
}
</style>