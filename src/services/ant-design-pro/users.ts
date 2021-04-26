// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取当前的所有可以看到的用户 GET /api/currentUser */
export async function getUserList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.UserList>('/api/user/userlist', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function addUser(body, options?: { [key: string]: any }) {
  return request<API.addResult>('/api/user/adduser', {
    method: 'post',
    data: body,
    ...(options || {}),
  });
}

export async function checkUserName(params: string, options?: { [key: string]: any }) {
  return request<API.checkUserNameResult>('/api/user/checkUserName', {
    method: 'get',
    params: {
      username: params,
    },
    ...(options || {}),
  });
}

export async function deleteUser(params: number, options?: { [key: string]: any }) {
  return request<API.checkUserNameResult>('/api/user/deleteuser', {
    method: 'delete',
    params: {
      _id: params,
    },
    ...(options || {}),
  });
}

/**上传接口  */
export async function uploadAvatar(body, options?: { [key: string]: any }) {
  console.log(`body`, body);
  return request<API.LoginResult>('/api/user/upload', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
