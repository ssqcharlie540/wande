<template>
  <div style="height: 30vh"></div>
  <div class="video-container">测试</div>
</template>

<script setup>
</script>

<style scoped>
.video-container {
  background-color: #0056b3;
  height: 30vh;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.controls {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.controls button {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.controls button:hover {
  background: #0056b3;
}
</style>