# 项目名称 - Vue3+Node.js 博客系统

这是一个基于 Vue3、Node.js 和 MongoDB 的博客系统项目，展示了前端和后端的完整分离式开发流程。该项目由我个人开发，使用了与市面上主流技术栈略有不同的技术架构，旨在提高系统的灵活性、扩展性和开发效率。

## 技术栈

- **前端**：Vue3
- **后端**：Node.js + Express
- **数据库**：MongoDB
- **其他**：Vuex 状态管理、Vue Router 路由、Axios HTTP 请求、JWT

## 功能概览

- 用户系统：用户注册、登录、退出登录功能，支持用户身份验证与会话管理。
- 博客管理：支持文章的创建、编辑、删除与展示，包含分类与标签功能。
- 评论系统：支持嵌套评论与点赞功能，实现用户与内容之间的互动。
- 搜索与分页：用户可根据关键词搜索文章，同时实现文章分页浏览。
- 文章点赞：支持访客和已登录用户的点赞功能，用户无需重复点赞。

## 文件结构

```
├── src
│   ├── assets       # 静态资源
│   ├── components   # 可复用的组件
│   ├── views        # 页面视图
│   ├── router       # 路由配置
│   ├── store        # Vuex 状态管理
│   ├── utils        # 工具函数
│   └── App.vue      # 主入口组件
│
├── public           # 静态文件
│
└── README.md        # 项目文档
```

## 快速开始

### 环境依赖

- Node.js >= 14.0
- MongoDB >= 4.0

### 安装与运行

1. 克隆项目到本地

   ```
   git clone https://github.com/yourusername/yourproject.git
   ```

2. 进入项目目录并安装依赖

   ```
   cd yourproject
   npm install
   ```

3. 启动后端服务

   ```
   # 进入后端目录
   cd backend
   # 安装后端依赖
   npm install
   # 启动后端服务
   npm run start
   ```

4. 启动前端服务

   ```
   # 进入前端目录
   cd frontend
   # 安装前端依赖
   npm install
   # 启动前端服务
   npm run serve
   ```

5. 浏览器中访问 `http://localhost:8080` 查看项目

## 核心功能说明

### 用户系统

基于 JWT 实现用户身份验证，使用 Vuex 管理用户状态，前后端保持会话同步。

### 博客管理

包含文章的增删改查功能，支持 Markdown 格式输入，文章内容和操作由数据库持久化存储在 MongoDB 中。

### 评论系统

支持嵌套回复与点赞功能，用户可针对不同文章发表评论，系统支持自动分页与无限加载。

### 搜索与分页

基于前端和后端的配合，实现用户输入关键词搜索与按页浏览功能，提升用户体验。

### 安全与数据保护

- 使用 JWT 进行身份验证
- 采用 MongoDB 提供的数据加密选项，确保数据安全

## 项目开发细节

### 前端

- 使用 Vue3 的组合式 API 提高组件的复用性和可读性
- Vue Router 实现多页面跳转，支持动态路由
- Vuex 管理全局状态，保持数据一致性
- Element Plus 提供 UI 组件，提升开发效率

### 后端

- Node.js + Express 框架，实现 RESTful API
- 使用 JWT 管理用户身份和认证
- MongoDB 数据库，实现灵活的数据存储
- 使用 Mongoose 简化数据库操作，并配置 Schema 进行数据校验

## 贡献

欢迎对项目提出建议或反馈

## 许可证

MIT License