<!-- 公司动态 -->
 <template>
  <!-- 全景展示 -->
  <div class="homePage">
    <aboutPageTop :data="newslistData?.aboutTopImg" />
    <ItemsList :items="newslistData?.itemsData" />
    <!-- 给我们留言 -->
    <lliuYan
      v-if="newslistData?.liuyanData"
      :config="newslistData?.liuyanData"
    />
    <!-- 底部 -->
    <PageBottom :footerData="footerData" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getWebDatas } from "@/api/general";
import aboutPageTop from "./components/aboutPageTop.vue"; // 顶部公司动态
import lliuYan from "@/view/contact/components/lliuYan.vue"; // 给我们留言
import ItemsList from "./components/list.vue";

// import { newslistData, footerData } from "@/util/mockData.js";
import PageBottom from "@/components/PageBottom/index.vue"; // 底部

const footerData = ref();
const newslistData = ref();
const submitData = async () => {
  try {
    const resData = await getWebDatas({
      pageNumber: 8,
      language: localStorage.getItem("Language") || "zh",
    });
    footerData.value = resData.footerData;
    newslistData.value = resData.newslistData;
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
.homePage {
  position: relative;
  background-color: rgb(255, 255, 255);
}
</style>