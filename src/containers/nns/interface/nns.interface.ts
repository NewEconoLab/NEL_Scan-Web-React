import { RouteComponentProps } from 'react-router-dom';
import { IAuctionInfo, IAuctionedInfo } from '@/containers/nns/interface/nnsinfo.interface';
export interface INNSStore
{
    nnsTotal: INNSTotal,
    nnsAuctingCount:number
    nnsAuctingList: INNSAuctingTable[],
    nnsAuctedCount:number
    nnsAuctionedList: INNSAuctionedTable[],
    orderBy: string,
    searchCanAuction:IAuctionInfo|null,
    searchEndAuction:IAuctionedInfo|null,
    getStatistic: () => Promise<boolean>,
    getAuctingDomain: (page: number, size: number) => Promise<boolean>,
    getAuctingDomainbyPrice: (page: number, size: number) => Promise<boolean>,
    getAuctedDomain: (page: number, size: number) => Promise<boolean>,
    searchDomainInfo:(domain:string) => Promise<boolean>
}
export interface INNSProps extends RouteComponentProps
{
    intl: any,
    nns: INNSStore
}
export interface INNSTotal
{
    auctingDomainCount: number,
    bonus: number,
    profit: number,
    usedDomainCount: number
}
export interface INNSAuctingTable
{    
    fulldomain: string,
    txid: string,
    maxPrice: string,
    maxBuyer: string,
    auctionState: string,
}
// export interface INNSAucting
// {
//     count: number,
//     list: INNSAuctingList[]
// }
export interface INNSAuctingList
{
    auctionState: string,
    fulldomain: string,
    lastTime: {
        txid: string
    },
    maxBuyer: string,
    maxPrice: string
}
export interface INNSAuctionedTable
{
    range: string,
    fulldomain: string,
    txid: string,    
    maxPrice: string,
    maxBuyer: string,
    ttl: number
}
// export interface INNSAuctioned
// {
//     count: number,
//     list: INNSAuctionedList[]
// }
export interface INNSAuctionedList
{
    fulldomain: string,
    lastTime: {
        txid: string
    },
    maxBuyer: string,
    maxPrice: string,
    range: string,
    startTime: {
        blocktime: number
    },
    ttl: number
}
