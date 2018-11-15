/**
 * 交易列表页
 */
import * as React from 'react';
import TitleText from '@/components/titletext/index';
import Table from '@/components/Table/Table';
import Select from '@/components/select';
import { toThousands } from '@/utils/numberTool';
import './index.less'
import { ITransactionsProps } from './interface/transaction.interface';
import { observer, inject } from 'mobx-react';
import { injectIntl } from 'react-intl';
import Page from '@/components/Page';

@inject('transaction')
@observer
class Transactions extends React.Component<ITransactionsProps, {}>
{
  public intrl = this.props.intl.messages;
  public options = [
    {
      id: 'all',
      name: "All",
    },
    {
      id: 'ContractTransaction',
      name: "Contract",
    },
    {
      id: 'ClaimTransaction',
      name: "Claim",
    },
    {
      id: 'InvocationTransaction',
      name: "Invocation",
    },
    {
      id: 'MinerTransaction',
      name: "Miner",
    },
    {
      id: 'IssueTransaction',
      name: "Issue"
    },
    {
      id: 'RegisterTransaction',
      name: "Register",
    },
    {
      id: 'PublishTransaction',
      name: "Publish",
    },
    {
      id: 'EnrollmentTransaction',
      name: "Enrollment",
    },
    {
      id: 'AgencyTransaction',
      name: "Agency",
    }
  ]
  public transTableTh = [
    {
      name: this.intrl.tableTh.type,
      key: 'type',
    },
    {
      name: this.intrl.tableTh.txid,
      key: 'txid'
    }, {
      name: this.intrl.tableTh.height,
      key: 'blockindex'
    }, {
      name: this.intrl.tableTh.size,
      key: 'size'
    }
  ]
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
  public state = {
    currentPage: 1,
    pageSize: 15,
    type: "all"
  }
  
  // public componentWillUnmount() {
  //   this.props.transaction.transList = null;
  // }
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
    if (key === 'size') {
      return <span>{value} bytes</span>
    }
    return null;
  }
  // 区块详情链接
  public goBlockInfo = (index: string) => {
    this.props.history.push('/block/' + index)
  }
  // 交易详情链接
  public goTransInfo = (txid: string) => {
    this.props.history.push('/transaction/' + txid)
  }
  // 下拉选择功能
  public onCallback = (item) => {
    this.setState({
      currentPage: 1,
      type: item.id
    }, () => {
      this.props.transaction.getTransList(this.state.currentPage, this.state.pageSize, this.state.type);
    })
  }
  // 翻页功能
  public onGoPage = (index: number) => {
    this.setState({
      currentPage: index
    }, () => {
      this.props.transaction.getTransList(this.state.currentPage, this.state.pageSize, this.state.type);
    })
  }
  public render() {

    return (
      <div className="transaction-page">
        <TitleText text={this.intrl.transaction.title1} img={require('@/img/transactions.png')} isInline={true}>
          <Select options={this.options} text="Type" onCallback={this.onCallback} />
        </TitleText>
        {
          this.props.transaction.transList && (
            <div className="transaction-table">
              <Table
                tableTh={this.transTableTh}
                tableData={this.props.transaction.transList && this.props.transaction.transList.list}
                render={this.renderTran}
              />
              <Page
                totalCount={this.props.transaction.transList && this.props.transaction.transList.count}
                pageSize={this.state.pageSize}
                currentPage={this.state.currentPage}
                onChange={this.onGoPage}
              />
            </div>
          )
        }
      </div>
    );
  }
}

export default injectIntl(Transactions);
