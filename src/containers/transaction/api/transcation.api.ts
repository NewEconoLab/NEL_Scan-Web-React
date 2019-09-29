import request from 'utils/request';
/**
 * 获取该交易类型的总数，默认获取所有的
 * @param type 交易类型
 */
// export const gettxcount = (type:string) => {
//   const opts = {
//     method:'gettxcount',
//     params:[
//       type
//     ],
//     baseUrl:'common'
//   }
//   return request(opts);
// }

/**
 * 根据交易类型获取交易列表，默认获取全部
 * @param size 每页显示条数
 * @param page 当前页码
 * @param type 交易类型
 */
export const gettransactionlist = (page: number, size: number, type: string) => {
  const opts = {
    method: 'gettransactionlist',
    params: [
      page,
      size,
      type
    ]
  }
  return request(opts);
}
/**
 * 获取nep5交易类型的列表
 * @param page 当前页码
 * @param size 每页显示条数
 */
export const getnep5txlist = (page: number, size: number) => {
  const opts = {
    method: 'getNep5Txlist',
    params: [
      page,
      size
    ]
  }
  return request(opts);
}
/**
 * 获取交易详情
 * @param txid 交易id
 */
export const gettraninfo = (txid: string) => {
  const opts = {
    method: 'getutxoinfo',
    params: [
      txid
    ]
  }
  return request(opts);
}
/**
 * 根据txid获取nep5
 * @param txid 交易id
 */
export const getnep5transferbytxid = (txid: string) => {
  const opts = {
    method: 'getnep5transferbytxid',
    params: [
      txid
    ],
    baseUrl: 'common'
  }
  return request(opts);
}
/**
 * 根据nep5资产id获取资产详情
 * @param nep5 
 */
export const getnep5asset = (nep5: string) => {
  const opts = {
    method: 'getnep5asset',
    params: [
      nep5
    ],
    baseUrl: 'common'
  }
  return request(opts);
}
/**
 * 查询交易池的状态及总数
 */
export const getrawmempoolcount = (txid: string) => {
  const opts = {
    method: 'getTxidFromMemPool',
    params: [
      txid
    ],
    baseUrl: 'common'
  }
  return request(opts);
}

export const getrawtransaction = (txid: string) => {
  return request({
    method: "getrawtransaction",
    params: [ txid ],
    baseUrl: 'common'
  })
}