/**
 * 主页统计模块
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import Button from '@/components/Button/Button'
import './index.less'
import { IHomeProps } from './interface/home.interface';
import { injectIntl } from 'react-intl';
import { saveDecimal, toThousands } from '@/utils/numberTool';
import Echarts from 'echarts';
import chartsOptions from './txechart';

@observer
class Topstatistic extends React.Component<IHomeProps, any>
{
  public intrl = this.props.intl.messages;
  private myCahrt: Echarts.ECharts | null = null;
  public componentDidMount() {
    this.props.home.getBlockHeight();
    this.props.home.getTxCount('');
    this.props.home.getAddrCount();
    this.props.home.getStatisData();
    this.handleGetHistoryData();
  }
  public componentWillUnmount() {
    if (this.myCahrt) {
      this.myCahrt.dispose();
    }
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
          {
            process.env.REACT_APP_SERVER_ENV !== 'DEV' ? (
              <>
                <div className="statistic-middlebox">
                  {
                    this.props.home.statisInfo && (
                      <>
                        <div className="middleline">
                          <div className="s-middleline">
                            <span>{this.intrl.home.neoprice}</span>
                            <span>${saveDecimal(this.props.home.statisInfo.neoPrice.toString(), 2)}</span>
                          </div>
                          <div className="s-middleline">
                            <span>{this.intrl.home.gasprice}</span>
                            <span>${saveDecimal(this.props.home.statisInfo.gasPrice.toString(), 2)}</span>
                          </div>
                          <div className="s-middleline">
                            <span>{this.intrl.home.sevenday}</span>
                            <span>{toThousands(this.props.home.statisInfo.activeAddrCount.toString())}</span>
                          </div>
                        </div>
                        <div className="middleline">
                          <div className="s-middleline">
                            <span>{this.intrl.home.neocount}</span>
                            <span>{toThousands(this.props.home.statisInfo.neoAddrCount.toString())}</span>
                          </div>
                          <div className="s-middleline">
                            <span>{this.intrl.home.gascount}</span>
                            <span>{toThousands(this.props.home.statisInfo.gasAddrCount.toString())}</span>
                          </div>
                          <div className="s-middleline">
                            <span>{this.intrl.home.totalcount}</span>
                            <span>{toThousands(this.props.home.statisInfo.txCount.toString())}</span>
                          </div>
                        </div>
                      </>
                    )
                  }

                </div>
                <div className="statistic-middlebox">
                  {/* <span>30天交易数</span> */}
                  <div className="statistic-tu" id="transEcharts" />
                </div>
              </>
            ) : (
                <>
                  <div className="statistic-smallbox">                  
                    {/* {
                      process.env.REACT_APP_SERVER_ENV === 'PUB' && <img src={require('@/img/blocksbg-t.png')} alt="blocksbg.png" />
                    } */}
                    {/* {
                      process.env.REACT_APP_SERVER_ENV === 'PUB' && <img src={require('@/img/blocksbg-m.png')} alt="blocksbg.png" />
                    } */}
                    <img src={require('@/img/blocksbg-t.png')} alt="blocksbg.png" />
                    <div className="statistic-content">
                      <strong className="statistic-data">{this.props.home.blockCount}</strong>
                      <strong className="statistic-type">{this.intrl.home.lastBlock}</strong>
                      <Button text={this.intrl.btn.viewAll} bgBtn={true} onClick={this.onViewBlock} />
                    </div>
                  </div>
                  <div className="statistic-smallbox">
                    {/* {
                      process.env.REACT_APP_SERVER_ENV !== 'PUB' && <img src={require('@/img/tranbg-t.png')} alt="tranbg.png" />
                    }
                    {
                      process.env.REACT_APP_SERVER_ENV === 'PUB' && <img src={require('@/img/tranbg-m.png')} alt="tranbg.png" />
                    } */}
                    <img src={require('@/img/tranbg-t.png')} alt="tranbg.png" />
                    <div className="statistic-content">
                      <strong className="statistic-data">{this.props.home.txCount}</strong>
                      <strong className="statistic-type">{this.intrl.home.totalTrans}</strong>
                      <Button text={this.intrl.btn.viewAll} bgBtn={true} onClick={this.onViewTran} />
                    </div>
                  </div>
                  <div className="statistic-smallbox">
                    {/* {
                      process.env.REACT_APP_SERVER_ENV !== 'PUB' && <img src={require('@/img/addrbg-t.png')} alt="addrbg.png" />
                    }
                    {
                      process.env.REACT_APP_SERVER_ENV === 'PUB' && <img src={require('@/img/addrbg-m.png')} alt="addrbg.png" />
                    } */}
                    <img src={require('@/img/addrbg-t.png')} alt="addrbg.png" />
                    <div className="statistic-content">
                      <strong className="statistic-data">{this.props.home.addrCount}</strong>
                      <strong className="statistic-type">{this.intrl.home.totalAddr}</strong>
                      <Button text={this.intrl.btn.viewAll} bgBtn={true} onClick={this.onViewAddress} />
                    </div>
                  </div>
                </>
              )
          }

        </div>
        <div className="mobile-statistic-box">
          {
            process.env.REACT_APP_SERVER_ENV !== 'DEV' ? (
              <div className="statistic-middlebox">
                {
                  this.props.home.statisInfo && (
                    <>
                      <div className="middleline">
                        <div className="s-middleline">
                          <span>{this.intrl.home.neoprice}</span>
                          <span>${saveDecimal(this.props.home.statisInfo.neoPrice.toString(), 2)}</span>
                        </div>
                        <div className="s-middleline">
                          <span>{this.intrl.home.gasprice}</span>
                          <span>${saveDecimal(this.props.home.statisInfo.gasPrice.toString(), 2)}</span>
                        </div>
                        <div className="s-middleline">
                          <span>{this.intrl.home.sevenday}</span>
                          <span>{toThousands(this.props.home.statisInfo.activeAddrCount.toString())}</span>
                        </div>
                      </div>
                      <div className="middleline">
                        <div className="s-middleline">
                          <span>{this.intrl.home.neocount}</span>
                          <span>{toThousands(this.props.home.statisInfo.neoAddrCount.toString())}</span>
                        </div>
                        <div className="s-middleline">
                          <span>{this.intrl.home.gascount}</span>
                          <span>{toThousands(this.props.home.statisInfo.gasAddrCount.toString())}</span>
                        </div>
                        <div className="s-middleline">
                          <span>{this.intrl.home.totalcount}</span>
                          <span>{toThousands(this.props.home.statisInfo.txCount.toString())}</span>
                        </div>
                      </div>
                    </>
                  )
                }
              </div>
            ) : (
                <>
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
                </>
              )
          }
        </div>
      </div>
    );
  }
  // 获取历史交易统计数据
  private handleGetHistoryData = async () => {
    this.myCahrt = null;
    await this.props.home.getHistoryData();
    const echartsEl = document.getElementById('transEcharts') as HTMLDivElement;
    if (echartsEl) {
      const myChart = Echarts.init(echartsEl, null, { height: 200 });
      chartsOptions.title.text = this.intrl.home.txcount;
      chartsOptions.xAxis.data = this.props.home.txHistoryList.time;
      chartsOptions.series[0].data = this.props.home.txHistoryList.count;
      // chartsOptions.yAxis.name = this.props.projectinfo.projInfo ? this.props.projectinfo.projInfo.fundName.toLocaleUpperCase() + '/单位' : '';
      myChart.setOption(chartsOptions as any)
      this.myCahrt = myChart;

      window.addEventListener('resize', () => {
        myChart.resize();
      })
    }
  }
}

export default injectIntl(Topstatistic);
