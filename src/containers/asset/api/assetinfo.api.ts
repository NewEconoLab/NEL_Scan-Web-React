import request from 'utils/request';
/**
 * 获取资产详情
 * @param assetid 资产id
 */
export const getassetinfo = (assetid: string) =>
{
    const opts = {
        method: 'getasset',
        params: [
            assetid
        ],
        baseUrl: 'common'
    }
    return request(opts);
}
/**
 * 获取资产详情
 * @param nep5id 资产id
 */
export const getnep5info = (nep5id: string) =>
{
    const opts = {
        method: 'getnep5asset',
        params: [
            nep5id
        ],
        baseUrl: 'common'
    }
    return request(opts);
}
/**
 * 获取资产排名总数
 * @param assetid 资产id
 */
export const getrankbyassetcount = (assetid: string) =>
{
    const opts = {
        method: 'getrankbyassetcount',
        params: [
            assetid
        ]
    }
    return request(opts);
}
/**
 * 获取资产排名列表
 * @param assetid 资产id
 * @param size 每页条数
 * @param page 当前页码
 */
export const getrankbyasset = (assetid: string, size:number,page:number) =>
{
    const opts = {
        method: 'getrankbyasset',
        params: [
            assetid,
            size,
            page
        ]
    }
    return request(opts);
}

/**
 * 获取资产交易总数
 * @param type 资产类型
 * @param nep5id nep5id
 */
export const getnep5count = (type:string,nep5id: string) =>
{
    const opts = {
        method: 'getnep5count',
        params: [
            type,
            nep5id
        ],
        baseUrl: 'common'
    }
    return request(opts);
}

/**
 * 获取nep5资产交易列表
 * @param nep5id 资产id
 * @param size 每页条数
 * @param page 当前页码
 */
export const getnep5transfersbyasset = (nep5id: string, size:number,page:number) =>
{
    const opts = {
        method: 'getnep5transfersbyasset',
        params: [
            nep5id,
            size,
            page
        ],
        baseUrl: 'common'
    }
    return request(opts);
}