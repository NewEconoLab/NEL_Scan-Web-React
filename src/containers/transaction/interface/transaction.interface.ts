import { RouteComponentProps } from 'react-router-dom';
import { INep5Asset } from '@/containers/asset/interface/asset.interface';
export interface ITransactionsStore {
    transList: ITransactionList| null,
    tranInfo:ITransInfo,
    nep5Trans:INep5Trans[],
    nep5Info:INep5Asset|null,
    getTransList: ( page: number,size: number, type: string) => Promise<boolean>,
    getTransInfo:(txid:string) => Promise<boolean>,
    getNep5Transbytxid:(txid:string) => Promise<boolean>,
    getNep5Info:(nep5:string) => Promise<boolean>
}
export interface ITransactionsProps extends RouteComponentProps {
    intl: any,
    transaction: ITransactionsStore
}

export interface ITransactionList {
    count:number,
    list:ITransaction[]
}
export interface ITransaction {
    blockindex:number,
    size:number,
    txid:string,
    type:string
}
export interface ITransInfoState{
    vinList:ITransInputOutput[],
    outList:ITransInputOutput[]
}
export interface ITransInputOutput{
    address:string,
    value:string
}
export interface ITransVinVout{
    address:string,
    asset:string,
    value:number
}
export interface ITransInfo {
    txid:string,
    size:number,
    type:string,
    sys_fee:string,
    net_fee:string,
    blockindex:number,
    blocktime:number,
    vin:ITransVinVout[],
    vout:ITransVinVout[]
}
export interface INep5Trans{
    asset:string,
    from:string,
    to:string,
    value:string
}