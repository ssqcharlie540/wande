// src/plugins/seo.js
export const createSeoPlugin = () => {
  return {
    install(app) {
      const setPageSeo = (options) => {
        const { title, description, keywords } = options || {};

        console.log("SEO 插件接收到的参数:", { title, description, keywords });

        // 1. 设置标题
        if (title) {
          document.title = title;
          console.log("标题已设置:", title);
        }

        // 2. 强制设置描述
        if (description) {
          // 移除所有已存在的 description meta 标签
          const existingDesc = document.querySelectorAll('meta[name="description"]');
          existingDesc.forEach(el => el.remove());
          
          // 创建新的
          const metaDesc = document.createElement('meta');
          metaDesc.name = 'description';
          metaDesc.content = description;
          document.head.appendChild(metaDesc);
          
          console.log("描述已创建:", description);
        }

        // 3. 强制设置关键词
        if (keywords) {
          // 移除所有已存在的 keywords meta 标签
          const existingKeywords = document.querySelectorAll('meta[name="keywords"]');
          existingKeywords.forEach(el => el.remove());
          
          // 创建新的
          const metaKeywords = document.createElement('meta');
          metaKeywords.name = 'keywords';
          metaKeywords.content = keywords;
          document.head.appendChild(metaKeywords);
          
          console.log("关键词已创建:", keywords);
        }

        // 4. 验证
        setTimeout(() => {
          console.log("=== 验证结果 ===");
          console.log("描述标签:", document.querySelector('meta[name="description"]')?.outerHTML);
          console.log("关键词标签:", document.querySelector('meta[name="keywords"]')?.outerHTML);
        }, 50);
      };

      app.config.globalProperties.$seo = setPageSeo;
      app.provide('useSeo', setPageSeo);
      
      console.log("SEO 插件已安装");
    }
  };
};