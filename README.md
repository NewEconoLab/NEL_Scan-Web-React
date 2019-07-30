# NELBrowser
[简体中文](#zh) |    [English](#en) 

### <a name="zh">简体中文</a>
## 概述 :
本项目是 _[NEL浏览器](https://scan.nel.group/)_ 用于NEO区块链上的数据查询功能，包括交易信息，资产信息，NNS域名信息的搜索和显示。

## 部署
安装nginx（如果已经安装则跳过） :
```
yum install nginx -y
```

安装git（如果已经安装则跳过） :
```
yum install git -y
```
通过git将本工程下载到服务器 :
```
git clone https://github.com/NewEconoLab/NELBrowser-Web-React.git
```

## 配置
配置nginx
```
server{
                listen 443 ssl;
                server_name ***;

                root ~/NELBrowser-Web-React/build;

                ssl_certificate ***.pem;
                ssl_certificate_key ***.key;

                location /
                {
                        try_files $uri /index.html;
                }
                location /test
                {
                        try_files $uri /test/index.html;
                }
        }
```

## 启动
重启nginx
```
nginx -s reload
```

## 后端服务依赖

```shell
https://api.nel.group/api/ // 公用api
https://apiscan.nel.group/api/ // 浏览器api
```
* api.nel.group（公用api）_[项目文档](https://github.com/NewEconoLab/NEO_Block_API/blob/master/README.md)_ / _[接口文档](http://www.xiaoyaoji.cn/doc/1IoeLt6k57)_
* apiscan.nel.group（浏览器api）_[项目文档](https://github.com/NewEconoLab/NEL_Scan_API/blob/master/README.md)_ / _[接口文档](http://www.xiaoyaoji.cn/doc/2veptPpn9o/edit)_

## 开发者调试

* 启动（测试网）

```shell
npm install / yarn add
```

```shell
npm start / yarn start
```
* 启动（主网）
```shell
npm run startpub
```
* 打包发布
```shell
npm run build
```
* 如需要更替自己的后端服务请至 [api请求配置文件](https://github.com/NewEconoLab/NELBrowser-Web-React/blob/master/src/utils/request.ts)进行修改，修改后执行打包命令
```shell
const network: string = process.env.REACT_APP_SERVER_ENV === 'DEV' ? 'testnet' : 'mainnet'; // 主网/测试网
const baseCommonUrl: string = "https://api.nel.group/api/" + network; // 公用api服务
const baseUrl: string = "https://apiscan.nel.group/api/" + network;   // 浏览器api服务
```

## 技术选型
1. React
2. React-router
3. Mobx
4. Typescript

## 代码约束

遵循 typescript-react 规范 以及 arbnb 规范

### <a name="en">English</a>
## Overview:
This project is _[NEL Browser] (https://scan.nel.group/)_ used for data query function on NEO blockchain, including transaction information, asset information, NNS domain name information search and display.

## Deployment
Install nginx (skip if installed):
```
Yum install nginx -y
```

Install git (skip if installed):
```
Yum install git -y
```
Download the project to the server via git:
```
Git clone https://github.com/NewEconoLab/NELBrowser-Web-React.git
```

## Configuration
Configuring nginx
```
Server{
                Listen 443 ssl;
                Server_name ***;

                Root ~/NELBrowser-Web-React/build;

                Ssl_certificate ***.pem;
                Ssl_certificate_key ***.key;

                Location /
                {
                        Try_files $uri /index.html;
                }
                Location /test
                {
                        Try_files $uri /test/index.html;
                }
        }
```

## start up
Restart nginx
```
Nginx -s reload
```

## Backend service dependencies

```shell
Https://api.nel.group/api/ // public api
Https://apiscan.nel.group/api/ // browser api
```
* api.nel.group(public api) _[project documentation](https://github.com/NewEconoLab/NEO_Block_API/blob/master/README.md)_ / _[interface documentation] (http://www. Xiaoyaoji.cn/doc/1IoeLt6k57)_
* apiscan.nel.group (browser api) _[project documentation] (https://github.com/NewEconoLab/NEL_Scan_API/blob/master/README.md)_ / _[interface documentation] (http://www .xiaoyaoji.cn/doc/2veptPpn9o/edit)_

## Developer debugging

* Start (test network)

```shell
Npm install / yarn add
```

```shell
Npm start / yarn start
```
* Start (main network)
```shell
Npm run startpub
```
* Package release
```shell
Npm run build
```
* If you need to replace your own backend service, please go to [api request configuration file](https://github.com/NewEconoLab/NELBrowser-Web-React/blob/master/src/utils/request.ts) to modify and modify Post-package command
```shell
Const network: string = process.env.REACT_APP_SERVER_ENV === 'DEV' ? 'testnet' : 'mainnet'; // main network/test network
Const baseCommonUrl: string = "https://api.nel.group/api/" + network; // public api service
Const baseUrl: string = "https://apiscan.nel.group/api/" + network; // browser api service
```

## Technical selection
1. React
2. React-router
3. Mobx
4. Typescript

## Code Constraint

Follow the typescript-react specification and the arbnb specification
