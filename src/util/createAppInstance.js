// src/util/createAppInstance.js
import { createApp } from "vue"
import "./style.css"
import router from "../router/index"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import TlbsMap from "tlbs-map-vue"
// import { createSeoPlugin } from "@/util/seo"

/**
 * 创建 Vue 应用实例
 * @param {Object} AppComponent - 根组件
 * @param {Object} options - 配置选项
 * @param {Object} options.routerConfig - 路由配置（可选）
 * @param {Object} options.seoOptions - SEO 配置（可选）
 * @returns {VueApp} Vue 应用实例
 */
export async function createVueApp(AppComponent, options = {}) {
  const app = createApp(AppComponent)
  
  // 异步注册图标
  const importAllIcons = async () => {
    const icons = await import("@element-plus/icons-vue")
    for (const [key, component] of Object.entries(icons)) {
      app.component(key, component)
    }
  }
  
  await importAllIcons()
  
  // 如果有自定义路由配置，使用它
  const routerInstance = options.routerConfig || router
  
  app.use(routerInstance)
  app.use(ElementPlus)
  app.use(TlbsMap)
  
  // 如果有 SEO 插件，使用它
  // if (options.seoOptions) {
  //   app.use(createSeoPlugin(options.seoOptions))
  // }
  
  return app
}