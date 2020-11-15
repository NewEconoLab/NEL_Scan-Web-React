import { observable, action } from 'mobx';
import * as Api from '../api/block.api'
import { IBlockStore, IBlock, IBlockInfo } from '../interface/block.interface';

class Block implements IBlockStore {
    @observable public blockHeight: string = '';  // 区块高度总数
    @observable public blockList: IBlock[] = [];   // 区块列表
    @observable public blockInfo: IBlockInfo | null = null;   // 区块详情
    @observable public isPending:boolean = false;
    /**
     * 获取区块高度总数
     */
    @action public async getBlockHeight() {
        let result: any = null;
        try {
            result = await Api.getblockcount();
        } catch (error) {
            this.blockHeight = '0';
            return error;
        }
        this.blockHeight = result ? result[0].blockcount : '0';
        return true;
    }
    /**
     * 获取区块列表
     * @param size 条数
     * @param page 当前页码
     */
    @action public async getBlockList(size: number, page: number) {
        let result: any = null;
        try {
            result = await Api.getblocks(size, page);
        } catch (error) {
            return error;
        }
        this.blockList = result ? result : [];
        return true;
    }
    /**
     * 获取区块高度详情
     * @param index 区块高度
     */
    @action public async getBlockInfo(index: number) {
        let result: any = null;
        this.isPending = true;
        try {
            result = await Api.getblock(index);
        } catch (error) {
            this.blockInfo =  null;
            this.isPending = false;
            return false;
        }
        this.blockInfo = result ? result[0] : null;
        this.isPending = false;
        return true;
    }
}
export default new Block();