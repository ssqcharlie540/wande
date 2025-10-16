import { createRouter, createWebHashHistory } from "vue-router";
// 测试用直接导入
import HomePage from "../src/view/homePage/index.vue";

const routes = [
  {
    path: "/",
    name: "/",
    component: HomePage, // 先使用直接导入测试
  },
  {
    // 关于万德
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName:"" */ "../src/view/about/index.vue"),
  },
  {
    // 产品及服务 fullView
    path: "/products",
    name: "projectServe",
    component: () =>
      import(
        /* webpackChunkName:"" */ "../src/view/projectServe/projectServe.vue"
      ),
  },
  {
    // 全景展示
    path: "/services",
    name: "services",
    component: () =>
      import(/* webpackChunkName:"" */ "../src/view/services/services.vue"),
  },
  {
    // 联系我们
    path: "/contact",
    name: "contact",
    component: () =>
      import(/* webpackChunkName:"" */ "../src/view/contact/contact.vue"),
  },
  {
    // 询盘 表格页面
    path: "/getInquiries",
    name: "getInquiries",
    component: () =>
      import(/* webpackChunkName:"" */ "../src/view/getInquiries/getInquiries.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 };
  },
});

// 可选：设置标题
router.beforeEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
});

export default router;
