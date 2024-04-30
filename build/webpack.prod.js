const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const GlobAll = require('glob-all');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.base.js');
const { ROOT_PATH } = require('./config');

module.exports = merge(baseConfig, {
    // 生产模式, 会开启 tree-shaking 和 压缩代码, 以及其他优化
    mode: 'production',
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            // 压缩 js
            new TerserPlugin({
                // 开启多线程压缩
                parallel: true,
                terserOptions: {
                    compress: {
                        // 删除 console.log
                        pure_funcs: ['console.log']
                    }
                }
            })
        ],
        // 分隔代码
        splitChunks: {
            cacheGroups: {
                // 提取 node_modules 代码
                vendors: {
                    // 只匹配 node_modules 里面的模块
                    test: /node_modules/,
                    // 提取文件命名为 vendors, js 后缀和 chunkhash 会自动加
                    name: 'vendors',
                    // 只要使用一次就提取出来
                    minChunks: 1,
                    // 只提取初始化就能获取到的模块, 不管异步的
                    chunks: 'initial',
                    // 提取代码体积大于 0 就提取出来
                    minSize: 0,
                    // 提取优先级为 1
                    priority: 1
                },
                // 提取页面公共代码
                commons: {
                    // 提取文件命名为 commons
                    name: 'commons',
                    // 只要使用两次就提取出来
                    minChunks: 2,
                    // 只提取初始化就能获取到的模块, 不管异步的
                    chunks: 'initial',
                    // 提取代码体积大于 0 就提取出来
                    minSize: 0
                }
            }
        }
    },
    plugins: [
        // 复制文件插件
        new CopyPlugin({
            patterns: [
                {
                    // 复制public下文件
                    from: path.resolve(ROOT_PATH, './public'),
                    // 复制到dist目录中
                    to: path.resolve(ROOT_PATH, './dist'),
                    filter: (source) => {
                        // 忽略index.html
                        return !source.includes('index.html');
                    }
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css'
        }),
        // 清除无用 css
        new PurgeCSSPlugin({
            // 检测 src 下所有 tsx 文件和 public 下 index.html 中使用的类名和 id 和标签名称
            // 只打包这些文件中用到的样式
            paths: GlobAll.sync([
                `${path.join(ROOT_PATH, '/src')}/**/*.tsx`,
                path.join(ROOT_PATH, '/public/index.html')
            ]),
            // 过滤掉 ui 框架类名, 过滤以 ant- 开头的类名, 哪怕没用到也不会删除
            safelist: {
                // standard: [/^ant-/]
            }
        }),
        // 压缩
        new CompressionWebpackPlugin({
            // 只生成 css, js 压缩文件
            test: /.(js|css)$/,
            // 文件命名
            filename: '[path][base].gz',
            // 压缩格式, 默认是 gzip
            algorithm: 'gzip',
            // 只有大小大于该值的资源会被处理, 默认值是 10k
            threshold: 10240,
            // 压缩率, 默认值是 0.8
            minRatio: 0.8
        })
    ]
});
