// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取当前的所有可以看到的用户 GET /api/currentUser */
export async function getToolList(options?: { [key: string]: any }) {
  return request('/api/toolbox/toollist', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getAfterArticle(body: any, options?: { [key: string]: any }) {
  return request('/api/toolbox/wyc', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function queryKeywordsRank(body: any, options?: { [key: string]: any }) {
  return request('/api/toolbox/baidupc', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
