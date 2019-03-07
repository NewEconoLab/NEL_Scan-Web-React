/**
 * 域名详情页
 */
import * as React from 'react';
import TitleText from '@/components/titletext/index';
import DomainInfo from './domaininfo';
import AuctionInfo from './auctioninfo';
import '../index.less'
import { INNSInfoProps } from '@/containers/nns/interface/nnsinfo.interface';
import { inject, observer } from 'mobx-react';
import NNSInfoTable from '@/containers/nns/nnsinfo/nnsinfotable';
import * as formatTime from 'utils/formatTime';
import Table from '@/components/Table/Table';
import Page from '@/components/Page';
import { injectIntl } from 'react-intl';

@inject("nnsinfo")
@observer
class NNSInfo extends React.Component<INNSInfoProps, {}> {
  public intrl = this.props.intl.messages;
  public state = {
    isAuctingDomain: true,
    currentPage: 1,
    pageSize: 15
  }
  public transferTableTh = [
    {
      name: this.intrl.tableTh.transfer,
      key: 'seller'
    },
    {
      name: this.intrl.tableTh.price,
      key: 'price'
    },
    {
      name: this.intrl.tableTh.transfertime,
      key: 'time'
    }
  ]
  public async componentDidMount()
  {
    const params = this.props.match.params;
    this.setState({
      address: params["domain"]
    });
    await this.props.nnsinfo.getAuctionInfo(params["domain"]);
    if (this.props.nnsinfo.nnsInfo)
    {
      this.getAuctionTransList(this.props.nnsinfo.nnsInfo.fulldomain);
    }
    if (this.props.nnsinfo.nnsInfo && this.props.nnsinfo.nnsInfo.auctionState === '0401')
    {
      this.setState({
        isAuctingDomain: false
      }, () =>
        {
          this.props.nnsinfo.getAuctionedInfo(params["domain"]);
        })
    }
  }
  public componentWillUnmount()
  {
    this.props.nnsinfo.nnsInfo = null;
    this.props.nnsinfo.domainBidInfoCount = 0;
    this.props.nnsinfo.domainBidInfoList = [];
    this.props.nnsinfo.domainBidRankCount = 0;
    this.props.nnsinfo.domainBidRankList = [];
    this.props.nnsinfo.domainTransCount = 0;
    this.props.nnsinfo.domainTransList = [];
  }
  // 加价排行列表特殊处理
  public renderTransferRank = (value, key) =>
  {
    if (key === 'seller')
    {
      return <span><a onClick={this.toAddrInfo.bind(this, value)} href="javascript:;">{value}</a></span>
    }
    if (key === 'price')
    {
      return <span>{value} NNC</span>
    }
    if (key === 'time')
    {
      value = formatTime.format('yyyy/MM/dd | hh:mm:ss', value.toString(), this.props.intl.locale);
      return <span>{value}</span>
    }
    return null;
  }
  // 跳转到地址详情页
  public toAddrInfo = (addr: string) =>
  {
    this.props.history.push('/address/' + addr)
  }
  // 返回域名列表
  public onGoBack = () =>
  {
    this.props.history.goBack();
  }
  // 列表翻页功能
  public onBidInfoPage = (index: number) =>
  {
    this.setState({
      currentPageBidInfo: index
    }, () =>
      {
        if (this.props.nnsinfo.nnsInfo)
        {
          this.getAuctionTransList(this.props.nnsinfo.nnsInfo.fulldomain);
        }
      })
  }
  // 获取竞拍排行列表
  public getAuctionTransList(domain)
  {
    return this.props.nnsinfo.getDomainTrans(domain, this.state.currentPage, this.state.pageSize);
  }
  public render()
  {
    if (!this.props.nnsinfo.nnsInfo)
    {
      return (
        <div className="nodata-wrap">
          <img src={require('@/img/nodata.png')} alt="" />
          <p>{this.intrl.nodata.msg}</p>
        </div>
      )
    }
    return (
      <div className="nnsinfo-page">
        <div className="goback-wrapper">
          <span className="goback-text" onClick={this.onGoBack} >&lt;&lt;  {this.intrl.btn.goback2}</span>
        </div>
        {
          (this.props.nnsinfo.nnsInfo && this.props.nnsinfo.nnsInfo.auctionState === '0401') && (
            <div className="info-content">
              <DomainInfo {...this.props} />
            </div>
          )
        }
        {
          (this.props.nnsinfo.domainTransList && this.props.nnsinfo.domainTransList.length !== 0) && (
            <>
              <TitleText text={this.intrl.nns.titleinfo3} isInline={true} />
              <div className="transinfo-table">
                <Table
                  tableTh={this.transferTableTh}
                  tableData={this.props.nnsinfo.domainTransList && this.props.nnsinfo.domainTransList}
                  render={this.renderTransferRank}
                />
                <Page
                  totalCount={this.props.nnsinfo.domainTransCount}
                  pageSize={this.state.pageSize}
                  currentPage={this.state.currentPage}
                  onChange={this.onBidInfoPage}
                />
              </div>
            </>
          )
        }
        <TitleText text={this.intrl.nns.titleinfo2} isInfoTitle={this.state.isAuctingDomain} />
        <div className="info-content">
          <AuctionInfo {...this.props} />
        </div>
        {
          this.props.nnsinfo.nnsInfo && <NNSInfoTable {...this.props} />
        }
      </div>
    );
  }
}

export default injectIntl(NNSInfo);
