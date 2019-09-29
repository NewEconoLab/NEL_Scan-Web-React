// 存储全局变量

import { observable, action, computed } from 'mobx';
import { en_US, zh_CN } from '@/language';
import homeStore from '@/containers/home/store/home.store';
let lang = navigator.language;
lang = lang.substr(0, 2);


class Common {
  @observable public language: string = lang;  // 当前语言
  @observable public network: string = process.env.REACT_APP_SERVER_ENV === 'DEV' ? 'testnet' : (process.env.REACT_APP_SERVER_ENV === 'NEO3' ? 'neo3' : 'mainnet');
  @observable public message: any | null = null;// 当前显示内容
  @observable public socket: any; // websoket

  @computed get webSocketURL() {
    if (this.network === 'mainnet') {
      return 'wss://testws.nel.group/ws/mainnet'
    }
    else {
      return 'wss://testws.nel.group/ws/testnet'
    }
  }
  // 初始化语言
  @action public initLanguage = () => {
    const sessionLanguage = sessionStorage.getItem('language');
    if (sessionLanguage) {
      this.language = sessionLanguage;
    }
    if (this.language === 'zh') {
      this.message = zh_CN;
      return;
    }
    this.message = en_US;
  }
  // 设置语言
  @action public setLanguage = (msg: string) => {
    if (msg === 'zh') {
      this.message = zh_CN;
      this.language = 'zh'
    } else {
      this.message = en_US;
      this.language = 'en'
    }
  }
  @action public socketInit = () => {
    if (this.socket) {
      this.socket.close()
    }
    console.log(this.network)
    console.log(this.webSocketURL)
    this.socket = new WebSocket(this.webSocketURL);

    this.socket.onclose = (event: any) => {
      console.log(event);
      // notification.warning({ message: 'websocket', description: 'close' })
    };
    this.socket.onerror = (event: any) => {
      console.log(event);
      // notification.error({ message: 'websocket', description: 'error' })
    };
    this.socket.onopen = (event: any) => {
      console.log(event);
      this.socket.send('Hello Server!');
      // notification.success({ message: 'websocket', description: 'open on ' + this.webSocketURL })
    }
    this.socket.onmessage = (event: any) => {
      console.log(event.data);
      // 更新首页
      if (window.location.pathname === '/' || window.location.pathname === '/test/' || window.location.pathname === '/neo3/') {
        homeStore.getBlockHeight();
        homeStore.getTxCount('');
        homeStore.getAddrCount();
        homeStore.getBlockList(10, 1);
        homeStore.getTransList(10, 1, '');
      }
    }
  }

}

// 外部使用require
export default new Common();
