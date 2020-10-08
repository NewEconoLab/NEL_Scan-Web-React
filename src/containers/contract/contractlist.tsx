/**
 * 合约列表页
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import TitleText from '@/components/titletext/index';
import Table from '@/components/Table/Table';
import * as formatTime from 'utils/formatTime';
import { injectIntl } from 'react-intl';
import Page from '@/components/Page';
import './index.less'
import { IContractListProps } from './interface/contractlist.interface';

@inject('contractlist')
@observer
class Contracts extends React.Component<IContractListProps, {}> {
  public intrl = this.props.intl.messages;
  public addrTableTh = [
    {
      name: this.intrl.tableTh.contract,
      key: 'contractHash'
    },
    {
      name: this.intrl.tableTh.ctime,
      key: 'deployTime'
    },
    {
      name: this.intrl.tableTh.cname,
      key: 'name'
    },
    {
      name: this.intrl.tableTh.cauthor,
      key: 'author'
    }
  ]
  public state = {
    currentPage: 1,
    pageSize: 15
  }
  // 初始化数据
  public componentDidMount() {
    this.props.contractlist.getContractList(this.state.currentPage, this.state.pageSize);
  }
  public componentWillUnmount() {
    this.props.contractlist.conList = [];
  }
  // 列表特殊处理
  public renderAddress = (value, key) => {
    if (key === 0) {
      return <li className="contr-text">{value}</li>
    }
    if (key === 'contractHash') {
      return <>
        <span className="contr-text"><a onClick={this.toContractInfo.bind(this, value)} href="javascript:;">{value}</a></span>
        <span className="contr-text-mobile"><a onClick={this.toContractInfo.bind(this, value)} href="javascript:;">{value.replace(/^(.{4})(.*)(.{4})$/, '$1...$3')}</a></span>
      </>
    }
    if (key === 'deployTime') {
      const time = formatTime.format('yyyy/MM/dd | hh:mm:ss', value.toString(), this.props.intl.locale);
      return <span>{time}</span>
    }
    if (key === 'name') {
      const name = value ? value : '-';
      return <span>{name}</span>
    }
    if (key === 'author') {
      const author = value ? value : '-';
      return <span>{author}</span>
    }
    return null;
  }
  // 跳转到详情页
  public toContractInfo = (address: string) => {
    this.props.history.push('/contract/' + address)
  }
  // 翻页功能
  public onGoPage = (index: number) => {
    this.setState({
      currentPage: index
    }, () => {
      this.props.contractlist.getContractList(this.state.currentPage, this.state.pageSize);
    })
  }
  public render() {
    if (!this.props.contractlist.conCount) {
      return null;
    }

    return (
      <div className="contracts-page">
        <TitleText text={this.intrl.contract.title5} img={require('@/img/address.png')} />
        <div className="contracts-table-wrapper">
          <Table
            tableTh={this.addrTableTh}
            tableData={this.props.contractlist.conList}
            render={this.renderAddress}
            className="contracts-table"
          />
          <Page
            totalCount={parseInt(this.props.contractlist.conCount, 10)}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onChange={this.onGoPage}
          />
        </div>
      </div>
    );
  }
}

export default injectIntl(Contracts);
