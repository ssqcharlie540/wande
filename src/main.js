// main.js
import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import router from "../router/index"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import TlbsMap from "tlbs-map-vue"
// import { createSeoPlugin } from "@/util/seo"
const app = createApp(App)

// 异步注册图标
const importAllIcons = async () => {
  const icons = await import("@element-plus/icons-vue")
  for (const [key, component] of Object.entries(icons)) {
    app.component(key, component)
  }
}

// 初始化应用
const init = async () => {
  await importAllIcons()
  
  app.use(router)
  app.use(ElementPlus)
  app.use(TlbsMap)
  // app.use(createSeoPlugin()) // 使用 SEO 插件
  
  app.mount("#app")
}

init()