import { RouteComponentProps } from 'react-router-dom';
import { IAsset, INep5Asset } from './asset.interface';
export interface IAssetInfoStore
{
    assetInfo: IAsset | null,
    nep5Info:INep5Asset | null;
    balanceRankCount: number,
    balanceRankList: IBalanceRank[],
    nep5TransList:INep5TransList[],
    nep5TransCount:number,
    getAssetInfo: (assetid: string) => Promise<boolean>,
    getNep5Info:(assetid: string) => Promise<boolean>,
    getBalanceRankCount: (assetid: string) => Promise<boolean>,
    getBalanceRankList: (assetid: string, size: number, page: number) => Promise<boolean>,
    getNep5TransCount:(typs:string,nep5id:string) => Promise<boolean>,
    getNep5Transaction: (nep5id: string,page: number,size: number,) => Promise<boolean>
}
export interface IAssetInfoProps extends RouteComponentProps
{
    assetinfo: IAssetInfoStore,
    intl: any
}
export interface IBalanceRank
{
    rank: number,
    addr: string,
    balance: number
}
export interface IBalanceRankList
{
    addr: string,
    asset: string,
    balance: number
}
export interface INep5TransList{
    // asset:string,
    blockindex:number,
    from:string,
    // n:number,
    to:string,
    txid:string,
    value:string,
    blocktime:number
}