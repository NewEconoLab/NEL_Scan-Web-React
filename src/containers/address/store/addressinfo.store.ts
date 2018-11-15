import { observable, action } from 'mobx';
import * as Api from '../api/addressinfo.api';
import { IAddressInfoStore, IAddrBalance, IAddrTrans, IUtxoByAddress, IBanlance, INep5OfAddress, ITransOfAddress } from '../interface/addressinfo.interface';
import { IAddress } from '../interface/address.interface';
import * as CoinTool from '@/utils/cointool';
class AddressInfo implements IAddressInfoStore
{
    @observable public addrInfo: IAddress;
    @observable public addrBalanceList: IAddrBalance[] = [];
    @observable public addrTransList: IAddrTrans[];
    @observable public addrUtxoList: IUtxoByAddress;

    /**
     * 获取该地址详情
     * @param address 当前地址
     */
    @action public async getAddressInfo(address: string)
    {
        let result: any = null;
        try
        {
            result = await Api.getaddrinfo(address);
        } catch (error)
        {
            return false;
        }
        this.addrInfo = result ? result[0] : [];
        return true;
    }
    /**
     * 获取该地址的balance
     * @param address 当前地址
     */
    @action public async getAddressBalance(address: string)
    {
        let result: any = null;
        try
        {
            result = await Api.getaddrbalance(address);
        } catch (error)
        {
            return false;
        }
        const arr: IBanlance[] = result || [];
        // 筛选
        if (arr.length !== 0)
        {
            const list:IAddrBalance[] = arr.map((key) =>
            {
                const newObject = {
                    asset: CoinTool.toChangeAssetName(key),
                    amount: key.balance.toString()
                }
                return newObject;
            })

            this.addrBalanceList = [...this.addrBalanceList, ...list]
        }
        return true
    }
    /**
     * 获取该地址nep5资产
     * @param address 当前地址
     */
    @action public async getAddressNep5Asset(address: string)
    {
        let result: any = null;
        try
        {
            result = await Api.getaddrnep5asset(address);
        } catch (error)
        {
            return false;
        }
        const arr: INep5OfAddress[] = result || [];
        // 筛选
        if (arr.length !== 0)
        {
            const list = arr.map((key) =>
            {
                const newObject = {
                    asset: key.symbol,
                    amount: key.balance.toString()
                }
                return newObject;
            })

            this.addrBalanceList = [...this.addrBalanceList, ...list]
        }
        return true
    }
    /**
     * 根据地址获取交易列表
     * @param address 当前地址
     * @param page 当前页码
     * @param size 每页条数
     */
    @action public async getAddressTrans(address: string, page: number, size: number)
    {
        let result: any = null;
        try
        {
            result = await Api.getaddrtxlist(address, page, size);
        } catch (error)
        {
            return false;
        }
        const arr: ITransOfAddress[] = result ? result[0].list : [];
        // 筛选
        if (arr.length !== 0)
        {
            this.addrTransList = arr.map((key) =>
            {
                const newObject = {
                    type: key.type,
                    txid: key.txid,
                    height: key.blockindex,
                    time: key.blocktime.$date
                }
                return newObject;
            })
        }
        return true;
    }

    /**
     * 获取地址utxo交易数
     * @param address 当前地址
     * @param size 每页条数
     * @param page 当前页码
     */
    @action public async getAddrUtxoList(address: string, page: number, size: number)
    {
        let result: any = null;
        try
        {
            result = await Api.getaddrutxolist(address, page, size);
        } catch (error)
        {
            return false;
        }
        this.addrUtxoList = result ? result[0] : null;
        return true;
    }
}
export default new AddressInfo();