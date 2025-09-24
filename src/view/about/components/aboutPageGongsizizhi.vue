<template>
  <div
    class="homePageContent"
    :style="{ backgroundImage: `url(${resolvedBackgroundImage})` }"
  >
    <div class="container">
      <!-- 1. h1标题 -->
      <h1 class="main-title">{{ title }}</h1>
      <div class="content">
        <!-- 图片滑动组件 -->
        <div
          class="slider-container"
          @mouseenter="showNavigation = true"
          @mouseleave="showNavigation = false"
        >
          <div class="slider-wrapper" ref="sliderWrapper">
            <div
              class="slider-track"
              ref="sliderTrack"
              @mousedown="startDrag"
              @touchstart="startDrag"
              @mousemove="onDrag"
              @touchmove="onDrag"
              @mouseup="endDrag"
              @touchend="endDrag"
              @mouseleave="endDrag"
            >
              <div
                v-for="(image, index) in images"
                :key="index"
                class="slide"
                @click="openLightbox(index)"
              >
                <div class="image-container">
                  <img :src="image.src" :alt="image.alt" class="slider-image" />
                  <div class="image-overlay">
                    <div class="image-description">{{ image.description }}</div>
                    <div class="view-button">查看大图</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 导航按钮 - 使用Element Plus图标 -->
          <div class="nav-buttons-container" v-show="showNavigation">
            <el-button
              class="nav-button prev"
              @click="slidePrev"
              :icon="ArrowLeftBold"
              circle
            />
            <el-button
              class="nav-button next"
              @click="slideNext"
              :icon="ArrowRightBold"
              circle
            />
          </div>
        </div>

        <!-- 图片预览模态框 -->
        <div v-if="lightboxVisible" class="lightbox" @click="closeLightbox">
          <div class="lightbox-content" @click.stop>
            <!-- <button class="lightbox-close" @click="closeLightbox">×</button> -->
            <el-button
              class="lightbox-close"
              @click="closeLightbox"
              :icon="CloseBold"
              circle
            />
            <!-- <el-icon><CloseBold /></el-icon> -->
            <el-button
              class="lightbox-nav lightbox-prev"
              @click="prevImage"
              :icon="ArrowLeftBold"
              circle
            />
            <img :src="currentImage.src" :alt="currentImage.alt" />
            <el-button
              class="lightbox-nav lightbox-next"
              @click="nextImage"
              :icon="ArrowRightBold"
              circle
            />
            <div class="lightbox-description">
              {{ currentImage.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, defineProps } from "vue";
import { ElButton } from "element-plus";
import {
  ArrowLeftBold,
  ArrowRightBold,
  CloseBold,
} from "@element-plus/icons-vue";
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  images: {
    type: Array,
    default: () => [],
  },
  backgroundImage: {
    type: String,
    default: "",
  },
});

// 示例图片数据
const images = ref();

// 滑动相关变量
const sliderTrack = ref(null);
const sliderWrapper = ref(null);
const currentIndex = ref(0);
const isDragging = ref(false);
const startPos = ref(0);
const currentTranslate = ref(0);
const prevTranslate = ref(0);
const animationID = ref(null);
const slidesPerView = ref(4); // 默认每屏显示4张图片
const showNavigation = ref(false); // 控制导航按钮显示

// 灯箱相关变量
const lightboxVisible = ref(false);
const lightboxIndex = ref(0);

// 计算当前显示的图片
const currentImage = computed(() => images.value[lightboxIndex.value]);

// 响应式调整每屏显示图片数量
const updateSlidesPerView = () => {
  const width = window.innerWidth;
  if (width < 768) {
    slidesPerView.value = 2;
  } else if (width < 1024) {
    slidesPerView.value = 3;
  } else {
    slidesPerView.value = 4;
  }
  setPositionByIndex();
};
// 解析背景图片路径
const resolvedBackgroundImage = computed(() => {
  if (!props.backgroundImage) return "";

  // 如果是网络图片
  if (
    props.backgroundImage.startsWith("http") ||
    props.backgroundImage.startsWith("//")
  ) {
    return props.backgroundImage;
  }

  // 如果是本地图片，使用相对路径或require
  try {
    // 方法1: 使用import.meta.url (Vite)
    if (import.meta.env?.MODE !== "production") {
      return new URL(props.backgroundImage, import.meta.url).href;
    }

    // 方法2: 在生产环境中使用相对路径
    return props.backgroundImage;
  } catch (e) {
    console.warn("图片路径解析失败:", e);
    return props.backgroundImage;
  }
});
// 初始化滑动组件
onMounted(() => {
  images.value = props.images;
  updateSlidesPerView();
  window.addEventListener("resize", updateSlidesPerView);
  contextMenuHandler();
});

