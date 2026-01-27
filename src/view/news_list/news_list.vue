<!-- 公司动态 -->
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
      <aboutPageTop :data="newslistData?.aboutTopImg" />
      <ItemsList :items="newslistData?.itemsData" />
      <!-- 给我们留言 -->
      <lliuYan
        v-if="newslistData?.liuyanData"
        :config="newslistData?.liuyanData"
      />
    </div>
    <!-- 底部 -->
    <PageBottom :footerData="footerData" />
  </div>
</template>

<script setup>
// import { useHead } from 'vue'
import { onMounted, ref } from "vue";
import { getWebDatas } from "@/api/general";
import FloatingTabs from "@/components/FloatingTabs/index.vue";
import aboutPageTop from "./components/aboutPageTop.vue"; // 顶部公司动态
import lliuYan from "@/view/contact/components/lliuYan.vue"; // 给我们留言
import ItemsList from "./components/list.vue";

// import { newslistData, footerData } from "@/util/mockData.js";
import PageBottom from "@/components/PageBottom/index.vue"; // 底部
// useHead({
//   title: "公司新闻 - 万德官网",
//   meta: [
//     {
//       name: "description",
//       content:
//         "河南万德包装携核心技术展现“中国制造”实力",
//     },
//   ],
// });
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
const newslistData = ref();
const submitData = async () => {
  try {
    const resData = await getWebDatas({
      pageNumber: 8,
      language: "zh",
    });
    footerData.value = resData.footerData;
    newslistData.value = resData.newslistData;
    tabsData.value = resData.tabsData;
    sessionStorage.setItem("footerData", JSON.stringify(resData.footerData));
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