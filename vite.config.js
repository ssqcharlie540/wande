// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { createHtmlPlugin } from "vite-plugin-html";

const pages = [
  {
    entry: "/src/view/homePage/main.js",
    filename: "index.html",
    template: "public/index.html",
    injectOptions: {
      data: {
        title: "万德包装 - 化工包装解决方案服务商 | 阀口袋、方底袋专业制造商",
        description:
          "万德包装专注于化工领域专业包装，提供阀口袋、PE阀口袋、方底袋等定制化解决方案，具备防潮、高效灌装、堆垛稳定等优势，服务于炭黑、树脂、钛白粉等行业。",
        keywords: "化工包装, 阀口袋, PE阀口袋, 方底袋, 定制包装解决方案",
      },
    },
  },
  {
    entry: "/src/view/about/main.js",
    filename: "about.html",
    template: "public/about.html",
    injectOptions: {
      data: {
        title: "关于万德包装 | 化工包装企业介绍、发展历程与企业文化",
        description:
          "河南万德包装成立于2021年，专注化工包装领域，提供从研发、生产到物流的一站式包装解决方案。拥有60+专利、200+员工、2万+㎡厂房，致力于成为智能绿色包装引领者。",
        keywords: "万德包装, 化工包装企业, 包装研发, 企业文化, 资质荣誉",
      },
    },
  },
  {
    entry: "/src/view/news_list/main.js",
    filename: "news_list.html",
    template: "public/news_list.html",
    injectOptions: {
      data: {
        title: "万德包装公司新闻 | 行业动态、展会参与与企业资讯",
        description:
          "获取万德包装最新企业动态、行业展会参与、技术突破与客户合作案例，了解化工包装领域发展趋势与万德包装的创新实践。",
        keywords: "包装新闻, 行业动态, 展会参与, 企业资讯, 化工包装趋势",
      },
    },
  },
  {
    entry: "/src/view/news_list/mainDetail.js",
    filename: "news_detail.html",
    template: "public/news_detail.html",
    injectOptions: {
      data: {
        title: "新闻详情 - 万德包装",
      },
    },
  },
  {
    entry: "/src/view/projectServe/main.js",
    filename: "products.html",
    template: "public/products.html",
    injectOptions: {
      data: {
        title: "万德包装产品中心 | PE阀口袋、方底袋、化工包装定制服务",
        description:
          "万德提供阀口袋、方底袋、PE阀口袋等化工包装产品，具备密封性好、高效灌装、堆垛稳定、环保美观等优势，适用于炭黑、橡胶、树脂、催化剂等多种化工物料。",
        keywords: "PE阀口袋, 方底袋, 化工包装, 定制包装, 包装优势",
      },
    },
  },
  {
    entry: "/src/view/services/main.js",
    filename: "services.html",
    template: "public/services.html",
    injectOptions: {
      data: {
        title: "万德包装工厂全景展示 | 智能生产线与现代化生产车间",
        description:
          "欢迎参观万德包装智能化生产车间，展示先进的全自动制袋生产线、德国W&H设备、高效流水线与科学质量管理体系，体现匠心工艺与智造实力。",
        keywords: "包装工厂, 生产线展示, 智能车间, 制袋设备, 生产工艺",
      },
    },
  },
  {
    entry: "/src/view/contact/main.js",
    filename: "contact.html",
    template: "public/contact.html",
    injectOptions: {
      data: {
        title: "联系我们 - 万德包装 | 化工包装咨询、业务合作与技术支持",
        description:
          "欢迎联系万德包装，获取化工包装解决方案、产品咨询、业务合作与技术支援。我们提供国内国际业务支持，工厂位于河南安阳，营销中心在郑州，7×24小时服务。",
        keywords: "包装咨询, 业务合作, 技术支持, 联系方式, 化工包装服务",
      },
    },
  },
  // 英文
  {
    entry: "/src/view/homePage/mainEN.js",
    filename: "en.html",
    template: "public/en.html",
    injectOptions: {
      data: {
        title:
          "WANDE Packaging - Chemical Packaging Solutions Provider | Valve Bags & Square Bottom Bags Manufacturer",
        description:
          "WANDE Packaging specializes in chemical packaging solutions, offering valve bags, PE valve bags, square-bottom open-mouth bags with moisture-proof, efficient filling, and stable stacking features for carbon black, resin, titanium dioxide, and more.",
        keywords:
          "chemical packaging, valve bag, PE valve bag, square bottom bag, customized packaging solutions",
      },
    },
  },
  {
    entry: "/src/view/about/mainEN.js",
    filename: "aboutEN.html",
    template: "public/aboutEN.html",
    injectOptions: {
      data: {
        title:
          "About WANDE Packaging | Chemical Packaging Company, Development History & Corporate Culture",
        description:
          "Henan WANDE Packaging, founded in 2021, specializes in chemical packaging solutions from R&D to logistics. With 60+ patents, 200+ employees, and 20,000+㎡ factory, we aim to be a leader in intelligent green packaging.",
        keywords:
          "WANDE Packaging, chemical packaging company, packaging R&D, corporate culture, qualifications & honors",
      },
    },
  },
  {
    entry: "/src/view/news_list/mainEN.js",
    filename: "news_listEN.html",
    template: "public/news_listEN.html",
    injectOptions: {
      data: {
        title:
          "WANDE Packaging Company News | Industry Updates, Exhibition Participation & Corporate Insights",
        description:
          "Stay updated with WANDE Packaging's latest news, industry exhibition participation, technological breakthroughs, and customer case studies to understand trends and innovations in chemical packaging.",
        keywords:
          "packaging news, industry updates, exhibition participation, corporate insights, chemical packaging trends",
      },
    },
  },
  {
    entry: "/src/view/news_list/mainDetail.js",
    filename: "news_detailEN.html",
    template: "public/news_detailEN.html",
    injectOptions: {
      data: {
        title: "News Detail ",
      },
    },
  },
  {
    entry: "/src/view/projectServe/mainEN.js",
    filename: "productsEN.html",
    template: "public/productsEN.html",
    injectOptions: {
      data: {
        title:
          "WANDE Packaging Products | PE Valve Bags, Square Bottom Bags, Custom Chemical Packaging Solutions",
        description:
          "WANDE offers valve bags, square-bottom bags, and PE valve bags for chemical packaging, featuring excellent sealing, efficient filling, stable stacking, and eco-friendly design for carbon black, rubber, resin, catalysts, and more.",
        keywords:
          "PE valve bag, square bottom bag, chemical packaging, custom packaging, packaging advantages",
      },
    },
  },
  {
    entry: "/src/view/services/mainEN.js",
    filename: "servicesEN.html",
    template: "public/servicesEN.html",
    injectOptions: {
      data: {
        title:
          "WANDE Packaging Factory Panoramic Display | Smart Production Line & Modern Workshop",
        description:
          "Explore WANDE's intelligent production workshop, featuring automated bag-making lines, German W&H equipment, efficient workflows, and scientific quality management systems, showcasing craftsmanship and smart manufacturing capabilities.",
        keywords:
          "packaging factory, production line display, smart workshop, bag-making equipment, production process",
      },
    },
  },
  {
    entry: "/src/view/contact/mainEN.js",
    filename: "contactEN.html",
    template: "public/contactEN.html",
    injectOptions: {
      data: {
        title:
          "Contact WANDE Packaging | Chemical Packaging Inquiry, Business Cooperation & Technical Support",
        description:
          "Contact WANDE Packaging for chemical packaging solutions, product inquiries, business cooperation, and technical support. We offer domestic and international services with factories in Anyang and a marketing center in Zhengzhou, available 24/7.",
        keywords:
          "packaging inquiry, business cooperation, technical support, contact information, chemical packaging services",
      },
    },
  },
  {
    entry: "/src/view/getInquiries/main.js",
    filename: "getInquiries.html",
    template: "public/getInquiries.html",
    injectOptions: {
      data: {
        title: "询盘 - 万德包装",
      },
    },
  },
];

// 创建 rollup input 配置
const rollupInput = {};
pages.forEach(page => {
  rollupInput[page.filename.replace('.html', '')] = resolve(__dirname, page.filename);
});

export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: false,
      pages: pages,
    }),
  ],
  
  server: {
    port: 443,
    host: true,
    open: true,
    
    fs: {
      strict: false,
      allow: [".."],
    },
    
    proxy: {
      "/api": {
        target: "https://www.wandepack.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },

  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },

  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: rollupInput,
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
  },

  publicDir: "public",
  base: "./",
});