onUnmounted(() => {
  window.removeEventListener("resize", updateSlidesPerView);
  cancelAnimationFrame(animationID.value);
});

// 防止右键菜单干扰拖拽
const contextMenuHandler = () => {
  if (sliderTrack.value) {
    sliderTrack.value.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  }
};

// 触摸/鼠标事件处理
const startDrag = (event) => {
  if (event.type === "touchstart") {
    startPos.value = event.touches[0].clientX;
  } else {
    startPos.value = event.clientX;
    event.preventDefault();
  }

  isDragging.value = true;
  animationID.value = requestAnimationFrame(animation);
  if (sliderTrack.value) {
    sliderTrack.value.style.cursor = "grabbing";
  }
};

const onDrag = (event) => {
  if (!isDragging.value) return;

  const currentPosition = event.type.includes("touch")
    ? event.touches[0].clientX
    : event.clientX;
  const diff = currentPosition - startPos.value;

  currentTranslate.value = prevTranslate.value + diff;
};

const endDrag = () => {
  if (!isDragging.value) return;
  isDragging.value = false;
  cancelAnimationFrame(animationID.value);

  const movedBy = currentTranslate.value - prevTranslate.value;

  // 如果拖动距离较大，切换到上一组或下一组
  if (movedBy < -100) {
    slideNext();
  } else if (movedBy > 100) {
    slidePrev();
  } else {
    setPositionByIndex();
  }

  if (sliderTrack.value) {
    sliderTrack.value.style.cursor = "grab";
  }
};

// 滑动动画
const animation = () => {
  setSliderPosition();
  if (isDragging.value) {
    requestAnimationFrame(animation);
  }
};

const setSliderPosition = () => {
  if (sliderTrack.value) {
    sliderTrack.value.style.transform = `translateX(${
      currentTranslate.value
    }px)`;
  }
};

// 设置当前位置
const setPositionByIndex = () => {
  if (!sliderWrapper.value) return;

  const slideWidth = sliderWrapper.value.offsetWidth / slidesPerView.value;
  currentTranslate.value = -currentIndex.value * slideWidth;
  prevTranslate.value = currentTranslate.value;
  setSliderPosition();
};

// 导航控制
const slideNext = () => {
  if (currentIndex.value >= images.value.length - slidesPerView.value) {
    currentIndex.value = 0;
  } else {
    currentIndex.value += slidesPerView.value;
  }
  setPositionByIndex();
};

const slidePrev = () => {
  if (currentIndex.value <= 0) {
    currentIndex.value = images.value.length - slidesPerView.value;
  } else {
    currentIndex.value -= slidesPerView.value;
  }
  setPositionByIndex();
};

// 灯箱控制
const openLightbox = (index) => {
  lightboxIndex.value = index;
  lightboxVisible.value = true;
  document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
  lightboxVisible.value = false;
  document.body.style.overflow = "auto";
};

const nextImage = () => {
  lightboxIndex.value = (lightboxIndex.value + 1) % images.value.length;
};

const prevImage = () => {
  lightboxIndex.value =
    (lightboxIndex.value - 1 + images.value.length) % images.value.length;
};

// 键盘事件支持
const handleKeydown = (event) => {
  if (lightboxVisible.value) {
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") nextImage();
    if (event.key === "ArrowLeft") prevImage();
  }
};

