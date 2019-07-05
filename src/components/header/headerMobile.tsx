/**
 * 移动端 header 组件
 */
import * as React from 'react';
import { Link } from 'react-router-dom';
import './headerMobile.less';
import EventHandler from 'utils/event';
import { observer } from 'mobx-react';
import * as Neotool from '@/utils/neotool';
import store from "@/store";
interface IState
{
  isShowMenu: boolean, // 是否显示菜单
  isShowBrowse: boolean, // 是否显示浏览器菜单
  isShowEnv: boolean, // 是否显示网络菜单
  inputValue: string,
  languageText: string, // 
  isShowLang: boolean,// 是否显示语言菜单
  isShowSearch: boolean,// 是否显示搜索框
}


@observer
export default class HeaderMobile extends React.Component<any, IState> {
  public state = {
    isShowMenu: false,
    isShowBrowse: false,
    isShowEnv: false,
    inputValue: '',
    languageText: store['common'].language === 'en' ? "中" : "En",
    isShowLang: false,
    isShowSearch: false,
  }
  public toggleMenu = () =>
  {
    this.setState({
      isShowMenu: !this.state.isShowMenu,
      inputValue: ''
    })
  }
  public toggleEnv = (e) =>
  {
    this.setState({
      isShowEnv: !this.state.isShowEnv,
      isShowBrowse: false,
      isShowLang: false
    })
    e.stopPropagation();
  }
  public toggleLang = (e) =>
  {
    this.setState({
      isShowEnv: false,
      isShowBrowse: false,
      isShowLang: !this.state.isShowLang,
    })
    e.stopPropagation();
  }
  public toggleBrowse = (e) =>
  {
    this.setState({
      isShowEnv: false,
      isShowBrowse: !this.state.isShowBrowse,
      isShowLang: false,
    })
    e.stopPropagation();
  }

  public toggleBrowse2 = (e) =>
  {
    this.toggleBrowse(e);
    this.toggleMenu();
    e.stopPropagation();
  }

  public toggleEnv2 = (e) =>
  {
    this.toggleEnv(e);
    this.toggleMenu();
    e.stopPropagation();
  }
  public toggleLang2 = (e) =>
  {
    this.toggleLang(e);
    this.toggleMenu();
    e.stopPropagation();
  }

  public componentDidMount()
  {
    EventHandler.add(this.globalClick);

    this.props.history.listen(() =>
    {
      this.setState({
        isShowMenu: false
      })
    })
  }
  public componentWillUnmount()
  {
    EventHandler.remove(this.globalClick);
  }

  public globalClick = () =>
  {
    this.setState({
      isShowEnv: false,
      isShowBrowse: false,
    })
  }
  public getPath = (base) =>
  {
    const locations = this.props.history.location;
    window.location.href = `${location.origin}${base || ''}${locations.pathname}${locations.search}${locations.hash}`
  }

