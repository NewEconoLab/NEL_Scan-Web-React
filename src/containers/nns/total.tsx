/**
 * 域名相关统计模块
 */
import * as React from 'react';
import './index.less'
import { observer } from 'mobx-react';
import { INNSProps } from './interface/nns.interface';
import { injectIntl } from 'react-intl';
@observer
class Total extends React.Component<INNSProps,{}>
{
  public intrl = this.props.intl.messages;
  public componentDidMount()
  {
    this.props.nns.getStatistic();
  }
  public render()
  {
    return (
      <div className="nns-total">
        <div className="total-box">
          <div className="total-smallbox">
            <div className="total-content">
              <strong className="total-data">{this.props.nns.nnsTotal ? this.props.nns.nnsTotal.bonus:0} CGAS</strong>
              <strong className="total-type">{this.intrl.nns.pool}</strong>
            </div>
          </div>
          <div className="total-smallbox">
            <div className="total-content">
              <strong className="total-data">{this.props.nns.nnsTotal ? this.props.nns.nnsTotal.profit:0} CGAS</strong>
              <strong className="total-type">{this.intrl.nns.dividends}</strong>
            </div>
          </div>
          <div className="total-smallbox">
            <div className="total-content">
              <strong className="total-data">{this.props.nns.nnsTotal ? this.props.nns.nnsTotal.usedDomainCount:0}</strong>
              <strong className="total-type">{this.intrl.nns.registered}</strong>
            </div>
          </div>
          <div className="total-smallbox">
            <div className="total-content">
              <strong className="total-data">{this.props.nns.nnsTotal ? this.props.nns.nnsTotal.auctingDomainCount:0}</strong>
              <strong className="total-type">{this.intrl.nns.live}</strong>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default injectIntl(Total);
