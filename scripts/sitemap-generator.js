// scripts/sitemap-generator.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// 获取当前文件路径（ES模块的路径处理）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==================== 核心配置区域 ====================

/**
 * 路由配置数组 - 这是最重要的配置部分
 * 基于router/index.js 中的路由结构
 */
const routes = [
  {
    path: "/",               // 页面路径（必须）
    priority: "1.0",          // 优先级 0.0-1.0（可选）
    changefreq: "daily"        
    // 更新频率（可选） 
    // always：总是更新（如实时数据）
    // hourly：每小时
    // daily：每天
    // weekly：每周
    // monthly：每月
    // yearly：每年
    // never：从不更新（如过期内容）
  },
  {
    path: "/about",
    priority: "0.8",
    changefreq: "monthly"
  },
  {
    path: "/products",
    priority: "0.9",
    changefreq: "weekly"
  },
  {
    path: "/services",
    priority: "0.9", 
    changefreq: "weekly"
  },
  {
    path: "/contact",
    priority: "0.7",
    changefreq: "monthly"
  }
];

const hostname = "https://www.wandepack.com";
const currentDate = new Date().toISOString().split('T')[0];

function generateSitemap() {
  const sitemapUrls = routes.map(route => `
  <url>
    <loc>${hostname}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`).join('');

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapUrls}
</urlset>`;

  // 确保 dist 目录存在
  const distDir = path.resolve(__dirname, '../dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // 写入 sitemap.xml
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapContent);
  console.log('✅ Sitemap generated successfully!');
  
  // 同时生成 robots.txt
  generateRobotsTxt(distDir);
}

function generateRobotsTxt(distDir) {
  const robotsContent = `# robots.txt
User-agent: *
Allow: /

Sitemap: ${hostname}/sitemap.xml

# Crawl-delay: 10
# Disallow: /admin/
# Disallow: /private/`;

  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsContent);
  console.log('✅ Robots.txt generated successfully!');
}

// 运行生成
generateSitemap();