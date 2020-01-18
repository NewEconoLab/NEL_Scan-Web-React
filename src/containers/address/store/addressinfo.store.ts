import { observable, action } from 'mobx';
import * as Api from '../api/addressinfo.api';
import { IAddressInfoStore, IAddrBalance, IBanlance, IAddrNep5Tx, INep5OfAddress, IUtxobyAddresslist } from '../interface/addressinfo.interface';
import { IAddress } from '../interface/address.interface';
import * as CoinTool from '@/utils/cointool';
import { ITransaction } from '@/store/interface/common.interface';
class AddressInfo implements IAddressInfoStore {
    @observable public addrInfo: IAddress;
    @observable public addrBalanceList: IAddrBalance[] = [];
    @observable public addrTransList: ITransaction[];
    @observable public addrUtxoList: IUtxobyAddresslist[] = [];
    @observable public addrUtxoListCount: number;
    @observable public bindDomainName: string = '';
    @observable public addrNep5List: IAddrNep5Tx[] = [];
    @observable public addrNep5Count: number = 0;

    /**
     * 获取该地址详情
     * @param address 当前地址
     */
    @action public async getAddressInfo(address: string) {
        let result: any = null;
        try {
            result = await Api.getaddrinfo(address);
        } catch (error) {
            return false;
        }
        this.addrInfo = result ? result[ 0 ] : [];
        return true;
    }
    @action public async getBindDomain(address: string) {
        let result: any = null;
        try {
            result = await Api.getBindDomain(address);
        } catch (error) {
            return false;
        }
        this.bindDomainName = result ? result[ 0 ].fulldomain : '';
        return true;
    }
    /**
     * 获取该地址的balance
     * @param address 当前地址
     */
    @action public async getAddressBalance(address: string) {
        let result: any = null;
        try {
            result = await Api.getaddrbalance(address);
        } catch (error) {
            return false;
        }
        const arr: IBanlance[] = result || [];
        // 筛选
        if (arr.length !== 0) {
            const list: IAddrBalance[] = arr.map((key) => {
                const newObject = {
                    asset: CoinTool.toChangeAssetName(key),
                    amount: key.balance.toString()
                }
                return newObject;
            })

            this.addrBalanceList = [ ...this.addrBalanceList, ...list ]
        }
        return true
    }
    /**
     * 获取该地址nep5资产
     * @param address 当前地址
     */
    @action public async getAddressNep5Asset(address: string) {
        let result: any = null;
        try {
            result = await Api.getaddrnep5asset(address);
        } catch (error) {
            return false;
        }
        const arr: INep5OfAddress[] = result || [];
        // 筛选
        if (arr.length !== 0) {
            const list = arr.map((key) => {
                const newObject = {
                    asset: key.symbol + "(" + key.assetid.replace(/^(.{4})(.*)(.{4})$/, '$1...$3') + ")",
                    amount: key.balance.toString()
                }
                return newObject;
            })

            this.addrBalanceList = [ ...this.addrBalanceList, ...list ]
        }
        return true
    }
    /**
     * 根据地址获取交易列表
     * @param address 当前地址
     * @param page 当前页码
     * @param size 每页条数
     */
    @action public async getAddressTrans(address: string, page: number, size: number) {
        let result: any = null;
        try {
            result = await Api.getaddrtxlist(address, page, size);
        } catch (error) {
            return false;
        }
        const arr: ITransaction[] = result ? result[ 0 ].list : [];
        // 筛选
        if (arr && arr.length > 0) {
            // this.addrTransList = arr.map((key) => {
            //     const newObject = {
            //         type: key.type,
            //         txid: key.txid,
            //         sender: key.addr,
            //         height: key.blockindex,
            //         time: (typeof key.blocktime === "object") ? key.blocktime.$date : key.blocktime
            //     }
            //     return newObject;
            // })
            this.addrTransList = arr.map(key => {
                return {
                    txid: key.txid,
                    type: key.type,
                    net_fee: key.net_fee,
                    sys_fee: key.sys_fee,
                    gas: key.gas,
                    size: key.size,
                    blockindex: key.blockindex,
                    blocktime: key.blocktime,
                    version: key.version,
                    sender: key.sender,
                    vinout: key.vinout,
                    vout: key.vout,
                } as ITransaction
            });
        }
        return true;
    }

    /**
     * 获取地址utxo交易数
     * @param address 当前地址
     * @param size 每页条数
     * @param page 当前页码
     */
    @action public async getAddrUtxoList(address: string, page: number, size: number) {
        let result: any = null;
        try {
            result = await Api.getaddrutxolist(address, page, size);
        } catch (error) {
            this.addrUtxoListCount = 0;
            this.addrUtxoList = [];
            return false;
        }
        this.addrUtxoListCount = result ? result[ 0 ].count : 0;
        this.addrUtxoList = result ? result[ 0 ].list : null;
        return true;
    }
    /**
     * 根据地址获取Nep5交易列表
     * @param address 当前地址
     * @param page 当前页码
     * @param size 每页条数
     */
    @action public async getNep5Trans(address: string, page: number, size: number) {
        let result: any = null;
        try {
            result = await Api.getaddrnep5txlist(address, page, size);
        } catch (error) {
            return false;
        }
        this.addrNep5Count = result ? result[ 0 ].count : 0;
        this.addrNep5List = result ? result[ 0 ].list : [];
        return true;
    }
}
export default new AddressInfo();