import { observable, action } from 'mobx';
import * as Api from '../api/contract.api';
import * as CoinTool from '@/utils/cointool';
import { IContractStore, IContractInfo, IBalanceInfo, INep5Balance, IContractAll, IContractNep5, IBalanceList } from '../interface/contract.interface';

class Contract implements IContractStore
{
    @observable public contractHash: string = ''; // 当前合约hash
    @observable public contractAddr:string = ''; // 当前合约地址
    @observable public conInfo: IContractInfo | null = null;  // 合约信息详情
    @observable public balanceList: IBalanceList[] = []; // 资产列表
    @observable public nep5BalanceList: IBalanceList[] = []; // nep5资产列表
    @observable public allTxCount: number = 0; // 所有调用的总数
    @observable public allTxList: IContractAll[] = []; // 所有调用的列表
    @observable public nep5TxCount: number = 0; // nep5调用的总数
    @observable public nep5TxList: IContractNep5[] = []; // nep5调用的列表
    /**
     * 获取合约信息详情
     */
    @action public async getContractData()
    {
        let result: any = null;
        try
        {
            result = await Api.getcontractinfo(this.contractHash);
        } catch (error)
        {
            this.conInfo = null;
            return error;
        }
        this.conInfo = result[0] || null;
        return true;
    }

    @action public async getAllContrant(page: number, size: number)
    {
        let result: any = null;
        try
        {
            result = await Api.getcontractalltx(this.contractHash, page, size);
        } catch (error)
        {
            this.allTxList = [];
            return error;
        }
        this.allTxCount = result[0].count || 0;
        this.allTxList = result[0].list || [];
        return true;
    }

    @action public async getNep5Contrant(page: number, size: number)
    {
        let result: any = null;
        try
        {
            result = await Api.getcontractnep5tx(this.contractAddr, page, size);
        } catch (error)
        {
            this.nep5TxList = [];
            return error;
        }
        this.nep5TxCount = result[0].count || 0;
        this.nep5TxList = result[0].list || [];
        return true;
    }

    @action public async getbalance()
    {
        let result: any = null;
        this.balanceList = [];
        try
        {
            result = await Api.getBalance(this.contractAddr);
            console.log(result)
        } catch (error)
        {
            this.balanceList = [];
            return error;
        }
        const arr:IBalanceInfo[] = result || [];
        if(arr.length !== 0){
            this.balanceList = arr.map((key) =>
            {
                const newObject = {
                    assetName:CoinTool.toChangeAssetName(key),
                    balance:key.balance
                }
                return newObject;
            })
        }       
        return true;
    }

    @action public async getNep5Balance()
    {
        let result: any = null;
        this.nep5BalanceList = [];
        try
        {
            result = await Api.getnep5Balance(this.contractAddr);
        } catch (error)
        {
            return error;
        }
        console.log(result)
        const arr:INep5Balance[] = result || [];
        if(arr.length !== 0){
            this.nep5BalanceList = arr.map((key) =>
            {
                const newObject = {
                    assetName:key.symbol + "(" + key.assetid.replace(/^(.{4})(.*)(.{4})$/, '$1...$3') + ")",
                    balance:key.balance
                }
                return newObject;
            })
        }   
        return true;
    }
}
export default new Contract();