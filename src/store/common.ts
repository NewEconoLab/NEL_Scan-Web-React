// 存储全局变量

import { observable, action } from 'mobx';
import { en_US, zh_CN } from '@/language';
let lang = navigator.language;
lang = lang.substr(0, 2);


class Common {
  @observable public language: string = lang;  // 当前语言
  @observable public network: string = 'testnet';  // 当前网络
  @observable public message: any | null = null;// 当前显示内容

  // 初始化语言
  @action public initLanguage = () =>
  {
    const sessionLanguage = sessionStorage.getItem('language');
    if (sessionLanguage)
    {
      this.language = sessionLanguage;
    }
    if (this.language === 'zh')
    {
      this.message = zh_CN;
      return;
    }
    this.message = en_US;
  }
  // 设置语言
  @action public setLanguage = (msg: string) =>
  {
    if (msg === 'zh')
    {
      this.message = zh_CN;
      this.language = 'zh'
    } else
    {
      this.message = en_US;
      this.language = 'en'
    }
  }

}

// 外部使用require
export default new Common();
