### 初始化项目

```
npm init -y 
生成 package.json, 将 package.json 的 private 设为 true, 私有
```

### 安装服务工具

```
// webpack-dev-server 本地服务
// webpack-merge webpack 配置合并
npm i -D webpack webpack-cli webpack-dev-server webpack-merge

// 环境变量
// cross-env 兼容各系统的设置环境变量
// webpack.DefinePlugin webpack 内置的插件, 可以为业务代码注入环境变量
npm i -D cross-env
```

### 安装解析工具

```
// webpack 默认只能识别 js 文件, 需要配置 loader 
// @babel/preset-react 识别 jsx
// @babel/preset-typescript 将 ts 转为 js
// babel-loader 将 ES6 转 ES5
// @babel/core 是 Babel 不可或缺的, 用于解析代码 source map之类的
// @babel/preset-env 用于最新的 js 代码转换为旧版本浏览器可识别的代码
// core-js 使用低版本 js 语法模拟高版本的库, 也就是垫片
npm i -D @babel/preset-react @babel/preset-typescript babel-loader @babel/core @babel/preset-env core-js

// css 处理
// style-loader 把解析后的 css 代码从 js 中抽离, 放到头部的 style 标签中
// css-loader 解析 css 文件代码
// postcss-loader 处理 css 自动加前缀
// autoprefixer 决定哪些浏览器前缀到 css 中
// sass-loader 将 sass 编译成 css
npm i -D style-loader css-loader postcss-loader autoprefixer sass-loader sass

// @babel/plugin-proposal-decorators 用于解析 React Class 组件代码中的装饰器语法
npm i -D @babel/plugin-proposal-decorators

// thread-loader 开启多线程 loader, 使用多线程解析 loader
npm i thread-loader -D
```

### 安装插件

```
// html-webpack-plugin 将打包后的静态资源引入到 html 文件
npm i -D html-webpack-plugin

// copy-webpack-plugin 将 public 下的静态文件复制到 dist
npm i -D copy-webpack-plugin

// react 组件修改局部热更新, 单独开启 devServer hot react 组件修改会刷新页面
npm i -D @pmmmwh/react-refresh-webpack-plugin react-refresh

// mini-css-extract-plugin 把 css 单独抽离出来, 方便配置缓存策略
npm i -D mini-css-extract-plugin

// css-minimizer-webpack-plugin 把 css 代码进行压缩
npm i -D css-minimizer-webpack-plugin

// terser-webpack-plugin optimization.minimizer 压缩 css 后, js压缩就失效了, 重新把 js 代码进行压缩, 
npm i -D terser-webpack-plugin

// production js 自带 tree-shaking 将未使用的 js 代码清理
// purgecss-webpack-plugin 将未使用的 css 代码清理 配合 mini-css-extract-plugin 使用
// glob-all 选择要检测哪些文件里面类名和 id 还有标签名
npm i -D purgecss-webpack-plugin glob-all

// compression-webpack-plugin 打包时生成 gzip 
npm i -D compression-webpack-plugin
```

### 安装打包分析

```
// speed-measure-webpack-plugin 用于打包分析, 为不影响正常开发/打包模式, 单独创建 webpack.analy.js 文件
npm i -D speed-measure-webpack-plugin

// webpack-bundle-analyzer 使用交互式可缩放树形图可视化 webpack 输出文件的大小
npm i -D webpack-bundle-analyzer
```

### 安装项目规范工具

```
// react 规范
npm i -D eslint eslint-plugin-react eslint-plugin-react-hooks

// @typescript-eslint/parser ts 规范解析
npm i -D @typescript-eslint/parser @typescript-eslint/eslint-plugin

//  eslint-plugin-import import 导入规范
npm i -D eslint-plugin-import

// eslint-import-resolver-webpack 用于识别 @ 导入路径符号
npm i -D eslint-import-resolver-webpack

// prettier 代码格式化工具
// eslint-config-prettier 关闭 Prettier 可以处理的规则, ESLint 避免两者之间的冲突
// eslint-plugin-prettier 让 ESLint 配置与 Prettier 兼容, 以便在保存文件时自动格式化代码
npm i -D prettier eslint-config-prettier eslint-plugin-prettier

// css scss 代码格式化工具
// stylelint 样式检测主包
// stylelint-config-standard stylelint 官网推荐包
// stylelint-order css 声明排序
// stylelint-config-rational-order stylelint-order 依赖
// stylelint-config-recess-order stylelint-order 依赖
// stylelint-scss scss 检测
// stylelint-config-recommended-scss stylelint-scss 配置
// stylelint-config-standard-scss scss 语法规则
npm i -D stylelint stylelint-config-standard  stylelint-order stylelint-config-rational-order 
stylelint-config-recess-order stylelint-scss stylelint-config-recommended-scss stylelint-config-standard-scss
```

### 安装 git 检测相关

```
// husky git hook 钩子的控制
npm i -D husky 
```

### 安装项目工具

```
npm i -S react react-dom
npm i -D @types/react @types/react-dom

// dotenv-webpack 用于加载环境变量, 识别 .env 开头的文件
npm i -D dotenv-webpack
```
