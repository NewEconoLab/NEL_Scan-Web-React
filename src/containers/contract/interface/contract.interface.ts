import { RouteComponentProps } from 'react-router-dom';
import { IInterTx } from '@/containers/transaction/interface/transaction.interface';
export interface IContractStore {
    contractHash: string,
    contractAddr: string,
    conInfo: IContractInfo | null,
    balanceList: IBalanceList[],
    nep5BalanceList: IBalanceList[],
    allTxCount: number,
    allTxList: IContractAll[],
    nep5TxCount: number,
    nep5TxList: IContractNep5[],
    contInterList:IInterTx[],
    contInterListCount:number,
    isPending:boolean,
    getContractData: () => Promise<boolean>,
    getAllContrant: (page: number, size: number) => Promise<boolean>,
    getNep5Contrant: (page: number, size: number) => Promise<boolean>,
    getbalance: () => Promise<boolean>,
    getNep5Balance: () => Promise<boolean>,
    getContractInterList:(page: number, size: number)=> Promise<boolean>,
}
export interface IContractProps extends RouteComponentProps {
    contract: IContractStore,
    intl: any
}
export interface IContractInfo {
    name: string,
    hash: string,
    isNep5Asset: boolean,
    assetName: string,
    assetSymbol: string,
    author: string,
    email: string,
    createDate: number,
    version: number,
    description: string,
    txCount: number,
    txCount24h: number,
    usrCount: number,
    usrCount24h: number
}
export interface IContractAll {
    txid: string,
    time: string,
    from: string,
    to: string,
    value: string,
    net_fee: string
}

export interface IContractNep5 {
    txid: string,
    time: number,
    from: string,
    to: string,
    value: string,
    assetHash: string,
    assetName: string,
    net_fee: string,
}

export interface IBalanceInfo {
    balance: number;
    asset: string;
    name: INameList[];
    names: string;
    type: string;
}
export interface INameList {
    lang: string,
    name: string
}
export interface INep5Balance {
    assetid: string;
    symbol: string;
    balance: number;
}
export interface IBalanceList {
    assetName: string,
    balance: number
}