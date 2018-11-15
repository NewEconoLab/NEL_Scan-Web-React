import request from 'utils/request';

/**
 * 获取区块高度
 */
export const getblockcount =  () => {
  const opts = {
   method:'getblockcount',
   params:[],
   baseUrl:'common'
  }
  return request(opts);
}

/**
 * 获取区块列表
 * @param size 记录条数
 * @param page 当前页
 */
export const getblocks = (size:number,page:number) => {
  const opts = {
    method:'getblocks',
    params:[
      size,
      page
    ],
    baseUrl:'common'
  }
  return request(opts);
}

/**
 * 获取区块详情
 * @param index 区块高度
 */
export const getblock = (index:number) => {
  const opts = {
    method:'getblock',
    params:[
      index
    ],
    baseUrl:'common'
  }
  return request(opts);
}