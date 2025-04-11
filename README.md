# Onlooker - 请求拦截代理爬虫工具

## 项目简介

Onlooker是一个基于AnyProxy的浏览器请求拦截代理系统，提供了一种简单的网络数据采集方法。

### 名称由来

Onlooker（旁观者直译）："不逆向、不干扰，只做一个安静的旁观者。"

"旁观浏览器的一举一动，捕捉每一条数据流。"

### 主要特点

- **简化数据获取**：无需复杂的JS逆向和加密分析
- **灵活操作方式**：支持真人操作浏览器，也可通过程序自动执行翻页、滑动等操作
- **请求拦截机制**：代理捕获指定的HTTP/HTTPS请求
- **数据处理集成**：拦截数据转发给Python后端处理
- **灵活可定制**：可根据不同网站自定义拦截规则

## 系统架构

```
┌─────────────┐         ┌───────────┐         ┌───────────────┐
│  浏览器操作  │  ──→   │  AnyProxy  │  ──→   │  Python后端   │
│  (真实用户)  │  ←──   │  (拦截器)  │  ←──   │  (数据处理)   │
└─────────────┘         └───────────┘         └───────────────┘
```

### 组件说明

1. **代理服务器 (AnyProxy)**
   - 监听端口：8005
   - Web界面：8002
   - 处理HTTP/HTTPS请求拦截

2. **请求处理器 (handlers)**
   - requestHandler：处理请求拦截逻辑
   - responseHandler：处理响应拦截逻辑

3. **Python后端**
   - 数据处理与分析
   - API服务器：监听5000端口
   - 数据持久化存储

## 安装指南

### 环境要求

- Node.js v12+
- Python 3.7+
- AnyProxy
- 系统配置支持HTTPS代理

### 安装步骤

1. 克隆仓库
```bash
git clone https://github.com/yourusername/Onlooker.git
cd Onlooker
```

2. 安装Node.js依赖
```bash
npm install
```

3. 安装Python依赖
```bash
pip install -r requirements.txt
```

4. 安装AnyProxy证书（用于HTTPS拦截）
```bash
npx anyproxy-ca
```

## 使用方法

### 启动系统

1. 启动Python后端
```bash
cd python
python main.py
```

2. 启动AnyProxy代理服务器
```bash
node anyporxy_start.js
```

3. 配置浏览器代理
   - 代理地址：127.0.0.1
   - 端口：8005
   - 类型：HTTP/HTTPS

### 自定义拦截规则

修改`handlers/requestHandler.js`和`handlers/responseHandler.js`来自定义您的拦截规则：

```javascript
// 示例：拦截特定URL
if (requestDetail.url.indexOf('example.api') !== -1) {
    // 处理逻辑
}
```



1. 基础自动滚动脚本：
```bash
cd python
python auto.py
```

2. 自定义自动化操作：
可以基于PyAutoGUI等库开发更复杂的自动化脚本，如：
- 定时翻页
- 智能点击
- 模拟搜索操作

这种方式让数据采集过程可以完全自动化，提高效率的同时减少人工干预。

## 数据输出

采集的数据将以CSV格式保存在`data/`目录下，文件命名格式为`taobao_data_YYYYMMDD_HHMMSS.csv`。

## 可能的应用场景

- 电商网站数据采集：商品信息、价格等
- 内容网站数据：文章、评论等内容
- 特定API响应监控：针对特定接口的数据捕获
- 自定义数据分析：根据业务需求处理特定请求数据

## 注意事项

- 请遵守网站的服务条款和robots.txt规则
- 合理控制请求频率，避免对目标服务器造成过大负担
- 仅用于合法的数据分析和研究目的
