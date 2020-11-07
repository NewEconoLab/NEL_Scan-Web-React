import request from 'utils/request';

/**
 * 获取合约列表
 * @param page 
 * @param pageSize 
 */
export const getcontractlist = (page: number, pageSize: number) => {
    const opts = {
        method: 'getContractList',
        params: [page, pageSize],
    }
    return request(opts);
}
/**
 * 获取合约详情
 * @param hash 合约哈希
 */
export const getcontractinfo = (hash: string) => {
    const opts = {
        method: 'getContractInfo',
        params: [hash],
    }
    return request(opts);
}
/**
 * 获取所有的调用交易
 * @param hash 合约哈希
 * @param page 当前页码
 * @param size 每页条数
 */
export const getContractCallTx = (hash: string, page: number, size: number) => {
    const opts = {
        method: 'getContractCallTx',
        params: [hash, page, size],
    }
    return request(opts);
}
/**
 * 获取所有nep5的调用交易
 * @param addr 合约地址
 * @param page 当前页码
 * @param size 每页条数
 */
export const getcontractnep5tx = (addr: string, page: number, size: number) => {
    const opts = {
        method: 'getContractNep5Tx',
        params: [addr, page, size],
    }
    return request(opts);
}
/**
 * 获取当前合约的资产
 * @param addr 合约地址
 */
export const getBalance = (addr: string) => {
    const opts = {
        method: 'getbalance',
        params: [addr],
        baseUrl: 'common'
    }
    return request(opts);
}
/**
 * 获取当前合约nep5的资产
 * @param addr 合约地址
 */
export const getnep5Balance = (addr: string) => {
    const opts = {
        method: 'getallnep5assetofaddress',
        params: [addr, 1],
        baseUrl: 'common'
    }
    return request(opts);
}
/**
 * 合约详情处查询内部交易
 * @param hash 合约哈希
 * @param page 分页索引
 * @param size 分页大小
 */
export const getContractInterList = (hash: string, page: number, size: number) => {
    const opts = {
        method: 'getInnerTxAtContractDetail',
        params: [hash, page, size]
    }
    return request(opts);
}
/**
 * 查询manifest
 * @param hash 合约哈希
 */
export const getContractManifest = (hash: string) => {
    const opts = {
        method: 'getContractManifest',
        params: [hash]
    }
    return request(opts);
}