// 添加键盘事件监听
onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<style scoped lang="scss">
.homePageContent {
  width: 100%;
  padding: 30px 0 60px 0;
  // background-color: #ad8282;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  .container {
    max-width: 1200px;
    margin: 0 auto;
    // padding: 20px;

    .main-title {
      text-align: center;
      font-size: 2.5rem;
      // margin-bottom: 20px;
      color: #ffffff;
    }
  }

  .content {
    // 滑动容器样式
    .slider-container {
      position: relative;
      width: 100%;
      margin: 0 auto;
      overflow: hidden;
      border-radius: 12px;
      padding: 30px 0;

      .slider-wrapper {
        width: 100%;
        overflow: hidden;

        .slider-track {
          display: flex;
          transition: transform 0.3s ease-out;
          cursor: grab;

          .slide {
            flex: 0 0 calc(100% / 4); // 默认每行显示4张
            padding: 10px;
            box-sizing: border-box;

            .image-container {
              position: relative;
              overflow: hidden;
              // border-radius: 8px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
              transition: transform 0.3s ease, box-shadow 0.3s ease;
              // aspect-ratio: 4/3;

              &:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);

                .image-overlay {
                  opacity: 1;
                }

                .slider-image {
                  transform: scale(1.05);
                }
              }

              .slider-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
                transition: transform 0.5s ease;
              }

              .image-overlay {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
                padding: 15px;
                color: white;
                opacity: 0;
                transition: opacity 0.3s ease;

                .image-description {
                  font-size: 14px;
                  margin-bottom: 8px;
                  text-align: center;
                }

                .view-button {
                  text-align: center;
                  font-weight: bold;
                  font-size: 12px;
                  background-color: rgba(255, 255, 255, 0.2);
                  padding: 4px 8px;
                  border-radius: 4px;
                  display: inline-block;
                }
              }
            }
          }
        }
      }

      .nav-buttons-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;

        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: auto;
          background: rgba(85, 85, 85, 0.2);
          border: none;
          color: rgb(255, 255, 255);
          font-size: 24px;
          width: 50px;
          height: 50px;
          cursor: pointer;
          z-index: 10;
          transition: background 0.3s ease;

          &:deep() {
            .el-icon {
              width: 1.5em;
              height: 1.5em;
            }
          }

          &:hover {
            background: rgba(43, 43, 43, 0.4);
          }

          &.prev {
            left: 15px;
          }

          &.next {
            right: 15px;
          }
        }
      }
    }

    // 灯箱样式
    .lightbox {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.9);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;

      .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;

        img {
          max-width: 100%;
          max-height: 80vh;
          object-fit: contain;
          border-radius: 8px;
        }

        .lightbox-close {
          position: absolute;
          top: -40px;
          right: -40px;
          background: none;
          border: none;
          color: white;
          font-size: 30px;
          cursor: pointer;
        }

        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 50px;
          height: 50px;
          cursor: pointer;
          z-index: 10;
          transition: background 0.3s ease;

          &:deep() {
            .el-icon {
              width: 1.5em;
              height: 1.5em;
            }
          }

          &:hover {
            background: rgba(255, 255, 255, 0.4);
          }

          &.lightbox-prev {
            left: -60px;
          }

          &.lightbox-next {
            right: -60px;
          }
        }

        .lightbox-description {
          color: white;
          text-align: center;
          margin-top: 20px;
          font-size: 18px;
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 1024px) {
  .homePageContent {
    .content {
      .slider-container {
        .slider-wrapper {
          .slider-track {
            .slide {
              flex: 0 0 calc(100% / 3); // 中等屏幕每行显示3张
            }
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .homePageContent {
    .content {
      .slider-container {
        .slider-wrapper {
          .slider-track {
            .slide {
              flex: 0 0 calc(100% / 2); // 小屏幕每行显示2张

              .image-container {
                .image-overlay {
                  .image-description {
                    font-size: 12px;
                  }

                  .view-button {
                    font-size: 11px;
                  }
                }
              }
            }
          }
        }

        .nav-buttons-container {
          .nav-button {
            width: 40px;
            height: 40px;

            &:deep() {
              .el-icon {
                width: 1.2em;
                height: 1.2em;
              }
            }
          }
        }
      }

      .lightbox {
        .lightbox-content {
          .lightbox-nav {
            width: 40px;
            height: 40px;

            &:deep() {
              .el-icon {
                width: 1.2em;
                height: 1.2em;
              }
            }

            &.lightbox-prev {
              left: -50px;
            }

            &.lightbox-next {
              right: -50px;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .homePageContent {
    .content {
      .slider-container {
        .slider-wrapper {
          .slider-track {
            .slide {
              flex: 0 0 100%; // 超小屏幕每行显示1张
            }
          }
        }
      }
    }
  }
}
</style>