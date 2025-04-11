const AnyProxy = require('anyproxy');

const options = {
    port: 8005, // 代理端口
    rule: require('./rule.js'), // 自定义规则
    webInterface: {
        enable: true,
        webPort: 8002
    }, // 默认为8002
    forceProxyHttps: true, // 强制代理所有https请求
    silent: true, // 关闭控制台输出
    wsIntercept: false, // 关闭websocket拦截
    disableWebInterface: true, // 关闭web界面
};

const proxyServer = new AnyProxy.ProxyServer(options); // 创建代理服务器
proxyServer.start();

