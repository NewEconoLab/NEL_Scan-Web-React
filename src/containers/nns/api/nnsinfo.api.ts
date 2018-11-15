import request from 'utils/request';

/**
 * 获取域名信息
 * @param domain 域名 
 */
export const getauctionres = (domain:string) => {
  const opts = {
    method:'getauctionres',
    params:[
      domain
    ]
  }
  return request(opts);
}

/**
 * 获取domain加价排行
 * @param id 域名id
 * @param page 当前页码
 * @param size 每页条数
 */
export const getauctioninfoRank = (id:string,page:number,size:number) => {
  const opts = {
    method:'getauctioninfoRank',
    params:[
      id,
      page,
      size
    ]
  }
  return request(opts);
}

/**
 * 获取domain竞拍加价详情
 * @param id 域名id
 * @param page 当前页码
 * @param size 每页条数
 */
export const getauctioninfoTx = (id:string,page:number,size:number) => {
  const opts = {
    method:'getauctioninfoTx',
    params:[
      id,
      page,
      size
    ]
  }
  return request(opts);
}