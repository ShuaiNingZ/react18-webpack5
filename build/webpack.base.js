const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotenvWebpack = require('dotenv-webpack');

const { ROOT_PATH, isEnv } = require('./config');

const isDev = isEnv('development');

module.exports = {
    entry: path.join(ROOT_PATH, '/src/index.tsx'),
    output: {
        // 每个输出 js 的名称
        filename: 'static/js/[name].[chunkhash:8].js',
        // 打包结果的输出路径
        path: path.join(ROOT_PATH, '/dist'),
        // 每次打包前清除
        clean: true,
        // 打包后文件的公共前端路径
        publicPath: '/'
    },
    // 持久缓存, 存储位置 node_modules/.cache/webpack, 里面又区分 development 和 production
    cache: {
        type: 'filesystem'
    },
    // 引入模块不带后缀
    resolve: {
        /**
         * 使用 require 和 import 引入模块时, 如果有准确的相对或绝对路径, 就按照路径查找, 如果引入
         * 的模块没有路径, 会优先查询 node 核心模块, 如果没有找到会去当前目录下 node_modules 中寻找,
         * 如果没有找到会从父级文件夹 node_modules 查找, 一直查到系统 node 全局模块
         *
         * 有两个问题:
         * 1. 当前项目没有安装某个依赖, 但是上一级目录下 node_modules 或者全局模块有安装,
         * 也会引入成功, 但是部署到服务器上可能找不到造成报错的原因
         * 2. 一级一级查找比较消耗时间
         *
         * 解决:
         * 可以配置 webpack resolve.modules 搜索目录的范围, 来规避以上问题
         *
         * 如果使用 pnpm 就不用配置这个, 会有幽灵依赖问题, 访问不到很多模块
         */
        modules: [path.join(ROOT_PATH, '/node_modules')],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        // 配置别名
        alias: {
            '@': path.join(ROOT_PATH, '/src')
        }
    },
    module: {
        rules: [
            {
                test: /.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            /**
             * loader 在 webpack 构建过程中的使用位置是在 webpack 构建模块依赖关系引入新文件时,
             * 会根据文件后缀来倒叙遍历 rules 数组, 如果文件后缀被 test 正则匹配到, 就会使用 rule
             * 中配置到的 loader 依次对文件源代码进行处理, 最终拿到处理后的 sourceCode 结果, 可以
             * 通过避免使用无用 loader 解析来提升构建速度
             */
            {
                test: /\.css$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(less)$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName:
                                    '[name]__[local]-[hash:base64:5]'
                            }
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {}
                        }
                    }
                ]
            },
            // 图片资源处理 webpack5 不再使用 file-loader 和 url-loader,  自带 asset-module
            {
                test: /.(png|jpg|jpeg|gif|svg|webp)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                },
                generator: {
                    filename: 'static/images/[name].[contenthash:8][ext]'
                }
            },
            // 字体、媒体资源处理
            {
                test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                },
                generator: {
                    filename: 'static/images/[name].[contenthash:8][ext]'
                }
            },
            // 多线程
            {
                /**
                 * loader
                 * include: 只解析该选项配置的模块
                 * exclude: 不解析改选项配置的模块, 优先级更高
                 */
                include: [path.join(ROOT_PATH, '/src')],
                test: /.(js|jsx|ts|tsx)$/,
                use: ['thread-loader', 'babel-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(ROOT_PATH, '/public/index.html'),
            inject: true
        }),
        // process.env.NODE_ENV 环境变量 webpack 会自动根据设置的 mode 字段来给业务代码注入对应的
        new webpack.DefinePlugin({
            // BASE_ENV 主要用于业务代码更改接口, 如 本地开发 使用线上环境
            'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
        }),
        new DotenvWebpack({
            allowEmptyValues: true,
            expand: true,
            systemvars: true
        }),
        new DotenvWebpack({
            path: path.join(ROOT_PATH, `.env.${process.env.BASE_ENV}`),
            allowEmptyValues: true,
            expand: true,
            systemvars: true
        })
    ]
};
