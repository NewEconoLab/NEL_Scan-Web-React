/**
 * 区块详情页
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import TitleText from '@/components/titletext/index';
import Table from '@/components/Table/Table';
import './index.less'
import { IBlockProps, IBlockInfoState } from './interface/block.interface';
import * as formatTime from 'utils/formatTime';
import { injectIntl } from 'react-intl';
import Page from '@/components/Page';
@inject('block')
@observer
class BlockInfo extends React.Component<IBlockProps, IBlockInfoState> {
    public state = {
        isTop: false,
        isBottom: false,
        currentPage: 1,
        pageSize: 15,
        txList: new Array()
    }
    public intrl = this.props.intl.messages;
    public blockTransTableTh = [
        {
            name: this.intrl.tableTh.type,
            key: 'type',
        },
        {
            name: this.intrl.tableTh.txid,
            key: 'txid'
        }, {
            name: this.intrl.tableTh.version,
            key: 'version'
        },
        {
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
    public componentDidMount() {
        const params = this.props.match.params;
        this.getInfos(params["index"]);
    }
    public componentWillUnmount() {
        this.props.block.blockInfo = null;
    }
    // 请求数据
    public getInfos = (index) => {
        return this.props.block.getBlockInfo(index);
    }
    // 返回区块列表
    public onGoBack = () => {
        this.props.history.push('/blocks/');
    }
    // 访问上一个区块详情
    public goPreviousBlock = async () => {
        if (this.state.isTop) {
            return false;
        }
        const index = this.props.block.blockInfo ? this.props.block.blockInfo.index - 1 : 0
        this.props.history.push('/block/' + index)
        const result = await this.getInfos(index);
        const state = { isBottom: false };
        if (!result) {
            state['isTop'] = true;
        }
        this.setState(state);

        return true;
    }
    // 访问下一个区块详情
    public goNextBlock = async () => {
        if (this.state.isBottom) {
            return false;
        }
        const index = this.props.block.blockInfo ? this.props.block.blockInfo.index + 1 : 0
        this.props.history.push('/block/' + index);
        const result = await this.getInfos(index);
        const state = { isTop: false };
        if (!result) {
            state['isBottom'] = true;
        }
        this.setState(state);
        return true;
    }
    // 列表特殊处理
    public renderTran = (value, key) => {
        if (key === 'type') {
            value = value.replace('Transaction', '')
            return <span className="tran-img-text"><img src={this.imgs[value.toLowerCase()]} alt="" />{value}</span>
        }
        if (key === 'txid') {
            const txid = value.replace(/^(.{4})(.*)(.{4})$/, '$1...$3');
            return <span><a onClick={this.goTransInfo.bind(this, value)}>{txid}</a></span>
        }
        // if (key === 'size') {
        //     return <span>{value}</span>
        // }
        return null;
    }
    // 交易详情链接
    public goTransInfo = (txid: string) => {
        this.props.history.push('/transaction/' + txid)
    }
    // 翻页功能
    public onGoPage = (index: number) => {
        this.setState({
            currentPage: index
        })
    }
    // 区块交易列表分页
    public blockTranListByPage = () => {
        const startNum = this.state.pageSize * (this.state.currentPage - 1);
        const list = (this.props.block.blockInfo && this.props.block.blockInfo.tx) ? [...this.props.block.blockInfo.tx] : [];
        return list.slice(startNum, startNum + this.state.pageSize);
    }
    public render() {
        if (!this.props.block.blockInfo)
        {
            return (
                <div className="nodata-wrap">
                    <img src={require('@/img/nodata.png')} alt="" />
                    <p>{this.intrl.nodata.msg}</p>
                </div>
            )
        }
        const totalCount = (this.props.block.blockInfo && this.props.block.blockInfo.tx) ? this.props.block.blockInfo.tx.length : 0
        return (
            <div className="blockinfo-page">
                <div className="goback-wrapper">
                    <span className="goback-text" onClick={this.onGoBack}>&lt;&lt;  {this.intrl.btn.goback}</span>
                </div>
                <div className="info-content">
                    <TitleText text={this.intrl.block.titleinfo1} isInfoTitle={true} />
                    <div className="info-list">
                        <ul>
                            <li>
                                <span className="type-name">{this.intrl.block.blockHeight}</span>
                                <span className="type-content">{this.props.block.blockInfo && this.props.block.blockInfo.index}</span>
                            </li>
                            <li>
                                <span className="type-name">{this.intrl.block.hash}</span>
                                <span className="type-content">{this.props.block.blockInfo && this.props.block.blockInfo.hash}</span>
                            </li>
                            <li>
                                <span className="type-name">{this.intrl.block.time}</span>
                                <span className="type-content">
                                    {this.props.block.blockInfo && formatTime.format('yyyy/MM/dd | hh:mm:ss', this.props.block.blockInfo.time.toString(), this.props.intl.locale)}
                                </span>
                            </li>
                            <li>
                                <span className="type-name">{this.intrl.block.size}</span>
                                <span className="type-content">{this.props.block.blockInfo && this.props.block.blockInfo.size} bytes</span>
                            </li>
                            <li>
                                <span className="type-name">{this.intrl.block.previous}</span>
                                <span className="type-content">
                                    <a onClick={this.goPreviousBlock} href="javascript:;">{this.props.block.blockInfo && this.props.block.blockInfo.index - 1}</a>
                                </span>
                            </li>
                            <li>
                                <span className="type-name">{this.intrl.block.next}</span>
                                <span className="type-content">
                                    <a onClick={this.goNextBlock} href="javascript:;">{this.props.block.blockInfo && this.props.block.blockInfo.index + 1}</a>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <TitleText text={this.intrl.block.titleinfo2} />
                <div className="blockinfo-tran-table">
                    <Table tableTh={this.blockTransTableTh} tableData={this.blockTranListByPage()} render={this.renderTran} />
                    {/* {(this.props.block.blockInfo && this.props.block.blockInfo.tx.length>=10) &&  */}
                    {/* ( */}
                    <Page
                        totalCount={totalCount}
                        pageSize={this.state.pageSize}
                        currentPage={this.state.currentPage}
                        onChange={this.onGoPage}
                    />
                    {/* )} */}
                </div>
            </div>
        );
    }
}

export default injectIntl(BlockInfo);
