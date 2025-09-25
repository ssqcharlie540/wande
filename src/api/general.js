import { post, get } from "@/api/request";
export const getWebDatas = (data) => {
  return post("/api/wande/getWebDatas", data);
};
