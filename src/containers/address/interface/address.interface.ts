import { RouteComponentProps } from 'react-router-dom';
export interface IAddressStore
{
    addrCount: string,   // 地址总数
    addrList: IAddressList[],  // 地址列表
    getAddrCount: () => Promise<boolean>,
    getAddressList: (size: number, page: number) => Promise<boolean>,
}
export interface IAddressProps extends RouteComponentProps
{
    intl: any,
    address: IAddressStore
}
export interface IAddressList
{
    addr: string,
    firstuse: number,
    lastuse: number,
    txcount: number
}
export interface IAddress
{
    addr: string,
    firstuse: IAddressTime,
    lastuse: IAddressTime,
    txcount: number
}
export interface IAddressTime
{
    txid: string,
    blockindex: number,
    blocktime: { $date: number }
}