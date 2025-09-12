<template>
  <div class="ali-player-container">
    <!-- 播放器容器 -->
    <div :id="playerId" class="prism-player"></div>

    <!-- 加载状态 -->
    <div v-if="loading" class="player-loading">
      <div class="loading-spinner"></div>
      <p>播放器加载中...</p>
    </div>

    <!-- 错误状态 -->
    <div v-if="playerError" class="player-error">
      <div class="error-icon">❌</div>
      <h3>视频加载失败</h3>
      <p>{{ errorMessage }}</p>
      <button @click="retry" class="retry-button">重新加载</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";

const props = defineProps({
  // 必需参数：视频ID
  vid: {
    type: String,
    default: "",
  },
  // 播放凭证（安全推荐）
  playauth: {
    type: String,
    default: "",
  },
  // 或者直接使用视频地址（优先级最高）
  source: {
    type: String,
    default: "",
  },
  // 备用视频源
  backupSource: {
    type: String,
    default: "",
  },
  // 封面图
  cover: {
    type: String,
    default: "",
  },
  // 是否自动播放
  autoplay: {
    type: Boolean,
    default: false,
  },
  // 宽度
  width: {
    type: String,
    default: "100%",
  },
  // 高度
  height: {
    type: String,
    default: "500px",
  },
  // 是否直播
  isLive: {
    type: Boolean,
    default: false,
  },
  // 加密类型（播放加密视频时需要设置为1）
  encryptType: {
    type: String,
    default: "",
  },
  // 重试次数
  retryCount: {
    type: Number,
    default: 3,
  },
});

const emit = defineEmits([
  "ready",
  "play",
  "pause",
  "ended",
  "error",
  "load",
  "retry",
]);

const player = ref(null);
const playerId = ref(
  `J_prismPlayer_${Math.random().toString(36).substr(2, 9)}`
);
const loading = ref(true);
const playerError = ref(false);
const errorMessage = ref("");
const currentRetry = ref(0);
const usingBackupSource = ref(false);

// 提供播放器控制方法
const play = () => {
  if (player.value) player.value.play();
};

const pause = () => {
  if (player.value) player.value.pause();
};

const replay = () => {
  if (player.value) player.value.replay();
};

// 获取当前播放器实例
const getPlayer = () => {
  return player.value;
};

// 切换视频源
const changeSource = (newSource, newCover = "") => {
  if (player.value) {
    player.value.dispose();
    player.value = null;
  }

  nextTick(() => {
    initPlayer(newSource, newCover);
  });
};

// 暴露方法给父组件
defineExpose({
  play,
  pause,
  replay,
  getPlayer,
  changeSource,
});

