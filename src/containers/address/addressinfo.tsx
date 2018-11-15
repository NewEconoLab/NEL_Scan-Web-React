/**
 * 地址详情页
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import TitleText from '@/components/titletext/index';
import Table from '@/components/Table/Table';
import './index.less'
import { IAddressInfoProps } from './interface/addressinfo.interface';
import * as formatTime from 'utils/formatTime';
import { toThousands } from '@/utils/numberTool';
import { injectIntl } from 'react-intl';
import Page from '@/components/Page';
@inject('addressinfo')
@observer
class AddressInfo extends React.Component<IAddressInfoProps, {}> {
  public state = {
    address: '',
    utxoPage: 1,
    utxoSize: 15,
    transPage: 1,
    transSize: 15,
  }
  public intrl = this.props.intl.messages;
  // 资产
  public balanceTableTh = [
    {
      name: this.intrl.tableTh.asset,
      key: 'asset'
    },
    {
      name: this.intrl.tableTh.amount,
      key: 'amount'
    }
  ]
  // 交易
  public transTableTh = [
    {
      name: this.intrl.tableTh.type,
      key: 'type'
    },
    {
      name: this.intrl.tableTh.txid,
      key: 'txid'
    },
    {
      name: this.intrl.tableTh.height,
      key: 'height'
    },
    {
      name: this.intrl.tableTh.create,
      key: 'time'
    }
  ]
  // utxo
  public utxoTableTh = [
    {
      name: this.intrl.tableTh.asset,
      key: 'asset'
    },
    {
      name: this.intrl.tableTh.amount,
      key: 'value'
    },
    {
      name: this.intrl.tableTh.txid,
      key: 'txid'
    }
  ]
  // 交易列表用到的img
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
  public async componentDidMount() {
    const params = this.props.match.params;
    this.setState({
      address: params["address"]
    });
    this.props.addressinfo.getAddressInfo(params["address"]);
    this.props.addressinfo.getAddressBalance(params["address"]);
    this.props.addressinfo.getAddressNep5Asset(params["address"]);
    this.props.addressinfo.getAddressTrans(params["address"], this.state.transSize, this.state.transPage);
    this.getUtxoList(params["address"]);
  }

  // 获取utxo列表
  public getUtxoList = (address: string) => {
    return this.props.addressinfo.getAddrUtxoList(address, this.state.utxoPage, this.state.utxoSize)
  }
  // 返回地址列表
  public onGoBack = () => {
    this.props.history.push('/addresses/');
  }
  // 列表特殊处理
  public renderUtxo = (value, key) => {
    if (key === 'txid') {
      // const txid = value.replace(/^(.{4})(.*)(.{4})$/, '$1...$3');
      return <>
        <span className="addr-utxo-text"><a href="javascript:;" onClick={this.goTransInfo.bind(this, value)}>{value}</a></span>
        <span className="addr-utxo-text-mobile"><a href="javascript:;" onClick={this.goTransInfo.bind(this, value)}>{value.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a></span>
      </>
    }
    return null;
  }
  // 列表特殊处理
  public renderTran = (value, key) => {
    if (key === 'type') {
      value = value.replace('Transaction', '');
      return <span className="img-text-bg"><img src={this.imgs[value.toLowerCase()]} alt="" />{value}</span>
    }

    if (key === 'txid') {
      const txid = value.replace(/^(.{4})(.*)(.{4})$/, '$1...$3');
      return <span><a href="javascript:;" onClick={this.goTransInfo.bind(this, value)}>{txid}</a></span>
    }
    if (key === 'blockindex') {
      return <span><a href="javascript:;" onClick={this.goBlockInfo.bind(this, value)}>{toThousands(value.toString())}</a></span>
    }
    if (key === 'time') {
      const time = formatTime.format('yyyy/MM/dd | hh:mm:ss', value.toString(), this.props.intl.locale);
      return <span>{time}</span>
    }
    return null;
  }
  // 交易详情链接
  public goTransInfo = (txid: string) => {
    this.props.history.push('/transaction/' + txid)
  }
  // 区块详情链接
  public goBlockInfo = (index: string) => {
    this.props.history.push('/block/' + index)
  }
  // trans翻页功能
  public onTransPage = (index: number) => {
    this.setState({
      transPage: index
    }, () => {
      this.props.addressinfo.getAddressTrans(this.state.address, this.state.transSize, this.state.transPage);
    })
  }
  // utxo翻页功能
  public onUtxoPage = (index: number) => {
    this.setState({
      utxoPage: index
    }, () => {
      this.getUtxoList(this.state.address);
    })
  }
  public render() {
    if (!!!this.props.addressinfo.addrInfo) {
      return null
    }
    return (
      <div className="addressinfo-page">
        <div className="goback-wrapper">
          <span className="goback-text" onClick={this.onGoBack}>&lt;&lt;  {this.intrl.btn.goback}</span>
        </div>
        <div className="info-content">
          <TitleText text={this.intrl.address.titleinfo1} isInfoTitle={true} />
          <div className="info-list">
            <ul>
              <li>
                <span className="type-name">{this.intrl.address.address}</span>
                <span className="type-content">{this.state.address}</span>
              </li>
              <li>
                <span className="type-name">{this.intrl.address.create}</span>
                <span className="type-content">
                  {this.props.addressinfo.addrInfo && formatTime.format('yyyy/MM/dd | hh:mm:ss', this.props.addressinfo.addrInfo.firstuse.blocktime.$date.toString(), this.props.intl.locale)}
                </span>
              </li>
              <li>
                <span className="type-name">{this.intrl.address.transaction}</span>
                <span className="type-content">{this.props.addressinfo.addrInfo && this.props.addressinfo.addrInfo.txcount}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="addressinfo-balance-wrapper">
          <TitleText text={this.intrl.address.titleinfo2} />
          <div className="address-balance-table">
            <Table
              tableTh={this.balanceTableTh}
              tableData={this.props.addressinfo.addrBalanceList}
            />
          </div>
        </div>
        <div className="addressinfo-tran-wrapper">
          <TitleText text={this.intrl.address.titleinfo3} />
          <div className="address-trans-table">
            <Table
              tableTh={this.transTableTh}
              tableData={this.props.addressinfo.addrTransList}
              render={this.renderTran}
            />
            <Page
              totalCount={this.props.addressinfo.addrInfo && this.props.addressinfo.addrInfo.txcount}
              pageSize={this.state.transSize}
              currentPage={this.state.transPage}
              onChange={this.onTransPage}
            />
          </div>

        </div>
        <div className="addressinfo-utxo-wrapper">
          <TitleText text={this.intrl.address.titleinfo4} />
          <div className="addrinfo-utxo-table">
            <Table
              tableTh={this.utxoTableTh}
              tableData={this.props.addressinfo.addrUtxoList && this.props.addressinfo.addrUtxoList.list}
              render={this.renderUtxo}
              className="address-utxo-table"
            />
            <Page
              totalCount={this.props.addressinfo.addrUtxoList && this.props.addressinfo.addrUtxoList.count}
              pageSize={this.state.utxoSize}
              currentPage={this.state.utxoPage}
              onChange={this.onUtxoPage}
            />
          </div>

        </div>
      </div>
    );
  }
}

export default injectIntl(AddressInfo);
