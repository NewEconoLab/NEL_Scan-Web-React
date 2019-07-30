# NELBrowser

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

## 项目文档

* 后端服务依赖
```shell
https://api.nel.group/api/
https://apiscan.nel.group/api/
```

* 如需要更替自己的后端服务 

- [api请求配置文件](https://github.com/NewEconoLab/NELBrowser-Web-React/blob/master/src/utils/request.ts)
```shell
const network: string = process.env.REACT_APP_SERVER_ENV === 'DEV' ? 'testnet' : 'mainnet'; // 主网/测试网
const baseCommonUrl: string = "https://api.nel.group/api/" + network; // 公用api服务
const baseUrl: string = "https://apiscan.nel.group/api/" + network;   // 浏览器api服务
```
* api项目地址：
- [api.nel.group](https://github.com/NewEconoLab/NEO_Block_API/blob/master/README.md)
- [apiscan.nel.group](https://github.com/NewEconoLab/NEL_Scan_API/blob/master/README.md)

## 流程图

todo

## 代码约束

遵循 typescript-react 规范 以及 arbnb 规范
