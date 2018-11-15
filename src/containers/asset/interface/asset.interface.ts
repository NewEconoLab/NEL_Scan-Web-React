import { RouteComponentProps } from 'react-router-dom';
export interface IAsset
{
    type: string,
    name: IAssetName[],
    amount: number,
    precision: number,  // decimals
    available: number,  // totalsupply
    owner: string,
    admin: string,
    id: string      // assetid
}
export interface IAssetName
{
    lang: string,
    name: string
}
export interface INep5Asset
{
    assetid: string,
    totalsupply: string,
    name: string,
    symbol: string,
    decimals: number
}
export interface IAssetStore {
    assetList:IAssetList[],
    nep5List:IAssetList[],
    getAssetList:() => Promise<boolean>,
    getNep5List:() => Promise<boolean>
}
export interface IAssetList {
    asset:string,
    id:string,
    type:string,
    available:string,
    precision:number
}
export interface IAssetProps extends RouteComponentProps{
    asset:IAssetStore,
    intl:any
}