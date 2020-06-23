import { observable, action } from 'mobx';
import * as Api from '../api/contract.api';
import { IContractList, IContractListStore } from '../interface/contractlist.interface';

class ContractList implements IContractListStore {
    @observable public conCount: string = '';
    @observable public conList: IContractList[] = [];

    /**
     * 获取列表
     * @param size 每页条数
     * @param page 当前页码
     */
    @action public async getContractList(page: number, size: number) {
        let result: any = null;
        try {
            result = await Api.getcontractlist(page, size);
        } catch (error) {
            return false;
        }
        this.conList = result[0].list || [];
        this.conCount = result[0].count || 0;
        
        return true;
    }

}
export default new ContractList();