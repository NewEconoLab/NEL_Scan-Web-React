/**
 * 交易列表页
 */
import * as React from 'react';
// import TitleText from '@/components/titletext/index';
// import Table from '@/components/Table/Table';
// import Select from '@/components/select';
// import { toThousands } from '@/utils/numberTool';
import './index.less';
import '@/components/Table/index.less';
import { ITransactionsProps, INep5List } from './interface/transaction.interface';
import { observer, inject } from 'mobx-react';
import { injectIntl } from 'react-intl';
import Page from '@/components/Page';
// import Spinner from '@/components/spinner';
import * as formatTime from 'utils/formatTime';

@inject('transaction')
@observer
class Transactions extends React.Component<ITransactionsProps, {}>
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
    },
    {
      name: this.intrl.tableTh.from,
      key: 'from'
    },
    {
      name: '',
      key: 'img'
    },
    {
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
    },
    {
      name: this.intrl.tableTh.from,
      key: 'from'
    },
    {
      name: this.intrl.tableTh.to,
      key: 'to'
    },
    {
      name: this.intrl.tableTh.asset,
      key: 'assetName'
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
    this.getNep5List();
  }
  public componentWillUnmount()
  {
    this.props.transaction.nep5TxList = [];
  }
  public getNep5List = async () =>
  {
    await this.props.transaction.getNep5List(this.state.currentPage, this.state.pageSize);
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
        this.getNep5List();
      })
  }
  public render()
  {

    return (
      <div className="nep5trans-page">
        <img src={require("../../img/to.png")} alt="" hidden={true} />
        <div className="transaction-table">
          <div className="table-wrap trans-tablecss">
            <div className="table-content">
              <div className="table-th">
                <ul>
                  {
                    this.transTableTh.map((item, index) =>
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
                this.props.transaction.nep5TxList.length === 0 && (
                  <div className="no-data-content">{this.props.intl.messages.tableTh.nodata}</div>
                )
              }
              {/* 有数据时 */}
              {
                this.props.transaction.nep5TxList.length !== 0 && (
                  <div className="table-body">
                    <ul>
                      {
                        this.props.transaction.nep5TxList.map((item: INep5List, index: number) =>
                        {
                          return (
                            <li key={index}>
                              <span><a href="javascript:;" onClick={this.goTransInfo.bind(this, item.txid)}>{item.txid.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a></span>
                              <span>{this.state.showTimeChange ? formatTime.computeTime(item.blocktime, this.props.intl.locale) : formatTime.format('yyyy/MM/dd | hh:mm:ss', item.blocktime.toString(), this.props.intl.locale)}</span>
                              <span><a href="javascript:;" onClick={this.toAddressInfo.bind(this, item.from)}>{item.from.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a></span>
                              <span><img src={require("../../img/to.png")} alt="" /></span>
                              <span><a href="javascript:;" onClick={this.toAddressInfo.bind(this, item.to)}>{item.to.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a></span>
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
                this.props.transaction.nep5TxList.length === 0 && (
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
                this.props.transaction.nep5TxList.length !== 0 && (
                  <div className="table-body">
                    <ul>
                      {
                        this.props.transaction.nep5TxList.map((item: INep5List, index: number) =>
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
            totalCount={this.props.transaction.nep5TxListCount && this.props.transaction.nep5TxListCount}
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
