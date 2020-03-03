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
import { observer, inject } from 'mobx-react';
import { injectIntl } from 'react-intl';
import Page from '@/components/Page';
// import Spinner from '@/components/spinner';
import * as formatTime from 'utils/formatTime';
import { IAddressInfoProps } from './interface/addressinfo.interface';
import { IInterTx, InvokeType } from '../transaction/interface/transaction.interface';

@inject('transaction')
@observer
class InterTransactions extends React.Component<IAddressInfoProps, {}>
{
    public intrl = this.props.intl.messages;

    // 内部交易
    public interTableTh = [
        {
            name: this.intrl.tableTh.transid,
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
        address: ''
    }
    public componentDidMount()
    {
        const params = this.props.match.params;
        this.setState({
            address: params["address"]
        });
        this.getAddrInterList(params["address"]);
    }
    public componentWillUnmount()
    {
        this.props.addressinfo.addrInterList = [];
    }
    public getAddrInterList = async (addr: string) =>
    {
        await this.props.addressinfo.getAddressInterList(addr, this.state.currentPage, this.state.pageSize);
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
            this.getAddrInterList(this.state.address);
        })
    }
    public render()
    {

        return (
            <div className="address-trans-table">
                <div className="table-wrap">
                    <div className="table-content">
                        <div className="table-th">
                            <ul>
                                {
                                    this.interTableTh.map((item, index) =>
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
                            this.props.addressinfo.addrInterList.length === 0 && (
                                <div className="no-data-content">{this.props.intl.messages.tableTh.nodata}</div>
                            )
                        }
                        {/* 有数据时 */}
                        {
                            this.props.addressinfo.addrInterList.length !== 0 && (
                                <div className="table-body">
                                    <ul>
                                        {
                                            this.props.addressinfo.addrInterList.map((item: IInterTx, index: number) =>
                                            {
                                                return (
                                                    <li key={index}>
                                                        <span><a href="javascript:;" onClick={this.goTransInfo.bind(this, item.txid)}>{item.txid.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a></span>
                                                        <span>{this.state.showTimeChange ? formatTime.computeTime(item.time, this.props.intl.locale) : formatTime.format('yyyy/MM/dd | hh:mm:ss', item.time.toString(), this.props.intl.locale)}</span>
                                                        <span>
                                                            {
                                                                item.type === InvokeType.Call && "调用合约"
                                                            }
                                                            {
                                                                item.type === InvokeType.Create && "创建合约"
                                                            }
                                                            {
                                                                item.type === InvokeType.Update && "升级合约"
                                                            }
                                                            {
                                                                item.type === InvokeType.Destory && "销毁合约"
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
                            this.props.addressinfo.addrInterList.length === 0 && (
                                <div className="table-body">
                                    <ul>
                                        <li>
                                            {
                                                this.interTableTh.map((item, index) =>
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
                            this.props.addressinfo.addrInterList.length !== 0 && (
                                <div className="table-body">
                                    <ul>
                                        {
                                            this.props.addressinfo.addrInterList.map((item: IInterTx, index: number) =>
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
                                                                        item.type === InvokeType.Call && "调用合约"
                                                                    }
                                                                    {
                                                                        item.type === InvokeType.Create && "创建合约"
                                                                    }
                                                                    {
                                                                        item.type === InvokeType.Update && "升级合约"
                                                                    }
                                                                    {
                                                                        item.type === InvokeType.Destory && "销毁合约"
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
                    totalCount={this.props.addressinfo.addrInterListCount && this.props.addressinfo.addrInterListCount}
                    pageSize={this.state.pageSize}
                    currentPage={this.state.currentPage}
                    onChange={this.onGoPage}
                />
            </div>
        );
    }
}

export default injectIntl(InterTransactions);
