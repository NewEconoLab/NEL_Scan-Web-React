/**
 * 交易详情页
 */
import * as React from 'react';
import * as formatTime from 'utils/formatTime';
import './index.less'
import { inject, observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
import Page from '@/components/Page';
import { IContractProps, IContractAll } from './interface/contract.interface';

@inject('contract')
@observer
class AllTable extends React.Component<IContractProps> {
    public state = {
        currentPage: 1,
        pageSize: 10,
        isLoading: true,
        showTimeChange: true, // 转换时间显示，true默认显示计时，false显示默认时间
    }
    public intrl = this.props.intl.messages;

    public allTableTh = [
        {
            name: this.intrl.tableTh.txid,
            key: 'txid',
        },
        {
            name: this.intrl.tableTh.time,
            key: 'time'
        },
        {
            name: this.intrl.tableTh.from2,
            key: 'from'
        },
        {
            name: this.intrl.tableTh.to2,
            key: 'to'
        },
        {
            name: this.intrl.tableTh.value2,
            key: 'value'
        },
        {
            name: this.intrl.tableTh.fee,
            key: 'net_fee'
        }
    ]
    public componentDidMount() {
        this.getAllList();
    }
    public getAllList = () => {
        this.props.contract.getAllContrant(this.state.currentPage, this.state.pageSize)
    }
    // 刷新时间
    public refreshTime = () => {
        this.setState({
            showTimeChange: !this.state.showTimeChange
        })
    }
    // 交易详情链接
    public goTransInfo = (txid: string) => {
        this.props.history.push('/transaction/' + txid)
    }
    // 跳转到地址详情页
    public toAddressInfo = (address: string) => {
        this.props.history.push('/address/' + address)
    }
    // 翻页功能
    public onGoPage = (index: number) => {
        this.setState({
            currentPage: index,
            isLoading: true
        }, async () => {
            this.getAllList();
        })
    }
    public render() {
        return (
            <>
                <div className="contract-table">
                    <div className="table-wrap trans-tablecss">
                        <div className="table-content">
                            <div className="table-th">
                                <ul>
                                    {
                                        this.allTableTh.map((item, index) => {
                                            if (index === 1) {
                                                return <li key={index}>{item.name}<img onClick={this.refreshTime} className="refresh-img" src={require(process.env.REACT_APP_SERVER_ENV === "PUB" ? '@/img/refresh.png' : '@/img/refreshTest.png')} /></li>
                                            }
                                            if(index ===4 && process.env.REACT_APP_SERVER_ENV === "NEO3"){
                                                return null
                                            }
                                            return <li key={index}>{item.name}</li>
                                        })
                                    }
                                </ul>
                            </div>
                            {/* 没有数据时 */}
                            {
                                this.props.contract.allTxCount === 0 && (
                                    <div className="no-data-content">{this.props.intl.messages.tableTh.nodata}</div>
                                )
                            }
                            {/* 有数据时 */}
                            {
                                this.props.contract.allTxCount !== 0 && (
                                    <div className="table-body">
                                        <ul>
                                            {
                                                this.props.contract.allTxList.map((item: IContractAll, index: number) => {
                                                    return (
                                                        <li key={index}>
                                                            <span><a href="javascript:;" onClick={this.goTransInfo.bind(this, item.txid)}>{item.txid.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a></span>
                                                            <span>{this.state.showTimeChange ? formatTime.computeTime(parseInt(item.time, 10), this.props.intl.locale) : formatTime.format('yyyy/MM/dd | hh:mm:ss', item.time, this.props.intl.locale)}</span>
                                                            <span><a href="javascript:;" onClick={this.toAddressInfo.bind(this, item.from)}>{item.from.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a></span>
                                                            {
                                                                process.env.REACT_APP_SERVER_ENV === "NEO3" ?
                                                                (
                                                                    <span title={this.props.contract.conInfo ? this.props.contract.conInfo.name : '-'}><img src={require('@/img/contract-test.png')} alt="" />{(item.to === "当前合约"&&this.props.contract.conInfo) ? this.props.contract.conInfo.hash.replace(/^(.{4})(.*)(.{4})$/, '$1...$3') : '-'}</span>
                                                                ):(
                                                                    <span title={this.props.contract.conInfo ? this.props.contract.conInfo.name : '-'}><img src={require('@/img/contract-test.png')} alt="" />{this.props.contract.conInfo ? this.props.contract.conInfo.name.replace(/^(.{10})(.*)(.{0})$/, '$1...$3') : '-'}</span>
                                                                )
                                                            }
                                                            {
                                                                process.env.REACT_APP_SERVER_ENV !== "NEO3" && <span>{item.value.toString()}</span>
                                                            }
                                                            
                                                            <span>{item.net_fee}</span>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                )
                            }
                        </div>
                        {/* 移动端表格 */}
                        <div className="mobile-table-content">
                            {/* 没有数据时 */}
                            {
                                this.props.contract.allTxCount === 0 && (
                                    <div className="table-body">
                                        <ul>
                                            <li>
                                                {
                                                    this.allTableTh.map((item, index) => {
                                                        return (
                                                            <div className="table-line" key={index}>
                                                                <span className="line-title" >{item.name}</span>
                                                                <span className="line-content">
                                                                    {this.props.intl.messages.tableTh.nodata}
                                                                </span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </li>
                                        </ul>
                                    </div>
                                )
                            }
                            {/* 有数据时 */}
                            {
                                this.props.contract.allTxCount !== 0 && (
                                    <div className="table-body">
                                        <ul>
                                            {
                                                this.props.contract.allTxList.map((item: IContractAll, index: number) => {
                                                    return (
                                                        <li key={index}>
                                                            <div className="table-line">
                                                                <span className="line-title">{this.intrl.tableTh.txid}</span>
                                                                <span className="line-content">
                                                                    <span><a href="javascript:;" onClick={this.goTransInfo.bind(this, item.txid)}>{item.txid.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a></span>
                                                                </span>
                                                            </div>
                                                            <div className="table-line">
                                                                <span className="line-title">{this.intrl.tableTh.time}</span>
                                                                <span className="line-content">
                                                                    <span>{formatTime.format('yyyy/MM/dd | hh:mm:ss', item.time, this.props.intl.locale)}</span>
                                                                </span>
                                                            </div>
                                                            <div className="table-line">
                                                                <span className="line-title">{this.intrl.tableTh.from}</span>
                                                                <span className="line-content">
                                                                    <span><a href="javascript:;" onClick={this.toAddressInfo.bind(this, item.from)}>{item.from.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a></span>
                                                                </span>
                                                            </div>
                                                            {
                                                                process.env.REACT_APP_SERVER_ENV === "NEO3" ? (
                                                                    <div className="table-line">
                                                                        <span className="line-title">{this.intrl.tableTh.to}</span>
                                                                        <span className="line-content">
                                                                            <span><img src={require('@/img/contract-test.png')} alt="" />{(item.to === "当前合约"&&this.props.contract.conInfo) ? this.props.contract.conInfo.hash.replace(/^(.{4})(.*)(.{4})$/, '$1...$3') : '-'}</span>
                                                                        </span>
                                                                    </div>
                                                                ) :
                                                                    (
                                                                        <div className="table-line">
                                                                            <span className="line-title">{this.intrl.tableTh.to}</span>
                                                                            <span className="line-content">
                                                                                <span><img src={require('@/img/contract-test.png')} alt="" />{this.props.contract.conInfo ? this.props.contract.conInfo.name.replace(/^(.{10})(.*)(.{0})$/, '$1...$3') : '-'}</span>
                                                                            </span>
                                                                        </div>
                                                                    )
                                                            }
                                                            {
                                                                process.env.REACT_APP_SERVER_ENV !== "NEO3" && (
                                                                    <div className="table-line">
                                                                        <span className="line-title">{this.intrl.tableTh.value2}</span>
                                                                        <span className="line-content">
                                                                            <span>{item.value}</span>
                                                                        </span>
                                                                    </div>
                                                                )
                                                            }

                                                            <div className="table-line">
                                                                <span className="line-title">{this.intrl.tableTh.fee}</span>
                                                                <span className="line-content">
                                                                    <span>{item.net_fee}</span>
                                                                </span>
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <Page
                        totalCount={this.props.contract.allTxCount}
                        pageSize={this.state.pageSize}
                        currentPage={this.state.currentPage}
                        onChange={this.onGoPage}
                    />
                </div>

            </>
        );
    }
}

export default injectIntl(AllTable);
