/**
 * 出售的域名的列表页
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
  public saleOptions = [
    {
      id: 'time',
      name: this.intrl.nns.listingtime,
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
  public listingTableTh = [
    {
      name: this.intrl.tableTh.domainName,
      key: 'fullDomain'
    },
    {
      name: this.intrl.tableTh.price,
      key: 'price'
    },
    {
      name: this.intrl.tableTh.owner,
      key: 'owner'
    },
    {
      name: this.intrl.tableTh.listingtime,
      key: 'launchTime'
    },
    {
      name: this.intrl.tableTh.expirationtime,
      key: 'ttl'
    }
  ]
  public componentWillUnmount()
  {
    this.props.nns.nnsSellingList = [];
    this.props.nns.nnsSellingCount = 0;
  }
  public onSellingCallback = (item) =>
  {
    this.props.nns.listingOrderBy = item.id;
    this.getListing();
  }
  public getListing = () =>
  {
    if (this.props.nns.listingOrderBy === 'time')
    {
      return this.props.nns.getSellingDomain('time', 'high', this.state.currentPage, this.state.pageSize);
    } else if (this.props.nns.listingOrderBy === 'heightprice')
    {
      return this.props.nns.getSellingDomain('price', 'high', this.state.currentPage, this.state.pageSize);
    }
    else
    {
      return this.props.nns.getSellingDomain('price', 'low', this.state.currentPage, this.state.pageSize);
    }
  }
  // 出售列表特殊处理
  public renderListing = (value, key) =>
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
    if (key === 'ttl')
    {
      value = formatTime.format('yyyy/MM/dd | hh:mm:ss', value.toString(), this.props.intl.locale)
      return <span className="small-font">{value}</span>
    }
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
        this.getListing();
      })
  }
  public render()
  {
    return (
      <div className="nnslisting-page">
        <TitleText text={this.intrl.nns.saletitle} img={require('@/img/sale.png')} isInline={true}>
          <Select
            defaultValue={this.props.nns.listingOrderBy}
            options={this.saleOptions}
            text={this.intrl.nns.ordered}
            onCallback={this.onSellingCallback}
            style={{ minWidth: "186px" }}
          />
        </TitleText>
        <div className="nnslisting-table">
          <Table
            tableTh={this.listingTableTh}
            tableData={this.props.nns.nnsSellingList && this.props.nns.nnsSellingList}
            render={this.renderListing}
          />
          <Page
            totalCount={this.props.nns.nnsSellingCount}
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
