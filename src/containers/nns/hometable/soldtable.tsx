/**
 * 已出售的域名表格
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import TitleText from '@/components/titletext/index';
import Table from '@/components/Table/Table';
import '../index.less';
import { injectIntl } from 'react-intl';
import { INNSProps } from '../interface/nns.interface';
import * as formatTime from 'utils/formatTime';
import Select from '@/components/select';
import Button from '@/components/Button/Button';
@inject('nns')
@observer
class SoldTable extends React.Component<INNSProps, {}> {
  public intrl = this.props.intl.messages;
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
      name: this.intrl.tableTh.price,
      key: 'price'
    },
    {
      name: this.intrl.tableTh.buyer,
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
    this.props.nns.SoldOrderBy = item.id;
    this.getSoldList();
  }
  public getSoldList = () =>
  {
    if (this.props.nns.SoldOrderBy === 'time')
    {
      return this.props.nns.getSoldDomain('time', 'high', 1, 10);
    } else if (this.props.nns.SoldOrderBy === 'heightprice')
    {
      return this.props.nns.getSoldDomain('price', 'high', 1, 10);
    }
    else
    {
      return this.props.nns.getSoldDomain('price', 'low', 1, 10);
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
  // 跳转到域名出售列表页
  public onViewSold = () =>
  {
    this.props.history.push('/nnssold/');
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

  public render()
  {
    return (
      <div className="buy-wrapper">
        <TitleText text={this.intrl.nns.soldtitle} img={require('@/img/sold.png')} isTableTitle={true} isInline={true}>
          <Select
            defaultValue={this.props.nns.SoldOrderBy}
            options={this.soldOptions}
            text={this.intrl.nns.ordered}
            onCallback={this.onSoldCallback}
            style={{ minWidth: "186px" }}
          />
          <Button text={this.intrl.btn.viewAll} onClick={this.onViewSold} />
        </TitleText>
        <Table
          tableTh={this.soldTableTh}
          tableData={this.props.nns.nnsSoldList && this.props.nns.nnsSoldList}
          render={this.renderSold}
        />
      </div>
    );
  }
}

export default injectIntl(SoldTable);
