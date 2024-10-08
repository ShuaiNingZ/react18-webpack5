const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const { ProgressPlugin } = require('webpack');
const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.base.js');
const { ROOT_PATH } = require('./config');

module.exports = merge(baseConfig, {
    mode: 'development',
    // source map 源码调试模式
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        port: 9000,
        open: true,
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
    plugins: [
        new ProgressPlugin(),
        new ReactRefreshWebpackPlugin(),
        new StylelintPlugin({
            // 指定上下文路径
            context: process.cwd(),
            // 指定要检查的文件
            files: ['src/**/*.scss'],
            // 指定语法类型
            syntax: 'less',
            // 指定配置文件路径
            configFile: '.stylelintrc.js',
            // 是否抛出错误
            emitErrors: true,
            // 是否开启缓存, 在构建过程中存储已处理模块的结果，以便在下次构建时可以重用这些结果, 有助于加快构建速度, 配置发生重大变化要定期清理缓存, 否则缓存无效
            cache: true,
            // 缓存位置
            cacheLocation: './node_modules/.cache/stylelint.cache',
            // 是否静默模式
            quiet: false
        })
    ]
});
