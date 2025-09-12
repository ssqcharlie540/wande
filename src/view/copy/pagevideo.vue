<template>
  <div class="media-container">
    <!-- 1. h1标题 -->
    <h1 class="media-title">探索我们的世界</h1>

    <!-- 2. 五行的描述 -->
    <div class="media-description">
      <p>欢迎来到我们的精彩世界，这里有无尽的可能等待您发现。</p>
      <p>
        我们的团队致力于创造令人惊叹的内容和体验，让每个观众都能找到属于自己的故事。
      </p>
      <p>通过下面的视频，您可以一窥我们的创作过程和成果展示。</p>
      <p>视频将带您走过我们最引以为傲的项目和成就。</p>
      <p>请点击播放按钮，开始这段视觉之旅。</p>
    </div>

    <!-- 3. 带有控制台的视频 -->
    <div class="video-wrapper">
      <video
        ref="videoPlayer"
        class="custom-video"
        controls
        poster="@/assets/mp4/首页视频.mp4"
      >
        <source src="@/assets/mp4/首页视频.mp4" type="video/mp4" />
        <track
          kind="subtitles"
          src="@/assets/mp4/wande_logo.png"
          srclang="zh"
          label="中文"
          default
        />
        您的浏览器不支持HTML5视频
      </video>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const videoPlayer = ref(null);
const isPlaying = ref(false);
const isMuted = ref(false);
const progress = ref(0);
const currentTime = ref("00:00");
const duration = ref("00:00");

// 切换播放/暂停
const togglePlay = () => {
  if (videoPlayer.value.paused) {
    videoPlayer.value.play();
    isPlaying.value = true;
  } else {
    videoPlayer.value.pause();
    isPlaying.value = false;
  }
};

// 切换静音
const toggleMute = () => {
  videoPlayer.value.muted = !videoPlayer.value.muted;
  isMuted.value = videoPlayer.value.muted;
};

// 跳转视频进度
const seekVideo = () => {
  videoPlayer.value.currentTime =
    (progress.value / 100) * videoPlayer.value.duration;
};

// 切换全屏
const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    videoPlayer.value.requestFullscreen().catch((err) => {
      console.error(`全屏错误: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
};

// 格式化时间为MM:SS
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

// 初始化视频事件监听
onMounted(() => {
  const video = videoPlayer.value;

  video.addEventListener("timeupdate", () => {
    progress.value = (video.currentTime / video.duration) * 100;
    currentTime.value = formatTime(video.currentTime);
  });

  video.addEventListener("loadedmetadata", () => {
    duration.value = formatTime(video.duration);
  });

  video.addEventListener("ended", () => {
    isPlaying.value = false;
  });

  video.addEventListener("play", () => {
    isPlaying.value = true;
  });

  video.addEventListener("pause", () => {
    isPlaying.value = false;
  });
});
</script>

<style scoped>
.media-container {
  width: 50%;
  max-width: 2000px; /* 增加最大宽度 */
  margin: 0 auto;
  padding: 5vh 5%; /* 使用百分比代替固定vh单位 */
  font-family: "Arial", sans-serif;
  background-color: rgba(0, 0, 0, 0.3);
  box-sizing: border-box; /* 确保padding包含在宽度内 */
  color: #fff;
  border-radius: 10px;
}

.media-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 30px;
}

.media-description {

}

.media-description p {
  margin-bottom: 15px;
}

.video-wrapper {
  position: relative;
  width: 100%;
  max-width: 1800px; /* 增加视频最大宽度 */
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.custom-video {
  width: 100%;
  display: block;
  background: #000;
  aspect-ratio: 16/9; /* 保持视频比例 */
}

/* 响应式调整 */
@media (max-width: 1600px) {
  .media-container {
    padding: 4vh 4%;
  }
}

@media (max-width: 1200px) {
  .media-title {
    font-size: 2.2rem;
  }

  .media-description {
    max-width: 900px;
  }
}

@media (max-width: 768px) {
  .media-container {
    width: 100%;
    padding: 3vh 3%;
  }

  .media-title {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }

  .media-description {
    margin-bottom: 30px;
    max-width: 100%;
    padding: 0 15px;
  }

  .media-description p {
    margin-bottom: 12px;
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .media-title {
    font-size: 1.5rem;
  }

  .media-description p {
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .video-wrapper {
    border-radius: 0; /* 在小屏幕上移除圆角 */
  }
}
</style>