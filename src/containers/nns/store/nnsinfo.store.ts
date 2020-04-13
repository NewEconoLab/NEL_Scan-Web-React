import { INNSInfoStore, IAuctionInfo, IAuctionedInfo, IDomainBidRankList, IDomainBidInfoList, IDomainTransList } from "../interface/nnsinfo.interface";
import * as Api from '../api/nnsinfo.api';
import * as NNSApi from '../api/nns.api';
import { observable, action } from "mobx";

class NNSInfo implements INNSInfoStore {
    @observable public nnsInfo: IAuctionInfo | null = null;
    @observable public domainInfo: IAuctionedInfo | null = null;
    @observable public domainBidRankCount: number = 0;
    @observable public domainBidRankList: IDomainBidRankList[] = [];
    @observable public domainBidInfoCount: number = 0;
    @observable public domainBidInfoList: IDomainBidInfoList[] = [];
    @observable public domainTransCount: number = 0;
    @observable public domainTransList: IDomainTransList[] = [];
    @observable public isPending:boolean = false;
    /**
     * 获取域名信息
     * @param domain 域名 
     */
    @action public async getAuctionInfo(domain: string) {
        let result: any = null;
        this.isPending = true;
        try {
            result = await Api.getauctionres(domain);
        } catch (error) {
            return false;
        }
        this.nnsInfo = result ? result[0] : null;
        this.isPending = false;
        return true;
    }
    /**
     * 获取domain加价排行
     * @param id 域名id
     * @param page 当前页码
     * @param size 每页条数
     */
    @action public async getAuctionBidRank(domainid: string, page: number, size: number) {
        let result: any = null;
        try {
            result = await Api.getauctioninfoRank(domainid, page, size);
        } catch (error) {
            this.domainBidRankCount = 0;
            this.domainBidRankList = [];
            return false;
        }
        this.domainBidRankCount = result ? result[0].count :0;
        this.domainBidRankList = result? result[0].list:[];
        return true;
    }
    /**
     * 获取domain竞拍加价详情
     * @param id 域名id
     * @param page 当前页码
     * @param size 每页条数
     */
    @action public async getAuctionBidInfoTx(domainid: string, page: number, size: number) {
        let result: any = null;
        try {
            result = await Api.getauctioninfoTx(domainid, page, size);
        } catch (error) {
            this.domainBidInfoCount = 0;
            this.domainBidInfoList = [];
            return false;
        }
        this.domainBidInfoCount = result ? result[0].count :0;
        this.domainBidInfoList = result? result[0].list:[];
        return true;
    }
    /**
     * 获取竞拍成功的域名信息
     * @param domain 域名 
     */
    @action public async getAuctionedInfo(domain: string) {
        let result: any = null;
        try {
            result = await NNSApi.searchbydomain(domain);
        } catch (error) {
            return false;
        }
        this.domainInfo = result ? result[0] : null;
        return true;
    }
    /**
     * 获取域名流转历史
     * @param domain 
     * @param page 
     * @param size 
     */
    @action public async getDomainTrans(domain: string, page: number, size: number) {
        let result: any = null;
        try {
            result = await Api.getTransinfo(domain, page, size);
        } catch (error) {
            this.domainTransCount = 0;
            this.domainTransList = [];
            return false;
        }
        this.domainTransCount = result ? result[0].count :0;
        this.domainTransList = result? result[0].list:[];
        return true;
    }
}
export default new NNSInfo();