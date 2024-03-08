/*
 * @Author: yym
 * @Date: 2024-01-26 01:29:24
 * @LastEditTime: 2024-03-08 10:44:21
 */
import HttpClient from '@/utils/axios';

import type { ListParams, ListModel, dataAny } from './model/userModel';

export const getList = (params: ListParams) => {
  return HttpClient.post<ListModel>('/list', { params });
};

// saas登录
export const goLogin = (data: dataAny) => HttpClient.post('/api/saas/admin/pre-login', data);

// 青易冲路由
export const getListAll = (data: ListParams) => {
  // return HttpClient.get<ListModel>('/v1/admin/website/get-all', { params });
  return HttpClient.post<ListModel>('/v1/admin/saas/get-tenant', data);
};
// 验证token
export const verifyToken = (token: dataAny) =>
  HttpClient.post('/admin/verifyToken', {
    token,
  });

// 超级平台 saas接口
export const getProductList = (data: dataAny) => HttpClient.post('/api/saas/admin/info', data);
