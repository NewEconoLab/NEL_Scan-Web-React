/**
 * Pc端 header 组件
 */
import * as React from 'react';
import { Link } from 'react-router-dom';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import { History } from 'history'
import EventHandler from 'utils/event';
import * as Neotool from '@/utils/neotool';
import zh from '@/img/ch.png';
import en from '@/img/en.png';
import store from "@/store";
// import { injectIntl } from 'react-intl';
import './index.less';
import { observer } from 'mobx-react';
import { IHomeStore } from '@/containers/home/interface/home.interface';

interface IState
{
  isShowSearch: boolean,         // 是否在首页显示search功能
  inputValue: string,            // 输入框的输入
  inputPlaceHolder: string,      // 输入框的placeholder
  isShowSearchBtn: boolean,      // 是否显示header上的search图标
  isShowBrowse: boolean,         // 是否显示浏览下拉框
  isShowEnv: boolean,            // 是否显示版本下拉框
  isShowLanguage: boolean        // 是否显示语言下拉框
  languageText: string,
  languageImg: ImageData
}

interface IProps
{
  home: IHomeStore,
  history: History,
  locale: any,
  btn: any,
  input:any,
}

@observer
export default class Header extends React.Component<IProps, IState>{
  public state = {
    isShowSearch: false,
    isShowSearchBtn: false,
    inputValue: '',
    isShowBrowse: false,
    isShowEnv: false,
    isShowLanguage: false,
    inputPlaceHolder: this.props.input.placeholder,
    languageText: store['common'].language === 'en' ? "En" : "中",
    languageImg: store['common'].language === 'en' ? en : zh
  }
  public componentDidMount()
  {
    if (this.props.history.location.pathname !== '/')
    {
      this.setState({
        isShowSearchBtn: true
      })
    }

    this.props.history.listen(() =>
    {
      let isShowSearchBtn = false;

      if (this.props.history.location.pathname !== '/')
      {
        isShowSearchBtn = true
      }

      this.setState({
        isShowSearchBtn,
        isShowSearch: false
      })

      this.props.home.searchAssetList = [];
    })

    EventHandler.add(this.globalClick);
  }
  public globalClick = () =>
  {
    this.setState({
      isShowEnv: false,
      isShowBrowse: false,
      isShowLanguage: false,
    })
  }
  // 输入变化
  public onChange = (value: string) =>
  {
    this.setState({
      inputValue: value
    })
    if (value === '')
    {
      this.props.home.searchAssetList = [];
      return
    }
    this.props.home.searchAsset(value);
  }
  // input获取焦点
  public onFocus = () =>
  {
    this.setState({
      inputPlaceHolder: ''
    })
  }
  // 失去焦点
  public onBlur = () =>
  {
    this.setState({
      inputPlaceHolder: this.props.input.placeholder
    })
  }
  // 搜索功能
  public toSearchInfo = () =>
  {
    let search: string = this.state.inputValue;
    search = search.trim();
    if (search)
    {
      if (search.length === 34)
      {
        if (Neotool.verifyPublicKey(search))
        { // 是否是地址
          window.location.href = process.env.REACT_APP_SERVER_ENV === 'DEV' ? '/test/address/' + search : '/address/' + search;
          // this.props.history.push('/address/' + search);
        } else
        {
          return false;
        }
        return;
      } else
      {
        search = search.replace('0x', '');
        if (search.length === 64)
        {
          window.location.href = process.env.REACT_APP_SERVER_ENV === 'DEV' ? '/test/transaction/0x' + search : '/transaction/0x' + search;
        }
        else if (search.length === 40)
        {
          window.location.href = process.env.REACT_APP_SERVER_ENV === 'DEV' ? '/test/nep5/0x' + search : '/nep5/0x' + search;
        }
        else if (!isNaN(Number(search)))
        {
          window.location.href = process.env.REACT_APP_SERVER_ENV === 'DEV' ? '/test/block/' + search : '/block/' + search;
        }
        else if (search.length > 64)
        {
          window.location.href = process.env.REACT_APP_SERVER_ENV === 'DEV' ? '/test/asset/0x' + search : '/asset/0x' + search;
        } else
        {
          return false;
        }
      }
    } else
    {
      return false;
    }
    this.setState({
      isShowSearch: false
    })
    return;
  }
  // 点击跳转到资产详情
  public goAssetInfo = (assetid) =>
  {
    // this.props.home.searchAssetList = [];
    if (assetid.length === 42)
    {
      window.location.href = process.env.REACT_APP_SERVER_ENV === 'DEV' ? '/test/nep5/' + assetid : '/nep5/' + assetid;
    } else
    {
      window.location.href = process.env.REACT_APP_SERVER_ENV === 'DEV' ? '/test/asset/' + assetid : '/asset/' + assetid;
    }
  }
  // 是否显示search
  public onToggleSearch = () =>
  {
    this.setState({
      isShowSearch: !this.state.isShowSearch,
      inputValue: ''
    }, () =>
    {
      if (!this.state.inputValue)
      {
        this.props.home.searchAssetList = [];
      }
    })

  }
  // 是否显示版本
  public toggleEnv = (e) =>
  {
    this.setState({
      isShowEnv: !this.state.isShowEnv,
      isShowBrowse: false,
      isShowLanguage: false,
      isShowSearch: false,
    })
    e.stopPropagation();
  }
  // 是否显示语言
  public toggleLanguage = (e) =>
  {
    this.setState({
      isShowEnv: false,
      isShowBrowse: false,
      isShowLanguage: !this.state.isShowLanguage,
      isShowSearch: false,
    })
    e.stopPropagation();
  }
  // 是否显示浏览
  public toggleBrowse = (e) =>
  {
    this.setState({
      isShowEnv: false,
      isShowBrowse: !this.state.isShowBrowse,
      isShowLanguage: false,
      isShowSearch: false,
    })
    e.stopPropagation();
  }
  public componentWillUnmount()
  {
    EventHandler.remove(this.globalClick);

    this.setState({
      isShowSearch: false,
      isShowSearchBtn: false,
      inputValue: '',
      isShowBrowse: false,
      isShowEnv: false,
      isShowLanguage: false,
    })
  }
  public getPath = (base) =>
  {
    const locations = this.props.history.location;
    console.log(location.origin);

    window.location.href = `${location.origin}${base || ''}${locations.pathname}${locations.search}${locations.hash}`
  }
  public onClickEnglish = () =>
  {
    store['common'].language = 'en';
    this.setState({
      languageText: "En",
      languageImg: en
    })
    sessionStorage.setItem('language', 'en');
    setTimeout(() =>
    {
      window.location.reload();
    })
  }
  public onClickChinese = () =>
  {
    store['common'].language = 'zh';
    this.setState({
      languageText: "中",
      languageImg: zh
    })
    sessionStorage.setItem('language', 'zh');
    setTimeout(() =>
    {
      window.location.reload();
    })
  }
  public mapRouterUnderline = (path) =>
  {
    if (path instanceof Array)
    {
      for (const i in path)
      {
        if (new RegExp(path[i], 'i').test(this.props.history.location.pathname))
        {
          return "under-line"
        }
      }
    }
    if (path === this.props.history.location.pathname)
    {
      return "under-line"
    }
    return '';
  }
  public render()
  {
    return (
      <div className="header-wrap">
        <div className="header-content">
          <div className="header-logo">
            <img src={require('@/img/logo.png')} alt="logo.png" />
          </div>
          <div className="header-other">
            <ul>
              <li><a href="http://www.xiaoyaoji.cn/share/1H0gjTDtfk/" target="_blank">API</a></li>
              <li>
                <div className="select-box">
                  <div className="select-content">
                    <label onClick={this.toggleEnv}>
                      <span>{process.env.REACT_APP_SERVER_ENV === 'DEV' ? this.props.locale.testnet : this.props.locale.mainnet}</span>
                      <span className="triangle" />
                    </label>
                  </div>
                  {
                    this.state.isShowEnv && (
                      <div className="select-wrap" id="selectlang" onClick={this.toggleEnv}>
                        <ul>
                          <li><a onClick={this.getPath.bind(this, '')}>{this.props.locale.mainnet}</a></li>
                          <li><a onClick={this.getPath.bind(this, '/test')}>{this.props.locale.testnet}</a></li>
                        </ul>
                      </div>
                    )
                  }
                </div>
              </li>
              <li>
                <div className="language-toggle" id="language">
                  <label onClick={this.toggleLanguage}>
                    <div className="language-content">
                      <span className="lang-text">{this.state.languageText}</span>
                      <img src={this.state.languageImg} alt="ch.png" />
                    </div>
                    <span className="middle-line" />
                    <div className="triangle-wrap">
                      <div className="triangle" />
                    </div>
                  </label>
                  {
                    this.state.isShowLanguage && (
                      <div className="select-wrap" id="selectlang" onClick={this.toggleLanguage}>
                        <ul>
                          <li><a onClick={this.onClickChinese} href="javascript:;">中文</a></li>
                          <li><a onClick={this.onClickEnglish} href="javascript:;">English</a></li>
                        </ul>
                      </div>
                    )
                  }
                </div>
              </li>
            </ul>
          </div>
          <div className="header-menu">
            <ul>
              <li className={this.mapRouterUnderline('/')}><Link to="/">{this.props.locale.explorer}</Link></li>
              <li className={this.mapRouterUnderline(['/blocks', '/block', '/transactions', '/transaction', '/addresses', '/address'])}>
                <div className="select-box">
                  <div className="select-content">
                    <label onClick={this.toggleBrowse}>
                      <span>{this.props.locale.browse}</span>
                      <span className="triangle" />
                    </label>
                  </div>
                  {
                    this.state.isShowBrowse && (
                      <div className="select-wrap" id="selectlang" onClick={this.toggleBrowse}>
                        <ul>
                          <li><Link to="/blocks">{this.props.locale.blocks}</Link></li>
                          <li><Link to="/transactions">{this.props.locale.transactions}</Link></li>
                          <li><Link to="/addresses">{this.props.locale.addresses}</Link></li>
                        </ul>
                      </div>
                    )
                  }
                </div>
              </li>
              <li className={this.mapRouterUnderline(['/asset', '/assets', '/nep5'])}><Link to="/assets">{this.props.locale.assets}</Link></li>
              <li className={this.mapRouterUnderline(['/nns', '/nnsinfo', '/nnsbeing', '/nnsrank'])}><Link to="/nns">{this.props.locale.nnsevent}</Link></li>
              <li>
                {
                  process.env.REACT_APP_SERVER_ENV === 'DEV' ? <a href="https://testwallet.nel.group/" target="_blank">{this.props.locale.wallet}</a> : <a href="https://wallet.nel.group/" target="_blank">{this.props.locale.wallet}</a>
                }
              </li>
              {
                this.state.isShowSearchBtn &&
                <li onClick={this.onToggleSearch}>
                  <img src={require('@/img/search.png')} alt="search.png" />
                </li>
              }

            </ul>
          </div>
        </div>
        {
          this.state.isShowSearch && (
            <div className="header-search">
              <Input
                placeholder={this.state.inputPlaceHolder}
                type="text"
                value={this.state.inputValue}
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onEnter={this.toSearchInfo}
                topsearch={true}
                style={{ width: "62.5%", margin: "15px 0 20px 0", minWidth: "631px" }}
              />
              <Button text={this.props.btn.search} onClick={this.toSearchInfo} search={true} style={{ position: "absolute", top: "25px", right: "19%" }} />
              {
                this.props.home.searchAssetList.length !== 0 && (
                  <div className="search-text">
                    <div className="hint-wrapper">
                      <div className="arrow" />
                    </div>
                    <ul className="search-list">
                      {
                        this.props.home.searchAssetList.map((key, value) =>
                        {
                          return <li key={value} onClick={this.goAssetInfo.bind(this, key.assetid)}>{key.name}({key.assetid})</li>
                        })
                      }
                    </ul>
                  </div>
                )}
            </div>
          )
        }
      </div>
    );
  }
}
// export default injectIntl(Header);