import request from 'utils/request';

/**
 * 获取地址详情
 * @param addr 地址
 */
export const getaddrinfo = (addr: string) =>
{
    const opts = {
        method: 'getaddr',
        params: [
            addr
        ],
        baseUrl: 'common'
    }
    return request(opts);
}
/**
 * 根据地址获取资产列表
 * @param addr 当前地址
 */
export const getaddrbalance = (addr: string) =>
{
    const opts = {
        method: 'getbalance',
        params: [
            addr
        ],
        baseUrl: 'common'
    }
    return request(opts);
}
/**
 * 获取nep5资产
 * @param nep5 nep5资产名
 */
export const getaddrnep5asset = (nep5: string) =>
{
    const opts = {
        method: 'getallnep5assetofaddress',
        params: [
            nep5,
            1
        ],
        baseUrl: 'common'
    }
    return request(opts);
}

/**
 * 根据地址获取交易列表
 * @param addr 当前地址
 * @param size 每页条数
 * @param page 当前页码
 */
export const getaddrtxlist = (addr: string, size: number, page: number) =>
{
    const opts = {
        method: 'getaddresstxs',
        params: [
            addr,
            size,
            page
        ]
    }
    return request(opts);
}
/**
 * 根据地址获取utxo列表
 * @param addr 当前地址
 * @param size 每页条数
 * @param page 当前页码
 */
export const getaddrutxolist = (addr: string, page: number, size: number) =>
{
    const opts = {
        method: 'getutxolistbyaddress',
        params: [
            addr,
            page,
            size
        ]
    }
    return request(opts);
}
/**
 * 获取绑定的域名
 * @param addr 当前地址
 */
export const getBindDomain = (addr: string) =>
{
    const opts = {
        method: 'getMappingDomain',
        params: [
            addr,
        ]
    }
    return request(opts);
}
/**
 * 根据地址获取nep5交易列表
 * @param addr 当前地址
 * @param size 每页条数
 * @param page 当前页码
 */
export const getaddrnep5txlist = (addr: string, size: number, page: number) =>
{
    const opts = {
        method: 'getNep5TxlistByAddress',
        params: [
            addr,
            size,
            page
        ]
    }
    return request(opts);
}