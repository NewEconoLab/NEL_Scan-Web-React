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
import { ITransaction, IVinOut } from '@/store/interface/common.interface';
import { toThousands } from '@/utils/numberTool';
import Table from '@/components/Table/Table';

@inject('transaction')
@observer
class AddrTxs extends React.Component<any, {}>
{
    public intrl = this.props.intl.messages;

  // 交易
  public transTableTh = process.env.REACT_APP_SERVER_ENV === "NEO3" ?
    [
      {
        name: this.intrl.tableTh.txid,
        key: 'txid'
      },
      {
        name: this.intrl.tableTh.sender,
        key: 'addr'
      },
      {
        name: this.intrl.tableTh.height,
        key: 'blockindex'
      },
      {
        name: this.intrl.tableTh.create,
        key: 'blocktime'
      }
    ]
    :
    [
      {
        name: this.intrl.tableTh.type,
        key: 'type'
      },
      {
        name: this.intrl.tableTh.txid,
        key: 'txid'
      },
      {
        name: this.intrl.tableTh.height,
        key: 'height'
      },
      {
        name: this.intrl.tableTh.create,
        key: 'time'
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
    // 交易列表用到的img
    public imgs = {
      contract: require('@/img/contract.png'),
      claim: require('@/img/claim.png'),
      invocation: require('@/img/invocation.png'),
      miner: require('@/img/miner.png'),
      issue: require('@/img/issue.png'),
      register: require('@/img/register.png'),
      publish: require('@/img/publish.png'),
      enrollment: require('@/img/enrollment.png'),
      agency: require('@/img/agency.png'),
      transfer: process.env.REACT_APP_SERVER_ENV === "PUB" ? require('@/img/transaction-from.png') : require('@/img/transaction-from-test.png')
    }
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
        // this.getAddrNep5List(params[ "address" ]);
        this.props.addressinfo.getAddressTrans(params[ "address" ], this.state.pageSize, this.state.currentPage);
    }
    public componentWillUnmount() {
        // this.props.addressinfo.addrNep5List = [];
        // this.props.addressinfo.addrNep5Count = 0;
    }
    public getAddrNep5List = async (addr: string) => {
        await this.props.addressinfo.getNep5Trans(addr, this.state.currentPage, this.state.pageSize);
        this.setState({
            isLoading: false
        })
    }

  // 列表特殊处理
  public renderTran = (value, key) => {
    if (key === 'type') {
      value = value.replace('Transaction', '');
      return <span className="img-text-bg"><img src={this.imgs[ value.toLowerCase() ]} alt="" />{value}</span>
    }
    // if (key === 'addr' && value) {
    //   const addr = value.replace(/^(.{4})(.*)(.{4})$/, '$1...$3');
    //   return <span><a href="javascript:;" onClick={this.goAddrInfo.bind(this, value)}>{addr}</a></span>
    // }

    if (key === 'txid') {
      const txid = value.replace(/^(.{4})(.*)(.{4})$/, '$1...$3');
      return <span><a href="javascript:;" onClick={this.goTransInfo.bind(this, value)}>{txid}</a></span>
    }
    if (key === 'blockindex') {
      return <span><a href="javascript:;" onClick={this.goBlockInfo.bind(this, value)}>{toThousands(value.toString())}</a></span>
    }
    if (key === 'time') {
      const time = formatTime.format('yyyy/MM/dd | hh:mm:ss', value.toString(), this.props.intl.locale);
      return <span>{time}</span>
    }
    return null;
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
    // 区块详情链接
    public goBlockInfo = (index: string) => {
      this.props.history.push('/block/' + index)
    }
    // trans翻页功能
    public onTransPage = (index: number) => {
      this.setState({
        currentPage: index
      }, () => {
        // this.props.addressinfo.getAddressTrans(address, this.state.transSize, this.state.transPage);
        this.props.addressinfo.getAddressTrans(this.state.address, this.state.pageSize, this.state.currentPage);
      })
    }
    public render() {

        return (
            <div className="address-trans-table">
                {
                process.env.REACT_APP_SERVER_ENV === "NEO3"&&                
                    <Table
                        tableTh={this.transTableTh}
                        tableData={this.props.addressinfo.addrTransList}
                        render={this.renderTran}
                    />
                }
                {
                process.env.REACT_APP_SERVER_ENV !== "NEO3"&&  
                <div className="table-wrap">
                  <div className="table-content">
                    <div className="table-th">
                      <ul>
                        {
                          this.transTableTh.map((item, index) => {
                            return <li key={index}>{item.name}</li>
                          })
                        }
                      </ul>
                    </div>
                    {/* 没有数据时 */}
                    {
                      !this.props.addressinfo.addrTransList || this.props.addressinfo.addrTransList.length === 0 && (
                        <div className="no-data-content">{this.props.intl.messages.tableTh.nodata}</div>
                      )
                    }
                    {
                      this.props.addressinfo.addrTransList && this.props.addressinfo.addrTransList.length !== 0 &&
                      <div className="table-body-new">
                        {
                          this.props.addressinfo.addrTransList.map((item: ITransaction, index: number) => {
                            return (
                              <div className="table-row" key={index}>
                                <div className="tr-header">
                                  {
                                    process.env.REACT_APP_SERVER_ENV !== "NEO3" &&
                                    <span className="img-text-bg">
                                      <img src={this.imgs[ item.type.replace('Transaction', '').toLowerCase() ]} alt="" />
                                      {item.type.replace('Transaction', '')}
                                    </span>
                                  }
                                  <span><a href="javascript:;" onClick={this.goTransInfo.bind(this, item.txid)}>{item.txid.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a></span>
                                  {
                                    process.env.REACT_APP_SERVER_ENV === "NEO3" &&
                                    <span><a href="javascript:;" onClick={this.toAddressInfo.bind(this, item.sender)}>
                                      {item.sender.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}
                                    </a></span>
                                  }
                                  <span><a href="javascript:;">{item.blockindex}</a></span>
                                  <span>
                                    {formatTime.format('yyyy/MM/dd | hh:mm:ss', item.blocktime.toString(), this.props.intl.locale)}
                                  </span>
                                </div>
                                {(item.vinout.length > 0 || item.vout.length > 0) &&
                                  <div className="tr-data">
                                    <div className="amount-data">
                                      <div className="amount-title">Input</div>
                                      {
                                        item.vinout.map((vin: IVinOut, vinIndex: number) => {
                                          return (
                                            vinIndex < 3 ?
                                              <div className="amount-info" key={vinIndex}>
                                                <a href="javascript:;" onClick={this.toAddressInfo.bind(this, vin.address)}>{vin.address}</a>
                                                <span className="asset">{vin.assetJA}</span>
                                              </div> : false
                                          )
                                        })
                                      }
                                      {item.vinout.length > 3 && <span className="ellipsis">...</span>}
                                    </div>
                                    <div className="transfer-icon">
                                      <img src={this.imgs.transfer} alt="" />
                                      {item.vinout.length > 3 || item.vout.length > 3 &&
                                        <div className="view-all" onClick={this.goTransInfo.bind(this, item.txid)}>{this.props.intl.messages.btn.viewAll}</div>
                                      }
                                    </div>
                                    <div className="amount-data">
                                      <div className="amount-title">Output</div>
                                      {item.vout.map((vout: IVinOut, outIndex: number) => {
                                        return (
                                          outIndex < 3 ?
                                            <div className="amount-info" key={outIndex}>
                                              <a href="javascript:;" onClick={this.toAddressInfo.bind(this, vout.address)}>{vout.address}</a>
                                              <span className="asset">{vout.assetJA}</span>
                                            </div> : false
                                        )
                                      })}
                                      {item.vout.length > 3 && <span className="ellipsis">...</span>}
                                    </div>
                                  </div>
                                }
                                <div className="tr-foot">
                                  <span>{this.intrl.transaction.netFee}: {item.net_fee}</span>
                                  <span>{this.intrl.transaction.sysFee}: {item.sys_fee}</span>
                                  <span>{this.intrl.transaction.size}: {item.size} Bytes</span>
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                    }
                  </div>
                {/* 移动端表格 */}
            <div className="mobile-table-content">
              {/* 没有数据时 */}
              {
                this.props.addressinfo.addrTransList.length === 0 && (
                  <div className="table-body">
                    <ul>
                      <li>
                        {
                          this.transTableTh.map((item, index) => {
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
                this.props.addressinfo.addrTransList.length !== 0 && (
                  <div className="table-body-new">
                    {
                      this.props.addressinfo.addrTransList.map((item: ITransaction, index: number) => {
                        return (
                          <div className="table-row" key={index}>
                            <div className="tr-header">
                              <ul>
                                <li>
                                  {
                                    process.env.REACT_APP_SERVER_ENV !== "NEO3" &&
                                    <div className="table-line">
                                      <span className="line-title">{this.intrl.tableTh.type}</span>
                                      <span className="line-content">
                                        <span className="img-text-bg"><img src={this.imgs[item.type.replace('Transaction', '').toLowerCase()]} alt="" />{item.type.replace('Transaction', '')}</span>
                                      </span>
                                    </div>
                                  }
                                  <div className="table-line">
                                    <span className="line-title">{this.intrl.tableTh.txid}</span>
                                    <span className="line-content">
                                      <span><a href="javascript:;" onClick={this.goTransInfo.bind(this, item.txid)}>{item.txid.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a></span>
                                    </span>
                                  </div>
                                  <div className="table-line">
                                    <span className="line-title">{this.intrl.tableTh.height}</span>
                                    <span className="line-content">
                                      <span><a href="javascript:;" onClick={this.goBlockInfo.bind(this, item.blockindex)}>{toThousands(item.blockindex.toString())}</a></span>
                                    </span>
                                  </div>
                                  <div className="table-line">
                                    <span className="line-title">{this.intrl.tableTh.time}</span>
                                    <span className="line-content">
                                      <span>
                                        {formatTime.format('yyyy/MM/dd | hh:mm:ss', item.blocktime.toString(), this.props.intl.locale)}
                                      </span>
                                    </span>
                                  </div>
                                  {/* <div className="table-line">
                                <span className="line-title">{this.intrl.tableTh.size}</span>
                                <span className="line-content">
                                  <span>{item.size}</span>
                                </span>
                              </div> */}
                                </li>
                              </ul>
                            </div>
                            {(item.vinout.length > 0 || item.vout.length > 0) &&
                              <div className="tr-data">
                                <div className="amount-data">
                                  <div className="amount-title">Input</div>
                                  {item.vinout.map((vin: IVinOut, vinIndex: number) => {
                                    return (
                                      vinIndex < 3 ?
                                        <div className="amount-info" key={vinIndex}>
                                          <a href="javascript:;" onClick={this.toAddressInfo.bind(this, vin.address)}>{vin.address}</a>
                                          {vin.assetJA.map(str=>(<span className="asset">{str}</span>))}
                                        </div> : false)
                                  })}
                                  {item.vinout.length > 3 && <span className="ellipsis">...</span>}
                                </div>
                                <div className="transfer-icon">
                                  <img src={this.imgs.transfer} alt="" />
                                  {item.vinout.length > 3 || item.vout.length > 3 &&
                                    <div className="view-all" onClick={this.goTransInfo.bind(this, item.txid)}>{this.props.intl.messages.btn.viewAll}</div>
                                  }
                                </div>
                                <div className="amount-data">
                                  <div className="amount-title">Output</div>
                                  {item.vout.map((vout: IVinOut, outIndex: number) => {
                                    return (
                                      outIndex < 3 ?
                                        <div className="amount-info" key={outIndex}>
                                          <a href="javascript:;" onClick={this.toAddressInfo.bind(this, vout.address)}>{vout.address}</a>
                                          {/* <span className="asset">{vout.assetJA}</span> */}
                                          {vout.assetJA.map(str=>(<span className="asset">{str}</span>))}
                                        </div> : false)
                                  })}
                                  {item.vout.length > 3 && <span className="ellipsis">...</span>}
                                </div>
                              </div>
                            }
                            <div className="tr-foot">
                              <span>{this.intrl.transaction.netFee}: {item.net_fee}</span>
                              <span>{this.intrl.transaction.sysFee}: {item.sys_fee}</span>
                              <span>{this.intrl.transaction.size}: {item.size} Bytes</span>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                )
              }
            </div>
          </div>
                }
                    <Page
                    totalCount={this.props.addressinfo.addrInfo && this.props.addressinfo.addrInfo.txcount}
                    pageSize={this.state.pageSize}
                    currentPage={this.state.currentPage}
                    onChange={this.onTransPage}
                />
            </div>
        );
    }
}

export default injectIntl(AddrTxs);
