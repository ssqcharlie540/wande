<template>
  <div class="black-layout">
    <!-- 上部logo -->
    <div class="logo-section">
      <img src="@/assets/wande_logo.png" alt="公司Logo" class="logo" />
    </div>

    <!-- 下部图片网格 -->
    <div class="image-gallery">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="image-item"
        @click="openModal(image)"
      >
        <img :src="image.src" :alt="image.alt" class="gallery-image" />
      </div>
    </div>

    <!-- 图片弹窗 -->
    <div v-if="selectedImage" class="image-modal" @click.self="closeModal">
      <div class="modal-content">
        <span class="close-btn" @click="closeModal">&times;</span>
        <img :src="selectedImage.src" :alt="selectedImage.alt" />
        <p class="image-title">{{ selectedImage.title }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import imagePng from "@/assets/首页/详情小块图.png";

// 图片数据
const images = ref(
  Array(9)
    .fill()
    .map((_, i) => ({
      src: imagePng,
      alt: `图片${i + 1}`,
      title: `图片标题${i + 1}`,
    }))
);

const selectedImage = ref(null);

const openModal = (image) => {
  selectedImage.value = image;
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  selectedImage.value = null;
  document.body.style.overflow = "";
};
</script>

<style scoped>
.black-layout {
  background-color: rgb(53, 53, 53);
  min-height: 35vh;
  color: white;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Logo部分 */
.logo-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  width: 100%;
}

.logo {
  max-width: 200px;
  height: auto;
}

/* 图片网格 - 核心优化部分 */
.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  justify-content: center;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  margin-top: 40px;
}

.image-item {
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
}

.image-item:hover {
  cursor: pointer;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.3s ease;
}

/* 图片弹窗 */
.image-modal {
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
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  text-align: center;
}

.modal-content img {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 8px;
}

.image-title {
  margin-top: 20px;
  font-size: 1.5rem;
  color: #fff;
}

.close-btn {
  position: absolute;
  top: -50px;
  right: 0;
  font-size: 2.5rem;
  color: white;
  cursor: pointer;
  transition: color 0.3s;
}

.close-btn:hover {
  color: #ccc;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .image-gallery {
    max-width: 900px;
  }
}

@media (max-width: 900px) {
  .image-gallery {
    max-width: 700px;
    grid-template-columns: repeat(auto-fill, 120px);
    gap: 15px;
  }

  .image-item {
    width: 120px;
    height: 120px;
  }
}

@media (max-width: 768px) {
  .image-gallery {
    max-width: 560px;
    grid-template-columns: repeat(auto-fill, 100px);
    gap: 12px;
  }

  .image-item {
    width: 100px;
    height: 100px;
  }

  .logo {
    max-width: 150px;
  }
}

@media (max-width: 480px) {
  .image-gallery {
    max-width: 320px;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .image-item {
    width: 100%;
    height: 0;
    padding-bottom: 100%; /* 保持正方形 */
    position: relative;
  }

  .gallery-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .modal-content img {
    max-height: 60vh;
  }

  .image-title {
    font-size: 1.2rem;
  }
}
</style>