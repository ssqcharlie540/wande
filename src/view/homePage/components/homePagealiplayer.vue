<template>
  <div class="video-page-container">
    <h2>视频播放演示</h2>

    <div class="video-controls">
      <button @click="handlePlay" :disabled="!isReady">播放</button>
      <button @click="handlePause" :disabled="!isReady">暂停</button>
      <button @click="handleReplay" :disabled="!isReady">重新播放</button>
      <button @click="switchSource" :disabled="!isReady">切换备用源</button>
    </div>

    <!-- :source="currentSource" -->
    <!--  -->
    <div class="video-wrapper">
      <AliPlayer
        ref="playerRef"
        :vid="vid"
        :playauth="playauth"
        :backupSource="backupSource"
        :autoplay="true"
        width="100%"
        height="400px"
        :retryCount="3"
        @ready="onPlayerReady"
        @play="onPlayerPlay"
        @pause="onPlayerPause"
        @ended="onPlayerEnded"
        @error="onPlayerError"
        @load="onPlayerLoad"
        @retry="onPlayerRetry"
      />
    </div>

    <div class="player-status">
      <h3>播放器状态 版本 1.1</h3>
      <p>状态: {{ status }}</p>
      <p>重试次数: {{ retryCount }}</p>
      <p v-if="error">错误信息: {{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import AliPlayer from "@/components/Aliplayer/Aliplayer.vue";

const playerRef = ref(null);
const isReady = ref(false);
const status = ref("初始化中...");
const error = ref(null);
const retryCount = ref(0);
const useBackupSource = ref(false);

// 主视频源
const primarySource = ref(
  "http://wandepack.com/sv/2f7d4482-198f898b242/2f7d4482-198f898b242.mp4"
);
// 备用视频源（使用不同格式的视频）
const backupSource = ref(
  "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
);
const vid = ref("106245e0854071f0800c6723a78f0102");
const playauth = ref(
  "eyJTZWN1cml0eVRva2VuIjoiQ0FJUzFRTjFxNkZ0NUIyeWZTaklyNXJlYy95TmpySlY0NE92VkYvWnJHb0ZYZnhtcEtqYjB6ejJJSGhNZFhKc0JPRWRzdjQvbm1CWDdmZ2ZscklxRnNVVkhoR2FNSkl0c2NnTnIxbi9Kb0hidk5ldTBic0hoWnY5ajRvRnB1YWdqcUhvZU96Y1lJNzMwWjdQQWdtMlEwWVJySkwrY1RLOUphYk1VL21nZ29KbWFkSTZSeFN4YVNFOGF2NWRPZ3BscnIwSVZ4elBNdnIvSFJQMnVtN1pIV3R1dEEwZTgzMTQ1ZmFRejlHaTZ4YlRpM2I5ek9FVXFPYVhKNFMvUGZGb05ZWnlTZjZvd093VUVxL2R5M3hvN3hGYjFhRjRpODRpL0N2YzdQMlFDRU5BK3dtbFB2dTJpOE5vSUYxV2E3UVdJWXRncmZQeGsrWjEySmJOa0lpbDVCdFJFZHR3ZUNuRldLR216c3krYjRIUEROc2ljcXZoTUhuZ3k4MkdNb0tQMHprcGVuVUdMZ2hIQ2JGRFF6MVNjVVZ4RUdHQmQvSDZvUTJWUGwzOUVmYS92ZnRvZ2NZdi9UTEI1c0dYSWxXRGViS2QzQnNETjRVMEIwRlNiRVpPakRlOUwvNWRMMVljS1FNNFhPaklWL2xhYUJGUHRLWFdtaUgrV3lOcDAzVkxoZnI2YXVOcGJnUHIxVVFwTlhndjgvMytCUHd1MndOQ0p6eDgrNjBwRGM1MTJrYlI0S2VFZmRnTUtCN09DVTYvdXBHM1M4VG81QTZKbEtzMGYxNmY0WVNqWi8zK0k4T1RndjluWFQ2eW42SjFwQ3kzYkVVK2VHTkdHb0FCZkRuV29lMWF1SzFDTS9nM0gvTzF4ZXloL3JxVGdOOG9HSDBtSVMxdU52Y3M5VEVKQnk1WEdoTzJxNGQzWEE4bDdmQjB5Vnl5ckNRVVFwOFN6Z2hZakdibXFVUXRubVM5bHBsaDJySXQ0a2VzZTRUTGk4c3NOQ2J4aG05ZDdvcXoraW55R21Dem9UZFFWd3FSTFFKUWx0bkYyam0zVm14UFc5VGhtY0dRanY4Z0FBPT0iLCJBdXRoSW5mbyI6IntcIkNJXCI6XCJqUjg0SDh2akxYOHJPNXhzMVFIRFNEcjNjSVBZdFp6WCtmeWRzSmV3OFk5SFo5a0ZSajdZMWpranRNU3RDZGZ0XCIsXCJDYWxsZXJcIjpcIkZBdGpIdzlndjUrL3gzK2FESmREL2Z6cWxaenlvN2ZHY09xSm5zZnVRdms9XCIsXCJFeHBpcmVUaW1lXCI6XCIyMDI1LTA5LTAyVDA0OjI2OjMzWlwiLFwiTWVkaWFJZFwiOlwiMTA2MjQ1ZTA4NTQwNzFmMDgwMGM2NzIzYTc4ZjAxMDJcIixcIlBsYXlEb21haW5cIjpcIndhbmRlcGFjay5jb21cIixcIlNpZ25hdHVyZVwiOlwiQjlybFh3ZVZGN3phVnp3bW9WbTJiV1FpZDdrPVwifSIsIlZpZGVvTWV0YSI6eyJTdGF0dXMiOiJOb3JtYWwiLCJWaWRlb0lkIjoiMTA2MjQ1ZTA4NTQwNzFmMDgwMGM2NzIzYTc4ZjAxMDIiLCJUaXRsZSI6IuS4h+W+t+WMheijhS3lrpjnvZEt6aaW6aG1LeS8geS4muS7i+e7jS5tcDQiLCJDb3ZlclVSTCI6Imh0dHA6Ly93YW5kZXBhY2suY29tLzEwNjI0NWUwODU0MDcxZjA4MDBjNjcyM2E3OGYwMTAyL3NuYXBzaG90cy8yMjAyZWI0YTJkMzA0OGE1OTk0MTczMjgxYjY0NTU1Mi0wMDAwMS5qcGciLCJEdXJhdGlvbiI6MTI0LjI3NH0sIkFjY2Vzc0tleUlkIjoiU1RTLk5ZazhGOWNtdFRBRFZ5aEhqUFFzSkttcDEiLCJQbGF5RG9tYWluIjoid2FuZGVwYWNrLmNvbSIsIkFjY2Vzc0tleVNlY3JldCI6IkUycGcySkdHWlAxSnVtMjlINXFCdE4yOVF4bUFBOVBnS0hCR2FRSFd1OEt3IiwiUmVnaW9uIjoiY24tc2hhbmdoYWkiLCJDdXN0b21lcklkIjoxNTI4MzU2NTE1NzQyNjI2fQ=="
);

// 计算当前使用的源
const currentSource = computed(() => {
  return useBackupSource.value ? backupSource.value : primarySource.value;
});

const onPlayerReady = (player) => {
  console.log("播放器准备就绪", player);
  isReady.value = true;
  status.value = "准备就绪";
  error.value = null;
};

const onPlayerPlay = () => {
  console.log("播放器开始播放");
  status.value = "播放中";
};

const onPlayerPause = () => {
  console.log("播放器暂停");
  status.value = "已暂停";
};

const onPlayerEnded = () => {
  console.log("播放结束");
  status.value = "播放结束";
};

const onPlayerError = (err) => {
  console.error("播放器错误", err);
  error.value = err.error_msg || "未知错误";
  status.value = "发生错误";
};

const onPlayerLoad = () => {
  console.log("视频加载完成");
  status.value = "视频加载完成";
};

const onPlayerRetry = (count) => {
  console.log(`第${count}次重试`);
  retryCount.value = count;
  status.value = `第${count}次重试中...`;
};

const handlePlay = () => {
  if (playerRef.value) {
    playerRef.value.play();
  }
};

const handlePause = () => {
  if (playerRef.value) {
    playerRef.value.pause();
  }
};

const handleReplay = () => {
  if (playerRef.value) {
    playerRef.value.replay();
  }
};

const switchSource = () => {
  useBackupSource.value = !useBackupSource.value;
  if (playerRef.value) {
    playerRef.value.changeSource(
      useBackupSource.value ? backupSource.value : primarySource.value
    );
  }
  status.value = `切换到${useBackupSource.value ? "备用源" : "主源"}`;
};
</script>

<style scoped>
.video-page-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.video-controls {
  margin-bottom: 15px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.video-controls button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.video-controls button:hover:not(:disabled) {
  background-color: #45a049;
}

.video-controls button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.video-wrapper {
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.player-status {
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.player-status h3 {
  margin-top: 0;
  color: #333;
}

.player-status p {
  margin: 5px 0;
  color: #666;
}
</style>