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
import AddrNep5Tx from './nep5tx';
@inject('addressinfo')
@observer
class AddressInfo extends React.Component<IAddressInfoProps, {}> {
  public state = {
    address: '',
    utxoPage: 1,
    utxoSize: 15,
    transPage: 1,
    transSize: 15,
    showTranType: false,// 显示表格列表选择
    showTable: process.env.REACT_APP_SERVER_ENV === "NEO3" ? 1 : 0 // 交易表格的切换，0为默认所有交易，1为nep5的交易
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
  public transTableTh = process.env.REACT_APP_SERVER_ENV === "NEO3" ?
    [
      {
        name: this.intrl.tableTh.txid,
        key: 'txid'
      },
      {
        name: this.intrl.tableTh.sender,
        key: 'sender'
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
    :
    [
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
      address: params[ "address" ]
    });
    this.initAddress(params[ "address" ]);
  }
  public initAddress = (address: string) => {
    this.props.addressinfo.getAddressInfo(address);
    this.props.addressinfo.getBindDomain(address);
    this.props.addressinfo.getAddressBalance(address);
    this.props.addressinfo.getAddressNep5Asset(address);
    this.props.addressinfo.getAddressTrans(address, this.state.transSize, this.state.transPage);
    this.getUtxoList(address);
  }
  public componentWillUnmount() {
    this.props.addressinfo.addrBalanceList = [];
    this.props.addressinfo.addrTransList = [];
    this.props.addressinfo.addrUtxoList = [];
    this.props.addressinfo.addrUtxoListCount = 0;
  }
  // 显示标题下拉
  public onShowType = () => {
    this.setState({
      showTranType: !this.state.showTranType
    })
  }
  // 点击选择标题
  public onClickType = (type: number) => {
    if (type === 0) {
      this.setState({
        showTable: 0
      })
    }
    else if (type === 1) {
      this.setState({
        showTable: 1
      })
    }
  }
  // 切换地址，刷新页面
  public refreshAddress = (address: string) => {
    this.props.addressinfo.addrBalanceList = [];
    this.props.addressinfo.addrTransList = [];
    this.props.addressinfo.addrUtxoList = [];
    this.props.addressinfo.addrUtxoListCount = 0;
    this.initAddress(address);
    this.setState({
      address: address
    })
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
      return <span className="img-text-bg"><img src={this.imgs[ value.toLowerCase() ]} alt="" />{value}</span>
    }
    // if (key === 'addr' && value) {
    //   const addr = value.replace(/^(.{4})(.*)(.{4})$/, '$1...$3');
    //   return <span><a href="javascript:;" onClick={this.goAddrInfo.bind(this, value)}>{addr}</a></span>
    // }

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
  public goAddrInfo = (addr: string) => {
    this.props.history.push('/address/' + addr)
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
    if (!this.props.addressinfo.addrInfo) {
      return (
        <div className="nodata-wrap">
          <img src={require('@/img/nodata.png')} alt="" />
          <p>{this.intrl.nodata.msg}</p>
        </div>
      )
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
              {
                this.props.addressinfo.bindDomainName !== '' && (
                  <li>
                    <span className="type-name">{this.intrl.address.binddomain}</span>
                    <span className="type-content">{this.props.addressinfo.bindDomainName}</span>
                  </li>
                )
              }
              <li>
                <span className="type-name">{this.intrl.address.create}</span>
                <span className="type-content">
                  {this.props.addressinfo.addrInfo && this.props.addressinfo.addrInfo.firstuse && formatTime.format('yyyy/MM/dd | hh:mm:ss', this.props.addressinfo.addrInfo.firstuse.blocktime.$date.toString(), this.props.intl.locale)}
                </span>
              </li>
              <li>
                <span className="type-name">{this.intrl.address.transaction}</span>
                <span className="type-content">{this.props.addressinfo.addrInfo && this.props.addressinfo.addrInfo.txcount && this.props.addressinfo.addrInfo.txcount}</span>
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
          {/* <TitleText text={this.intrl.address.titleinfo3} /> */}
          <div className="tran-title-wrapper" onClick={this.onShowType}>
            <h3 className="tran-title">{this.state.showTable === 0 ? this.intrl.transaction.alltx :
              (process.env.REACT_APP_SERVER_ENV === "NEO3" ? this.intrl.transaction.transfer : this.intrl.transaction.nep5tx)}</h3>
            <div className="select-trantype">
              <span className="triangle" />
              {
                this.state.showTranType && (
                  <div className="trantype-list">
                    <div className="qipao-wrapper">
                      <div className="arrow" />
                    </div>
                    <ul className="type-list">
                      <li onClick={this.onClickType.bind(this, 0)}>{this.intrl.transaction.alltx}</li>
                      <li onClick={this.onClickType.bind(this, 1)}>{process.env.REACT_APP_SERVER_ENV === "NEO3" ? this.intrl.transaction.transfer : this.intrl.transaction.nep5tx}</li>
                    </ul>
                  </div>
                )
              }
            </div>
          </div>
          {
            this.state.showTable === 0 && (
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
            )
          }
          {
            this.state.showTable === 1 && <AddrNep5Tx {...this.props} refresh={this.refreshAddress} />
          }
        </div>
        {process.env.REACT_APP_SERVER_ENV !== "NEO3" &&
          <div className="addressinfo-utxo-wrapper">
            <TitleText text={this.intrl.address.titleinfo4} />
            <div className="addrinfo-utxo-table">
              <Table
                tableTh={this.utxoTableTh}
                tableData={this.props.addressinfo.addrUtxoList && this.props.addressinfo.addrUtxoList}
                render={this.renderUtxo}
                className="address-utxo-table"
              />
              <Page
                totalCount={this.props.addressinfo.addrUtxoListCount && this.props.addressinfo.addrUtxoListCount}
                pageSize={this.state.utxoSize}
                currentPage={this.state.utxoPage}
                onChange={this.onUtxoPage}
              />
            </div>
          </div>
        }
      </div>
    );
  }
}

export default injectIntl(AddressInfo);
