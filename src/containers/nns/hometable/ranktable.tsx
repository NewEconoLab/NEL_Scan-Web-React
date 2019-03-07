/**
 * 域名竞拍成功的排行页
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import TitleText from '@/components/titletext/index';
import Table from '@/components/Table/Table';
import '../index.less';
import * as formatTime from 'utils/formatTime';
import { injectIntl } from 'react-intl';
import { INNSProps } from '../interface/nns.interface';
import Button from '@/components/Button/Button';
@inject('nns')
@observer
class RankTable extends React.Component<INNSProps, {}> {
  public intrl = this.props.intl.messages;
  public auctedTableTh = [
    {
      name: this.intrl.tableTh.rank,
      key: 'range'
    },
    {
      name: this.intrl.tableTh.domainName,
      key: 'fulldomain'
    },
    {
      name: this.intrl.tableTh.txid,
      key: 'txid'
    },
    {
      name: this.intrl.tableTh.hammerPrice,
      key: 'maxPrice'
    },
    {
      name: this.intrl.tableTh.buyer,
      key: 'maxBuyer'
    },
    {
      name: this.intrl.tableTh.expiration,
      key: 'ttl'
    }
  ]
  // 初始
  public async componentDidMount()
  {
    await this.props.nns.getAuctedDomain(1, 10);
  }
  public componentWillUnmount()
  {
    this.props.nns.nnsAuctionedList = [];
    this.props.nns.nnsAuctedCount = 0;
  }

  // 竞拍排行列表特殊处理
  public renderAucted = (value, key) =>
  {
    if (key === 'fulldomain')
    {
      return <span><a onClick={this.toNNSInfo.bind(this, value)} href="javascript:;">{value}</a></span>
    }
    if (key === 'txid')
    {
      const txid = value.replace(/^(.{4})(.*)(.{4})$/, '$1...$3');
      return <span><a href="javascript:;" onClick={this.toTransInfo.bind(this, value)}>{txid}</a></span>
    }
    if (key === 'maxPrice')
    {
      return <span>{value} CGAS</span>
    }
    if (key === 'maxBuyer')
    {
      const addr = value.replace(/^(.{4})(.*)(.{4})$/, '$1...$3');
      return <span><a onClick={this.toAddrInfo.bind(this, value)} href="javascript:;">{addr}</a></span>
    }
    if (key === 'ttl')
    {
      value = formatTime.format('yyyy/MM/dd | hh:mm:ss', value.toString(), this.props.intl.locale)
      return <span className="small-font">{value}</span>
    }
    return null;
  }
  // 跳转到域名价值排行列表页
  public onViewAucted = () =>
  {
    this.props.history.push('/nnsrank/');
  }
  // 跳转到域名详情页
  public toNNSInfo = (domain: string) =>
  {
    this.props.history.push('/nnsinfo/' + domain)
  }
  // 跳转到交易详情页
  public toTransInfo = (txid: string) =>
  {
    this.props.history.push('/transaction/' + txid)
  }
  // 跳转到域名详情页
  public toAddrInfo = (addr: string) =>
  {
    this.props.history.push('/address/' + addr)
  }
  public render()
  {
    return (
      <div className="rank-wrapper">
        <TitleText text={this.intrl.nns.title2} img={require('@/img/rank.png')} isTableTitle={true} >
          <Button text={this.intrl.btn.viewAll} onClick={this.onViewAucted} />
        </TitleText>
        <Table
          tableTh={this.auctedTableTh}
          tableData={this.props.nns.nnsAuctionedList && this.props.nns.nnsAuctionedList}
          render={this.renderAucted}
        />
      </div>
    );
  }
}

export default injectIntl(RankTable);
