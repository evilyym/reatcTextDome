import request from "@/request/index.ts";

//获取用户信息
export const getInfo = async (params) =>
  request.get("/api/wap/user/get_user_login_info/", { params });

//获取巡检类型
export const getMaintenanceType = async (params) =>
  request.get("/api/wap/check_record/get_maintenance_type/", { params });

//获取巡检类型提交步骤
export const getTypeSubmitSet = async (data) =>
  request.post("/api/wap/check_record/get_type_submit_set/", data);

//创建提交记录
export const createMaintenanceType = async (data) =>
  request.post("/api/wap/check_record/create_check_record/", data);

//提交记录列表
export const getCheckRecordList = async (data) =>
  request.post("/api/wap/check_record/get_check_record_list/", data);

//提交记录详情
export const getCheckRecordDetail = async (data) =>
  request.post("/api/wap/check_record/get_check_record_detail/", data);

// 文件上传
// file 文件 real_address 地址
export const upload = async (data) => {
  let config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  return request.post("/api/wap/check_record/upload_image/", data,config);
};
