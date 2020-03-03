/**
 * 内部列表页
 */
import * as React from 'react';
// import TitleText from '@/components/titletext/index';
// import Table from '@/components/Table/Table';
// import Select from '@/components/select';
// import { toThousands } from '@/utils/numberTool';
import './index.less';
import '@/components/Table/index.less';
import { ITransactionsProps, IInterTx, InvokeType } from './interface/transaction.interface';
import { observer, inject } from 'mobx-react';
import { injectIntl } from 'react-intl';
import Page from '@/components/Page';
// import Spinner from '@/components/spinner';
import * as formatTime from 'utils/formatTime';

@inject('transaction')
@observer
class InterTransactions extends React.Component<ITransactionsProps, {}>
{
    public intrl = this.props.intl.messages;

    public transTableTh = [
        {
            name: this.intrl.tableTh.txid,
            key: 'txid',
        },
        {
            name: this.intrl.tableTh.time,
            key: 'time'
        },
        {
            name: this.intrl.tableTh.type,
            key: 'type'
        },
        {
            name: this.intrl.tableTh.from2,
            key: 'from'
        },
        {
            name: this.intrl.tableTh.to2,
            key: 'to'
        }
    ]
    public mobileTransTableTh = [
        {
            name: this.intrl.tableTh.txid,
            key: 'txid',
        },
        {
            name: this.intrl.tableTh.time,
            key: 'time'
        },
        {
            name: this.intrl.tableTh.type,
            key: 'type'
        },
        {
            name: this.intrl.tableTh.from2,
            key: 'from'
        },
        {
            name: this.intrl.tableTh.to2,
            key: 'to'
        }
    ]
    public state = {
        currentPage: 1,
        pageSize: 15,
        isLoading: true,
        showTimeChange: true, // 转换时间显示，true默认显示计时，false显示默认时间
    }
    public componentDidMount()
    {
        this.getInterList();
    }
    public componentWillUnmount()
    {
        this.props.transaction.interList = [];
    }
    public getInterList = async () =>
    {
        await this.props.transaction.getInterList(this.state.currentPage, this.state.pageSize);
        this.setState({
            isLoading: false
        })
    }

    // 刷新时间
    public refreshTime = () =>
    {
        this.setState({
            showTimeChange: !this.state.showTimeChange
        })
    }
    // 交易详情链接
    public goTransInfo = (txid: string) =>
    {
        this.props.history.push('/transaction/' + txid)
    }
    // 跳转到合约详情页
    public toContractInfo = (address: string) =>
    {
        this.props.history.push('/contract/' + address)
    }
    // 翻页功能
    public onGoPage = (index: number) =>
    {
        this.setState({
            currentPage: index,
            isLoading: true
        }, async () =>
        {
            this.getInterList();
        })
    }
    public render()
    {

        return (
            <div className="intertrans-page">
                <img src={require("../../img/to.png")} alt="" hidden={true} />
                <div className="transaction-table">
                    <div className="table-wrap">
                        <div className="table-content">
                            <div className="table-th">
                                <ul>
                                    {
                                        this.transTableTh.map((item, index) =>
                                        {
                                            if (index === 1)
                                            {
                                                return <li key={index}>{item.name}<img onClick={this.refreshTime} className="refresh-img" src={require(process.env.REACT_APP_SERVER_ENV === "PUB" ? '@/img/refresh.png' : '@/img/refreshTest.png')} /></li>
                                            }
                                            return <li key={index}>{item.name}</li>
                                        })
                                    }
                                </ul>
                            </div>
                            {/* 没有数据时 */}
                            {
                                this.props.transaction.interList.length === 0 && (
                                    <div className="no-data-content">{this.props.intl.messages.tableTh.nodata}</div>
                                )
                            }
                            {/* 有数据时 */}
                            {
                                this.props.transaction.interList.length !== 0 && (
                                    <div className="table-body">
                                        <ul>
                                            {
                                                this.props.transaction.interList.map((item: IInterTx, index: number) =>
                                                {
                                                    return (
                                                        <li key={index}>
                                                            <span><a href="javascript:;" onClick={this.goTransInfo.bind(this, item.txid)}>{item.txid.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a></span>
                                                            <span>{this.state.showTimeChange ? formatTime.computeTime(item.time, this.props.intl.locale) : formatTime.format('yyyy/MM/dd | hh:mm:ss', item.time.toString(), this.props.intl.locale)}</span>
                                                            <span>
                                                                {
                                                                    item.type === InvokeType.Call && this.intrl.other.call
                                                                }
                                                                {
                                                                    item.type === InvokeType.Create && this.intrl.other.create
                                                                }
                                                                {
                                                                    item.type === InvokeType.Update && this.intrl.other.update
                                                                }
                                                                {
                                                                    item.type === InvokeType.Destory && this.intrl.other.destory
                                                                }
                                                            </span>
                                                            <span><a href="javascript:;" onClick={this.toContractInfo.bind(this, item.from)}>{item.from.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a></span>
                                                            <span><a href="javascript:;" onClick={this.toContractInfo.bind(this, item.to)}>{item.to.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a></span>
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
                                this.props.transaction.interList.length === 0 && (
                                    <div className="table-body">
                                        <ul>
                                            <li>
                                                {
                                                    this.mobileTransTableTh.map((item, index) =>
                                                    {
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
                                this.props.transaction.interList.length !== 0 && (
                                    <div className="table-body">
                                        <ul>
                                            {
                                                this.props.transaction.interList.map((item: IInterTx, index: number) =>
                                                {
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
                                                                    <span>{formatTime.format('yyyy/MM/dd | hh:mm:ss', item.time.toString(), this.props.intl.locale)}</span>
                                                                </span>
                                                            </div>
                                                            <div className="table-line">
                                                                <span className="line-title">{this.intrl.tableTh.type}</span>
                                                                <span className="line-content">
                                                                    <span>
                                                                        {
                                                                            item.type === InvokeType.Call && this.intrl.other.call
                                                                        }
                                                                        {
                                                                            item.type === InvokeType.Create && this.intrl.other.create
                                                                        }
                                                                        {
                                                                            item.type === InvokeType.Update && this.intrl.other.update
                                                                        }
                                                                        {
                                                                            item.type === InvokeType.Destory && this.intrl.other.destory
                                                                        }
                                                                    </span>
                                                                </span>
                                                            </div>
                                                            <div className="table-line">
                                                                <span className="line-title">{this.intrl.tableTh.from}</span>
                                                                <span className="line-content">
                                                                    <span>
                                                                        <a href="javascript:;" onClick={this.toContractInfo.bind(this, item.from)}>{item.from.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a>
                                                                    </span>
                                                                </span>
                                                            </div>
                                                            <div className="table-line">
                                                                <span className="line-title">{this.intrl.tableTh.to}</span>
                                                                <span className="line-content">
                                                                    <span>
                                                                        <a href="javascript:;" onClick={this.toContractInfo.bind(this, item.to)}>{item.to.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a>
                                                                    </span>
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
                        totalCount={this.props.transaction.interListCount && this.props.transaction.interListCount}
                        pageSize={this.state.pageSize}
                        currentPage={this.state.currentPage}
                        onChange={this.onGoPage}
                    />
                </div>
            </div>
        );
    }
}

export default injectIntl(InterTransactions);
