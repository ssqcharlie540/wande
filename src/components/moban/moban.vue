<!-- 模块模板 -->
<template>
  <div class="homePageContent">
    <div class="container">
      <!-- 1. h1标题 -->
      <h1 class="main-title">公司介绍</h1>
      <div class="content">111</div>
    </div>
  </div>
</template>

<script setup>
// 可以在这里添加组件逻辑
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
  }
  .content {
    width: 100%;
    height: 600px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }
}
</style>