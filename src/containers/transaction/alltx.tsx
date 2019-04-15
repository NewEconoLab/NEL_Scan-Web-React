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
import { ITransaction } from '@/store/interface/common.interface';
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
  public transTableTh = [
    // {
    //   name: this.intrl.tableTh.type,
    //   key: 'type',
    // },
    {
      name: this.intrl.tableTh.txid,
      key: 'txid'
    }, {
      name: this.intrl.tableTh.height,
      key: 'blockindex'
    }, {
      name: this.intrl.tableTh.size,
      key: 'size'
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
    agency: require('@/img/agency.png')
  }
  public state = {
    currentPage: 1,
    pageSize: 15,
    type: "all",
    isLoading: true
  }
  // private tableThKeys = this.transTableTh.map(v => {
  //   return {key:v.key,name:v.name}
  // })
  public componentWillUnmount()
  {
    this.props.transaction.transList = [];
  }
  // 列表特殊处理
  // public renderTran = (value, key) =>
  // {
  //   if (key === 'type')
  //   {
  //     value = value.replace('Transaction', '');
  //     return <span className="img-text-bg"><img src={this.imgs[value.toLowerCase()]} alt="" />{value}</span>
  //   }

  //   if (key === 'txid')
  //   {
  //     const txid = value.replace(/^(.{4})(.*)(.{4})$/, '$1...$3');
  //     return <span><a href="javascript:;" onClick={this.goTransInfo.bind(this, value)}>{txid}</a></span>
  //   }
  //   if (key === 'blockindex')
  //   {
  //     return <span><a href="javascript:;" onClick={this.goBlockInfo.bind(this, value)}>{toThousands(value.toString())}</a></span>
  //   }
  //   // if (key === 'size')
  //   // {
  //   //   return <span>{value}</span>
  //   // }
  //   return null;
  // }
  // 区块详情链接
  public goBlockInfo = (index: string) =>
  {
    this.props.history.push('/block/' + index)
  }
  // 交易详情链接
  public goTransInfo = (txid: string) =>
  {
    this.props.history.push('/transaction/' + txid)
  }
  // 下拉选择功能
  public onCallback = (item) =>
  {
    this.setState({
      currentPage: 1,
      type: item.id,
      isLoading: true
    }, async () =>
      {
        this.getTransactionList();
      })
  }
  // 翻页功能
  public onGoPage = (index: number) =>
  {
    this.setState({
      currentPage: index,
      isLoading: true
    }, async () =>
      {
        this.getTransactionList();
      })
  }
  // 获取数据
  public getTransactionList = async () =>
  {
    await this.props.transaction.getTransList(this.state.currentPage, this.state.pageSize, this.state.type);
    this.setState({
      isLoading: false
    })
  }
  public render()
  {

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
                  <li>
                    <div className="choose-type-trans">
                      <Select options={this.options} text={this.intrl.tableTh.type} onCallback={this.onCallback} />
                    </div>
                  </li>
                  {
                    this.transTableTh.map((item, index) =>
                    {
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
                this.props.transaction.transList.length !== 0 && (
                  <div className="table-body">
                    <ul>
                      {
                        this.props.transaction.transList.map((item: ITransaction, index: number) =>
                        {
                          return (
                            <li key={index}>
                              <span className="img-text-bg"><img src={this.imgs[item.type.replace('Transaction', '').toLowerCase()]} alt="" />{item.type.replace('Transaction', '')}</span>
                              <span><a href="javascript:;" onClick={this.goTransInfo.bind(this, item.txid)}>{item.txid.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a></span>
                              <span><a href="javascript:;" onClick={this.goBlockInfo.bind(this, item.blockindex)}>{toThousands(item.blockindex.toString())}</a></span>
                              <span>{item.size}</span>
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
              <Select options={this.options} text={this.intrl.tableTh.type} onCallback={this.onCallback} />
              {/* 没有数据时 */}
              {
                this.props.transaction.transList.length === 0 && (
                  <div className="table-body">
                    <ul>
                      <li>
                        {
                          this.transTableTh.map((item, index) =>
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
                this.props.transaction.transList.length !== 0 && (
                  <div className="table-body">
                    <ul>
                      {
                        this.props.transaction.transList.map((item: ITransaction, index: number) =>
                        {
                          return (
                            <li key={index}>
                              <div className="table-line">
                                <span className="line-title">{this.intrl.tableTh.type}</span>
                                <span className="line-content">
                                  <span className="img-text-bg"><img src={this.imgs[item.type.replace('Transaction', '').toLowerCase()]} alt="" />{item.type.replace('Transaction', '')}</span>
                                </span>
                              </div>
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
                )
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
