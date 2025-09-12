import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "../router/index"; // 导入路由配置
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import TlbsMap from "tlbs-map-vue";
const app = createApp(App);

app.use(router); // 使用路由
app.use(ElementPlus);
app.use(TlbsMap);
app.mount("#app");
