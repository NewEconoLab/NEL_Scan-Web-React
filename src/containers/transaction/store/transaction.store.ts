import { observable, action } from 'mobx';
import * as Api from '../api/transcation.api'
import { ITransactionsStore, ITransInfo, ITransaction, INep5Trans } from '../interface/transaction.interface';
import { INep5Asset } from '@/containers/asset/interface/asset.interface';

class Transaction implements ITransactionsStore {
    @observable public transList: ITransaction[] = [];
    @observable public transListCount:number = 0;
    @observable public tranInfo: ITransInfo|null =null;
    @observable public nep5Trans: INep5Trans[] = [];
    @observable public nep5Info: INep5Asset | null = null;
    /**
     * 根据交易类型获取交易列表（默认获取所有交易）
     * @param page 当前页码
     * @param size 每页条数
     * @param type 交易类型
     */
    @action public async getTransList(page: number, size: number, type: string) {
        let result: any = null;
        try {
            result = await Api.gettransactionlist(page, size, type);
        } catch (error) {
            this.transListCount = 0;
            this.transList = [];
            return false;
        }
        this.transListCount = result[0].count || 0;
        this.transList = result ? result[0].list : [];
        return true;
    }
    /**
     * 获取交易详情
     * @param txid 交易id
     */
    @action public async getTransInfo(txid: string) {
        let result: any = null;
        try {
            result = await Api.gettraninfo(txid);
        } catch (error) {
            this.tranInfo = null;
            return false;
        }
        this.tranInfo = result[0] || [];
        return true;
    }
    /**
     * 根据txid获取nep5
     * @param txid 交易id
     */
    @action public async getNep5Transbytxid(txid: string) {
        let result: any = null;
        try {
            result = await Api.getnep5transferbytxid(txid);
        } catch (error) {
            this.nep5Trans = [];
            return false;
        }
        const trans: INep5Trans[] = result || null;

        this.nep5Trans = trans;
        this.nep5Trans.forEach(async (item: INep5Trans, index: number) => {
            item.asset = await this.getNep5Info(item.asset);
        })
        return true;
    }
    /**
     * 根据nep5资产id获取资产详情
     * @param nep5 
     */
    @action public async getNep5Info(nep5: string) {
        let result: any = null;
        try {
            result = await Api.getnep5asset(nep5);
        } catch (error) {
            return null;
        }
        return result[0] || null;
    }
}
export default new Transaction();