import { observable, action } from 'mobx';
import * as Api from '../api/address.api';
import { IAddressStore, IAddress, IAddressList } from '../interface/address.interface';

class Address implements IAddressStore {
    @observable public addrCount: string = '';
    @observable public addrList: IAddressList[] = [];

    /**
     * 获取地址总数
     */
    @action public async getAddrCount() {
        let result: any = null;
        try {
            result = await Api.getaddrcount();
        } catch (error) {
            this.addrCount = '0';
            return false;
        }
        this.addrCount = result ? result[ 0 ].addrcount : '0';
        return true;
    }
    /**
     * 获取地址列表
     * @param size 每页条数
     * @param page 当前页码
     */
    @action public async getAddressList(size: number, page: number) {
        let result: any = null;
        try {
            result = await Api.getaddrlist(size, page);
        } catch (error) {
            return false;
        }
        const arr: IAddress[] = result || [];
        // 筛选
        this.addrList = [];
        if (arr.length !== 0) {
            this.addrList = arr.map((key) => {
                const newObject = {
                    addr: key.addr,
                    firstuse: key.firstuse ? key.firstuse.blocktime.$date : 0,
                    lastuse: key.lastuse ? key.lastuse.blocktime.$date : 0,
                    txcount: key.txcount ? key.txcount : 0
                }
                return newObject;
            })
        }
        return true;
    }

}
export default new Address();