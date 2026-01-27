<template>
  <div>
    <slot v-if="isMounted || isPrerendering"></slot>
    <div v-else class="prerender-content">
      <!-- 预渲染时的静态内容 -->
      <slot name="prerender"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isMounted = ref(false)
const isPrerendering = typeof window !== 'undefined' && 
  (window.__PRERENDER_INJECTED || navigator.userAgent.includes('Prerender'))

onMounted(() => {
  isMounted.value = true
})
</script>