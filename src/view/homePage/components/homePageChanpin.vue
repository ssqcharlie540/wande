<!-- 我们的产品及优势 -->
<template>
  <div class="homePageContent">
    <div class="container">
      <h1 class="main-title">{{ title }}</h1>

      <div class="product-grid">
        <div
          class="product-row"
          v-for="(row, rowIndex) in chunkArray(productItems, 2)"
          :key="rowIndex"
        >
          <div
            class="product-card module-hover"
            :class="{ 'first-card': index === 0 && rowIndex === 0 }"
            v-for="(item, index) in row"
            :key="item.id"
          >
            <template v-if="rowIndex * 2 + index < 2">
              <div class="text-content" style="padding: 0 20px">
                <h3 class="product-title">{{ item.title }}</h3>
                <p class="product-desc">{{ item.description }}</p>
              </div>
              <div class="image-container">
                <el-image
                  :src="getImageUrl(item.image)"
                  fit="contain"
                  style="width: 100%; height: 100%; object-position: bottom"
                />
              </div>
            </template>
            <template v-else>
              <div class="text-content">
                <div class="title-section">
                  <h3 class="product-title">{{ item.title }}</h3>
                  <p class="product-subdesc">{{ item.subDescription }}</p>
                </div>
              </div>
              <div class="image-container fullImage">
                <el-image
                  :src="getImageUrl(item.image)"
                  fit="contain"
                  style="width: 100%; height: 100%; object-position: bottom"
                />
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  productItems: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const chunkArray = (arr, size) => {
  return arr.reduce((acc, val, i) => {
    const idx = Math.floor(i / size);
    if (!acc[idx]) {
      acc[idx] = [];
    }
    acc[idx].push(val);
    return acc;
  }, []);
};

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

<style lang="scss" scoped>
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
      margin-bottom: 40px;
      color: #333;
    }

    .product-grid {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .product-row {
        display: flex;
        gap: 20px;

        .product-card {
          flex: 1;
          background-color: #f5f5f5;
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          min-height: 400px;

          .text-content {
            flex: 1;
            display: flex;
            flex-direction: column;

            /* 确保所有文本内容都有相同的样式 */
            .product-title {
              font-size: 1.3rem;
              margin-bottom: 15px;
              color: #333 !important; /* 强制黑色 */
            }

            .product-desc,
            .product-subdesc {
              font-size: 0.9rem;
              line-height: 1.6;
              color: #555 !important; /* 强制深灰色 */
              margin-bottom: 20px;
            }
          }

          .image-container {
            height: 200px;
            width: 100%;
            display: flex;
            justify-content: center;
            padding: 0 10px 10px;

            .el-image {
              max-width: 100%;
              max-height: 100%;
              object-fit: contain;
              object-position: bottom;
            }
          }

          .fullImage {
            height: 400px;
          }

          .title-section {
            padding: 15px;
            background-color: #e0e0e0;

            /* 确保标题区域内的文字颜色正确 */
            .product-title {
              font-size: 1.2rem;
              margin-bottom: 8px;
              color: #333 !important;
            }

            .product-subdesc {
              font-size: 0.8rem;
              color: #555 !important;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 992px) {
  .product-row {
    flex-wrap: wrap;

    .product-card {
      flex: 0 0 calc(50% - 10px);
      min-height: 350px !important;

      .image-container {
        height: 180px !important;
      }
    }
  }
}

@media (max-width: 576px) {
  .product-row .product-card {
    flex: 0 0 100%;
    min-height: 300px !important;

    .image-container {
      height: 150px !important;
    }
  }
}
</style>