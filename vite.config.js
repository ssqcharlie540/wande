import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // 默认已配置
    },
  },
  server: {
    port: 443, // 确保端口与浏览器中一致
     host: true, // 允许外部访问
    proxy: {
      "/api": {
        target: "https://wandepack.com", // 你的后端地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), 
        // 如果后端不需要/api前缀，使用：rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
});
