/**
 * 交易详情页
 */
import * as React from 'react';
import * as formatTime from 'utils/formatTime';
import './index.less'
import { inject, observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
import Page from '@/components/Page';
import { IContractProps, IContractNep5 } from './interface/contract.interface';

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

    public nep5TableTh = [
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
            name: '',
            key: 'img'
        },
        {
            name: this.intrl.tableTh.to2,
            key: 'to'
        },
        {
            name: this.intrl.tableTh.number,
            key: 'value'
        },
        {
            name: this.intrl.tableTh.asset,
            key: 'assetName'
        }
    ]
    public mobilenep5TableTh = [
        {
            name: this.intrl.tableTh.txid,
            key: 'txid',
        },
        {
            name: this.intrl.tableTh.time,
            key: 'blocktime'
        },
        {
            name: this.intrl.tableTh.from2,
            key: 'from'
        },
        {
            name: '',
            key: 'img'
        },
        {
            name: this.intrl.tableTh.to2,
            key: 'to'
        },
        {
            name: this.intrl.tableTh.number,
            key: 'value'
        },
        {
            name: this.intrl.tableTh.asset,
            key: 'assetName'
        }
    ]
    public componentDidMount()
    {
        this.getNepList();
    }
    public getNepList = () =>
    {
        this.props.contract.getNep5Contrant(this.state.currentPage, this.state.pageSize)
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
    // 跳转到地址详情页
    public toAddressInfo = (address: string) =>
    {
        this.props.history.push('/address/' + address)
    }
    // 翻页功能
    public onGoPage = (index: number) =>
    {
        this.setState({
            currentPage: index,
            isLoading: true
        }, async () =>
            {
                this.getNepList();
            })
    }
    public render()
    {
        return (
            <>
                <div className="contract-table">
                    <div className="table-wrap trans-tablecss">
                        <div className="table-content">
                            <div className="table-th">
                                <ul>
                                    {
                                        this.nep5TableTh.map((item, index) =>
                                        {
                                            if (index === 1)
                                            {
                                                return <li key={index}>{item.name}<img onClick={this.refreshTime} className="refresh-img" src={require('@/img/refresh.png')} /></li>
                                            }
                                            return <li key={index}>{item.name}</li>
                                        })
                                    }
                                </ul>
                            </div>
                            {/* 没有数据时 */}
                            {
                                this.props.contract.nep5TxCount === 0 && (
                                    <div className="no-data-content">{this.props.intl.messages.tableTh.nodata}</div>
                                )
                            }
                            {/* 有数据时 */}
                            {
                                this.props.contract.nep5TxCount !== 0 && (
                                    <div className="table-body">
                                        <ul>
                                            {
                                                this.props.contract.nep5TxList.map((item, index: number) =>
                                                {
                                                    return (
                                                        <li key={index}>
                                                            <span><a href="javascript:;" onClick={this.goTransInfo.bind(this, item.txid)}>{item.txid.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a></span>
                                                            <span>{this.state.showTimeChange ? formatTime.computeTime(item.time, this.props.intl.locale) : formatTime.format('yyyy/MM/dd | hh:mm:ss', item.time.toString(), this.props.intl.locale)}</span>
                                                            <span>
                                                                {
                                                                    item.from !== ''
                                                                        ? (
                                                                            item.from !== this.props.contract.contractAddr
                                                                                ? <a href="javascript:;" onClick={this.toAddressInfo.bind(this, item.from)}>{item.from.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a>
                                                                                : (this.props.contract.conInfo
                                                                                    ?
                                                                                    <>
                                                                                        <img src={require('@/img/contract-test.png')} style={{ marginTop: -2 }} alt="" />{this.props.contract.conInfo.name}
                                                                                    </>
                                                                                    : '-'
                                                                                )
                                                                        )
                                                                        : '-'
                                                                }
                                                            </span>
                                                            <span><span className="in-green" >in</span></span>
                                                            <span>
                                                                {
                                                                    item.to !== ''
                                                                        ? (
                                                                            item.to !== this.props.contract.contractAddr
                                                                                ? <a href="javascript:;" onClick={this.toAddressInfo.bind(this, item.to)}>{item.to.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a>
                                                                                : (this.props.contract.conInfo
                                                                                    ?
                                                                                    <>
                                                                                        <img src={require('@/img/contract-test.png')} style={{ marginTop: -2 }} alt="" />{this.props.contract.conInfo.name}
                                                                                    </>
                                                                                    : '-'
                                                                                )
                                                                        )
                                                                        : '-'
                                                                }

                                                            </span>
                                                            <span>{item.value}</span>
                                                            <span>{item.assetName}</span>
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
                                this.props.contract.nep5TxCount === 0 && (
                                    <div className="table-body">
                                        <ul>
                                            <li>
                                                {
                                                    this.mobilenep5TableTh.map((item, index) =>
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
                                this.props.contract.nep5TxCount !== 0 && (
                                    <div className="table-body">
                                        <ul>
                                            {
                                                this.props.contract.nep5TxList.map((item: IContractNep5, index: number) =>
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
                                                                <span className="line-title">{this.intrl.tableTh.from}</span>
                                                                <span className="line-content">
                                                                    <span>
                                                                        {
                                                                            item.from !== ''
                                                                                ? (
                                                                                    item.from !== this.props.contract.contractAddr
                                                                                        ? <a href="javascript:;" onClick={this.toAddressInfo.bind(this, item.from)}>{item.from.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a>
                                                                                        : (this.props.contract.conInfo ? this.props.contract.conInfo.name : '-')
                                                                                )
                                                                                : '-'
                                                                        }
                                                                        {/* <a href="javascript:;" onClick={this.toAddressInfo.bind(this, item.from)}>{item.from.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a> */}
                                                                    </span>
                                                                </span>
                                                            </div>
                                                            <div className="table-line">
                                                                <span className="line-title">{this.intrl.tableTh.to}</span>
                                                                <span className="line-content">
                                                                    <span>
                                                                        {
                                                                            item.to !== ''
                                                                                ? (
                                                                                    item.to !== this.props.contract.contractAddr
                                                                                        ? <a href="javascript:;" onClick={this.toAddressInfo.bind(this, item.to)}>{item.to.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a>
                                                                                        : (this.props.contract.conInfo ? this.props.contract.conInfo.name : '-')
                                                                                )
                                                                                : '-'
                                                                        }
                                                                        {/* <a href="javascript:;" onClick={this.toAddressInfo.bind(this, item.to)}>{item.to.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a> */}
                                                                    </span>
                                                                </span>
                                                            </div>
                                                            <div className="table-line">
                                                                <span className="line-title">{this.intrl.tableTh.number}</span>
                                                                <span className="line-content">
                                                                    <span>{item.value}</span>
                                                                </span>
                                                            </div>
                                                            <div className="table-line">
                                                                <span className="line-title">{this.intrl.tableTh.asset}</span>
                                                                <span className="line-content">
                                                                    <span>{item.assetName}</span>
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
                        totalCount={this.props.contract.nep5TxCount}
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
