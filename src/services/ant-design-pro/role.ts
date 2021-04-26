import { request } from 'umi';

//获取角色选择列表
export async function getRoleOption(options?: { [key: string]: any }) {
  return request<API.addResult>('/api/role/getroleoption', {
    method: 'get',
    ...(options || {}),
  });
}
