<template>
  <div class="video-wrapper">
    <video
      ref="videoPlayer"
      class="custom-video"
      :poster="poster"
      @click="togglePlay"
      controls
    >
      <source :src="src" :type="type" />
      您的浏览器不支持HTML5视频
    </video>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: "video/mp4"
  },
  autoplay: {
    type: Boolean,
    default: false
  }
});

// 处理路径问题
const videoSrc = computed(() => {
  // 如果是网络URL直接返回
  if (props.src.startsWith('http') || props.src.startsWith('//')) {
    return props.src;
  }
  // 处理本地路径
  return new URL(props.src, import.meta.url).href;
});

const videoPlayer = ref(null);

// 初始化视频
onMounted(() => {
  if (props.autoplay) {
    // 注意：许多浏览器会阻止自动播放，除非视频静音
    videoPlayer.value.muted = true;
    videoPlayer.value.play().catch(err => {
      console.error("自动播放失败:", err);
    });
  }
});
</script>

<style scoped>
.video-wrapper {
  position: relative;
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.custom-video {
  width: 100%;
  display: block;
  background: #000;
  aspect-ratio: 16/9;
  cursor: pointer;
}
</style>