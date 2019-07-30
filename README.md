# NELBrowser
[简体中文](#zh) |    [English](#en) 

<a name="zh">简体中文</a>
## 概述 :
本项目是 _[NEL浏览器](https://scan.nel.group/)_ 用于NEO区块链上的数据查询功能，包括交易信息，资产信息，NNS域名信息的搜索和显示。
## 技术选型
1. React
2. React-router
3. Mobx
4. Typescript

## 启动（测试网）

```shell
npm install / yarn add
```

```shell
npm start / yarn start
```
## 启动（主网）
```shell
npm run startpub
```
## 打包发布
```shell
npm run build
```

## Nginx 配置
```shell
location / {
  try_files $uri /index.html;
}

location /test {
 try_files $uri /test/index.html;
}
```

## 代码约束

遵循 typescript-react 规范 以及 arbnb 规范

## 项目文档

* 后端服务依赖
```shell
https://api.nel.group/api/
https://apiscan.nel.group/api/
```

* 如需要更替自己的后端服务请至以下配置文件进行修改
- [api请求配置文件](https://github.com/NewEconoLab/NELBrowser-Web-React/blob/master/src/utils/request.ts)
```shell
const network: string = process.env.REACT_APP_SERVER_ENV === 'DEV' ? 'testnet' : 'mainnet'; // 主网/测试网
const baseCommonUrl: string = "https://api.nel.group/api/" + network; // 公用api服务
const baseUrl: string = "https://apiscan.nel.group/api/" + network;   // 浏览器api服务
```
* api项目地址：
api.nel.group（公用api）_[项目文档](https://github.com/NewEconoLab/NEO_Block_API/blob/master/README.md)_  _[接口文档](http://www.xiaoyaoji.cn/doc/1IoeLt6k57)_
apiscan.nel.group（浏览器api）_[项目文档](https://github.com/NewEconoLab/NEL_Scan_API/blob/master/README.md)_ _[接口文档](http://www.xiaoyaoji.cn/doc/2veptPpn9o/edit)_

<a name="en">English</a>
## Technical selection
React
2. React-router
3. Mobx
4. Typescript

## Startup (test network)

```shell
Npm install / yarn add
```

```shell
Npm start / yarn start
```
## Startup (Main Network)
```shell
Npm run startpub
```
## Package Release
```shell
Npm run build
```

## Nginx Configuration
```shell
Location / {
  Try_files $uri /index.html;
}

Location /test {
 Try_files $uri /test/index.html;
}
```

## Code Constraint

Follow the typescript-react specification and the arbnb specification

## Project Documentation

* Backend service dependencies
```shell
Https://api.nel.group/api/
Https://apiscan.nel.group/api/
```

* If you need to replace your own backend service
- [API request configuration](https://github.com/NewEconoLab/NELBrowser-Web-React/blob/master/src/utils/request.ts)
```shell
Const network: string = process.env.REACT_APP_SERVER_ENV === 'DEV' ? 'testnet' : 'mainnet'; // main network/test network
Const baseCommonUrl: string = "https://api.nel.group/api/" + network; // public api service
Const baseUrl: string = "https://apiscan.nel.group/api/" + network; // browser api service
```
* api project address:
- [api.nel.group](https://github.com/NewEconoLab/NEO_Block_API/blob/master/README.md)
- [apiscan.nel.group](https://github.com/NewEconoLab/NEL_Scan_API/blob/master/README.md)
