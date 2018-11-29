/**
 * nns首页表格模块
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import TitleText from '@/components/titletext/index';
import Table from '@/components/Table/Table';
import Page from '@/components/Page';
import Hint from '@/components/hint';
import '../index.less';
import * as formatTime from 'utils/formatTime';
import { injectIntl } from 'react-intl';
import { INNSInfoProps } from '@/containers/nns/interface/nnsinfo.interface';
@observer
class NNSInfoTable extends React.Component<INNSInfoProps, {}> {
    public intrl = this.props.intl.messages;
    public state = {
        auctionId: '',
        currentPageBidRank: 1,
        pageSizeBidRank: 15,
        currentPageBidInfo: 1,
        pageSizeBidInfo: 15
    }
    public bidrankTableTh = [
        {
            name: this.intrl.tableTh.rank,
            key: 'range'
        },
        {
            name: this.intrl.tableTh.bidder,
            key: 'address'
        },
        {
            name: this.intrl.tableTh.bidderPrice,
            key: 'totalValue'
        }
    ]
    public bidInfoTableTh = [
        {
            name: this.intrl.tableTh.txid,
            key: 'txid'
        },
        {
            name: this.intrl.tableTh.type,
            key: 'type'
        },
        {
            name: this.intrl.tableTh.address,
            key: 'address'
        },
        {
            name: this.intrl.tableTh.amount,
            key: 'amount'
        },
        {
            name: this.intrl.tableTh.time,
            key: 'time'
        }
    ]
    public async componentDidMount() {
        if (this.props.nnsinfo.nnsInfo) {
            this.getAuctionBidRank(this.props.nnsinfo.nnsInfo.auctionId);
            this.getAuctionBidInfoTx(this.props.nnsinfo.nnsInfo.auctionId);            
        }
    }
    public componentWillUnmount(){
        this.props.nnsinfo.domainBidInfoCount = 0;
        this.props.nnsinfo.domainBidInfoList = [];
        this.props.nnsinfo.domainBidRankCount = 0;
        this.props.nnsinfo.domainBidRankList = [];
    }
    // 获取竞拍中列表
    public getAuctionBidRank(id) {
        return this.props.nnsinfo.getAuctionBidRank(id, this.state.currentPageBidRank, this.state.pageSizeBidRank);
    }
    // 获取竞拍排行列表
    public getAuctionBidInfoTx(id) {
        return this.props.nnsinfo.getAuctionBidInfoTx(id, this.state.currentPageBidInfo, this.state.pageSizeBidInfo);
    }
    // 加价排行列表特殊处理
    public renderBidRank = (value, key) => {
        if (key === 'address') {
            //   const addr = value.replace(/^(.{4})(.*)(.{4})$/, '$1...$3');
            return <span><a onClick={this.toAddrInfo.bind(this, value)} href="javascript:;">{value}</a></span>
        }
        if (key === 'totalValue') {
            return <span>{value} CGAS</span>
        }
        return null;
    }
    // 竞拍列表特殊处理
    public renderBidInfo = (value, key) => {
        if (key === 'txid') {
            const txid = value.replace(/^(.{4})(.*)(.{4})$/, '$1...$3');
            return <span><a href="javascript:;" onClick={this.toTransInfo.bind(this, value)}>{txid}</a></span>
        }
        if (key === 'type') {
            if (value === '4001') {
                return <span>{this.intrl.nns.openAuction}</span>
            } else if (value === '4002') {
                return <span>{this.intrl.nns.raisebid}</span>
            }else if (value === '4003') {
                return <span>{this.intrl.nns.endof}<Hint type='3' /></span>
            }else if (value === '4004') {
                return <span>{this.intrl.nns.recover}</span>
            }else if (value === '4005') {
                return <span>{this.intrl.nns.getDomain}</span>
            }
        }
        if (key === 'address') {
            if(!!!value){
                return <span>null</span>
            }            
            const addr = value.replace(/^(.{4})(.*)(.{4})$/, '$1...$3');
            return <span><a onClick={this.toAddrInfo.bind(this, value)} href="javascript:;">{addr}</a></span>
        }
        if (key === 'amount') {
            return <span>{value} CGAS</span>
        }
        if (key === 'time') {
            value = formatTime.format('yyyy/MM/dd | hh:mm:ss', value.toString(), this.props.intl.locale);
            return <span>{value}</span>
        }        
        return null;
    }
    // 跳转到区块详情页
    public toBlockInfo = (index: string) => {
        this.props.history.push('/block/' + index)
    }
    // 跳转到交易详情页
    public toTransInfo = (txid: string) => {
        this.props.history.push('/transaction/' + txid)
    }
    // 跳转到地址详情页
    public toAddrInfo = (addr: string) => {
        this.props.history.push('/address/' + addr)
    }
    // 加价排行翻页功能
    public onBidRankPage = (index: number) => {
        this.setState({
            currentPageBidRank: index
        }, () => {
            if(this.props.nnsinfo.nnsInfo) {
                this.getAuctionBidRank(this.props.nnsinfo.nnsInfo.auctionId);
            }
        })
    }
    // 竞拍列表翻页功能
    public onBidInfoPage = (index: number) => {
        this.setState({
            currentPageBidInfo: index
        }, () => {
            if(this.props.nnsinfo.nnsInfo) {
                this.getAuctionBidInfoTx(this.props.nnsinfo.nnsInfo.auctionId);
            }
        })
    }
    public render() {
        return (
            <React.Fragment>
                <TitleText text={this.intrl.nns.titleinfo4} isInline={true} />
                <div className="bidrank-table">
                    <Table
                        tableTh={this.bidrankTableTh}
                        tableData={this.props.nnsinfo.domainBidRankList}
                        render={this.renderBidRank}
                        className="address-table"
                    />
                    <Page
                        totalCount={this.props.nnsinfo.domainBidRankCount}
                        pageSize={this.state.pageSizeBidRank}
                        currentPage={this.state.currentPageBidRank}
                        onChange={this.onBidRankPage}
                    />
                </div>
                <TitleText text={this.intrl.nns.titleinfo5} isInline={true} />
                <div className="bidinfo-table">
                    <Table
                        tableTh={this.bidInfoTableTh}
                        tableData={this.props.nnsinfo.domainBidInfoList}
                        render={this.renderBidInfo}
                        className="address-table"
                    />
                    <Page
                        totalCount={this.props.nnsinfo.domainBidInfoCount}
                        pageSize={this.state.pageSizeBidInfo}
                        currentPage={this.state.currentPageBidInfo}
                        onChange={this.onBidInfoPage}
                    />
                </div>
            </React.Fragment>
        )
    }
}
export default injectIntl(NNSInfoTable)