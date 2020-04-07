/**
 * 主页搜索功能
 */
import * as React from 'react';
import Input from '@/components/Input/Input'
import './index.less'
import * as Neotool from '@/utils/neotool';
import { IHomeProps } from './interface/home.interface';
import { observer } from 'mobx-react';
import { injectIntl } from 'react-intl';

@observer
class Search extends React.Component<IHomeProps, any> {
  public intrl = this.props.intl.messages;
  public state = {
    inputValue: '',
    inputPlaceHolder: process.env.REACT_APP_SERVER_ENV === 'NEO3' ? this.intrl.input.placeholder1 : this.intrl.input.placeholder
  }
  public onChange = (value: string) => {
    // 禁止输入中文，以及其他特殊字符
    if (/[^a-zA-Z\d\.]/g.test(value)) {
      return
    }
    this.setState({
      inputValue: value
    })
    if (value === '') {
      this.props.home.searchAssetList = [];
      return
    }
    this.props.home.searchAsset(value);
  }
  public onFocus = () => {
    this.setState({
      inputPlaceHolder: ''
    })
  }
  public onBlur = () => {
    this.setState({
      inputPlaceHolder: process.env.REACT_APP_SERVER_ENV === 'NEO3' ? this.intrl.input.placeholder1 : this.intrl.input.placeholder
    })
  }
  // 搜索功能
  public toSearchInfo = () => {
    let search: string = this.state.inputValue;
    search = search.trim();
    if (search) {
      const isDomain = this.checkDomainname(search);// 判断是否为域名
      if (isDomain) {
        this.props.history.push('/nnsinfo/' + search);
      }
      if (search.length === 34) {
        if (Neotool.verifyPublicKey(search)) { // 是否是地址
          this.props.history.push('/address/' + search);
        } else {
          return false;
        }
        return;
      }
      else {
        search = search.replace('0x', '');
        if (search.length === 64) {
          this.props.history.push('/transaction/0x' + search);
        }
        else if (search.length === 40) {
          if (process.env.REACT_APP_SERVER_ENV === 'DEV') {
            this.props.history.push('/nep5/0x' + search);
          } else {
            this.props.history.push('/contract/0x' + search);
          }
        }
        else if (!isNaN(Number(search))) {
          this.props.history.push('/block/' + search);
        }
        else if (search.length > 64) {
          // let length = this.searchList.children.length;
          // if (length) {
          // let data = this.searchList.children[this.currentLine - 1].getAttribute("data");

          // }
          this.props.history.push('/asset/0x' + search);
        }
        else {
          return false;
        }
      }
    } else {
      return false;
    }
    return;
  }
  // 检测输入域名是否合法
  public checkDomainname(domainname: string) {
    let domain = domainname;
    if (/\.neo$/.test(domainname)) {
      domain = domain.substring(0, domain.length - 4);
    }
    else if (/\.test$/.test(domainname)) {
      domain = domain.substring(0, domain.length - 5);
    }
    else {
      return false;
    }
    if (domain.length >= 2 && domain.length <= 32) {
      return true;
    } else {
      return false;
    }
  }
  public goAssetInfo = (assetid) => {
    this.props.home.searchAssetList = [];
    if (assetid.length === 42) {
      this.props.history.push('/nep5/' + assetid);
    } else {
      this.props.history.push('/asset/' + assetid);
    }
  }
  public render() {
    return (
      <div className="search-page">
        <Input
          placeholder={this.state.inputPlaceHolder}
          type="text"
          value={this.state.inputValue}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onEnter={this.toSearchInfo}
          style={{ width: "9rem", margin: "15px 0 20px 0", minWidth: "900px" }}
        />
        {
          process.env.REACT_APP_SERVER_ENV !== 'PUB' && <img src={require('@/img/search-t.png')} alt="search.png" className="search-icon" onClick={this.toSearchInfo} />
        }
        {
          process.env.REACT_APP_SERVER_ENV === 'PUB' && <img src={require('@/img/search-m.png')} alt="search.png" className="search-icon" onClick={this.toSearchInfo} />
        }
        {
          this.props.home.searchAssetList.length !== 0 && (
            <div className="search-text">
              <div className="hint-wrapper">
                <div className="arrow" />
              </div>
              <ul className="search-list">
                {this.props.home.searchAssetList.map((key, value) => {
                return <li key={value} onClick={this.goAssetInfo.bind(this, key.assetid)}>{key.name}({key.symbol?key.symbol:"-"})-{key.assetid}</li>
                })}
              </ul>
            </div>
          )
        }
      </div>
    );
  }
}

export default injectIntl(Search);
