/**
 * 交易详情页
 */
import * as React from "react";
import TitleText from "@/components/titletext/index";
import Table from "@/components/Table/Table";
import * as formatTime from "utils/formatTime";
import "./index.less";
import {
  ITransactionsProps,
  ITransInfoState,
  IInfoInterTX,
  InvokeType,
} from "./interface/transaction.interface";
import { inject, observer } from "mobx-react";
import { injectIntl } from "react-intl";

@inject("transaction")
@observer
class TransactionInfo extends React.Component<
  ITransactionsProps,
  ITransInfoState
> {
  public state = {
    vinList: [],
    outList: [],
    infoShowTable: 0,
  };
  public intrl = this.props.intl.messages;
  public transVTableTh = [
    {
      name: this.intrl.tableTh.address,
      key: "address",
    },
    {
      name: this.intrl.tableTh.asset,
      key: "value",
    },
  ];
  public nep5TransTableTh = [
    {
      name: this.intrl.tableTh.from,
      key: "from",
    },
    {
      name: this.intrl.tableTh.to,
      key: "to",
    },
    {
      name: this.intrl.tableTh.value,
      key: "value",
    },
    {
      name: this.intrl.tableTh.asset,
      key: "asset",
    },
  ];
  public interTableTh = [
    {
      name: this.intrl.tableTh.index,
      key: "orderId",
    },
    {
      name: this.intrl.tableTh.type,
      key: "type",
    },
    {
      name: this.intrl.tableTh.from2,
      key: "from",
    },
    {
      name: this.intrl.tableTh.to2,
      key: "to",
    },
  ];
  public async componentDidMount() {
    const params = this.props.match.params;
    const txid = "0x" + params["txid"].replace("0x", "");
    await this.getTransactionInfo(txid);
    if (process.env.REACT_APP_SERVER_ENV !== "NEO3") {
      this.doVinVoutList();
    }
    this.props.transaction.getNep5Transbytxid(txid);
    if (!this.props.transaction.tranInfo) {
      this.props.transaction.getPoolTypeAndCount(txid);
    }

    this.props.transaction.getInfoInterList(txid);
    if(process.env.REACT_APP_SERVER_ENV === "NEO3"){
        this.props.transaction.getLogNotifyData(txid);
    }    
  }
  public componentWillUnmount() {
    this.props.transaction.tranInfo = null;
    this.props.transaction.logNotify = "";
  }
  // 请求数据
  public getTransactionInfo = (txid: string) => {
    return this.props.transaction.getTransInfo(txid);
  };
  // 返回交易列表
  public onGoBack = () => {
    this.props.history.push("/transactions/");
  };
  // 区块详情链接
  public goBlockInfo = (index: string) => {
    this.props.history.push("/block/" + index);
  };
  // 拼接vin vout
  public doVinVoutList = () => {
    if (this.props.transaction.tranInfo) {
      if (this.props.transaction.tranInfo.vin.length !== 0) {
        const vinlist = this.props.transaction.tranInfo.vin.map((key) => {
          const newObj = {
            address: key.address,
            value: key.value + " " + key.asset,
          };
          return newObj;
        });
        this.setState({
          vinList: vinlist,
        });
      }
      if (this.props.transaction.tranInfo.vout.length !== 0) {
        const voutlist = this.props.transaction.tranInfo.vout.map((key) => {
          const newObj = {
            address: key.address,
            value: key.value + " " + key.asset,
          };
          return newObj;
        });
        this.setState({
          outList: voutlist,
        });
      }
    }
  };
  public getNep5Name = async (asset) => {
    await this.props.transaction.getNep5Info(asset);
    return this.props.transaction.nep5Info
      ? this.props.transaction.nep5Info.symbol
      : "";
  };
  // 列表特殊处理
  public renderVinVout = (value, key) => {
    if (key === "address") {
      return <span className="addr-text">{value}</span>;
    }
    return null;
  };
  // 列表特殊处理
  public renderNep5Trans = (value, key) => {
    if (key === "asset") {
      return (
        <span>
          <a
            href="javascript:;"
            onClick={this.goNep5Info.bind(this, value.assetid)}
          >
            {value.symbol}
          </a>
        </span>
      );
    }
    if (key === "from") {
      if (value === "" && process.env.REACT_APP_SERVER_ENV === "NEO3") {
        return <span className="addr-text">system</span>;
      } else {
        return (
          <span className="addr-text">
            <a
              href="javascript:;"
              onClick={this.toAddressInfo.bind(this, value)}
            >
              {value.replace(/^(.{4})(.*)(.{4})$/, "$1...$3")}
            </a>
          </span>
        );
      }
    }
    if (key === "to") {
      if (value === "" && process.env.REACT_APP_SERVER_ENV === "NEO3") {
        return <span className="addr-text">system</span>;
      } else {
        return (
          <span className="addr-text">
            <a
              href="javascript:;"
              onClick={this.toAddressInfo.bind(this, value)}
            >
              {value.replace(/^(.{4})(.*)(.{4})$/, "$1...$3")}
            </a>
          </span>
        );
      }
    }
    return null;
  };
  // 内部交易的表格处理
  public renderInter = (value, key) => {
    if (key === "type") {
      return (
        <span>
          {value === InvokeType.Call && this.intrl.other.call}
          {value === InvokeType.Create && this.intrl.other.create}
          {value === InvokeType.Update && this.intrl.other.update}
          {value === InvokeType.Destory && this.intrl.other.destory}
        </span>
      );
    }
    if (key === "from") {
      return (
        <span>
          <a
            href="javascript:;"
            onClick={this.toContractInfo.bind(this, value)}
          >
            {value.replace(/^(.{4})(.*)(.{4})$/, "$1...$3")}
          </a>
        </span>
      );
    }
    if (key === "to") {
      return (
        <span>
          <a
            href="javascript:;"
            onClick={this.toContractInfo.bind(this, value)}
          >
            {value.replace(/^(.{4})(.*)(.{4})$/, "$1...$3")}
          </a>
        </span>
      );
    }
    return null;
  };
  // 跳转nep5资产详情页
  public goNep5Info = (asset: string) => {
    this.props.history.push("/nep5/" + asset);
  };
  // 跳转到地址详情页
  public toAddressInfo = (addr: string) => {
    this.props.history.push("/address/" + addr);
  };
  // 跳转到合约详情页
  public toContractInfo = (hash: string) => {
    this.props.history.push("/contract/" + hash);
  };

  public render() {
    if (!this.props.transaction.tranInfo) {
      return (
        <div className="nodata-wrap">
          <img src={require("@/img/tran-nodata.png")} alt="" />
          {this.props.transaction.poolCheck &&
          this.props.transaction.poolCheck.isExistPool ? (
            <>
              <p>{this.intrl.nodata.waiting}</p>
              <p>
                {this.intrl.nodata.waitcount +
                  this.props.transaction.poolCheck.memPoolCount +
                  this.intrl.nodata.waitcount2}
              </p>
            </>
          ) : (
            <>
              {this.props.transaction.isPending ? (
                <p>{this.intrl.nodata.pending}</p>
              ) : (
                <p>{this.intrl.nodata.msg}</p>
              )}
            </>
          )}
        </div>
      );
    }

    // let sysfee = "0";
    // let netfee = "0";
    // if (this.props.transaction.tranInfo) {
    //     netfee = this.props.transaction.tranInfo.net_fee ? this.props.transaction.tranInfo.net_fee : '0';
    //     sysfee = this.props.transaction.tranInfo.sys_fee ? this.props.transaction.tranInfo.sys_fee : '0';
    //     if (process.env.REACT_APP_SERVER_ENV === "NEO3") {
    //         netfee = toNonExponential(parseFloat(netfee) / Math.pow(10, 8))
    //         sysfee = toNonExponential(parseFloat(sysfee) / Math.pow(10, 8))
    //     }
    // }
    return (
      <div className="transactioninfo-page">
        <div className="goback-wrapper">
          <span className="goback-text" onClick={this.onGoBack}>
            &lt;&lt; {this.intrl.btn.goback}
          </span>
        </div>
        <div className="info-content">
          <TitleText
            text={this.intrl.transaction.titleinfo1}
            isInfoTitle={true}
          />
          <div className="info-list">
            <ul>
              <li>
                <span className="type-name">{this.intrl.transaction.txid}</span>
                <span className="type-content">
                  {this.props.transaction.tranInfo &&
                    this.props.transaction.tranInfo.txid}
                </span>
              </li>
              {process.env.REACT_APP_SERVER_ENV !== "NEO3" && (
                <li>
                  <span className="type-name">
                    {this.intrl.transaction.type}
                  </span>
                  <span className="type-content">
                    {this.props.transaction.tranInfo &&
                      this.props.transaction.tranInfo.type.replace(
                        "Transaction",
                        ""
                      )}
                  </span>
                </li>
              )}
              {process.env.REACT_APP_SERVER_ENV === "NEO3" && (
                <li>
                  <span className="type-name">{this.intrl.tableTh.sender}</span>
                  <span className="type-content">
                    {this.props.transaction.tranInfo &&
                      this.props.transaction.tranInfo.sender}
                  </span>
                </li>
              )}
              <li>
                <span className="type-name">
                  {this.intrl.transaction.netFee}
                </span>
                <span className="type-content">
                  {this.props.transaction.tranInfo &&
                    this.props.transaction.tranInfo.net_fee}{" "}
                  GAS
                </span>
              </li>
              <li>
                <span className="type-name">
                  {this.intrl.transaction.sysFee}
                </span>
                <span className="type-content">
                  {this.props.transaction.tranInfo &&
                    this.props.transaction.tranInfo.sys_fee}{" "}
                  GAS
                </span>
              </li>
              <li>
                <span className="type-name">{this.intrl.transaction.size}</span>
                <span className="type-content">
                  {this.props.transaction.tranInfo &&
                    this.props.transaction.tranInfo.size}{" "}
                  bytes
                </span>
              </li>
              <li>
                <span className="type-name">
                  {this.intrl.transaction.height}
                </span>
                <span className="type-content">
                  <a
                    href="javascript:;"
                    onClick={this.goBlockInfo.bind(
                      this,
                      this.props.transaction.tranInfo.blockindex
                    )}
                  >
                    {(this.props.transaction.tranInfo &&
                      this.props.transaction.tranInfo.blockindex)||this.intrl.nodata.pending2}
                  </a>
                </span>
              </li>
              <li>
                <span className="type-name">{this.intrl.transaction.time}</span>
                <span className="type-content">
                  {(this.props.transaction.tranInfo &&
                    formatTime.format(
                      "yyyy/MM/dd | hh:mm:ss",
                      this.props.transaction.tranInfo.blocktime.toString(),
                      this.props.intl.locale
                    ))||'-'}
                </span>
              </li>
            </ul>
          </div>
        </div>
        {/* {
                    (this.state.vinList.length !== 0 || this.state.outList.length !== 0) &&
                    ( */}
        {process.env.REACT_APP_SERVER_ENV !== "NEO3" && (
          <div className="transactioninfo-input-output">
            <div className="input-wrapper">
              <TitleText text={this.intrl.transaction.input} />
              <Table
                tableTh={this.transVTableTh}
                tableData={this.state.vinList}
              />
            </div>
            <div className="output-wrapper">
              <TitleText text={this.intrl.transaction.output} />
              <Table
                tableTh={this.transVTableTh}
                tableData={this.state.outList}
              />
            </div>
          </div>
        )}
        <div className="nep5-trans-wrapper">
          {this.props.transaction.infoInterListCount > 0 ? (
            <>
              <div className="tran-title-wrapper">
                <div
                  className={`tran-title-label ${
                    this.state.infoShowTable === 0 ? "active" : ""
                  }`}
                  onClick={this.onhandleClickTable.bind(this, 0)}
                >
                  {this.intrl.transaction.nep5}
                </div>
                <div
                  className={`tran-title-label ${
                    this.state.infoShowTable === 1 ? "active" : ""
                  }`}
                  onClick={this.onhandleClickTable.bind(this, 1)}
                >
                  {this.intrl.transaction.intx}
                </div>
              </div>
              {this.state.infoShowTable === 0 && (
                <div className="nep5-trans-table">
                  <Table
                    tableTh={this.nep5TransTableTh}
                    tableData={this.props.transaction.nep5Trans}
                    render={this.renderNep5Trans}
                  />
                </div>
              )}
              {this.state.infoShowTable === 1 &&
                this.props.transaction.infoInterList.map(
                  (item: IInfoInterTX, value: number) => {
                    return (
                      <div className="onebox-table" key={value}>
                        <div className="top-title">
                          <span>
                            {this.intrl.transaction.contract}
                            {value + 1}：{this.intrl.transaction.tips1}{" "}
                            <a
                              href="javascript:;"
                              onClick={this.toAddressInfo.bind(
                                this,
                                item.caller
                              )}
                            >
                              {item.caller.replace(
                                /^(.{4})(.*)(.{4})$/,
                                "$1...$3"
                              )}
                            </a>{" "}
                            {this.intrl.transaction.tips2}{" "}
                            <a
                              href="javascript:;"
                              onClick={this.toContractInfo.bind(
                                this,
                                item.callee
                              )}
                            >
                              {item.callee.replace(
                                /^(.{4})(.*)(.{4})$/,
                                "$1...$3"
                              )}
                            </a>{" "}
                            {this.intrl.transaction.tips3}
                            {item.txCount}
                            {this.intrl.transaction.tips4}
                          </span>
                        </div>
                        {item.txCount > 0 && (
                          <Table
                            tableTh={this.interTableTh}
                            tableData={item.txList}
                            render={this.renderInter}
                          />
                        )}
                      </div>
                    );
                  }
                )}
            </>
          ) : (
            <>
              {process.env.REACT_APP_SERVER_ENV !== "NEO3" && (
                <TitleText text={this.intrl.transaction.nep5} />
              )}
              <div className="nep5-trans-table">
                <Table
                  tableTh={this.nep5TransTableTh}
                  tableData={this.props.transaction.nep5Trans}
                  render={this.renderNep5Trans}
                />
              </div>
            </>
          )}
        </div>
        {process.env.REACT_APP_SERVER_ENV === "NEO3" && (
          <div className="log-notify-box">
            <TitleText text="Log/Notify" />
            <div className="log-notify-content" >
              <pre className="ln-content">{this.props.transaction.logNotify}</pre>
            </div>
          </div>
        )}
      </div>
    );
  }
  private onhandleClickTable = (type: number) => {
    this.setState({
      infoShowTable: type,
    });
  };
}

export default injectIntl(TransactionInfo);
