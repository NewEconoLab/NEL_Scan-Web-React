import { RouteComponentProps } from 'react-router-dom';
export interface IContractListStore
{
    conCount: string,   // 总数
    conList: IContractList[],  // 列表
    getContractList: (page: number, size: number) => Promise<boolean>,
}
export interface IContractListProps extends RouteComponentProps
{
    intl: any,
    contractlist: IContractListStore
}
export interface IContractList {
    contractHash:string,
    deployTime:string,
    name:string,
    author:string
}