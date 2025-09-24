import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "../router/index";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import TlbsMap from "tlbs-map-vue";

const app = createApp(App);

// 优化图标注册（可选，如果确实需要所有图标）
const importAllIcons = async () => {
  const icons = await import("@element-plus/icons-vue");
  for (const [key, component] of Object.entries(icons)) {
    app.component(key, component);
  }
};
importAllIcons();

app.use(router);
app.use(ElementPlus);
app.use(TlbsMap);
app.mount("#app");
