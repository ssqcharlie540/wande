import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==================== 网站配置 ====================
const hostname = "https://www.wandepack.com";

// 基于你的路由配置 - 中英文作为独立页面
const routes = [
  // 中文版页面
  {
    path: "/",
    priority: "1.0",
    changefreq: "daily",
    lastmod: "2024-01-20",
  },
  {
    path: "/about",
    priority: "0.8",
    changefreq: "monthly",
    lastmod: "2024-01-15",
  },
  {
    path: "/products",
    priority: "0.9",
    changefreq: "weekly",
    lastmod: "2024-01-18",
  },
  {
    path: "/services",
    priority: "0.8",
    changefreq: "monthly",
    lastmod: "2024-01-10",
  },
  {
    path: "/contact",
    priority: "0.8",
    changefreq: "monthly",
    lastmod: "2024-01-15",
  },
  {
    path: "/news_list",
    priority: "0.7",
    changefreq: "weekly",
    lastmod: new Date().toISOString().split("T")[0],
  },
  {
    path: "/news_detail",
    priority: "0.6",
    changefreq: "weekly",
    lastmod: new Date().toISOString().split("T")[0],
  },
  // 英文版页面（独立页面）
  {
    path: "/en",
    priority: "0.9",
    changefreq: "daily",
    lastmod: "2024-01-20",
  },
  {
    path: "/en/about",
    priority: "0.7",
    changefreq: "monthly",
    lastmod: "2024-01-15",
  },
  {
    path: "/en/products",
    priority: "0.8",
    changefreq: "weekly",
    lastmod: "2024-01-18",
  },
  {
    path: "/en/services",
    priority: "0.7",
    changefreq: "monthly",
    lastmod: "2024-01-10",
  },
  {
    path: "/en/contact",
    priority: "0.7",
    changefreq: "monthly",
    lastmod: "2024-01-15",
  },
  {
    path: "/en/news_list",
    priority: "0.6",
    changefreq: "weekly",
    lastmod: new Date().toISOString().split("T")[0],
  },
  {
    path: "/en/news_detail",
    priority: "0.5",
    changefreq: "weekly",
    lastmod: new Date().toISOString().split("T")[0],
  },
  // 询盘页面（中英文共用）
  {
    path: "/getInquiries",
    priority: "0.4",
    changefreq: "monthly",
    lastmod: "2024-01-10",
  },
];

// 需要禁止搜索引擎收录的页面
const disallowedPages = [
  "/getInquiries", // 表单提交页
];

function generateSitemap() {
  console.log("🚀 开始生成站点地图...");
  console.log(`🌐 目标域名: ${hostname}`);

  // 确保 dist 目录存在
  const distDir = path.resolve(__dirname, "../dist");
  if (!fs.existsSync(distDir)) {
    console.log("📁 创建 dist 目录...");
    fs.mkdirSync(distDir, { recursive: true });
  }

  // 生成 sitemap.xml - 简化版本，没有hreflang映射
  const sitemapUrls = routes
    .map(
      (route) => `
  <url>
    <loc>${hostname}${route.path}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join("");

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapUrls}
</urlset>`;

  fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemapContent);
  console.log(`✅ 站点地图生成完成！共 ${routes.length} 个页面。`);

  // 生成 robots.txt
  generateRobotsTxt(distDir);

  // 显示生成的页面列表
  console.log("\n📊 页面优先级分布:");
  console.log("   1.0 - 首页");
  console.log("   0.9 - 主要页面");
  console.log("   0.8 - 重要内容页");
  console.log("   0.7 - 常规内容页");
  console.log("   0.6 - 新闻列表");
  console.log("   0.5 - 新闻详情");
  console.log("   0.4 - 辅助页面");

  console.log("\n📄 已收录的页面（按优先级排序）:");
  const sortedRoutes = [...routes].sort(
    (a, b) => parseFloat(b.priority) - parseFloat(a.priority)
  );
  sortedRoutes.forEach((route, i) => {
    console.log(`  ${i + 1}. [${route.priority}] ${hostname}${route.path}`);
  });

  console.log("\n🚫 已禁止收录的页面:");
  if (disallowedPages.length > 0) {
    disallowedPages.forEach((page, i) => {
      console.log(`  ${i + 1}. ${hostname}${page}`);
    });
  } else {
    console.log("  （无）");
  }

  console.log("\n📈 更新频率分布:");
  const freqStats = {};
  routes.forEach((route) => {
    freqStats[route.changefreq] = (freqStats[route.changefreq] || 0) + 1;
  });
  Object.entries(freqStats).forEach(([freq, count]) => {
    console.log(`  ${freq}: ${count}个页面`);
  });
}

function generateRobotsTxt(distDir) {
  // 构建禁止规则
  let disallowRules = "";
  if (disallowedPages.length > 0) {
    disallowRules = disallowedPages
      .map((page) => `Disallow: ${page}`)
      .join("\n");
  }

  const robotsContent = `# robots.txt
# 最后更新: ${new Date().toISOString().split("T")[0]}
# 网站: ${hostname}

# ========== 通用规则 ==========
User-agent: *
Allow: /
${disallowedPages.length > 0 ? disallowRules : ""}

# ========== 搜索引擎特定规则 ==========
# Google
User-agent: Googlebot
Allow: /
${disallowRules}

# 必应
User-agent: Bingbot
Allow: /
${disallowRules}

# 百度
User-agent: Baiduspider
Allow: /
${disallowRules}

# ========== 阻止恶意爬虫 ==========
User-agent: MJ12bot
Disallow: /

User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

# ========== 站点地图 ==========
Sitemap: ${hostname}/sitemap.xml

# ========== 网站说明 ==========
# 本网站提供中文和英文两个独立版本：
# - 中文版本：服务于中文用户
# - 英文版本：服务于国际用户
# 两个版本内容相同，但语言不同，用户可根据需要选择

# ========== 开发说明 ==========
# 1. 表单页面（/getInquiries）被禁止收录，防止用户重复提交
# 2. 中文页面优先级略高于英文页面
# 3. 所有内容页面都允许收录`;

  fs.writeFileSync(path.join(distDir, "robots.txt"), robotsContent);
  console.log("✅ robots.txt 生成完成！");
}

// 执行生成
try {
  generateSitemap();
} catch (error) {
  console.error("❌ 生成站点地图时出错:", error.message);
  console.error(error.stack);
  process.exit(1);
}
