<!-- 模块模板 -->
<template>
  <div class="homePageContent">
    <div class="container">
      <!-- 1. h1标题 -->
      <h1 class="main-title">{{title}}</h1>

      <!-- 全景图容器 -->
      <div id="panorama-viewer" ref="viewerContainer"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Viewer } from "photo-sphere-viewer";
import "photo-sphere-viewer/dist/photo-sphere-viewer.css";

const viewerContainer = ref(null);
let viewer = null;
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});

onMounted(() => {
  if (viewerContainer.value) {
    viewer = new Viewer({
      container: viewerContainer.value,
      panorama:
        "https://wandepack.com/image/default/39DBE877BD8B4E6197B23008B09842B9-6-2.jpg",
      loadingImg: "https://www.wandepack.com/api/getImage?image=jiazai.gif",
      navbar: ["zoom", "fullscreen"],
      defaultZoomLvl: 50,
      mousewheel: true,
    });

    viewer.on("error", (err) => {
      const errorMsg = `错误类型: ${err.error}<br> 
                        消息: ${err.message}<br>
                        (检查控制台Network标签)`;
      viewerContainer.value.innerHTML = errorMsg;
      console.error(err);
    });
  }
});

onUnmounted(() => {
  if (viewer) {
    viewer.destroy();
  }
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

    #panorama-viewer {
      width: 100%;
      height: 70vh;
      min-height: 500px;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .homePageContent {
    .container {
      padding: 10px;

      .main-title {
        font-size: 2rem;
      }

      #panorama-viewer {
        height: 50vh;
        min-height: 300px;
      }
    }
  }
}
</style>