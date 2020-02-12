/**
 * 交易列表页
 */
import * as React from 'react';
// import TitleText from '@/components/titletext/index';
// import Table from '@/components/Table/Table';
import Select from '@/components/select';
import { toThousands } from '@/utils/numberTool';
import './index.less';
import '@/components/Table/index.less';
import { ITransactionsProps } from './interface/transaction.interface';
import { observer, inject } from 'mobx-react';
import { injectIntl } from 'react-intl';
import Page from '@/components/Page';
import { IVinOut, ITransaction } from '@/store/interface/common.interface';
import * as formatTime from 'utils/formatTime';
// import Spinner from '@/components/spinner'

@inject('transaction')
@observer
class Transactions extends React.Component<ITransactionsProps, {}>
{
  public intrl = this.props.intl.messages;
  public options = [
    {
      id: 'all',
      name: "All",
    },
    {
      id: 'ContractTransaction',
      name: "Contract",
    },
    {
      id: 'ClaimTransaction',
      name: "Claim",
    },
    {
      id: 'InvocationTransaction',
      name: "Invocation",
    },
    {
      id: 'MinerTransaction',
      name: "Miner",
    },
    {
      id: 'IssueTransaction',
      name: "Issue"
    },
    {
      id: 'RegisterTransaction',
      name: "Register",
    },
    {
      id: 'PublishTransaction',
      name: "Publish",
    },
    {
      id: 'EnrollmentTransaction',
      name: "Enrollment",
    },
    {
      id: 'AgencyTransaction',
      name: "Agency",
    }
  ]
  public transTableTh = process.env.REACT_APP_SERVER_ENV === "NEO3" ?
    [
      {
        name: this.intrl.tableTh.txid,
        key: 'txid'
      },
      {
        name: this.intrl.tableTh.sender,
        key: 'sender',
      },
      {
        name: this.intrl.tableTh.height,
        key: 'blockindex'
      }, {
        name: this.intrl.tableTh.size,
        key: 'size'
      }
    ]
    : [
      {
        name: this.intrl.tableTh.type,
        key: 'type',
      },
      {
        name: this.intrl.tableTh.txid,
        key: 'txid'
      }, {
        name: this.intrl.tableTh.height,
        key: 'blockindex'
      }, {
        name: this.intrl.tableTh.size,
        key: 'blocktime'
      }
    ]
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
    currentPage: 1,
    pageSize: 15,
    type: "all",
    isLoading: true
  }
  public componentWillUnmount() {
    this.props.transaction.transList = [];
  }

  // 区块详情链接
  public goBlockInfo = (index: string) => {
    this.props.history.push('/block/' + index)
  }
  // 交易详情链接
  public goTransInfo = (txid: string) => {
    this.props.history.push('/transaction/' + txid)
  }
  // 交易详情链接
  public goAddrInfo = (addr: string) => {
    this.props.history.push('/address/' + addr)
  }
  // 下拉选择功能
  public onCallback = (item) => {
    this.setState({
      currentPage: 1,
      type: item.id,
      isLoading: true
    }, async () => {
      this.getTransactionList();
    })
  }
  // 翻页功能
  public onGoPage = (index: number) => {
    this.setState({
      currentPage: index,
      isLoading: true
    }, async () => {
      this.getTransactionList();
    })
  }
  // 获取数据
  public getTransactionList = async () => {
    await this.props.transaction.getTransList(this.state.currentPage, this.state.pageSize, this.state.type);
    this.setState({
      isLoading: false
    })
  }
  public render() {

    return (
      <div className="alltrans-wrapper">
        {/* {
          this.state.isLoading && (
            <div className="loading-wrapper">
              <Spinner />
            </div>
          )
        } */}
        <div className="transaction-table">
          <div className="table-wrap">
            <div className="table-content">
              <div className="table-th">
                <ul>
                  {
                    process.env.REACT_APP_SERVER_ENV !== "NEO3" &&
                    <li>
                      <div className="choose-type-trans">
                        <Select options={this.options} text={this.intrl.tableTh.type} onCallback={this.onCallback} />
                      </div>
                    </li>
                  }
                  {
                    this.transTableTh.map((item, index) => {
                      return <li key={index}>{item.name}</li>
                    })
                  }
                </ul>
              </div>
              {/* 没有数据时 */}
              {
                this.props.transaction.transList.length === 0 && (
                  <div className="no-data-content">{this.props.intl.messages.tableTh.nodata}</div>
                )
              }
              {/* 有数据时 */}
              {
                process.env.REACT_APP_SERVER_ENV !== "NEO3" && this.props.transaction.transList.length !== 0 && (
                  <div className="table-body-new">
                    {
                      this.props.transaction.transList.map((item: ITransaction, index: number) => {
                        return (
                          <div className="table-row" key={index}>
                            <div className="tr-header">
                              {
                                process.env.REACT_APP_SERVER_ENV !== "NEO3" &&
                                <span className="img-text-bg">
                                  <img src={this.imgs[item.type.replace('Transaction', '').toLowerCase()]} alt="" />
                                  {item.type.replace('Transaction', '')}
                                </span>
                              }
                              <span><a href="javascript:;" onClick={this.goTransInfo.bind(this, item.txid)}>{item.txid.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a></span>
                              {
                                process.env.REACT_APP_SERVER_ENV === "NEO3" &&
                                <span><a href="javascript:;" onClick={this.goAddrInfo.bind(this, item.sender)}>
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
                                  {item.vinout.map((vin: IVinOut, vinIndex: number) => {
                                    return (
                                      vinIndex < 3 ?
                                        <div className="amount-info" key={vinIndex}>
                                          <a href="javascript:;" onClick={this.goAddrInfo.bind(this, vin.address)}>{vin.address}</a>
                                          <span className="asset">{vin.assetJA}</span>
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
                                          <a href="javascript:;" onClick={this.goAddrInfo.bind(this, vout.address)}>{vout.address}</a>
                                          <span className="asset">{vout.assetJA}</span>
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
              {
                process.env.REACT_APP_SERVER_ENV === "NEO3" &&
                <div className="table-body">
                  <ul>
                    {
                      this.props.transaction.transList.map((item: ITransaction, index: number) => {
                        return (
                          <li key={index}>
                            <span><a href="javascript:;" onClick={this.goTransInfo.bind(this, item.txid)}>{item.txid.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a></span>
                            <span><a href="javascript:;" onClick={this.goAddrInfo.bind(this, item.sender)}>{item.sender.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a></span>
                            <span><a href="javascript:;" onClick={this.goBlockInfo.bind(this, item.blockindex)}>{toThousands(item.blockindex.toString())}</a></span>
                            <span>{item.size}</span>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              }
            </div>
            {/* 移动端表格 */}
            <div className="mobile-table-content">
              <Select options={this.options} text={this.intrl.tableTh.type} onCallback={this.onCallback} />
              {/* 没有数据时 */}
              {
                this.props.transaction.transList.length === 0 && (
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
                process.env.REACT_APP_SERVER_ENV !== "NEO3" &&this.props.transaction.transList.length !== 0 && (
                  <div className="table-body-new">
                    {
                      this.props.transaction.transList.map((item: ITransaction, index: number) => {
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
                                          <a href="javascript:;" onClick={this.goAddrInfo.bind(this, vin.address)}>{vin.address}</a>
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
                                          <a href="javascript:;" onClick={this.goAddrInfo.bind(this, vout.address)}>{vout.address}</a>
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
              {
                process.env.REACT_APP_SERVER_ENV ==="NEO3" &&this.props.transaction.transList.length !== 0 &&
                <div className="table-body">
                  <ul>
                    {
                      this.props.transaction.transList.map((item: ITransaction, index: number) => {
                        return (
                          <li key={index}>
                            {
                              process.env.REACT_APP_SERVER_ENV !== "NEO3" &&
                              <div className="table-line">
                                <span className="line-title">{this.intrl.tableTh.type}</span>
                                <span className="line-content">
                                  <span className="img-text-bg"><img src={this.imgs[ item.type.replace('Transaction', '').toLowerCase() ]} alt="" />{item.type.replace('Transaction', '')}</span>
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
                              <span className="line-title">{this.intrl.tableTh.size}</span>
                              <span className="line-content">
                                <span>{item.size}</span>
                              </span>
                            </div>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              }
            </div>
          </div>
          <Page
            totalCount={this.props.transaction.transListCount && this.props.transaction.transListCount}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onChange={this.onGoPage}
          />
        </div>
      </div>
    );
  }
}

export default injectIntl(Transactions);
