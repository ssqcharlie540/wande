<template>
  <div class="image-carousel-container">
    <div class="carousel-wrapper">
      <div class="carousel-main" :style="{ height: height }">
        <div class="custom-carousel">
          <div class="carousel-track">
            <div
              v-for="(image, index) in images"
              :key="index"
              class="carousel-slide"
              :class="{
                active: currentIndex === index,
                prev: previousIndex === index,
              }"
            >
              <div class="carousel-image-container">
                <img
                  :src="getImageUrl(image.url)"
                  :alt="image.alt || 'Carousel image'"
                  class="carousel-image"
                />
              </div>
            </div>
          </div>

          <!-- 左右切换箭头 -->
          <div class="carousel-arrow carousel-arrow-prev" @click="prevSlide">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </div>
          <div class="carousel-arrow carousel-arrow-next" @click="nextSlide">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="thumbnail-indicators">
        <div
          v-for="(image, index) in images"
          :key="index"
          :class="['thumbnail-item', { active: currentIndex === index }]"
          @click="switchToSlide(index)"
        >
          <img
            :src="getImageUrl(image.url)"
            :alt="'Thumbnail ' + (index + 1)"
            class="thumbnail-image"
          />
        </div>
      </div>
    </div>

    <div class="Title">
      <div class="TitleContent">{{ title }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch, computed } from "vue";
import { getImageUrl } from "@/util/utils.js";

const props = defineProps({
  images: {
    type: Array,
    required: true,
    default: () => [],
  },
  title: "",
  height: {
    type: String,
    default: () => "70vh",
  },
});

const currentIndex = ref(0);
const previousIndex = ref(-1);

// 计算属性：是否有上一张/下一张图片
const hasPrev = computed(() => currentIndex.value > 0);
const hasNext = computed(() => currentIndex.value < props.images.length - 1);

// 切换到指定幻灯片
const switchToSlide = (index) => {
  if (index === currentIndex.value) return;

  previousIndex.value = currentIndex.value;
  currentIndex.value = index;
};

// 切换到上一张
const prevSlide = () => {
  if (hasPrev.value) {
    switchToSlide(currentIndex.value - 1);
  } else {
    switchToSlide(props.images.length - 1);
  }
};

// 切换到下一张
const nextSlide = () => {
  if (hasNext.value) {
    switchToSlide(currentIndex.value + 1);
  } else {
    switchToSlide(0);
  }
};

// 监听currentIndex变化，重置previousIndex
watch(currentIndex, (newVal, oldVal) => {
  setTimeout(() => {
    if (previousIndex.value === oldVal) {
      previousIndex.value = -1;
    }
  }, 600); // 与过渡时间保持一致
});

// 监听接收的images变化
watch(
  () => props.images,
  (newImages) => {
    console.log("images changed:", newImages);
  },
  { immediate: true }
);
// 添加键盘事件监听
onMounted(() => {
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      prevSlide();
    } else if (event.key === "ArrowRight") {
      nextSlide();
    }
  };

  window.addEventListener("keydown", handleKeyDown);
});
</script>

<style scoped lang="scss">
.image-carousel-container {
  width: 100%;
  margin: 0;

  .carousel-main {
    overflow: hidden;
    position: relative;
    width: 100%;

    .custom-carousel {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;

      .carousel-track {
        position: relative;
        width: 100%;
        height: 100%;
      }

      .carousel-slide {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: opacity 0.6s ease-in-out;
        z-index: 1;

        &.active {
          opacity: 1;
          z-index: 3;
        }

        &.prev {
          opacity: 0;
          z-index: 2;
        }
      }

      // 左右切换箭头样式
      .carousel-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 48px;
        height: 48px;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 10;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

        &:hover {
          background-color: rgb(255, 255, 255);
          // transform: translateY(-50%) scale(1.1);
        }

        &:active {
          transform: translateY(-50%) scale(0.95);
        }

        svg {
          width: 24px;
          height: 24px;
          color: #333;
        }
      }

      .carousel-arrow-prev {
        left: 16px;
      }

      .carousel-arrow-next {
        right: 16px;
      }

      // 在移动设备上隐藏箭头或调整大小
      @media (max-width: 768px) {
        .carousel-arrow {
          width: 40px;
          height: 40px;

          svg {
            width: 20px;
            height: 20px;
          }
        }

        .carousel-arrow-prev {
          left: 8px;
        }

        .carousel-arrow-next {
          right: 8px;
        }
      }

      @media (max-width: 480px) {
        .carousel-arrow {
          width: 36px;
          height: 36px;

          svg {
            width: 18px;
            height: 18px;
          }
        }
      }
    }

    .carousel-image-container {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .carousel-image {
        width: 100%;
        height: 100%;
        object-fit: cover; /* 修改为cover让图片铺满容器 */
      }
    }
  }

  .thumbnail-indicators {
    position: relative;
    bottom: 80px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    gap: 12px;
    // padding: 0 20px;
    z-index: 10;

    .thumbnail-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .thumbnail-item {
      width: 80px;
      height: 60px;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 3px solid transparent;
      opacity: 0.7;
    }

    .thumbnail-item:hover {
      transform: translateY(-5px);
      opacity: 0.9;
      border-color: #ff0000;
    }

    .thumbnail-item.active {
      border-color: #ff0000;
      opacity: 1;
      box-shadow: 0 5px 15px rgba(64, 158, 255, 0.4);
    }
  }
  .Title {
    // 移除固定高度，改为自适应
    min-height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    top: -85vh;
    z-index: 4;

    .TitleContent {
      width: 50%;
      // 移除固定高度，改为自适应
      min-height: 60px; // 设置最小高度
      padding: 15px 20px; // 添加内边距确保文字与边框有间距
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40px;
      color: #fff;
      word-wrap: break-word; // 允许长单词换行
      white-space: normal; // 确保文字正常换行
      text-align: center; // 文字居中
      box-sizing: border-box; // 确保padding不会增加元素总宽度

      // 响应式字体大小
      @media (max-width: 768px) {
        font-size: 24px;
        padding: 12px 16px;
      }

      @media (max-width: 480px) {
        font-size: 20px;
        padding: 10px 12px;
      }
    }
  }
}
</style>