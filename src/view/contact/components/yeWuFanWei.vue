<!-- 模块模板 -->
<template>
  <div class="homePageContent">
    <div class="container">
      <!-- 1. h1标题 -->
      <h1 class="main-title">{{ title }}</h1>
      <div class="content">
        <el-image style="height: 100%" :src="img" fit="contain" />
      </div>
    </div>
  </div>
</template>

<script setup>
// 可以在这里添加组件逻辑
const props = defineProps({
  // 定义接收的props
  title: {
    type: String,
    default: "默认标题",
  },
  img: {
    type: String,
    default: "",
  },
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