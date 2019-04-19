import { IAssetInfoStore, IBalanceRank, IBalanceRankList, INep5TransList } from "../interface/assetinfo.interface";
import { observable, action } from "mobx";
import { IAsset, INep5Asset } from "../interface/asset.interface";
import * as Api from '../api/assetinfo.api';

class AssetInfo implements IAssetInfoStore {
    @observable public assetInfo: IAsset | null;         // 资产详情
    @observable public nep5Info: INep5Asset | null;       // nep5资产详情
    @observable public balanceRankCount: number;     // 资产排名数量
    @observable public balanceRankList: IBalanceRank[];  // 资产排名列表
    @observable public nep5TransList: INep5TransList[];   // nep5的交易列表
    @observable public nep5TransCount: number;        // nep5的交易总数

    /**
     * 获取资产详情
     * @param assetid 资产id
     */
    @action public async getAssetInfo(assetid: string) {
        this.assetInfo = null;
        let result: any = null;
        try {
            result = await Api.getassetinfo(assetid);
        } catch (error) {
            return false;
        }
        this.assetInfo = result ? result[0] : null;
        return true;
    }
    /**
     * 获取资产详情
     * @param nep5id 资产id
     */
    @action public async getNep5Info(nep5id: string) {
        this.nep5Info = null;
        let result: any = null;
        try {
            result = await Api.getnep5info(nep5id);
        } catch (error) {
            return false;
        }
        this.nep5Info = result ? result[0] : null;
        return true;
    }
    /**
     * 获取资产排名总数
     * @param assetid 资产id
     */
    @action public async getBalanceRankCount(assetid: string) {
        let result: any = null;
        try {
            result = await Api.getrankbyassetcount(assetid);
        } catch (error) {
            this.balanceRankCount = 0;
            return false;
        }
        this.balanceRankCount = result ? result[0].count : 0;
        return true;
    }
    /**
     * 获取资产排名列表
     * @param assetid 资产id
     */
    @action public async getBalanceRankList(assetid: string, size: number, page: number) {
        let result: any = null;
        try {
            result = await Api.getrankbyasset(assetid, size, page);
        } catch (error) {
            return false;
        }
        const list: IBalanceRankList[] = result || [];
        let rank = (page - 1) * size + 1;
        if (list.length !== 0) {
            this.balanceRankList = list.map((key) => {
                const newObj = {
                    rank: rank,
                    addr: key.addr,
                    balance: key.balance
                }
                rank++;
                return newObj;
            })
        }
        return true;
    }
    /**
     * 获取nep5交易的总数
     * @param type 交易类型
     * @param nep5id nep5资产的id
     */
    @action public async getNep5TransCount(type: string, nep5id: string) {
        let result: any = null;
        try {
            result = await Api.getnep5count(type, nep5id);
        } catch (error) {
            this.nep5TransCount = 0;
            return false;
        }
        this.nep5TransCount = result ? result[0].nep5count : 0;
        return true;
    }
    /**
     * 根据nep5资产获取交易列表
     * @param nep5id 资产id
     * @param size 每页条数
     * @param page 当前页码
     */
    @action public async getNep5Transaction(nep5id: string, page: number,size: number,) {
        let result: any = null;
        try {
            result = await Api.getnep5transfersbyasset(nep5id, page,size,);
        } catch (error) {
            return false;
        }
        this.nep5TransCount = result ? result[0].count : 0;
        this.nep5TransList = result[0].list || [];
        return true;
    }
}
export default new AssetInfo();