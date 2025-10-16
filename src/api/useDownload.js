import axios from "axios";
const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://www.wandepack.com", // 添加默认值
  timeout: 180000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

/**
 * 文件下载函数 - 通过 POST 请求下载 Excel 文件
 * @param {string} url - 请求的 API 接口地址
 * @param {Object} params - 请求参数对象，包含查询条件等
 * @returns {Promise<void>} 无返回值，直接触发文件下载
 * @throws {Error} 当请求失败或响应异常时抛出错误
 *
 * @example
 * // 使用示例
 * await downloadFile('/api/export-inquiries', {
 *   start_datetime: '2024-01-01',
 *   end_datetime: '2024-01-31',
 *   download: 1
 * });
 */
export const downloadFile = async (url, params = {}) => {
  // 发送 POST 请求获取文件数据
  // 注意：POST 请求参数格式为：post(url, data, config)
  const response = await service.post(url, params, {
    // 指定响应类型为 blob，用于处理二进制文件数据
    responseType: "blob",
  });

  // 将响应数据转换为 Blob 对象
  // Blob 对象表示不可变的、原始数据的类文件对象
  const blob = new Blob([response.data], {
    // 指定文件类型为 Excel 格式
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // 创建临时下载链接
  // URL.createObjectURL() 方法会创建一个指向 Blob 对象的 URL
  const downloadUrl = window.URL.createObjectURL(blob);

  // 创建隐藏的下载链接元素
  const link = document.createElement("a");
  // 设置链接地址为 Blob URL
  link.href = downloadUrl;

  // 从响应头中获取文件名
  // Content-Disposition 头通常包含文件名信息，格式如：attachment; filename="example.xlsx"
  const contentDisposition = response.headers["content-disposition"];
  let fileName = "download.xlsx"; // 默认文件名
  if (contentDisposition) {
    // 使用正则表达式匹配文件名
    // 匹配格式：filename="文件名.xlsx" 或 filename=文件名.xlsx
    const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
    if (fileNameMatch && fileNameMatch[1]) {
      fileName = fileNameMatch[1];
    }
  }

  // 设置下载文件的名称
  link.download = fileName;

  // 将链接元素添加到 DOM 中（隐藏状态）
  document.body.appendChild(link);

  // 模拟点击链接触发下载
  link.click();

  // 下载完成后从 DOM 中移除链接元素
  document.body.removeChild(link);

  // 释放 Blob URL 占用的内存
  // 注意：每次调用 createObjectURL() 后都需要调用 revokeObjectURL() 来避免内存泄漏
  window.URL.revokeObjectURL(downloadUrl);
};
