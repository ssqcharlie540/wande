<template>
  <div class="homePage">
    <div style="height: 105px"></div>
    <!-- 顶部关于万德 -->
    <aboutPageTop :data="contactData?.aboutTopImg" />
    <!-- 联系方式 -->
    <lianxifangshi :contact-data="contactData?.lianxifangshi" />

    <!-- 业务范围 -->
    <yeWuFanWei
      :title="contactData?.YeWuFanWeiData?.title"
      :img="contactData?.YeWuFanWeiData?.img"
    />
    <!-- 地图 -->
    <div v-if="contactData?.gongsiData">
      <ditu
        v-for="(item, index) in contactData?.gongsiData"
        :key="index"
        :title="item.title"
        :gongsiData="{
          gongsilatlng: item.gongsilatlng,
          gongsiLocation: item.gongsiLocation,
        }"
      />
    </div>

    <!-- 给我们留言 -->
    <lliuYan maxWidth="1000" v-if="contactData?.liuyanData" :config="contactData?.liuyanData" />
    <!--  公司资质 -->
    <!-- <Gongsizizhi
      :images="contactData.gongsizizhiData.gongsizizhiimages"
      :title="contactData.gongsizizhiData.gongsizizhiimages"
    /> -->
    <!-- 底部 -->
    <PageBottom :footerData="footerData" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getWebDatas } from "@/api/general";
import aboutPageTop from "@/view/about/components/aboutPageTop.vue"; // 顶部关于万德
import lianxifangshi from "./components/lianxifangshi.vue"; // 联系方式
import ditu from "./components/ditu.vue"; // 地图
import lliuYan from "./components/lliuYan.vue"; // 给我们留言
import yeWuFanWei from "./components/yeWuFanWei.vue"; // 业务范围
// import Gongsizizhi from "./components/gongsizizhi.vue"; // 公司资质
import PageBottom from "@/components/PageBottom/index.vue"; // 底部
// import { contactData, footerData } from "@/util/mockData.js";
const gongsizizhiData = {
  gongsizizhititle: "我们的资质及荣誉",
  gongsizizhiimages: [
    {
      src: "https://wandepack.com/image/default/C45C1FA7E98248F0842CC21CBEB5CCD4-6-2.jpg",
      alt: "办公室环境",
      description: "现代化的办公环境，促进团队协作与创新",
    },
    {
      src: "https://wandepack.com/image/default/C9CB5E9D27424C9EA024777ADB3559E9-6-2.jpg",
      alt: "团队会议",
      description: "专业的团队讨论项目细节，确保高质量交付",
    },
    {
      src: "https://wandepack.com/image/default/23686ACEA4334E579419F8546BD3E181-6-2.jpg",
      alt: "产品展示",
      description: "我们的核心产品，设计精美且功能强大",
    },
    {
      src: "https://wandepack.com/image/default/643358460DC54D299A478C11AFEF0FBC-6-2.jpg",
      alt: "客户服务",
      description: "专业的客户服务团队，为客户提供全方位支持",
    },
    {
      src: "https://wandepack.com/image/default/62096C613C7D4590A33519927B10E14F-6-2.jpg",
      alt: "技术研发",
      description: "技术团队专注研发，持续推动产品创新",
    },
    {
      src: "https://wandepack.com/image/default/33635BA0551841A0859E6ABF79D082FD-6-2.jpg",
      alt: "公司活动",
      description: "丰富的团队建设活动，增强团队凝聚力",
    },
    {
      src: "https://wandepack.com/image/default/61515261F81642A5A5F2969A90D615C4-6-2.jpg",
      alt: "工作空间",
      description: "舒适的工作空间，激发创造力与生产力",
    },
    {
      src: "https://wandepack.com/image/default/726A9F847F93429587FC9D6B0F680BA0-6-2.jpg",
      alt: "公司文化",
    },
    {
      src: "https://wandepack.com/image/default/2209BB5C998E42BB9A94198BA3180709-6-2.jpg",
      alt: "客户服务",
      description: "专业的客户服务团队，为客户提供全方位支持",
    },
    {
      src: "https://wandepack.com/image/default/ED983D87BF1D4D13B1B0D4C1CE0F229C-6-2.jpg",
      alt: "技术研发",
      description: "技术团队专注研发，持续推动产品创新",
    },
    {
      src: "https://wandepack.com/image/default/21DF233E58B64AC884F808E2A041035E-6-2.jpg",
      alt: "公司活动",
      description: "丰富的团队建设活动，增强团队凝聚力",
    },
    {
      src: "https://wandepack.com/image/default/42DE6BF224824AE4A3BE77D70997898B-6-2.jpg",
      alt: "工作空间",
      description: "舒适的工作空间，激发创造力与生产力",
    },

    {
      src: "https://wandepack.com/image/default/FD4FAE2E199F4FD4B938A57EE79E77E8-6-2.jpg",
      alt: "工作空间",
      description: "舒适的工作空间，激发创造力与生产力",
    },
    {
      src: "https://wandepack.com/image/default/AFD5AE21C57D4E1C806D833AE26705E0-6-2.jpg",
      alt: "工作空间",
      description: "舒适的工作空间，激发创造力与生产力",
    },
    {
      src: "https://wandepack.com/image/default/83470D07EB9A4483BF8DE00A36C2351B-6-2.jpg",
      alt: "工作空间",
      description: "舒适的工作空间，激发创造力与生产力",
    },
  ],
};

const footerData = ref();
const contactData = ref();
const submitData = async () => {
  try {
    const resData = await getWebDatas({
      pageNumber: 5,
      language: localStorage.getItem("Language") || "zh",
    });
    footerData.value = resData.footerData;
    contactData.value = resData.contactData;
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