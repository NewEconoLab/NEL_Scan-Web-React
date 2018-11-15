import request from 'utils/request';

/**
 * 获取地址总数
 */
export const getaddrcount = () => {
  const opts = {
    method:'getaddrcount',
    params:[],
    baseUrl:'common'
  }
  return request(opts);
}
/**
 * 获取地址列表
 * @param size 每页条数
 * @param page 当前页码
 */
export const getaddrlist = (size:number,page:number) => {
  const opts = {
    method:'getaddrs',
    params:[
      size,
      page
    ],
    baseUrl:'common'
  }
  return request(opts);
}