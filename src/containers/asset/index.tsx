/**
 * 资产列表页
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import TitleText from '@/components/titletext/index';
import Table from '@/components/Table/Table';
import Select from '@/components/select';
import { injectIntl } from 'react-intl';
import Page from '@/components/Page';
import './index.less'
import { IAssetProps } from './interface/asset.interface';

@inject('asset')
@observer
class Assets extends React.Component<IAssetProps, {}>
{
    public intrl = this.props.intl.messages;
    public options = [
        {
            id: 'asset',
            name: "Assets",
        },
        {
            id: 'nep5',
            name: "Nep5",
        }
    ]
    public AssetTableTh = process.env.REACT_APP_SERVER_ENV === "NEO3" ?
        [
            {
                name: this.intrl.tableTh.asset,
                key: 'asset'
            },
            {
                name: this.intrl.tableTh.id,
                key: 'id'
            },
            {
                name: this.intrl.tableTh.available,
                key: 'available'
            },
            {
                name: this.intrl.tableTh.precision,
                key: 'precision'
            }
        ] :
        [
            {
                name: this.intrl.tableTh.asset,
                key: 'asset'
            },
            {
                name: this.intrl.tableTh.id,
                key: 'id'
            },
            {
                name: this.intrl.tableTh.type,
                key: 'type'
            },
            {
                name: this.intrl.tableTh.available,
                key: 'available'
            },
            {
                name: this.intrl.tableTh.precision,
                key: 'precision'
            }
        ]
    public state = {
        currentPageAsset: 1,
        pageSizeAsset: 15,
        currentPageNep5: 1,
        pageSizeNep5: 15,
        type: process.env.REACT_APP_SERVER_ENV === "NEO3" ? "nep5" : "asset"
    }
    // 初始化数据
    public componentDidMount() {
        this.props.asset.getAssetList();
        this.props.asset.getNep5List();
    }
    public componentWillUnmount() {
        this.props.asset.assetList = [];
        this.props.asset.nep5List = [];
    }
    public onCallback = (item) => {
        if (item.id === this.state.type) {
            return;
        }
        if (item.id === 'asset') {
            this.setState({
                currentPageAsset: 1,
                type: 'asset'
            })
        } else {
            this.setState({
                currentPageNep5: 1,
                type: 'nep5'
            })
        }
    }
    // 特殊列表处理
    public renderAsset = (value, key, item) => {
        if (key === 'asset') {
            return <span><a onClick={this.toAssetInfo.bind(this, item.id)} href="javascript:;">{value}</a></span>
        }
        if (key === 'id') {
            const assetid = value.replace(/^(.{4})(.*)(.{4})$/, '$1...$3');
            return <span><a onClick={this.toAssetInfo.bind(this, value)} href="javascript:;">{assetid}</a></span>
        }
        return null;
    }
    public renderNep5 = (value, key, item) => {
        if (key === 'asset') {
            return <span><a onClick={this.toNep5Info.bind(this, item.id)} href="javascript:;">{value}</a></span>
        }
        if (key === 'id') {
            const assetid = value.replace(/^(.{4})(.*)(.{4})$/, '$1...$3');
            return <span><a onClick={this.toNep5Info.bind(this, value)} href="javascript:;">{assetid}</a></span>
        }
        return null;
    }
    // 跳转到详情页
    public toAssetInfo = (assetid: string) => {
        this.props.history.push('/asset/' + assetid)
    }
    // 跳转到详情页
    public toNep5Info = (assetid: string) => {
        this.props.history.push('/nep5/' + assetid)
    }

    // 翻页功能
    public onAssetPage = (index: number) => {
        this.setState({
            currentPageAsset: index
        })
    }
    // 翻页功能
    public onNep5Page = (index: number) => {
        this.setState({
            currentPageNep5: index
        })
    }
    public assetListByPage = () => {
        const startNum = this.state.pageSizeAsset * (this.state.currentPageAsset - 1);
        const list = [ ...this.props.asset.assetList ];
        return list.slice(startNum, startNum + this.state.pageSizeAsset);
    }

    public nep5ListByPage = () => {
        const startNum = this.state.pageSizeNep5 * (this.state.currentPageNep5 - 1);
        const list = [ ...this.props.asset.nep5List ];
        return list.slice(startNum, startNum + this.state.pageSizeNep5);
    }
    public render() {
        return (
            <div className="asset-page">
                <TitleText text={this.intrl.asset.title1} img={require('@/img/assets.png')} isInline={true}>
                    {process.env.REACT_APP_SERVER_ENV !== "NEO3" && <Select options={this.options} text={this.intrl.asset.type} onCallback={this.onCallback} />}
                </TitleText>
                {
                    this.state.type === 'asset' &&
                    (
                        <div className="asset-table">
                            <Table tableTh={this.AssetTableTh} tableData={this.assetListByPage()} render={this.renderAsset} />
                            <Page
                                totalCount={this.props.asset.assetList.length}
                                pageSize={this.state.pageSizeAsset}
                                currentPage={this.state.currentPageAsset}
                                onChange={this.onAssetPage}
                            />
                        </div>
                    )
                }
                {
                    this.state.type === 'nep5' &&
                    (
                        <div className="nep5-table">
                            <Table tableTh={this.AssetTableTh} tableData={this.nep5ListByPage()} render={this.renderNep5} />
                            <Page
                                totalCount={this.props.asset.nep5List.length}
                                pageSize={this.state.pageSizeNep5}
                                currentPage={this.state.currentPageNep5}
                                onChange={this.onNep5Page}
                            />
                        </div>
                    )
                }
            </div>
        );
    }
}

export default injectIntl(Assets);
