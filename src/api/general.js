import { post, get } from "@/api/request";
// 查询数据
export const getWebDatas = (data) => {
  return post("/api/wande/getWebDatas", data);
};
// 留言
export const addInquiry = (data) => {
  return post("/api/wande/addInquiry", data);
};
// 查询留言
export const getInquiries = (data) => {
  return post("/api/wande/getInquiries", data);
};
