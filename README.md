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

后端服务依赖
https://api.nel.group/api/
https://apiscan.nel.group/api/

* 如需要更替自己的后端服务 
NELBrowser-Web-React/src/store/api/request.ts
baseCommonUrl 为公用api服务https://api.nel.group/api/
baseUrl 为浏览器项目api服务https://apiscan.nel.group/api/

## 流程图

todo

## 代码约束

遵循 typescript-react 规范 以及 arbnb 规范
