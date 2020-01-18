/**
 * 交易列表页
 */
import * as React from 'react';
import './index.less'
import { ITransactionsProps } from './interface/transaction.interface';
import { observer, inject } from 'mobx-react';
import { injectIntl } from 'react-intl';
import Alltx from './alltx';
import Nep5tx from './nep5tx';

@inject('transaction')
@observer
class Transactions extends React.Component<ITransactionsProps, {}>
{
  public intrl = this.props.intl.messages;
  public state = {
    showTranType: false,// 显示表格列表选择
    showTable: 0 // 交易表格的切换，0为默认所有交易，1为nep5的交易
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
  public render() {

    return (
      <div className="transaction-page">
        {/* <div className="tran-title-wrapper" onClick={this.onShowType}>
          <img src={require('@/img/transactions.png')} alt="" />
          <h3 className="tran-title">
            {this.state.showTable === 0 ?
              this.intrl.transaction.alltx :
              (process.env.REACT_APP_SERVER_ENV === "NEO3" ? this.intrl.transaction.transfer : this.intrl.transaction.nep5tx)
            }
          </h3>
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
        </div> */}
        <div className="tran-title-wrapper">
          <img src={require('@/img/transactions.png')} alt="" />
          <div
            className={`tran-title-label ${this.state.showTable === 0 ? 'active' : ''}`}
            onClick={this.onClickType.bind(this, 0)}
          >
            {this.intrl.transaction.alltx}
          </div>
          <div
            className={`tran-title-label ${this.state.showTable === 1 ? 'active' : ''}`}
            onClick={this.onClickType.bind(this, 1)}
          >
            {process.env.REACT_APP_SERVER_ENV === "NEO3" ? this.intrl.transaction.transfer : this.intrl.transaction.nep5tx}
          </div>
        </div>
        {/* <div className="tran-title-label">{this.intrl.transaction.nep5tx}</div> */}
        {
          this.state.showTable === 0 && (<Alltx {...this.props} />)
        }
        {
          this.state.showTable === 1 && (<Nep5tx {...this.props} />)
        }

      </div>
    );
  }
}

export default injectIntl(Transactions);
