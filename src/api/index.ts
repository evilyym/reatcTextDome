import request from "@/request/index.ts";

//南苑
export const getInfo = async (params) =>
  request.get("/api/wap/user/get_user_login_info/", { params });

//获取token
export const getInfoApi = async (params) =>
  request.get("api/wap/get-user", { params });

// 获取列表
export const getRecordsList = async (params) =>
  request.get("/api/wap/records/list", { params });

export const getRecordsDetail = async (params) =>
  request.get("/api/wap/records/detail", { params });

// 操作-撤销审核
export const setCancel = async (data) =>
  request.post("/api/wap/records/cancel", data);

  // 操作 通过/拒绝
export const setAudit = async (data) =>
  request.post("/api/wap/records/audit", data);

// 报备
export const setReport = async (data) =>
  request.post("/api/wap/records/report", data);
// 确认
export const setConfirm = async (data) =>
  request.post("/api/wap/records/confirm", data);

// 服务列表
export const getActivityList = async (params) =>
  request.get("/api/wap/activity/list", { params });

// 服务详情
export const getActivityDetail = async (params) =>
  request.get("/api/wap/activity/detail", { params });
// 新增
export const addActivity = async (data) =>
  request.post("/api/wap/activity/add", data);

// 文件上传
export const upload = async (data) => {
  let config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  return request.post("/api/common/upload", data,config);
};
