<template>
  <div class="page-wrapper">
    <div class="container">
      <!-- 左侧部分 (占比3) -->
      <div class="left-section">
        <!-- 标题 -->
        <div class="left-top">
          <img
            :src="getImageUrl(aboutPageBrirfData.leftData?.image)"
            :alt="aboutPageBrirfData.leftData?.imageAlt"
            class="left-image"
          />
        </div>
        <div class="left-bottom animate-up">
          {{ aboutPageBrirfData.leftData?.content }}
        </div>
      </div>

      <!-- 右侧部分 (占比1) -->
      <div class="right-section">
        <div class="right-column first-column">
          <div class="right-column-content">
            <div
              v-for="(item, index) in aboutPageBrirfData.rightData?.column1"
              :key="index"
              class="right-item"
            >
              <div class="item-content animate-up">
                <el-image
                  style="width: 60px"
                  :src="getImageUrl(item.image)"
                  fit="contain"
                />
                <h2 class="right-title">{{ item.title }}</h2>
                <p class="right-content">{{ item.content }}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 右侧第二列 -->
        <div class="right-column first-column">
          <div class="right-column-content">
            <div
              v-for="(item, index) in aboutPageBrirfData.rightData?.column2"
              :key="index"
              class="right-item"
            >
              <div class="item-content animate-up">
                <el-image
                  style="width: 60px"
                  :src="getImageUrl(item.image)"
                  fit="contain"
                />
                <h2 class="right-title">{{ item.title }}</h2>
                <p class="right-content">{{ item.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

// 定义组件属性
const props = defineProps({
  aboutPageBrirfData: {
    type: Object,
    default: () => ({}),
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
.page-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 40px 0;
  background-color: #ffffff;
}

.container {
  display: flex;
  align-items: center;
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
  padding: 30px;
  gap: 40px;
  align-items: stretch;
  background-color: #ffffff;
  border-radius: 12px;
}

.left-section {
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  // min-height: 100%;
  // background-color: #333;

  .title {
    font-size: 2.2rem;
    color: #333;
    margin-bottom: 10px;
    font-weight: 600;
    position: relative;
    padding-bottom: 15px;
  }
}

.left-top {
  width: 100%;
  height: 320px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  .left-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
}

.left-bottom {
  padding: 20px;
  line-height: 1.8;
  color: #555;
  font-size: 16px;
  // flex-grow: 1;
  border-radius: 8px;

  p {
    margin-bottom: 12px;
    text-align: justify;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.right-section {
  flex: 2;
  display: flex;
  min-height: 100%;
  gap: 25px;
}

.right-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &.first-column {
    justify-content: center;
  }
}

.right-column-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.right-item {
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 230px;
  background: #fff;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    // border-color: #fd8800;
  }

  &.compact {
    height: auto;
    min-height: 150px;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}

.item-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  width: 90%;
  max-width: 280px;
}

.right-image {
  width: 100%;
  height: 30px;
  object-fit: cover;
  border-radius: 6px;
  margin: 0 auto;
  transition: transform 0.3s ease;

  .right-item:hover & {
    transform: scale(1.05);
  }
}

.right-title {
  font-size: 36px;
  color: #0b0b0b;
  margin: 0;
  text-align: center;
  font-weight: 600;
}

.right-content {
  color: #585858;
  line-height: 1.6;
  margin: 0;
  font-size: 18px;
  text-align: center;
}

// 响应式设计
@media (max-width: 1024px) {
  .container {
    gap: 30px;
    padding: 25px;
  }

  .left-section {
    .title {
      font-size: 2rem;
    }
  }

  .right-section {
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    width: 95%;
    padding: 20px;
    gap: 25px;
  }

  .left-section,
  .right-section {
    flex: none;
    width: 100%;
  }

  .left-top {
    height: 250px;
  }

  .right-section {
    flex-direction: column;
  }

  .right-column {
    &.first-column {
      justify-content: flex-start;
    }
  }

  .item-content {
    max-width: 100%;
  }

  .right-item {
    height: auto;
    min-height: 200px;

    &.compact {
      min-height: 150px;
    }
  }
}

@media (max-width: 480px) {
  .page-wrapper {
    padding: 20px 0;
  }

  .container {
    width: 100%;
    border-radius: 0;
    padding: 15px;
  }

  .left-section {
    .title {
      font-size: 1.8rem;
    }
  }

  .left-top {
    height: 200px;
  }

  .left-bottom {
    padding: 15px;
    font-size: 14px;
  }

  .right-item {
    padding: 15px;

    &.compact {
      min-height: 130px;
    }
  }

  .right-title {
    font-size: 16px;
  }

  .right-content {
    font-size: 13px;
  }
}
</style>