import { INNSStore, INNSTotal, INNSAuctingTable, INNSAuctionedTable, INNSAuctingList, INNSAuctionedList, INNSSellingList } from "../interface/nns.interface";
import { IAuctionInfo, IAuctionedInfo } from '@/containers/nns/interface/nnsinfo.interface';
import { observable, action } from "mobx";
import * as Api from '../api/nns.api';

class NNS implements INNSStore
{
    @observable public nnsTotal: INNSTotal;
    @observable public nnsAuctingCount:number = 0;
    @observable public nnsAuctingList: INNSAuctingTable[];
    @observable public nnsAuctedCount:number = 0;
    @observable public nnsAuctionedList: INNSAuctionedTable[];
    @observable public orderBy: string = '';
    @observable public searchCanAuction:IAuctionInfo|null = null;
    @observable public searchEndAuction:IAuctionedInfo|null = null;
    @observable public listingOrderBy:string = '';
    @observable public nnsSellingCount:number = 0;
    @observable public nnsSellingList: INNSSellingList[];
    @observable public SoldOrderBy:string = '';
    @observable public nnsSoldCount:number = 0;
    @observable public nnsSoldList: INNSSellingList[];
    /**
     * 获取统计总数
     */
    @action public async getStatistic()
    {
        let result: any = null;
        try
        {
            result = await Api.getstatistics();
        } catch (error)
        {
            return false;
        }
        this.nnsTotal = result ? result[0] : [];
        return true;
    }
    /**
     * 获取正在竞拍的列表
     * @param page 当前页码
     * @param size 每页条数
     */
    @action public async getAuctingDomain(page: number, size: number)
    {
        let result: any = null;
        try
        {
            result = await Api.getauctingdomain(page, size);
        } catch (error)
        {
            this.nnsAuctingCount = 0;
            return false;
        }
        const arr: INNSAuctingList[] = result ? result[0].list : [];
        this.nnsAuctingCount = result ? result[0].count : 0;        
        if (arr && arr.length !== 0)
        {            
            this.nnsAuctingList = arr.map((key) =>
            {
                const newObj = {
                    fulldomain: key.fulldomain,
                    txid: key.lastTime.txid,
                    maxPrice: key.maxPrice,
                    maxBuyer: key.maxBuyer,
                    auctionState: key.auctionState,
                }
                return newObj;
            })
        }        
        return true;
    }
    /**
     * 根据金额排序获取正在竞拍的列表
     * @param page 当前页码
     * @param size 每页条数
     */
    @action public async getAuctingDomainbyPrice(page: number, size: number)
    {
        let result: any = null;
        try
        {
            result = await Api.getauctingdomainbymaxprice(page, size);
        } catch (error)
        {
            return false;
        }
        const arr: INNSAuctingList[] = result ? result[0].list : [];
        this.nnsAuctingCount = result ? result[0].count : 0;        
        if (arr && arr.length !== 0)
        {            
            this.nnsAuctingList = arr.map((key) =>
            {
                const newObj = {
                    fulldomain: key.fulldomain,
                    txid: key.lastTime.txid,
                    maxPrice: key.maxPrice,
                    maxBuyer: key.maxBuyer,
                    auctionState: key.auctionState,
                }
                return newObj;
            })
        }        
        return true;
    }
    /**
     * 获取域名价值排行列表
     * @param page 当前页码
     * @param size 每页条数
     */
    @action public async getAuctedDomain(page: number, size: number)
    {
        let result: any = null;
        try
        {
            result = await Api.getaucteddomain(page, size);            
        } catch (error)
        {
            return false;
        }
        const arr: INNSAuctionedList[] = result ? result[0].list : [];
        this.nnsAuctedCount = result ? result[0].count : 0;          
        if (arr && arr.length !== 0)
        {
            this.nnsAuctionedList = arr.map((key) =>
            {
                const newObj = {
                    range: key.range,
                    fulldomain: key.fulldomain,
                    txid: key.lastTime.txid,
                    maxPrice: key.maxPrice,
                    maxBuyer: key.maxBuyer,
                    ttl: key.ttl
                }
                return newObj;
            })
        }
        return true;
    }
    /**
     * 查询域名信息
     * @param domain 域名 
     */
    @action public async searchDomainInfo(domain: string) {
        let result: any = null;
        try {
            result = await Api.searchbydomain(domain);
        } catch (error) {
            this.searchCanAuction = null;
            this.searchEndAuction = null;
            return false;
        }
        if(result &&( result[0].auctionState === '0201' || result[0].auctionState === '0301')){
            this.searchCanAuction = result[0];
            this.searchEndAuction = null;
        }
        else if(result && result[0].owner) {
            this.searchCanAuction = null;
            this.searchEndAuction = result[0];
        }else if (result &&( result[0].auctionState === '0401')){
            this.searchCanAuction = result[0];
            this.searchEndAuction = null;
        }
        else{
            this.searchCanAuction = null;
            this.searchEndAuction = null;
        }
        return true;
    }
    /**
     * 获取出售列表
     * @param order 排序条件time,price
     * @param type 排序方式，high升序，low降序
     * @param page 当前页码
     * @param size 每页条数
     * @param table 查询不同表格，默认为已上架，'nid1'为已上架，'nid2为已成交，'nid3'为已下架
     */
    @action public async getSellingDomain(order:string,type:string,page: number, size: number)
    {
        let result: any = null;
        try
        {
            result = await Api.getsellingdomain(order,type,page, size,"nid1");            
        } catch (error)
        {
            this.nnsSellingList = [];
            this.nnsSellingCount = 0;
            return false;
        }
        this.nnsSellingList = result ? result[0].list : [];
        this.nnsSellingCount = result ? result[0].count : 0;
        return true;
    }
    /**
     * 获取域名的成交列表
     * @param order 排序条件time,price
     * @param type 排序方式，high升序，low降序
     * @param page 当前页码
     * @param size 每页条数
     * @param table 查询不同表格，默认为已上架，'nid1'为已上架，'nid2为已成交，'nid3'为已下架
     */
    @action public async getSoldDomain(order:string,type:string,page: number, size: number)
    {
        let result: any = null;
        try
        {
            result = await Api.getsellingdomain(order,type,page, size,'nid2');            
        } catch (error)
        {
            this.nnsSoldList = [];
            this.nnsSoldCount = 0;
            return false;
        }
        this.nnsSoldList = result ? result[0].list : [];
        this.nnsSoldCount = result ? result[0].count : 0;
        return true;
    }
}

export default new NNS();