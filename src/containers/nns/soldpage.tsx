/**
 * 已出售的域名的列表页
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import TitleText from '@/components/titletext/index';
import Table from '@/components/Table/Table';
import './index.less';
import { injectIntl } from 'react-intl';
import { INNSProps } from './interface/nns.interface';
import * as formatTime from 'utils/formatTime';
import Select from '@/components/select';
import Page from '@/components/Page';
@inject('nns')
@observer
class NNSListing extends React.Component<INNSProps, {}> {
  public intrl = this.props.intl.messages;
  public state = {
    currentPage: 1,
    pageSize: 15,
  }
  public soldOptions = [
    {
      id: 'time',
      name: this.intrl.nns.tradetime,
    },
    {
      id: 'heightprice',
      name: this.intrl.nns.heightprice,
    },
    {
      id: 'lowprice',
      name: this.intrl.nns.lowprice,
    }
  ]
  public soldTableTh = [
    {
      name: this.intrl.tableTh.domainName,
      key: 'fullDomain'
    },
    {
      name: this.intrl.tableTh.price2,
      key: 'price'
    },
    {
      name: this.intrl.tableTh.buyer2,
      key: 'owner'
    },
    {
      name: this.intrl.tableTh.tradetime,
      key: 'launchTime'
    }
  ]
  public componentWillUnmount()
  {
    this.props.nns.nnsSoldList = [];
    this.props.nns.nnsSoldCount = 0;
  }
  public onSoldCallback = (item) =>
  {
    this.props.nns.listingOrderBy = item.id;
    this.getSoldList();
  }
  public getSoldList = () =>
  {
    if (this.props.nns.listingOrderBy === 'time')
    {
      return this.props.nns.getSoldDomain('time', 'high', this.state.currentPage, this.state.pageSize);
    } else if (this.props.nns.listingOrderBy === 'heightprice')
    {
      return this.props.nns.getSoldDomain('price', 'high', this.state.currentPage, this.state.pageSize);
    }
    else
    {
      return this.props.nns.getSoldDomain('price', 'low', this.state.currentPage, this.state.pageSize);
    }
  }
  // 出售列表特殊处理
  public renderSold = (value, key) =>
  {
    if (key === 'fullDomain')
    {
      return <span><a onClick={this.toNNSInfo.bind(this, value)} href="javascript:;">{value}</a></span>
    }
    if (key === 'price')
    {
      return <span>{value} NNC</span>
    }
    if (key === 'owner')
    {
      const addr = value.replace(/^(.{4})(.*)(.{4})$/, '$1...$3');
      return <span><a onClick={this.toAddrInfo.bind(this, value)} href="javascript:;">{addr}</a></span>
    }
    if (key === 'launchTime')
    {
      value = formatTime.format('yyyy/MM/dd | hh:mm:ss', value.toString(), this.props.intl.locale)
      return <span className="small-font">{value}</span>
    }
    // if (key === 'ttl')
    // {
    //   value = formatTime.format('yyyy/MM/dd | hh:mm:ss', value.toString(), this.props.intl.locale)
    //   return <span className="small-font">{value}</span>
    // }
    return null;
  }
  // 跳转到域名详情页
  public toNNSInfo = (domain: string) =>
  {
    this.props.history.push('/nnsinfo/' + domain)
  }
  // 跳转到地址详情页
  public toAddrInfo = (addr: string) =>
  {
    this.props.history.push('/address/' + addr)
  }
  // 翻页功能
  public onGoPage = (index: number) =>
  {
    this.setState({
      currentPage: index
    }, () =>
      {
        this.getSoldList();
      })
  }
  public render()
  {
    return (
      <div className="nnslisting-page">
        <TitleText text={this.intrl.nns.soldtitle} img={require('@/img/sold.png')} isInline={true}>
          <Select
            defaultValue={this.props.nns.SoldOrderBy}
            options={this.soldOptions}
            text={this.intrl.nns.ordered}
            onCallback={this.onSoldCallback}
            style={{ minWidth: "186px" }}
          />
        </TitleText>
        <div className="nnslisting-table">
          <Table
            tableTh={this.soldTableTh}
            tableData={this.props.nns.nnsSoldList && this.props.nns.nnsSoldList}
            render={this.renderSold}
          />
          <Page
            totalCount={this.props.nns.nnsSoldCount}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onChange={this.onGoPage}
          />
        </div>
      </div>
    );
  }
}

export default injectIntl(NNSListing);
