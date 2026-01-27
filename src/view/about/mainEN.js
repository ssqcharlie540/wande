
// src/view/aboutPage/mainEN.js
import { createApp } from "vue"
import "../../style.css"
import App from "./indexEN.vue"  // 注意：引入英文组件

import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import TlbsMap from "tlbs-map-vue"

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