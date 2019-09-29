import { RouteComponentProps } from 'react-router-dom';
import { INep5Asset } from '@/containers/asset/interface/asset.interface';
export interface ITransactionsStore {
    transList: ITransaction[],
    transListCount: number,
    tranInfo: ITransInfo | null,
    nep5Trans: INep5Trans[],
    nep5Info: INep5Asset | null,
    nep5TxList: INep5List[],
    nep5TxListCount: number,
    poolCheck: IPoolCheck | null,
    getTransList: (page: number, size: number, type: string) => Promise<boolean>,
    getTransInfo: (txid: string) => Promise<boolean>,
    getNep5Transbytxid: (txid: string) => Promise<boolean>,
    getNep5Info: (nep5: string) => Promise<boolean>,
    getNep5List: (page: number, size: number) => Promise<boolean>,
    getPoolTypeAndCount: (txid: string) => Promise<boolean>
}
export interface ITransactionsProps extends RouteComponentProps {
    intl: any,
    transaction: ITransactionsStore
}

export interface IPoolCheck {
    isExistPool: boolean,
    memPoolCount: number
}

export interface INep5List {
    txid: string,
    from: string,
    to: string,
    value: string,
    blocktime: number,
    assetName: string
}

export interface ITransactionList {
    count: number,
    list: ITransaction[]
}
export interface ITransaction {
    blockindex: number,
    size: number,
    txid: string,
    type: string
}
export interface ITransInfoState {
    vinList: ITransInputOutput[],
    outList: ITransInputOutput[]
}
export interface ITransInputOutput {
    address: string,
    value: string
}
export interface ITransVinVout {
    address: string,
    asset: string,
    value: number
}
export interface ITransInfo {
    txid: string,
    sender: string,
    size: number,
    type: string,
    sys_fee: string,
    net_fee: string,
    blockindex: number,
    blocktime: number,
    vin: ITransVinVout[],
    vout: ITransVinVout[]
}
export interface INep5Trans {
    asset: string,
    from: string,
    to: string,
    value: string
}