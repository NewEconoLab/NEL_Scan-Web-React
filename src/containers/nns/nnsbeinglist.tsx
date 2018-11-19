/**
 * 正在竞拍域名的列表页
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import TitleText from '@/components/titletext/index';
import Table from '@/components/Table/Table';
import './index.less';
import { injectIntl } from 'react-intl';
import { INNSProps } from './interface/nns.interface';
import Select from '@/components/select';
import Page from '@/components/Page';
@inject('nns')
@observer
class NNSBeing extends React.Component<INNSProps, {}> {
  public intrl = this.props.intl.messages;
  public state = {
    currentPage: 1,
    pageSize: 15,
  }
  public options = [
    {
      id: 'time',
      name: this.intrl.nns.ordertime,
    },
    {
      id: 'price',
      name: this.intrl.nns.orderprice,
    }
  ]
  public auctingTableTh = [
    {
      name: this.intrl.tableTh.domainName,
      key: 'fulldomain'
    },
    {
      name: this.intrl.tableTh.txid,
      key: 'txid'
    },
    {
      name: this.intrl.tableTh.highestBid,
      key: 'maxPrice'
    },
    {
      name: this.intrl.tableTh.highestBidder,
      key: 'maxBuyer'
    },
    {
      name: this.intrl.tableTh.stage,
      key: 'auctionState'
    }
  ]
  public componentWillUnmount()
  {
    this.props.nns.nnsAuctingList = [];
  }
  public onCallback = (item) => {
    this.props.nns.orderBy = item.id;
    this.getAuctingList();
  }
  public getAuctingList = () => {
    if (this.props.nns.orderBy === 'time') {
      return this.props.nns.getAuctingDomain(this.state.currentPage, this.state.pageSize);
    } else {
      return this.props.nns.getAuctingDomainbyPrice(this.state.currentPage, this.state.pageSize);
    }
  }
  // 区块列表特殊处理
  public renderAucting = (value, key) => {
    if (key === 'fulldomain') {
      return <span><a onClick={this.toNNSInfo.bind(this, value)} href="javascript:;">{value}</a></span>
    }
    if (key === 'txid') {
      const txid = value.replace(/^(.{4})(.*)(.{4})$/, '$1...$3');
      return <span><a href="javascript:;" onClick={this.toTransInfo.bind(this, value)}>{txid}</a></span>
    }
    if (key === 'maxPrice') {
      return <span>{value} CGAS</span>
    }
    if (key === 'maxBuyer') {
      const addr = value.replace(/^(.{4})(.*)(.{4})$/, '$1...$3');
      return <span><a onClick={this.toAddrInfo.bind(this, value)} href="javascript:;">{addr}</a></span>
    }
    if (key === 'auctionState') {
      if (value === '0201') {
        return <span className="nns-peirod">{this.intrl.nns.period}</span>
      } else if (value === '0301') {
        return <span className="nns-overtime">{this.intrl.nns.overtime}</span>
      }
    }
    return null;
  }
  // 跳转到域名详情页
  public toNNSInfo = (domain: string) => {
    this.props.history.push('/nnsinfo/' + domain)
  }
  // 跳转到交易详情页
  public toTransInfo = (txid: string) => {
    this.props.history.push('/transaction/' + txid)
  }
  // 跳转到地址详情页
  public toAddrInfo = (addr: string) => {
    this.props.history.push('/address/' + addr)
  }
  // 翻页功能
  public onGoPage = (index: number) => {
    this.setState({
      currentPage: index
    }, () => {
      this.getAuctingList();
    })
  }
  public render() {
    return (
      <div className="nnsbeing-page">
        <TitleText text={this.intrl.nns.title1} img={require('@/img/myauction.png')} isInline={true}>
          <Select defaultValue={this.props.nns.orderBy} options={this.options} text={this.intrl.nns.ordered} onCallback={this.onCallback} style={{ minWidth: "186px" }} />
        </TitleText>
        <div className="nnsbeing-table">
          <Table
            tableTh={this.auctingTableTh}
            tableData={this.props.nns.nnsAuctingList && this.props.nns.nnsAuctingList}
            render={this.renderAucting}
          />
          <Page
            totalCount={this.props.nns.nnsAuctingCount}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onChange={this.onGoPage}
          />
        </div>
      </div>
    );
  }
}

export default injectIntl(NNSBeing);