  // 输入变化
  public onChange = (ev: any) =>
  {
    const value = ev.target.value;
    // 禁止输入中文，以及其他特殊字符
    if (/[^a-zA-Z\d\.]/g.test(value))
    {
      return
    }
    this.setState({
      inputValue: value
    })
  }
  // 显示搜索框
  public toShowSearch = () =>{
    this.setState({
      isShowSearch: true,
      inputValue: ''
    })
  }
  // 关闭搜索框
  public toCloseSearch = () =>
  {
    this.setState({
      isShowSearch: false,
      inputValue: ''
    })
  }
  public onKeyDown = (ev: any) =>
  {
    if (ev.keyCode === 13)
    {
      this.toSearchInfo();
    }
  }
  // 搜索功能
  public toSearchInfo = () =>
  {
    let search: string = this.state.inputValue;
    search = search.trim();
    if (search)
    {
      const isDomain = this.checkDomainname(search);// 判断是否为域名
      if (isDomain)
      {
        window.location.href = process.env.REACT_APP_SERVER_ENV === 'DEV' ? '/test/nnsinfo/' + search : '/nnsinfo/' + search;
      }
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
      isShowMenu: false,
      inputValue: ''
    })
    return;
  }
  // 检测输入域名是否合法
  public checkDomainname(domainname: string)
  {
    let domain = domainname;
    if (/\.neo$/.test(domainname))
    {
      domain = domain.substring(0, domain.length - 4);
    }
    else if (/\.test$/.test(domainname))
    {
      domain = domain.substring(0, domain.length - 5);
    }
    else
    {
      return false;
    }
    if (domain.length >= 2 && domain.length <= 32)
    {
      return true;
    } else
    {
      return false;
    }
  }
  // 移动版切换语言
  public onClickTochangeLanguage = () =>
  {
    if (this.state.languageText === "中")
    {
      this.setState({
        languageText: "En",
      })
      this.props.onChangeLanguage('zh');
    } else
    {
      this.setState({
        languageText: "中"
      })
      this.props.onChangeLanguage('en');
    }
  }
  // 切换英文
  public onClickEnglish = () =>
  {
    this.setState({
      languageText: "En"
    })
    this.props.onChangeLanguage('en');
  }
  // 切换中文
  public onClickChinese = () =>
  {
    this.setState({
      languageText: "中"
    })
    this.props.onChangeLanguage('zh');
  }
  public render()
  {
    return (
      <div className="header-mobile-container">
        {/* <div className="language" onClick={this.onClickTochangeLanguage}>{this.state.languageText}</div> */}
        {
          !this.state.isShowSearch && (
            <div className="header-wrapper">
              <img src={require('@/img/menu.png')} alt="" className="nav" onClick={this.toggleMenu} />
              <div className="logo">
                <img src={require('@/img/logo.png')} alt="" />
              </div>
              <div className="search-wrapper">
                <img src={require('@/img/search.png')} alt="" onClick={this.toShowSearch} />
              </div>
            </div>
          )
        }
        {
          this.state.isShowSearch && (
            <div className="search-box">
              <input
                type="text"
                placeholder={this.props.input.placeholder}
                value={this.state.inputValue}
                onChange={this.onChange}
                onKeyDown={this.onKeyDown}
              />
              <img src={require('@/img/close.png')} alt="" onClick={this.toCloseSearch} />
            </div>
          )
        }
        {
          this.state.isShowMenu && (
            <div className="menu-wrapper">
              <div className="close" onClick={this.toggleMenu}>
                <img src={require('@/img/close.png')} alt="" />
              </div>
              <div className="list-box">
                <div className="list">
                  <span><Link to="/">{this.props.locale.explorer}</Link></span>
                </div>
                <div className="list">
                  <label onClick={this.toggleBrowse}><span>{this.props.locale.browse} <em /></span></label>
                  {
                    this.state.isShowBrowse && (
                      <div className="child" onClick={this.toggleBrowse2}>
                        <span><Link to="/blocks">{this.props.locale.blocks}</Link></span>
                        <span><Link to="/transactions">{this.props.locale.transactions}</Link></span>
                        <span><Link to="/addresses">{this.props.locale.addresses}</Link></span>
                      </div>
                    )
                  }
                </div>
                <div className="list">
                  <span><Link to="/assets">{this.props.locale.assets}</Link></span>
                </div>
                <div className="list">
                  <span><Link to="/nns">{this.props.locale.nnsevent}</Link></span>
                </div>
                <div className="list">
                  {
                    process.env.REACT_APP_SERVER_ENV === 'DEV' ? <a href="https://testwallet.nel.group/" target="_blank">{this.props.locale.wallet}</a> : <a href="https://wallet.nel.group/" target="_blank">{this.props.locale.wallet}</a>
                  }
                </div>
              </div>
              <div className="list-box">
                <div className="list">
                  <label onClick={this.toggleEnv}><span>{process.env.REACT_APP_SERVER_ENV === 'DEV' ? this.props.locale.testnet : this.props.locale.mainnet}<em /></span></label>
                  {
                    this.state.isShowEnv && (
                      <div className="child" onClick={this.toggleEnv2}>
                        <span><a onClick={this.getPath.bind(this, '')}>{this.props.locale.mainnet}</a></span>
                        <span><a onClick={this.getPath.bind(this, '/test')}>{this.props.locale.testnet}</a></span>
                      </div>
                    )
                  }
                </div>
                <div className="list">
                  <span>API</span>
                </div>
              </div>
              <div className="list-box">
                <div className="list">
                  <label onClick={this.toggleLang}><span>{this.props.locale.lang}<em /></span></label>
                  {
                    this.state.isShowLang && (
                      <div className="child" onClick={this.toggleLang2}>
                        <span><a onClick={this.onClickChinese}>中文</a></span>
                        <span><a onClick={this.onClickEnglish}>English</a></span>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          )
        }

      </div>
    );
  }
}