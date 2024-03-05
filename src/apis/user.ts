/*
 * @Author: yym
 * @Date: 2024-01-26 01:29:24
 * @LastEditTime: 2024-03-05 11:33:45
 */
import HttpClient from '../utils/axios';

import type { ListParams, ListModel, dataAny } from './model/userModel';

export const getList = (params: ListParams) => {
  return HttpClient.post<ListModel>('/list', { params });
};

// saas登录
export const goLogin = (data: dataAny) => HttpClient.post('/api/saas/admin/pre-login', data);

// 楼宇下拉
export const buildingTypeSelect = () => HttpClient.get('/admin/select/buildingTypeSelect');

// 区域分类下拉
export const areaSelect = () => HttpClient.get('/admin/select/areaSelect');

// 部门下拉
export const departmentSelect = () => HttpClient.get('/admin/select/departmentSelect');

// 绑定状态下拉
export const bindStatusSelect = () => HttpClient.get('/admin/select/bindStatusSelect');

// 设备状态下拉
// export const switchStatusSelect = () =>
// 	HttpClient.get("/admin/select/switchStatusSelect"); // 合闸 拉闸
export const switchStatusSelect = () => HttpClient.get('/admin/select/onlineStatusSelect'); // 设备在离线状态

// 设备类型
export const meterTypeSelect = () => HttpClient.get('/admin/select/meterTypeSelect');

// 建筑下拉
export const buildingSelect = () => HttpClient.get('/admin/select/buildingSelect');

// 分享耗能
export const useTypeSelect = () => HttpClient.get('/admin/select/useTypeSelect');

// 园区下拉
export const getCommunitySelect = () => HttpClient.get('/admin/select/getCommunitySelect');

// 园区切换，重新获取token
export const reloadLogin = (index_tab_id: dataAny) =>
  HttpClient.post('/admin/reloadLogin', {
    index_tab_id,
  });

// 能耗统计获取设备详情
export const getDeviceDetail = (params: dataAny) =>
  HttpClient.get('/admin/log/getUseMeterDetail', {
    params,
  });

// 分校区年平均耗能柱状图
export const getEleAverageUse = (params: dataAny) =>
  HttpClient.get('/admin/index/eleAverageUse', {
    params,
  });

// 各校区分首页年平均耗水柱状图
export const getWaterAverageUse = (params: dataAny) =>
  HttpClient.get('/admin/index/waterAverageUse', {
    params,
  });

// 水 电 气折线图统计
export const getCommunityUseList = (params: dataAny) =>
  HttpClient.get('/admin/log/getCommunityUseList', {
    params,
  });

// 部门 楼宇 区域饼图数据统计
export const getPieData = (params: dataAny) => HttpClient.get('/admin/index/usePercentByTime', { params });

// 验证token
export const verifyToken = (token: dataAny) =>
  HttpClient.post('/admin/verifyToken', {
    token,
  });

// 超级平台 接口

export const getProductList = (params: dataAny) => HttpClient.get('/api/super-admin/product/module/list', { params });
