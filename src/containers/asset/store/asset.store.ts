import { observable, action } from 'mobx';
import * as Api from '../api/asset.api';
import * as CoinTool from '@/utils/cointool';
import { IAsset, INep5Asset, IAssetList } from '../interface/asset.interface';

class Asset {
    @observable public assetList:IAssetList[] = [];  // asset列表
    @observable public nep5List:IAssetList[] = [];   // nep5列表
    /**
     * 获取asset
     */
    @action public async getAssetList() {
        let result: any = null;
        try {
            result = await Api.getallasset();
        } catch (error) {
            this.assetList = [];
            return false;
        }
        const arr:IAsset[] = result || [];
        if(arr.length !== 0){
            this.assetList = arr.map((key) =>
            {
                const newObject = {
                    asset:CoinTool.toChangeAssetName(key),
                    id:key.id,
                    type:key.type,
                    available:key.available.toString(),
                    precision:key.precision
                }
                return newObject;
            })
        }
        return true;
    }
    /**
     * 获取nep5
     */
    @action public async getNep5List() {
        let result: any = null;
        try {
            result = await Api.getallnep5();
        } catch (error) {
            this.nep5List = [];
            return false;
        }
        const arr:INep5Asset[] = result || [];
        if(arr.length !== 0){
            this.nep5List = arr.map((key) =>
            {
                const newObject = {
                    asset:key.name,
                    id:key.assetid,
                    type:"Nep5",
                    available:key.totalsupply,
                    precision:key.decimals
                }
                return newObject;
            })
        }
        return true;
    }
}
export default new Asset();