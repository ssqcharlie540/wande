
// src/view/aboutPage/main.js
import { createApp } from "vue"
import "../../style.css"
import App from "./contact.vue"

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