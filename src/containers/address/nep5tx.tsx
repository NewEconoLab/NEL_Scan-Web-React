/**
 * 交易列表页
 */
import * as React from 'react';
import './index.less';
import '@/components/Table/index.less';
import { observer, inject } from 'mobx-react';
import { injectIntl } from 'react-intl';
import Page from '@/components/Page';
import * as formatTime from 'utils/formatTime';
import { IAddrNep5Tx } from './interface/addressinfo.interface';

@inject('transaction')
@observer
class AddrNep5Tx extends React.Component<any, {}>
{
    public intrl = this.props.intl.messages;

    public transTableTh = [
        {
            name: this.intrl.tableTh.txid,
            key: 'txid',
        },
        {
            name: this.intrl.tableTh.time,
            key: 'blocktime'
        }, {
            name: this.intrl.tableTh.from,
            key: 'from'
        }, {
            name: '',
            key: 'img'
        }, {
            name: this.intrl.tableTh.to,
            key: 'to'
        },
        {
            name: this.intrl.tableTh.asset,
            key: 'assetName'
        }
    ]
    public mobileTransTableTh = [
        {
            name: this.intrl.tableTh.txid,
            key: 'txid',
        },
        {
            name: this.intrl.tableTh.time,
            key: 'blocktime'
        }, {
            name: this.intrl.tableTh.from,
            key: 'from'
        }, {
            name: this.intrl.tableTh.to,
            key: 'to'
        },
        {
            name: this.intrl.tableTh.asset,
            key: 'assetName'
        }
    ]
    public state = {
        address: '',
        currentPage: 1,
        pageSize: 15,
        showTimeChange: true, // 转换时间显示，true默认显示计时，false显示默认时间
    }
    public componentDidMount() {
        const params = this.props.match.params;
        this.setState({
            address: params[ "address" ]
        });
        this.getAddrNep5List(params[ "address" ]);
    }
    public componentWillUnmount() {
        this.props.addressinfo.addrNep5List = [];
        this.props.addressinfo.addrNep5Count = 0;
    }
    public getAddrNep5List = async (addr: string) => {
        await this.props.addressinfo.getNep5Trans(addr, this.state.currentPage, this.state.pageSize);
        this.setState({
            isLoading: false
        })
    }

    // 刷新时间
    public refreshTime = () => {
        this.setState({
            showTimeChange: !this.state.showTimeChange
        })
        // this.getNep5List();
    }

    // 交易详情链接
    public goTransInfo = (txid: string) => {
        this.props.history.push('/transaction/' + txid)
    }
    // 跳转到地址详情页
    public toAddressInfo = (address: string) => {
        this.props.history.push('/address/' + address);
        this.props.refresh(address);
        this.setState({
            address,
            currentPage: 1,
            pageSize: 15
        });
        this.getAddrNep5List(address);
    }
    // 翻页功能
    public onGoPage = (index: number) => {
        this.setState({
            currentPage: index
        }, async () => {
            this.getAddrNep5List(this.state.address);
        })
    }
    public render() {

        return (
            <div className="address-trans-table">

                <div className="table-wrap trans-tablecss">
                    <div className="table-content">
                        <div className="table-th">
                            <ul>
                                {
                                    this.transTableTh.map((item, index) => {
                                        if (index === 1) {
                                            return <li key={index}>{item.name}<img onClick={this.refreshTime} className="refresh-img" src={require(process.env.REACT_APP_SERVER_ENV === "PUB" ? '@/img/refresh.png' : '@/img/refreshTest.png')} /></li>
                                        }
                                        return <li key={index}>{item.name}</li>
                                    })
                                }
                            </ul>
                        </div>
                        {/* 没有数据时 */}
                        {
                            this.props.addressinfo.addrNep5List.length === 0 && (
                                <div className="no-data-content">{this.props.intl.messages.tableTh.nodata}</div>
                            )
                        }
                        {/* 有数据时 */}
                        {
                            this.props.addressinfo.addrNep5List.length !== 0 && (
                                <div className="table-body">
                                    <ul>
                                        {
                                            this.props.addressinfo.addrNep5List.map((item: IAddrNep5Tx, index: number) => {
                                                return (
                                                    <li key={index}>
                                                        <span><a href="javascript:;" onClick={this.goTransInfo.bind(this, item.txid)}>{item.txid.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a></span>
                                                        <span>{this.state.showTimeChange ? formatTime.computeTime(item.blocktime, this.props.intl.locale) : formatTime.format('yyyy/MM/dd | hh:mm:ss', item.blocktime.toString(), this.props.intl.locale)}</span>
                                                        {/* <span><a href="javascript:;" onClick={this.toAddressInfo.bind(this, item.from)}>{item.from.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a></span> */}
                                                        {
                                                            this.state.address === item.from && (
                                                                <>
                                                                    <span>{item.from.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</span>
                                                                    <span className="red-out">OUT</span>
                                                                </>
                                                            )
                                                        }
                                                        {
                                                            this.state.address !== item.from && 'system' !== item.from && (
                                                                <>
                                                                    <span><a href="javascript:;" onClick={this.toAddressInfo.bind(this, item.from)}>{item.from.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a></span>
                                                                    <span className="green-in">IN</span>
                                                                </>
                                                            )
                                                        }
                                                        {
                                                            'system' === item.from && (
                                                                <>
                                                                    <span>system</span>
                                                                    <span className="green-in">IN</span>
                                                                </>
                                                            )
                                                        }
                                                        <span>
                                                            {
                                                                (this.state.address === item.to) || (this.state.address === 'system') ? item.to.replace(/^(.{4})(.*)(.{4})$/, '$1...$3') : <a href="javascript:;" onClick={this.toAddressInfo.bind(this, item.to)}>{item.to.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a>
                                                            }
                                                        </span>
                                                        <span>{item.value.toString() + ' ' + item.assetName}</span>
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
                            this.props.addressinfo.addrNep5List.length === 0 && (
                                <div className="table-body">
                                    <ul>
                                        <li>
                                            {
                                                this.mobileTransTableTh.map((item, index) => {
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
                            this.props.addressinfo.addrNep5List.length !== 0 && (
                                <div className="table-body">
                                    <ul>
                                        {
                                            this.props.addressinfo.addrNep5List.map((item: IAddrNep5Tx, index: number) => {
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
                                                                <span>{formatTime.format('yyyy/MM/dd | hh:mm:ss', item.blocktime.toString(), this.props.intl.locale)}</span>
                                                            </span>
                                                        </div>
                                                        <div className="table-line">
                                                            <span className="line-title">{this.intrl.tableTh.from}</span>
                                                            <span className="line-content">
                                                                <span><a href="javascript:;" onClick={this.toAddressInfo.bind(this, item.from)}>{item.from.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a></span>
                                                            </span>
                                                        </div>
                                                        <div className="table-line">
                                                            <span className="line-title">{this.intrl.tableTh.to}</span>
                                                            <span className="line-content">
                                                                <span><a href="javascript:;" onClick={this.toAddressInfo.bind(this, item.to)}>{item.to.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a></span>
                                                            </span>
                                                        </div>
                                                        <div className="table-line">
                                                            <span className="line-title">{this.intrl.tableTh.asset}</span>
                                                            <span className="line-content">
                                                                <span>{item.value.toString() + ' ' + item.assetName}</span>
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
                    totalCount={this.props.addressinfo.addrNep5Count && this.props.addressinfo.addrNep5Count}
                    pageSize={this.state.pageSize}
                    currentPage={this.state.currentPage}
                    onChange={this.onGoPage}
                />
            </div>
        );
    }
}

export default injectIntl(AddrNep5Tx);
