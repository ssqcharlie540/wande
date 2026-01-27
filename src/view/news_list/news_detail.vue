<template>
  <div class="home">
    <div class="homePage">
      <!-- <div style="width: 100%; height: 5000px; background-color: #f0f0f0"></div> -->
      <div class="container">
        <!-- 主内容区 -->
        <main class="main-content">
          <article class="article">
            <!-- 动态渲染文字和图片内容 -->
            <div style="text-align: center; font-weight: 600; font-size: 30px">
              {{ currentArticle?.title }}
            </div>
            <div style="text-align: center; font-weight: 400; font-size: 27px">
              {{ currentArticle?.title_2 }}
            </div>
            <el-divider />
            <div style="text-align: center; font-size: 14px">
              {{ currentArticle?.detailTime }}
            </div>
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
  footerData.value = JSON.parse(sessionStorage.getItem("footerData"));
  if (sessionStorage.getItem("newsItemData")) {
    currentArticle.value = JSON.parse(sessionStorage.getItem("newsItemData"));
    console.log("成功接收:", currentArticle.value);
  }
  setTimeout(() => {
    // 检查页面整体高度
    console.log("公司新闻文档高度:", document.documentElement.scrollHeight);
    console.log("公司新闻窗口高度:", window.innerHeight);

    // 检查是否有负margin或transform
    const allElements = document.querySelectorAll("*");
    const problemElements = [];

    allElements.forEach((el) => {
      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();

      // 检查可能的问题
      if (
        rect.top < -100 || // 元素在视口上方很远
        parseInt(style.marginTop) < -100 || // 负margin很大
        parseInt(
          style.transform?.match(/translateY\(([-\d.]+)px\)/)?.[1] || 0
        ) < -100 // 负transform
      ) {
        problemElements.push({
          element: el,
          tag: el.tagName,
          class: el.className,
          top: rect.top,
          marginTop: style.marginTop,
          transform: style.transform,
        });
      }
    });

    console.log("可能的问题元素:", problemElements);
  }, 1000);
});
</script>

<style scoped lang="scss">
.home {
  width: 100vw;
  background-color: #ffffff;
  position: absolute;
  top: 0;
  left: 0;
}
.homePage {
}
.container {
  display: flex;
  justify-content: center;
  max-width: 800px;
  // background-color: #007bff;
  margin: 0 auto;
  gap: 30px;
  color: #000000;
}

.main-content {
  flex: 3;
}

.article-title {
  font-size: 25px;
  color: #333;
}

.publish-date {
  color: #666;
  font-size: 15px;
}

.content-section {
  
}

/* 文字内容样式 */
.text-content h2 {
  font-size: 19px;
  color: #444;
  border-left: 4px solid #007bff;
}

.text-content p {
  line-height: 1.8;
  color: #555;
  text-align: justify;
}

/* 图片内容样式 */
.image-content {
  width: 100%;
  text-align: center;
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
  font-size: 15px;
  color: #666;
  font-style: italic;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .article-title {
    font-size: 21px;
  }

  .text-content h2 {
    font-size: 17px;
  }
}
</style>