const loadSDK = () => {
  return new Promise((resolve, reject) => {
    // 检查是否已加载
    if (typeof Aliplayer !== "undefined") {
      resolve();
      return;
    }

    // 检查是否正在加载中
    if (window.aliplayerLoading) {
      // 如果正在加载，等待加载完成
      const checkInterval = setInterval(() => {
        if (typeof Aliplayer !== "undefined") {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
      return;
    }

    window.aliplayerLoading = true;

    // 加载CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://g.alicdn.com/apsara-media-box/imp-web-player/2.28.5/skins/default/aliplayer-min.css";
    document.head.appendChild(link);

    // 加载JS
    const script = document.createElement("script");
    script.src =
      "https://g.alicdn.com/apsara-media-box/imp-web-player/2.28.5/aliplayer-min.js";
    script.onload = () => {
      window.aliplayerLoading = false;
      resolve();
    };
    script.onerror = () => {
      window.aliplayerLoading = false;
      reject(new Error("SDK加载失败"));
    };
    document.head.appendChild(script);
  });
};

const createPlayer = (source = null, cover = null) => {
  loading.value = true;
  playerError.value = false;

  const config = {
    id: playerId.value,
    width: props.width,
    height: props.height,
    autoplay: props.autoplay,
    isLive: props.isLive,
    vid: props.vid,
    playauth: props.playauth,
    encryptType: props.encryptType,
    cover: cover || props.cover,
    // 添加更多配置以提高兼容性
    useH5Prism: true,
    useFlashPrism: false,
    playsinline: true,
    preload: true,
    controlBarVisibility: "hover",
    skinLayout: [
      { name: "bigPlayButton", align: "blabs", x: 30, y: 80 },
      { name: "H5Loading", align: "cc" },
      { name: "errorDisplay", align: "tlabs", x: 0, y: 0 },
      { name: "infoDisplay" },
      { name: "tooltip", align: "blabs", x: 0, y: 56 },
      { name: "thumbnail" },
      {
        name: "controlBar",
        align: "blabs",
        x: 0,
        y: 0,
        children: [
          { name: "progress", align: "blabs", x: 0, y: 44 },
          { name: "playButton", align: "tl", x: 15, y: 12 },
          { name: "timeDisplay", align: "tl", x: 10, y: 7 },
          { name: "fullScreenButton", align: "tr", x: 10, y: 12 },
          { name: "volume", align: "tr", x: 5, y: 10 },
        ],
      },
    ],
  };

  // 如果提供了source，优先使用source（直接播放地址）
  if (source || props.source) {
    config.source = source || props.source;
  }

  try {
    player.value = new Aliplayer(config, (playerInstance) => {
      console.log("播放器创建成功");
      loading.value = false;
      emit("ready", playerInstance);

      // 监听事件并向上传递
      playerInstance.on("play", () => emit("play"));
      playerInstance.on("pause", () => emit("pause"));
      playerInstance.on("ended", () => emit("ended"));
      playerInstance.on("load", () => {
        emit("load");
        playerError.value = false;
      });
      playerInstance.on("error", (error) => {
        console.error("播放器错误:", error);
        errorMessage.value = error.error_msg || "视频加载失败";
        playerError.value = true;
        loading.value = false;
        emit("error", error);

        // 自动重试逻辑
        if (currentRetry.value < props.retryCount) {
          setTimeout(() => {
            retry();
          }, 2000);
        }
      });
    });
  } catch (err) {
    console.error("创建播放器失败:", err);
    errorMessage.value = "播放器初始化失败";
    playerError.value = true;
    loading.value = false;
    emit("error", err);
  }
};

const initPlayer = (source = null, cover = null) => {
  // 确保SDK已加载
  if (typeof Aliplayer !== "undefined") {
    createPlayer(source, cover);
  } else {
    loadSDK()
      .then(() => {
        createPlayer(source, cover);
      })
      .catch((error) => {
        console.error("阿里云播放器SDK加载失败:", error);
        errorMessage.value = "播放器SDK加载失败";
        playerError.value = true;
        loading.value = false;
        emit("error", error);
      });
  }
};

// 重试方法
const retry = () => {
  currentRetry.value++;
  emit("retry", currentRetry.value);

  if (usingBackupSource.value) {
    // 如果已经在使用备用源，重新尝试备用源
    initPlayer(props.backupSource);
  } else if (props.backupSource && currentRetry.value > 1) {
    // 第二次重试时尝试备用源
    usingBackupSource.value = true;
    initPlayer(props.backupSource);
  } else {
    // 普通重试
    initPlayer();
  }
};

onMounted(() => {
  initPlayer();
});

onBeforeUnmount(() => {
  // 组件销毁时销毁播放器
  if (player.value) {
    player.value.dispose();
    player.value = null;
  }
});

// 监听source变化
watch(
  () => props.source,
  (newSource) => {
    if (newSource && player.value) {
      changeSource(newSource);
    }
  }
);
</script>

<style scoped>
.ali-player-container {
  position: relative;
  width: 100%;
  height: v-bind("props.height");
}

.prism-player {
  width: 100%;
  height: 100%;
}

.player-loading,
.player-error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  z-index: 10;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.player-error h3 {
  margin: 0 0 10px 0;
}

.player-error p {
  margin: 0 0 20px 0;
  text-align: center;
  max-width: 80%;
}

.retry-button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.retry-button:hover {
  background-color: #45a049;
}
</style>