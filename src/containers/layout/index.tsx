// 整体布局
import * as React from 'react';
import * as PropTypes from 'prop-types';
import Header from '@/components/header';
import HeaderMobile from '@/components/header/headerMobile';
import Footer from '@/components/footer'
import { zh_CN, en_US } from '@/language';
import store from '@/store/common';
import HomeStore from '@/containers/home/store/home.store';
import ScrollToTop from '@/components/scrolltotop';
import './index.less';

export default class LayoutIndex extends React.Component<any, any> {
  public static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired,
      }).isRequired
    }).isRequired
  }

  public state = {
    lang:store.language === 'en'?'en':'zh' // zh为中，en为英
  }
  public componentDidMount()
  {
    // const titles = store.language === 'en' ? en_US.title : zh_CN.title;
    // const titleKeys = Object.keys(titles);

    // // 页面初始化的时候匹配一次
    // const arr = titleKeys.filter(v => new RegExp(v).test(this.context.router.history.location.pathname));
    // document.title = titles[arr[arr.length - 1]];
    // store.title = titles[arr[arr.length - 1]];

    // 监听路由改变，重新匹配title
    // this.context.router.history.listen(() => {
    //   const arr2 = titleKeys.filter(v => new RegExp(v).test(this.context.router.history.location.pathname));
    //   document.title = titles[arr2[arr2.length - 1]];
    //   store.title = titles[arr2[arr2.length - 1]];
    // });
  }
  // 切换语言
  public onChangeLanguage = (lang:string) =>
  {
    if (lang === "zh")
    {
      store.setLanguage('zh');      
      sessionStorage.setItem('language', 'zh');
      this.setState({
        lang:'zh'
      })
    } else
    {
      store.setLanguage('en');      
      sessionStorage.setItem('language', 'en');
      this.setState({
        lang:'en'
      })
    }
  }
  public render()
  {
    return (
      <div className="layout-container">
        <ScrollToTop>
          <Header 
            home={HomeStore} 
            history={this.context.router.history} 
            locale={this.state.lang === 'en' ? en_US.header : zh_CN.header} 
            btn={this.state.lang === 'en' ? en_US.btn : zh_CN.btn} 
            input={this.state.lang === 'en' ? en_US.input : zh_CN.input}
            onChangeLanguage={this.onChangeLanguage}
          />
          <HeaderMobile 
            home={HomeStore} 
            history={this.context.router.history} 
            onChangeLanguage={this.onChangeLanguage}
            locale={this.state.lang === 'en' ? en_US.header : zh_CN.header} 
            input={this.state.lang === 'en' ? en_US.input : zh_CN.input}
          />
          <div className="layout-main">
            {this.props.children}
          </div>
          <Footer locale={ this.state.lang === 'en'? en_US.footer : zh_CN.footer} />
        </ScrollToTop>
      </div>
    );
  }
}
