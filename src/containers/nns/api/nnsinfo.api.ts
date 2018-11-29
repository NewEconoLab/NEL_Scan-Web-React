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
/**
 * 获取域名流转历史
 * @param domain 当前域名
 * @param page 当前页面
 * @param size 每页条数
 */
export const getTransinfo = (domain:string,page:number,size:number) => {
  const opts = {
    method:'getDomainTransferHist',
    params:[
      domain,
      page,
      size
    ]
  }
  return request(opts);
}