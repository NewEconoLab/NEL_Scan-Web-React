import { RouteComponentProps } from 'react-router-dom';
import { IAddress } from './address.interface';
export interface IAddressInfoStore
{
    addrInfo: IAddress,                // 地址详情
    addrBalanceList:IAddrBalance[],    // 地址balance列表
    addrTransList:IAddrTrans[],        // 地址交易列表
    addrUtxoList: IUtxoByAddress,      // 地址utxo列表
    getAddressInfo:(address:string) => Promise<boolean>,
    getAddrUtxoList:(address:string,size:number,page:number) => Promise<boolean>,
    getAddressBalance:(address:string) => Promise<boolean>,
    getAddressNep5Asset:(address:string) => Promise<boolean>,
    getAddressTrans:(address:string,size:number,page:number) => Promise<boolean>
}
export interface IAddressInfoProps extends RouteComponentProps {
    addressinfo:IAddressInfoStore,
    intl:any
}
export interface IAddrBalance {
    asset:string,
    amount:string
}
export interface IAddrTrans {
    type:string,
    txid:string,
    height:number,
    time:number
}
export interface IBanlance
{
    asset: string,
    balance: number,
    name: IAssetName[]
}
export interface IAssetName
{
    lang: string,
    name: string
}
export interface INep5OfAddress
{
    assetid: string,
    balance: number,
    symbol: string
}
export interface IUtxoByAddress {
    count:number,
    list:IUtxobyAddresslist[]
}
export interface IUtxobyAddresslist
{
    txid:string,
    value:string,
    asset:string
}
export interface ITransOfAddress {
    addr: string,
    txid: string,
    blockindex: number,
    blocktime: {
        $date: number
    },
    type: string,
    vout: [
        {
            n: number,
            asset: string,
            value: number,
            address: string
        }
    ],
    vin: [
        {
            n: number,
            asset: string,
            value: number,
            address: string
        }
    ]
}