<!-- 合作客户 -->
<template>
  <div class="homePageContent">
    <div class="container">
      <!-- 1. h1标题 -->
      <h1 class="main-title">{{ title }}</h1>
      <!-- 2,内容 -->
      <!-- 将内容区域移到容器外，使其可以扩展到全宽 -->
    </div>

    <!-- 全宽内容区域 -->
    <div class="full-width-content">
      <div class="container">
        <el-row :gutter="20" class="content">
          <el-col
            class="content-col"
            :span="6"
            v-for="(item, index) in heZuoKeHuData"
            :key="index"
            ><el-image
              class="img-hover"
              style="width: 200px"
              :src="getImageUrl(item)"
              fit="contain"
            />
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup>
// 可以在这里添加组件逻辑
const props = defineProps({
  title: {
    type: String,
    default: "合作客户",
  },
  heZuoKeHuData: {
    type: Array,
    default: () => [""],
  },
});
// 获取图片URL的方法
const getImageUrl = (path) => {
  if (!path) {
    return "";
  }
  // 处理路径，如果是网络路径直接返回，否则使用require
  if (path.startsWith("http") || path.startsWith("//")) {
    return path;
  }

  // 这里使用Vite的import.meta.url方式处理静态资源
  try {
    return new URL(path, import.meta.url).href;
  } catch (e) {
    console.warn("无法解析图片路径:", path);
    return path;
  }
};
</script>

<style scoped lang="scss">
.homePageContent {
  width: 100%;
  // padding: 20px 0;
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

  .full-width-content {
    width: 100%;
    background-color: #dedede;

    .container {
      background-color: transparent;

      .content {
        padding: 20px;

        .content-col {
          padding: 10px;
          text-align: center;
          // display: flex;
          // align-items: center;
          // justify-content: center;
        }
      }
    }
  }
}
</style>