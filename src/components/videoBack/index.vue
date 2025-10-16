<template>
  <div class="video-background-container" ref="container">
    <!-- 灰色覆盖层 - 只在视频未准备好时显示 -->
    <div class="gray-overlay" :class="{ 'fade-out': isVideoReady }"></div>

    <!-- 视频背景 -->
    <video
      ref="video"
      class="video-background"
      :class="[filter, { visible: isVideoReady }]"
      :src="videoSrc"
      :poster="poster"
      :autoplay="false"
      :loop="loop"
      :muted="muted"
      playsinline
      @loadedmetadata="handleVideoReady"
      @canplay="handleVideoReady"
    ></video>

    <!-- 视频上方的文字内容 -->
    <div class="content-overlay">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineEmits } from "vue";

const props = defineProps({
  videoSrc: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    default: "",
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
  loop: {
    type: Boolean,
    default: true,
  },
  muted: {
    type: Boolean,
    default: true,
  },
  filter: {
    type: String,
    default: "none",
    validator: (value) =>
      ["none", "blur", "grayscale", "sepia", "brightness", "contrast"].includes(
        value
      ),
  },
  fadeDuration: {
    type: Number,
    default: 1500,
  },
});

const emit = defineEmits(["play", "pause"]);

const video = ref(null);
const container = ref(null);
const isVideoReady = ref(false);
const isPlaying = ref(false);

const handleVideoReady = () => {
  if (!isVideoReady.value) {
    isVideoReady.value = true;
    adjustVideoSize();
  }
};

const adjustVideoSize = () => {
  if (!video.value || !container.value) return;

  const containerRatio =
    container.value.clientWidth / container.value.clientHeight;
  const videoRatio = video.value.videoWidth / video.value.videoHeight;

  if (videoRatio > containerRatio) {
    video.value.style.width = "auto";
    video.value.style.height = "100%";
  } else {
    video.value.style.width = "100%";
    video.value.style.height = "auto";
  }
};

// 播放视频
const playVideo = async () => {
  if (!video.value) return;

  try {
    await video.value.play();
    isPlaying.value = true;
    emit("play");
  } catch (error) {
    console.log("播放失败:", error);
    if (!props.muted) {
      video.value.muted = true;
      try {
        await video.value.play();
        isPlaying.value = true;
        emit("play");
      } catch (e) {
        console.log("静音播放也失败:", e);
      }
    }
  }
};

// 暂停视频
const pauseVideo = () => {
  if (!video.value) return;
  video.value.pause();
  isPlaying.value = false;
  emit("pause");
};

// 切换播放状态
const togglePlay = () => {
  if (isPlaying.value) {
    pauseVideo();
  } else {
    playVideo();
  }
};

const handleResize = () => {
  adjustVideoSize();
};

// 暴露方法给父组件
defineExpose({
  playVideo,
  pauseVideo,
  togglePlay,
  isPlaying,
});

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.video-background-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #000;
}

.gray-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(100, 100, 100, 0.8);
  z-index: 1;
  transition: opacity v-bind('props.fadeDuration + "ms"') ease-out;
}

.gray-overlay.fade-out {
  opacity: 0;
  pointer-events: none;
}

.video-background {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  z-index: 0;
  object-fit: cover;
  opacity: 0;
  transition: opacity v-bind('props.fadeDuration + "ms"') ease-out;
}

.video-background.visible {
  opacity: 1;
}

.content-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  box-sizing: border-box;
}

/* 滤镜效果 */
.video-background.blur {
  filter: blur(5px);
}
.video-background.grayscale {
  filter: grayscale(100%);
}
.video-background.sepia {
  filter: sepia(100%);
}
.video-background.brightness {
  filter: brightness(0.5);
}
.video-background.contrast {
  filter: contrast(200%);
}
</style>