<template>
  <div class="homePage">
    <div class="container">
      <!-- 主内容区 -->
      <main class="main-content">
        <article class="article">
          <!-- 动态渲染文字和图片内容 -->
          <div style="text-align: center;font-weight: 600;font-size: 30px;">{{ currentArticle?.title }}</div>
          <div style="text-align: center;font-weight: 400;font-size: 27px;">{{ currentArticle?.title_2 }}</div>
          <el-divider />
          <div style="text-align: center;font-size: 14px;">{{ currentArticle?.detailTime }}</div>
          <section
            class="content-section"
            v-for="(item, index) in currentArticle?.detail"
            :key="index"
          >
            <!-- 文字内容 -->
            <div v-if="item.type === 'text'" class="text-content">
              <p>{{ item.content }}</p>
            </div>

            <!-- 图片内容 -->
            <div v-else-if="item.type === 'image'" class="image-content">
              <img :src="item.url" :alt="item.alt" class="content-image" />
            </div>
          </section>
        </article>
      </main>
    </div>
    <!-- 底部 -->
    <PageBottom :footerData="footerData" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import PageBottom from "@/components/PageBottom/index.vue"; // 底部
// 路由实例
const route = useRoute();
const currentArticle = ref(null);
const footerData = ref();

onMounted(() => {
  console.log("route.query---", route.query);

  footerData.value = JSON.parse(sessionStorage.getItem("footerData"));
  if (sessionStorage.getItem("newsItemData")) {
    currentArticle.value = JSON.parse(sessionStorage.getItem("newsItemData"));
    console.log("成功接收:", currentArticle.value);
  }
});
</script>

<style scoped lang="scss">
.homePage{
  background-color: #ffffff;
}
.container {
  display: flex;
  max-width: 800px;
  // background-color: #007bff;
  margin: 0 auto;
  padding: 20px;
  gap: 30px;
  color: #000000;
}

.main-content {
  flex: 3;
}

.article-title {
  font-size: 25px;
  margin-bottom: 10px;
  color: #333;
}

.publish-date {
  color: #666;
  margin-bottom: 20px;
  font-size: 15px;
}

.content-section {
  margin-bottom: 30px;
}

/* 文字内容样式 */
.text-content h2 {
  font-size: 19px;
  margin: 15px 0;
  color: #444;
  border-left: 4px solid #007bff;
  padding-left: 10px;
}

.text-content p {
  line-height: 1.8;
  color: #555;
  text-align: justify;
  margin-bottom: 15px;
}

/* 图片内容样式 */
.image-content {
  width: 100%;
  text-align: center;
  margin: 20px 0;
}

.content-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.01);
  }
}

.image-caption {
  margin-top: 8px;
  font-size: 15px;
  color: #666;
  font-style: italic;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    padding: 15px;
  }

  .article-title {
    font-size: 21px;
  }

  .text-content h2 {
    font-size: 17px;
  }
}
</style>