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
import { injectIntl } from 'react-intl';

@inject("nnsinfo")
@observer
class NNSInfo extends React.Component<INNSInfoProps, {}> {
  public intrl = this.props.intl.messages;
  public state = {
    isAuctingDomain: true
  }
  public async componentDidMount() {
    const params = this.props.match.params;
    this.setState({
      address: params["domain"]
    });
    await this.props.nnsinfo.getAuctionInfo(params["domain"]);

    if (this.props.nnsinfo.nnsInfo && this.props.nnsinfo.nnsInfo.auctionState === '0401') {
      this.setState({
        isAuctingDomain: false
      }, () => {
        this.props.nnsinfo.getAuctionedInfo(params["domain"]);

      })
    }
  }
  public componentWillUnmount() {
    this.props.nnsinfo.nnsInfo = null;
  }
  // 返回域名列表
  public onGoBack = () => {
    this.props.history.goBack();
  }
  public render() {
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
        <TitleText text={this.intrl.nns.titleinfo2} isInfoTitle={this.state.isAuctingDomain} />
        <div className="info-content">
          <AuctionInfo {...this.props} />
        </div>
        {/* <TitleText text="Transfer information" isInline={true} /> */}
        {/* <Table tableTh={this.tableTh} tableData={this.tableData} isHasPage={true} /> */}
        {
          this.props.nnsinfo.nnsInfo && <NNSInfoTable {...this.props} />
        }

      </div>
    );
  }
}

export default injectIntl(NNSInfo);
