<!-- 商品描述 -->
<template>
  <div class="homePageContent">
    <div class="container">
      <!-- 1. h1标题 -->
      <h1 class="main-title">我们的产品与服务</h1>

      <!-- 2. 带Logo的分割线 -->
      <div class="divider-with-logo">
        <div class="divider-line"></div>
        <img
          src="@/assets/wande_logo.png"
          alt="公司Logo"
          class="divider-logo"
        />
        <div class="divider-line"></div>
      </div>

      <!-- 3. 内容区块 -->
      <div class="content-grid">
        <!-- 区块1 -->
        <div class="content-block">
          <h3 class="block-title">产品设计</h3>
          <p class="block-description">专业的产品设计团队，打造符合市场需求</p>
          <img
            src="@/assets/首页/详情小块图.png"
            alt="产品设计"
            class="block-image"
          />
        </div>

        <!-- 区块2 -->
        <div class="content-block">
          <h3 class="block-title">技术研发</h3>
          <p class="block-description">
            前沿技术研发能力，持续创新保持行业领先
          </p>
          <img
            src="@/assets/首页/详情小块图.png"
            alt="技术研发"
            class="block-image"
          />
        </div>

        <!-- 区块3 -->
        <div class="content-block">
          <h3 class="block-title">生产制造</h3>
          <p class="block-description">现代化生产线，严格的质量控制体系</p>
          <img
            src="@/assets/首页/详情小块图.png"
            alt="生产制造"
            class="block-image"
          />
        </div>

        <!-- 区块4 -->
        <div class="content-block">
          <h3 class="block-title">售后服务</h3>
          <p class="block-description">24小时响应机制，完善的售后服务体系</p>
          <img
            src="@/assets/首页/详情小块图.png"
            alt="售后服务"
            class="block-image"
          />
        </div>

        <!-- 区块5 -->
        <div class="content-block">
          <h3 class="block-title">定制方案</h3>
          <p class="block-description">根据客户需求提供个性化定制解决方案</p>
          <img
            src="@/assets/首页/详情小块图.png"
            alt="定制方案"
            class="block-image"
          />
        </div>

        <!-- 区块6 -->
        <div class="content-block">
          <h3 class="block-title">技术支持</h3>
          <p class="block-description">专业技术团队提供全方位技术支持</p>
          <img
            src="@/assets/首页/详情小块图.png"
            alt="技术支持"
            class="block-image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 可以在这里添加组件逻辑
</script>

<style scoped>
.homePageContent {
  width: 100%;
  padding: 20px 0;
  background-color: #fff;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
}

.main-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
}

/* 带Logo的分割线样式 */
.divider-with-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin: 20px 0; */
}

.divider-line {
  flex: 1;
  height: 2px;
  background-color: #ddd;
}

.divider-logo {
  width: 150px; /* 增大Logo尺寸 */
  height: 150px;
  margin: 0 30px;
  object-fit: contain;
}

/* 内容区块网格布局 */
.content-grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(350px, 1fr)
  ); /* 增大最小宽度 */
  gap: 40px; /* 增大间距 */
  margin-top: 40px;
}

.content-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  border-radius: 8px;
  background-color: #ffffff;
  transition: transform 0.3s ease;
}

.block-title {
  font-family: "黑体", "SimHei", sans-serif;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  color: #222;
  font-size: 20px;
}

.block-description {
  text-align: center;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;
}

.block-image {
  width: 100%;
  max-height: 280px;
  object-fit: cover;
  border-radius: 4px;
  transition: filter 0.3s ease; /* 添加过渡效果使变化更平滑 */
}
.block-image:hover {
  filter: brightness(0.8); /* 将亮度降低到70% */
  cursor: pointer; /* 可选：鼠标悬停时显示手型指针 */
}
/* 响应式调整 */
@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: minmax(250px, 1fr);
  }

  .main-title {
    font-size: 2rem;
  }

  .divider-logo {
    width: 60px;
    height: 60px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 15px;
  }

  .main-title {
    font-size: 1.8rem;
  }
}
</style>