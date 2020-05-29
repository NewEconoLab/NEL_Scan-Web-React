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
 * 获取该交易类型的总数，默认获取所有的
 * @param type 交易类型
 */
export const gettxcount = (type:string) => {
  const opts = {
    method:'gettxcount',
    params:[
      type
    ],
    baseUrl:'common'
  }
  return request(opts);
}
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
 * 获取交易详情
 * @param size 每页条数
 * @param page 当前页码
 * @param type 交易类型
 */
export const getrawtransactions = (size:number,page:number,type:string) => {
  const opts = {
    method:'getrawtransactions',
    params:[
      size,
      page,
      type
    ],
    baseUrl:'common'
  } 
  return request(opts);
}
/**
 * 查询资产
 * @param str 输入的内容
 */
export const searchSomething = (str:string)=>{
  const opts = {
    method:'fuzzysearchasset',
    params:[
      str
    ]
  }
  return request(opts)
}
/**
 * 首页上部分获取信息
 */
export const getScanStatistic = ()=>{
  const opts = {
    method:'getScanStatistic',
    params:[]
  }
  return request(opts)
}
/**
 * 首页上部分交易统计
 */
export const getScanTxCountHist = ()=>{
  const opts = {
    method:'getScanTxCountHist',
    params:[]
  }
  return request(opts)
}