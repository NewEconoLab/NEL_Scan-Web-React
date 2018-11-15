import request from 'utils/request';

/**
 * 获取所有asset
 */
export const getallasset = () =>
{
    const opts = {
        method: 'getallasset',
        params: [],
        baseUrl: 'common'
    }
    return request(opts);
}
/**
 * 获取所有nep5
 */
export const getallnep5 = () =>
{
    const opts = {
        method: 'getallnep5asset',
        params: [],
        baseUrl: 'common'
    }
    return request(opts);
}


