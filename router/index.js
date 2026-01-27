import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
const routes = [
  // 中文版首页
  {
    path: "/",
    name: "/",
    component: () => import("../src/view/homePage/index.vue"),
    meta: {
      title: "万德包装 - 化工包装解决方案服务商 | 阀口袋、方底袋专业制造商",
      description:
        "万德包装专注于化工领域专业包装，提供阀口袋、PE阀口袋、方底袋等定制化解决方案，具备防潮、高效灌装、堆垛稳定等优势，服务于炭黑、树脂、钛白粉等行业。",
      keywords: "化工包装, 阀口袋, PE阀口袋, 方底袋, 定制包装解决方案",
    },
  },
  // 英文版首页
  {
    path: "/en",
    name: "en",
    component: () => import("../src/view/homePage/indexEN.vue"),
    meta: {
      title:
        "WANDE Packaging - Chemical Packaging Solutions Provider | Valve Bags & Square Bottom Bags Manufacturer",
      description:
        "WANDE Packaging specializes in chemical packaging solutions, offering valve bags, PE valve bags, square-bottom open-mouth bags with moisture-proof, efficient filling, and stable stacking features for carbon black, resin, titanium dioxide, and more.",
      keywords:
        "chemical packaging, valve bag, PE valve bag, square bottom bag, customized packaging solutions",
    },
  },
  // 中文版关于我们
  {
    path: "/about",
    name: "about",
    component: () => import("../src/view/about/index.vue"),
    meta: {
      title: "关于万德包装 | 化工包装企业介绍、发展历程与企业文化",
      description:
        "河南万德包装成立于2021年，专注化工包装领域，提供从研发、生产到物流的一站式包装解决方案。拥有60+专利、200+员工、2万+㎡厂房，致力于成为智能绿色包装引领者。",
      keywords: "万德包装, 化工包装企业, 包装研发, 企业文化, 资质荣誉",
    },
  },
  // 英文版关于我们
  {
    path: "/en/about",
    name: "enabout",
    component: () => import("../src/view/about/indexEN.vue"),
    meta: {
      title:
        "About WANDE Packaging | Chemical Packaging Company, Development History & Corporate Culture",
      description:
        "Henan WANDE Packaging, founded in 2021, specializes in chemical packaging solutions from R&D to logistics. With 60+ patents, 200+ employees, and 20,000+㎡ factory, we aim to be a leader in intelligent green packaging.",
      keywords:
        "WANDE Packaging, chemical packaging company, packaging R&D, corporate culture, qualifications & honors",
    },
  },
  // 中文版产品及服务
  {
    path: "/products",
    name: "projectServe",
    component: () => import("../src/view/projectServe/projectServe.vue"),
    meta: {
      title: "万德包装产品中心 | PE阀口袋、方底袋、化工包装定制服务",
      description:
        "万德提供阀口袋、方底袋、PE阀口袋等化工包装产品，具备密封性好、高效灌装、堆垛稳定、环保美观等优势，适用于炭黑、橡胶、树脂、催化剂等多种化工物料。",
      keywords: "PE阀口袋, 方底袋, 化工包装, 定制包装, 包装优势",
    },
  },
  // 英文版产品及服务
  {
    path: "/en/products",
    name: "enprojectServe",
    component: () => import("../src/view/projectServe/enprojectServe.vue"),
    meta: {
      title:
        "WANDE Packaging Products | PE Valve Bags, Square Bottom Bags, Custom Chemical Packaging Solutions",
      description:
        "WANDE offers valve bags, square-bottom bags, and PE valve bags for chemical packaging, featuring excellent sealing, efficient filling, stable stacking, and eco-friendly design for carbon black, rubber, resin, catalysts, and more.",
      keywords:
        "PE valve bag, square bottom bag, chemical packaging, custom packaging, packaging advantages",
    },
  },
  // 中文版全景展示
  {
    path: "/services",
    name: "services",
    component: () => import("../src/view/services/services.vue"),
    meta: {
      title: "万德包装工厂全景展示 | 智能生产线与现代化生产车间",
      description:
        "欢迎参观万德包装智能化生产车间，展示先进的全自动制袋生产线、德国W&H设备、高效流水线与科学质量管理体系，体现匠心工艺与智造实力。",
      keywords: "包装工厂, 生产线展示, 智能车间, 制袋设备, 生产工艺",
    },
  },
  // 英文版全景展示
  {
    path: "/en/services",
    name: "enservices",
    component: () => import("../src/view/services/enservices.vue"),
    meta: {
      title:
        "WANDE Packaging Factory Panoramic Display | Smart Production Line & Modern Workshop",
      description:
        "Explore WANDE's intelligent production workshop, featuring automated bag-making lines, German W&H equipment, efficient workflows, and scientific quality management systems, showcasing craftsmanship and smart manufacturing capabilities.",
      keywords:
        "packaging factory, production line display, smart workshop, bag-making equipment, production process",
    },
  },
  // 中文版联系我们
  {
    path: "/contact",
    name: "contact",
    component: () => import("../src/view/contact/contact.vue"),
    meta: {
      title: "联系我们 - 万德包装 | 化工包装咨询、业务合作与技术支持",
      description:
        "欢迎联系万德包装，获取化工包装解决方案、产品咨询、业务合作与技术支援。我们提供国内国际业务支持，工厂位于河南安阳，营销中心在郑州，7×24小时服务。",
      keywords: "包装咨询, 业务合作, 技术支持, 联系方式, 化工包装服务",
    },
  },
  // 英文版联系我们
  {
    path: "/en/contact",
    name: "encontact",
    component: () => import("../src/view/contact/encontact.vue"),
    meta: {
      title:
        "Contact WANDE Packaging | Chemical Packaging Inquiry, Business Cooperation & Technical Support",
      description:
        "Contact WANDE Packaging for chemical packaging solutions, product inquiries, business cooperation, and technical support. We offer domestic and international services with factories in Anyang and a marketing center in Zhengzhou, available 24/7.",
      keywords:
        "packaging inquiry, business cooperation, technical support, contact information, chemical packaging services",
    },
  },
  // 中文版新闻列表
  {
    path: "/news_list",
    name: "news_list",
    component: () => import("../src/view/news_list/news_list.vue"),
    meta: {
      title: "万德包装公司新闻 | 行业动态、展会参与与企业资讯",
      description:
        "获取万德包装最新企业动态、行业展会参与、技术突破与客户合作案例，了解化工包装领域发展趋势与万德包装的创新实践。",
      keywords: "包装新闻, 行业动态, 展会参与, 企业资讯, 化工包装趋势",
    },
  },
  // 英文版新闻列表
  {
    path: "/en/news_list",
    name: "ennews_list",
    component: () => import("../src/view/news_list/ennews_list.vue"),
    meta: {
      title:
        "WANDE Packaging Company News | Industry Updates, Exhibition Participation & Corporate Insights",
      description:
        "Stay updated with WANDE Packaging's latest news, industry exhibition participation, technological breakthroughs, and customer case studies to understand trends and innovations in chemical packaging.",
      keywords:
        "packaging news, industry updates, exhibition participation, corporate insights, chemical packaging trends",
    },
  },
  // 中文版新闻详情
  {
    path: "/news_detail",
    name: "news_detail",
    component: () => import("../src/view/news_list/news_detail.vue"),
    meta: {
      title: "公司动态详情 - 万德包装",
      description: "万德包装最新动态和新闻详情",
      keywords: "新闻,动态,详情,化工包装",
    },
    props: (route) => ({
      newsId: route.query.id || "default", // 使用 query.id 而不是 params.id
    }),
  },
  // 英文版新闻详情
  {
    path: "/en/news_detail",
    name: "ennews_detail",
    component: () => import("../src/view/news_list/ennews_detail.vue"),
    meta: {
      title: "Company News Details - WANDE Packaging",
      description: "WANDE Packaging latest news and details",
      keywords: "news, updates, details, chemical packaging",
    },
    props: (route) => ({
      newsId: route.params.id,
    }),
  },
  // 询盘页面
  {
    path: "/getInquiries",
    name: "getInquiries",
    component: () => import("../src/view/getInquiries/getInquiries.vue"),
    meta: {
      title: "询盘 - 万德包装 | 产品咨询与报价",
      description: "提交询盘获取万德包装产品详细信息和报价",
      keywords: "询盘,报价,产品咨询,化工包装",
    },
  },
];
const router = createRouter({
  history: createWebHistory(),
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

// ========== 路由守卫设置 SEO ==========
// 或者使用 afterEach（推荐，不会阻塞导航）
router.afterEach((to) => {
  console.log("=== 路由切换完成，设置 SEO ===");

  // 设置标题
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  // 延迟一点确保组件已挂载
  setTimeout(() => {
    // 设置描述
    if (to.meta.description) {
      // 移除所有旧的 description
      const oldDesc = document.querySelectorAll('meta[name="description"]');
      oldDesc.forEach((el) => el.remove());

      // 创建新的
      const descMeta = document.createElement("meta");
      descMeta.name = "description";
      descMeta.content = to.meta.description;
      document.head.appendChild(descMeta);
      console.log("描述已设置:", to.meta.description);
    }

    // 设置关键词
    if (to.meta.keywords) {
      // 移除所有旧的 keywords
      const oldKeywords = document.querySelectorAll('meta[name="keywords"]');
      oldKeywords.forEach((el) => el.remove());

      // 创建新的
      const keywordsMeta = document.createElement("meta");
      keywordsMeta.name = "keywords";
      keywordsMeta.content = to.meta.keywords;
      document.head.appendChild(keywordsMeta);
      console.log("关键词已设置:", to.meta.keywords);
    }

    // 验证
    console.log("当前标题:", document.title);
    console.log(
      "当前描述标签:",
      document.querySelector('meta[name="description"]')?.outerHTML
    );
    console.log(
      "当前关键词标签:",
      document.querySelector('meta[name="keywords"]')?.outerHTML
    );
  }, 200);
});

export default router;
