// src/view/homePage/main.js
import { createApp } from "vue"
import "../../style.css"  // 相对路径引入样式
import App from "./index.vue"

// 创建独立的 ElementPlus 实例
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import TlbsMap from "tlbs-map-vue"

// 异步注册图标
const importAllIcons = async () => {
  const icons = await import("@element-plus/icons-vue")
  const app = createApp(App)
  
  for (const [key, component] of Object.entries(icons)) {
    app.component(key, component)
  }
  
  app.use(ElementPlus)
  app.use(TlbsMap)
  app.mount("#app")
}

importAllIcons()