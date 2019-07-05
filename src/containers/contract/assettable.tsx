/**
 * 交易详情页
 */
import * as React from 'react';
import TitleText from '@/components/titletext/index';
import Table from '@/components/Table/Table';
// import * as formatTime from 'utils/formatTime';
import './index.less'
import { inject, observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
import { IContractProps } from './interface/contract.interface';

@inject('contract')
@observer
class AssetTable extends React.Component<IContractProps> {
    public state = {
        tabledata:[]
    }
    public intrl = this.props.intl.messages;
    public assetTableTh = [
        {
            name: this.intrl.tableTh.asset,
            key: 'assetName',
        },
        {
            name: this.intrl.tableTh.amount,
            key: 'balance'
        }
    ]
    public async componentDidMount(){
        await this.props.contract.getbalance();
        await this.props.contract.getNep5Balance();
        console.log(this.props.contract.balanceList);
        console.log(this.props.contract.nep5BalanceList);
        this.setState({
            tabledata:[
                ...this.props.contract.balanceList,
                ...this.props.contract.nep5BalanceList
            ]
        },()=>{
            console.log(this.state.tabledata)
        })
    }
    
    public render()
    {
        return (
            <>
                <TitleText text={this.intrl.contract.title2} />
                <div className="contractinfo-asset-table">
                    <Table 
                        tableTh={this.assetTableTh} 
                        tableData={this.state.tabledata} 
                    />
                </div>
            </>
        );
    }
}

export default injectIntl(AssetTable);
