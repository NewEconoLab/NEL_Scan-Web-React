import request from 'utils/request';

/**
 * 获取统计总数
 */
export const getstatistics = () => {
  const opts = {
    method:'getstatistics',
    params:[]
  }
  return request(opts);
}
/**
 * 获取正在竞拍的列表
 * @param page 当前页码
 * @param size 每页条数
 */
export const getauctingdomain = (page:number,size:number) => {
  const opts = {
    method:'getauctingdomain',
    params:[
      page,
      size
    ]
  }
  return request(opts);
}
/**
 * 根据金额排序获取正在竞拍的列表
 * @param page 当前页码
 * @param size 每页条数
 */
export const getauctingdomainbymaxprice = (page:number,size:number) => {
  const opts = {
    method:'getauctingdomainbymaxprice',
    params:[
      page,
      size
    ]
  }
  return request(opts);
}

/**
 * 获取域名价值排行列表
 * @param page 当前页码
 * @param size 每页条数
 */
export const getaucteddomain = (page:number,size:number) => {
  const opts = {
    method:'getaucteddomain',
    params:[
      page,
      size
    ]
  }
  return request(opts);
}
/**
 * 查询域名信息
 * @param domain 域名 
 */
export const searchbydomain = (domain:string) => {
  const opts = {
    method:'searchbydomain',
    params:[
      domain
    ]
  }
  return request(opts);
}
/**
 * 获取域名的出售或成交列表
 * @param order 排序条件time,price
 * @param type 排序方式，high升序，low降序
 * @param page 当前页码
 * @param size 每页条数
 * @param table 查询不同表格，默认为已上架，'nid1'为已上架，'nid2为已成交，'nid3'为已下架
 */
export const getsellingdomain = (order:string,type:string,page:number,size:number,table?:string) => {
  const opts = {
    method:'getNNSFixedSellingList',
    params:[
      order,
      type,
      page,
      size,
      table
    ]
  }
  return request(opts);
}

