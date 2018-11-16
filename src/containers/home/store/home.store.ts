import { observable, action } from 'mobx';
import * as Api from '../api/home.api'
import { IHomeStore, IBlock, ITransList, ISearchAsset } from '../interface/home.interface';
import { toThousands } from '@/utils/numberTool'

class Home implements IHomeStore
{
    @observable public blockCount: string = '0';  // 区块高度
    @observable public txCount: string = '0';     // 交易总数
    @observable public addrCount: string = '0';   // 地址总数
    @observable public blockList: IBlock[] = [];  // 区块列表
    @observable public transList: ITransList[] = [];   // 交易列表
    @observable public searchAssetList:ISearchAsset[] = [];

    /**
     * 获取区块高度
     */
    @action public async getBlockHeight()
    {
        let result: any = null;
        try
        {
            result = await Api.getblockcount();
        } catch (error)
        {
            return false;
        }
        const count = (parseInt(result[0].blockcount,10) - 1).toString();
        this.blockCount = result ? toThousands(count) : '0';
        return true;
    }
    /**
     * 获取该交易类型的总数，默认获取所有的
     * @param type 交易类型
     */
    @action public async getTxCount(type: string)
    {
        let result: any = null;
        try
        {
            result = await Api.gettxcount(type);
        } catch (error)
        {
            return false;
        }
        this.txCount = result ? toThousands(result[0].txcount) : '0';
        return true;
    }
    /**
     * 获取地址总数
     */
    @action public async getAddrCount()
    {
        let result: any = null;
        try
        {
            result = await Api.getaddrcount();
        } catch (error)
        {
            return false;
        }
        this.addrCount = result ? toThousands(result[0].addrcount) : '0';
        return true;
    }
    /**
     * 获取区块列表
     * @param size 记录条数
     * @param page 当前页
     */
    @action public async getBlockList(size: number, page: number)
    {
        let result: any = null;
        try
        {
            result = await Api.getblocks(size, page);
        } catch (error)
        {
            return false;
        }
        this.blockList = result || [];
        return true;
    }
    /**
     * 获取交易详情
     * @param size 每页条数
     * @param page 当前页码
     * @param type 交易类型
     */
    @action public async getTransList(size: number, page: number, type: string)
    {
        let result: any = null;
        try
        {
            result = await Api.getrawtransactions(size, page, type);
        } catch (error)
        {
            return false;
        }

        this.transList = result || [];
        return true;
    }

    @action public async searchAsset(str:string){
        let result:any = null;
        try {
            result = await Api.searchSomething(str);            
        } catch (error) {
            this.searchAssetList = [];
            return false
        }
        this.searchAssetList = result || [];
        return true;
    }
}
export default new Home();