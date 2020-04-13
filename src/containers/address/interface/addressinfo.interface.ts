import { RouteComponentProps } from 'react-router-dom';
import { IAddress } from './address.interface';
import { ITransaction, IInterTx } from '@/containers/transaction/interface/transaction.interface';
export interface IAddressInfoStore {
    addrInfo: IAddress,                // 地址详情
    addrBalanceList: IAddrBalance[],    // 地址balance列表
    addrTransList: ITransaction[],        // 地址交易列表
    addrUtxoList: IUtxobyAddresslist[],      // 地址utxo列表
    addrUtxoListCount: number,               // 交易总数
    bindDomainName: string, // 绑定的域名
    addrNep5List: IAddrNep5Tx[], // 地址的nep5交易列表
    addrNep5Count: number, // nep5交易总数
    addrInterList:IInterTx[],
    addrInterListCount:number,
    isPending:boolean,
    getAddressInfo: (address: string) => Promise<boolean>,
    getAddrUtxoList: (address: string, size: number, page: number) => Promise<boolean>,
    getAddressBalance: (address: string) => Promise<boolean>,
    getAddressNep5Asset: (address: string) => Promise<boolean>,
    getAddressTrans: (address: string, size: number, page: number) => Promise<boolean>,
    getBindDomain: (address: string) => Promise<boolean>,
    getNep5Trans: (address: string, size: number, page: number) => Promise<boolean>,
    getAddressInterList:(address:string,page:number,size:number)=>Promise<boolean>
}
export interface IAddrNep5Tx {
    txid: string,
    from: string,
    to: string,
    value: string,
    blocktime: number,
    assetName: string
}
export interface IAddressInfoProps extends RouteComponentProps {
    addressinfo: IAddressInfoStore,
    intl: any
}
export interface IAddrBalance {
    asset: string,
    amount: string
}
export interface IAddrTrans {
    type: string,
    txid: string,
    height: number,
    time: number
}
export interface IBanlance {
    asset: string,
    balance: number,
    name: IAssetName[]
}
export interface IAssetName {
    lang: string,
    name: string
}
export interface INep5OfAddress {
    assetid: string,
    balance: number,
    symbol: string
}
export interface IUtxoByAddress {
    count: number,
    list: IUtxobyAddresslist[]
}
export interface IUtxobyAddresslist {
    txid: string,
    value: string,
    asset: string
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