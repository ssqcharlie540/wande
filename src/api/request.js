import axios from "axios";
import { ElMessage } from "element-plus";

const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://www.wandepack.com", // 添加默认值
  // baseURL:"https://wandepack.com/api", // 添加默认值

  timeout: 180000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

// 请求拦截器 - 添加详细日志
service.interceptors.request.use(
  (config) => {
    console.log("🌐 请求配置:", {
      url: config.url,
      method: config.method,
      data: config.data,
      params: config.params,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error("❌ 请求错误:", error);
    return Promise.reject(error);
  }
);

// 响应拦截器 - 添加详细错误信息
service.interceptors.response.use(
  (response) => {
    console.log("✅ 响应成功:", {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });

    const { data } = response;
    console.log("Response Data:", data);

    // 根据你的API结构调整
    if (data.status === "success") {
      return data.data;
    } else {
      ElMessage.error(data.message || "请求失败");
      return Promise.reject(new Error(data.message || "请求失败"));
    }
  },
  (error) => {
    console.error("❌ 响应错误详情:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    let message = "请求错误";

    if (error.response) {
      switch (error.response.status) {
        case 405:
          message = `方法不允许: 请检查接口是否支持 ${error.config.method} 方法`;
          break;
        case 400:
          message = "请求参数错误";
          break;
        case 404:
          message = "请求地址不存在";
          break;
        case 500:
          message = "服务器内部错误";
          break;
        default:
          message = `网络错误: ${error.response.status}`;
      }

      // 显示服务器返回的具体错误信息
      if (error.response.data) {
        message += ` - ${JSON.stringify(error.response.data)}`;
      }
    } else if (error.request) {
      message = "网络连接异常，请检查网络";
    } else {
      message = error.message;
    }

    ElMessage.error(message);
    return Promise.reject(error);
  }
);

// 导出请求方法
export const get = (url, params = {}) => {
  return service.get(url, { params });
};

export const post = (url, data = {}) => {
  return service.post(url, data);
};

export const put = (url, data = {}) => {
  return service.put(url, data);
};

export const del = (url, params = {}) => {
  return service.delete(url, { params });
};

export default service;
