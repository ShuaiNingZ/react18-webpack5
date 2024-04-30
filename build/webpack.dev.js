const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.base.js');
const { ROOT_PATH } = require('./config');

module.exports = merge(baseConfig, {
    mode: 'development',
    // source map 源码调试模式
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        port: 9000,
        // gzip 压缩, 开发环境不开启, 提升热更新速度
        compress: false,
        // 开启热更新
        hot: true,
        // 解决 history 路由 404 问题
        historyApiFallback: true,
        static: {
            // 托管静态资源public文件夹
            directory: path.join(ROOT_PATH, '/public')
        }
    },
    plugins: [new ReactRefreshWebpackPlugin()]
});
