/**
 * nns域名详情模块
 */
import * as React from 'react';
// import TitleText from '@/components/titletext/index';
import { injectIntl } from 'react-intl';
import Hint from '@/components/hint';
import { INNSInfoProps, IAuctionInfo } from '@/containers/nns/interface/nnsinfo.interface';
import * as formatTime from 'utils/formatTime';
import { observer } from 'mobx-react';
@observer
class AuctionInfo extends React.Component<INNSInfoProps, {}> {
    public intrl = this.props.intl.messages;
    // 跳转到地址详情页
    public toAddressInfo(address: string) {
        this.props.history.push('/address/' + address);
    }
    // 跳转到区块高度详情页
    public toBlockInfo = (index: string) => {
        this.props.history.push('/block/' + index)
    }
    public render() {
        const domainInfo: IAuctionInfo | null = this.props.nnsinfo.nnsInfo ? this.props.nnsinfo.nnsInfo : null;

        if (!!!domainInfo) {
            return null;
        }
        return (
            <React.Fragment>
                <div className="info-list">
                    <ul>
                        <li>
                            <span className="type-name">{this.intrl.nns.domainName}</span>
                            <span className="type-content">{domainInfo.fulldomain}</span>
                        </li>
                        <li>
                            <span className="type-name">Hash</span>
                            <span className="type-content">{domainInfo.auctionId}</span>
                        </li>
                        <li>
                            <span className="type-name">{this.intrl.nns.startTime}</span>
                            <span className="type-content">
                                {formatTime.format('yyyy/MM/dd | hh:mm:ss', domainInfo.startTime.blocktime.toString(), this.props.intl.locale)}
                            </span>
                        </li>
                        {
                            (domainInfo.auctionState === '0201' || domainInfo.auctionState === '0301') && (
                                <>
                                    <li>
                                        <span className="type-name">{this.intrl.nns.endTime}</span>
                                        <span className="type-content">
                                            {formatTime.format('yyyy/MM/dd | hh:mm:ss', domainInfo.endTime.blocktime.toString(), this.props.intl.locale)}
                                            <span>{this.intrl.nns.tips}</span>
                                        </span>
                                    </li>
                                    <li>
                                        <span className="type-name">{this.intrl.nns.highestbid}</span>
                                        <span className="type-content">{domainInfo.maxPrice} CGAS</span>
                                    </li>
                                    <li>
                                        <span className="type-name">{this.intrl.nns.highestbidder}</span>
                                        <span className="type-content"><a onClick={this.toAddressInfo.bind(this, domainInfo.maxBuyer)} href="javascript:;">{domainInfo.maxBuyer}</a></span>
                                    </li>
                                    <li>
                                        <span className="type-name">{this.intrl.nns.stage}</span>

                                        {
                                            domainInfo.auctionState === '0201' && (
                                                <span className="type-content nns-peirod">
                                                    {this.intrl.nns.period}
                                                    <Hint type='1' />
                                                </span>
                                            )
                                        }
                                        {
                                            domainInfo.auctionState === '0301' && (
                                                <span className="type-content nns-overtime">
                                                    {this.intrl.nns.overtime}
                                                    <Hint type='2' />
                                                </span>
                                            )
                                        }

                                    </li>
                                </>
                            )
                        }
                        {
                            domainInfo.auctionState === '0401' && (
                                <>
                                    <li>
                                        <span className="type-name">{this.intrl.nns.endedTime}</span>
                                        <span className="type-content">
                                            {formatTime.format('yyyy/MM/dd | hh:mm:ss', domainInfo.endTime.blocktime.toString(), this.props.intl.locale)}
                                        </span>
                                    </li>
                                    <li>
                                        <span className="type-name">{this.intrl.nns.hammerPrice}</span>
                                        <span className="type-content">{domainInfo.maxPrice} CGAS</span>
                                    </li>
                                    <li>
                                        <span className="type-name">{this.intrl.nns.buyer}</span>
                                        <span className="type-content"><a onClick={this.toAddressInfo.bind(this, domainInfo.maxBuyer)} href="javascript:;">{domainInfo.maxBuyer}</a></span>
                                    </li>
                                </>
                            )
                        }
                        <li>
                            <span className="type-name" style={{ fontSize: "12px" }}>{this.intrl.nns.startBlock}</span>
                            <span className="type-content"><a onClick={this.toBlockInfo.bind(this, domainInfo.startTime.blockindex)} href="javascript:;">{domainInfo.startTime.blockindex}</a></span>
                        </li>
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

export default injectIntl(AuctionInfo);
