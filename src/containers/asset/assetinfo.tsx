/**
 * 资产详情页
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { injectIntl } from 'react-intl';
import TitleText from '@/components/titletext/index';
import Table from '@/components/Table/Table';
import Page from '@/components/Page';
import * as CoinTool from '@/utils/cointool'
import { IAssetInfoProps } from './interface/assetinfo.interface';
import './index.less'

@inject('assetinfo')
@observer
class AssetInfo extends React.Component<IAssetInfoProps, {}> {
    public intrl = this.props.intl.messages;
    public balanceRankTableTh = [
        {
            name: this.intrl.tableTh.rank,
            key: 'rank',
        },
        {
            name: this.intrl.tableTh.address,
            key: 'addr'
        }, {
            name: this.intrl.tableTh.amount,
            key: 'balance'
        }
    ]
    public state = {
        assetid: '',
        currentPage: 1,
        pageSize: 15
    }
    // 初始化数据
    public componentDidMount() {
        const params = this.props.match.params;
        this.setState({
            assetid: params["assetid"]
        })
        this.props.assetinfo.getAssetInfo(params["assetid"]);
        this.props.assetinfo.getBalanceRankCount(params["assetid"]);
        this.getBalanceRankList(params["assetid"]);
    }
    public componentWillUnmount()
    {
        this.props.assetinfo.balanceRankCount = 0;
        this.props.assetinfo.balanceRankList = [];
    }
    // 返回区块列表
    public onGoBack = () => {
        this.props.history.push('/assets/');
    }
    // 请求数据
    public getBalanceRankList = (asset: string) => {
        return this.props.assetinfo.getBalanceRankList(asset, this.state.pageSize, this.state.currentPage);
    }
    // 列表特殊处理
    public renderBalance = (value, key) => {
        if (key === 'addr') {
            return <span><a href="javascript:;" onClick={this.goAddrInfo.bind(this, value)}>{value}</a></span>
        }
        return null;
    }
    public goAddrInfo = (addr: string) => {
        this.props.history.push('/address/' + addr)
    }
    // 翻页功能
    public onBalancePage = (index: number) => {
        this.setState({
            currentPage: index
        }, () => {
            this.getBalanceRankList(this.state.assetid);
        })
    }
    public render() {
        if (!this.props.assetinfo.assetInfo)
        {
            return (
                <div className="nodata-wrap">
                    <img src={require('@/img/nodata.png')} alt="" />
                    <p>{this.intrl.nodata.msg}</p>
                </div>
            )
        }
        return (
            <div className="assetinfo-page">
                <div className="goback-wrapper">
                    <span className="goback-text" onClick={this.onGoBack}>&lt;&lt;  {this.intrl.btn.goback}</span>
                </div>
                <div className="info-content">
                    <TitleText text={this.intrl.asset.titleinfo1} isInfoTitle={true} />
                    <div className="info-list">
                        <ul>
                            <li>
                                <span className="type-name">{this.intrl.asset.asset}</span>
                                <span className="type-content">{this.props.assetinfo.assetInfo && CoinTool.toChangeAssetName(this.props.assetinfo.assetInfo)}</span>
                            </li>
                            <li>
                                <span className="type-name">{this.intrl.asset.hash}</span>
                                <span className="type-content">{this.props.assetinfo.assetInfo && this.props.assetinfo.assetInfo.id}</span>
                            </li>
                            <li>
                                <span className="type-name">{this.intrl.asset.type}</span>
                                <span className="type-content">{this.props.assetinfo.assetInfo && this.props.assetinfo.assetInfo.type}</span>
                            </li>
                            <li>
                                <span className="type-name"> {this.intrl.asset.available}</span>
                                <span className="type-content">{this.props.assetinfo.assetInfo && this.props.assetinfo.assetInfo.available}</span>
                            </li>
                            <li>
                                <span className="type-name">{this.intrl.asset.precision}</span>
                                <span className="type-content">{this.props.assetinfo.assetInfo && this.props.assetinfo.assetInfo.precision}</span>
                            </li>
                            <li>
                                <span className="type-name">{this.intrl.asset.admin}</span>
                                <span className="type-content">{this.props.assetinfo.assetInfo && this.props.assetinfo.assetInfo.admin}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="asset-balance-rank">
                    <TitleText text={this.intrl.asset.titleinfo2} />
                    <div className="assetinfo-balance-table">
                        <Table
                            tableTh={this.balanceRankTableTh}
                            tableData={this.props.assetinfo.balanceRankList && this.props.assetinfo.balanceRankList}
                            render={this.renderBalance}
                        />
                        <Page
                            totalCount={this.props.assetinfo.balanceRankCount}
                            pageSize={this.state.pageSize}
                            currentPage={this.state.currentPage}
                            onChange={this.onBalancePage}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default injectIntl(AssetInfo);
