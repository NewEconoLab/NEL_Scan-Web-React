/**
 * 主页统计模块
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import Button from '@/components/Button/Button'
import './index.less'
import { IHomeProps } from './interface/home.interface';
import { injectIntl } from 'react-intl';

@observer
class Topstatistic extends React.Component<IHomeProps, any>
{
  public intrl = this.props.intl.messages;
  public componentDidMount() {
    this.props.home.getBlockHeight();
    this.props.home.getTxCount('');
    this.props.home.getAddrCount();
  }
  // 跳转到区块列表页
  public onViewBlock = () => {
    this.props.history.push('/blocks/');
  }
  // 跳转到交易列表页
  public onViewTran = () => {
    this.props.history.push('/transactions/');
  }
  // 跳转到地址列表页
  public onViewAddress = () => {
    this.props.history.push('/addresses/');
  }
  public render() {
    return (
      <div className="index-statistic">
        <div className="statistic-box">
          <div className="statistic-smallbox">
            {
              process.env.REACT_APP_SERVER_ENV !== 'PUB' && <img src={require('@/img/blocksbg-t.png')} alt="blocksbg.png" />
            }
            {
              process.env.REACT_APP_SERVER_ENV === 'PUB' && <img src={require('@/img/blocksbg-m.png')} alt="blocksbg.png" />
            }
            <div className="statistic-content">
              <strong className="statistic-data">{this.props.home.blockCount}</strong>
              <strong className="statistic-type">{this.intrl.home.lastBlock}</strong>
              <Button text={this.intrl.btn.viewAll} bgBtn={true} onClick={this.onViewBlock} />
            </div>
          </div>
          <div className="statistic-smallbox">
            {
              process.env.REACT_APP_SERVER_ENV !== 'PUB' && <img src={require('@/img/tranbg-t.png')} alt="tranbg.png" />
            }
            {
              process.env.REACT_APP_SERVER_ENV === 'PUB' && <img src={require('@/img/tranbg-m.png')} alt="tranbg.png" />
            }
            <div className="statistic-content">
              <strong className="statistic-data">{this.props.home.txCount}</strong>
              <strong className="statistic-type">{this.intrl.home.totalTrans}</strong>
              <Button text={this.intrl.btn.viewAll} bgBtn={true} onClick={this.onViewTran} />
            </div>
          </div>
          <div className="statistic-smallbox">
            {
              process.env.REACT_APP_SERVER_ENV !== 'PUB' && <img src={require('@/img/addrbg-t.png')} alt="addrbg.png" />
            }
            {
              process.env.REACT_APP_SERVER_ENV === 'PUB' && <img src={require('@/img/addrbg-m.png')} alt="addrbg.png" />
            }
            <div className="statistic-content">
              <strong className="statistic-data">{this.props.home.addrCount}</strong>
              <strong className="statistic-type">{this.intrl.home.totalAddr}</strong>
              <Button text={this.intrl.btn.viewAll} bgBtn={true} onClick={this.onViewAddress} />
            </div>
          </div>
        </div>
        <div className="mobile-statistic-box">
          <div className="statistic-smallbox">
            <div className="statistic-content">
              <strong className="statistic-data">{this.props.home.blockCount}</strong>
              <strong className="statistic-type">{this.intrl.home.lastBlock}</strong>
              <Button text={this.intrl.btn.viewAll} mobileBtn={true} onClick={this.onViewBlock} />
            </div>
          </div>
          <div className="statistic-smallbox">
            <div className="statistic-content">
              <strong className="statistic-data">{this.props.home.txCount}</strong>
              <strong className="statistic-type">{this.intrl.home.totalTrans}</strong>
              <Button text={this.intrl.btn.viewAll} mobileBtn={true} onClick={this.onViewTran} />
            </div>
          </div>
          <div className="statistic-smallbox">
            <div className="statistic-content">
              <strong className="statistic-data">{this.props.home.addrCount}</strong>
              <strong className="statistic-type">{this.intrl.home.totalAddr}</strong>
              <Button text={this.intrl.btn.viewAll} mobileBtn={true} onClick={this.onViewAddress} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(Topstatistic);
