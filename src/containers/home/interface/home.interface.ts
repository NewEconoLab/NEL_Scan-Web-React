import { RouteComponentProps } from 'react-router-dom';
export interface IHomeStore {
    blockCount: string,
    txCount: string,
    addrCount: string,
    blockList: IBlock[],
    transList: ITransList[],
    searchAssetList:ISearchAsset[],
    statisInfo:IStatisInfo|null,
    txHistoryList:ITxHistoryList,
    getBlockHeight: () => Promise<boolean>,
    getTxCount: (type: string) => Promise<boolean>,
    getAddrCount: () => Promise<boolean>,
    getBlockList: (size: number, page: number) => Promise<boolean>,
    getTransList: (size: number, page: number, type: string) => Promise<boolean>,
    searchAsset:(str:string)=>Promise<boolean>,
    getStatisData:()=>Promise<boolean>
    getHistoryData:()=>Promise<boolean>
}
export interface IHomeProps extends RouteComponentProps {
    intl: any,
    home: IHomeStore
}
export interface ITxHistoryList{
    count:[],
    time:[]
}
export interface IStatisInfo {
    gasPrice:string,
    neoPrice:string,
    activeAddrCount:string,
    gasAddrCount:string,
    neoAddrCount:string,
    txCount:string
}
export interface IBlock {
    index: number,
    size: number,
    time: number,
    txcount: number
}

export interface ITransList {
    type: string,
    txid: string,
    blockindex: string,
    size: number
}
export interface ISearchAsset{
    assetid:string,
    name:string,
    symbol:string
}
