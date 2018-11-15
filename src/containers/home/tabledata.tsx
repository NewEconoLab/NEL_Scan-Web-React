/**
 * 主页表格模块
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import TitleText from '@/components/titletext/index';
import Button from '@/components/Button/Button';
import Table from '@/components/Table/Table';
import './index.less';
import { IHomeProps } from './interface/home.interface';
import * as formatTime from 'utils/formatTime';
import { toThousands } from '@/utils/numberTool'
import { injectIntl } from 'react-intl';

@observer
class TableData extends React.Component<IHomeProps, any>
{
  public intrl = this.props.intl.messages;
  public blockTableTh = [
    {
      name: this.intrl.tableTh.height,
      key: 'index'
    },
    {
      name: this.intrl.tableTh.size,
      key: 'size'
    },
    {
      name: this.intrl.tableTh.transaction,
      key: 'txcount'
    },
    {
      name: this.intrl.tableTh.create,
      key: 'time'
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
  // img数据处理
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
  // 初始
  public componentDidMount() {
    this.props.home.getBlockList(10, 1);
    this.props.home.getTransList(10, 1, '');
  }
  // 区块列表特殊处理
  public renderBlock = (value, key) => {
    if (key === 'index') {
      // const href = this.props.history.location.pathname =  '/block/' + value;
      return <span className="img-text"><img src={require('@/img/height.png')} alt="" /><a onClick={this.toBlockInfo.bind(this, value)} href="javascript:;">{toThousands(value.toString())}</a></span>
    }

    if (key === 'time') {
      value = formatTime.format('yyyy/MM/dd | hh:mm:ss', value.toString(), this.props.intl.locale)
      return <span className="small-font">{value}</span>
    }
    return null;
  }
  // 交易列表特殊处理
  public renderTran = (value, key) => {
    if (key === 'type') {
      value = value.replace('Transaction', '')
      return <span className="img-text"><img src={this.imgs[value.toLowerCase()]} alt="" />{value}</span>
    }

    if (key === 'txid') {
      const txid = value.replace(/^(.{4})(.*)(.{4})$/, '$1...$3');
      return <span><a href="javascript:;" onClick={this.toTransInfo.bind(this, value)}>{txid}</a></span>
    }
    if (key === 'size') {
      return <span>{value} bytes</span>
    }
    return null;
  }
  // 跳转到区块列表页
  public onViewBlock = () => {
    this.props.history.push('/blocks/');
  }
  // 跳转到交易列表页
  public onViewTran = () => {
    this.props.history.push('/transactions/');
  }
  // 跳转到区块详情页
  public toBlockInfo = (index: string) => {
    this.props.history.push('/block/' + index)
  }
  // 跳转到交易详情页
  public toTransInfo = (txid: string) => {
    this.props.history.push('/transaction/' + txid)
  }

  public render() {
    return (
      <div className="tabledata-page">
        <div className="block-table">
          <Table tableTh={this.blockTableTh} tableData={this.props.home.blockList} render={this.renderBlock}>
            <TitleText text={this.intrl.home.blocks} isTableTitle={true} img={require('@/img/blocks.png')}>
              <Button text={this.intrl.btn.viewAll} onClick={this.onViewBlock} />
            </TitleText>
          </Table>
        </div>
        <div className="tran-table">
          <Table tableTh={this.transTableTh} tableData={this.props.home.transList} render={this.renderTran}>
            <TitleText text={this.intrl.home.transactions} isTableTitle={true} img={require('@/img/transactions.png')} >
              <Button text={this.intrl.btn.viewAll} onClick={this.onViewTran} />
            </TitleText>
          </Table>
        </div>
      </div >
    );
  }
}

export default injectIntl(TableData);
