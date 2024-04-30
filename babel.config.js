const { isEnv } = require('./build/config');

module.exports = {
    presets: [
        // 执行顺序由右往左
        [
            '@babel/preset-env',
            {
                // 设置兼容目标浏览器版本,这里可以不写,babel-loader会自动寻找上面配置好的文件.browserslistrc
                // targets: {
                //     chrome: 35,
                //     ie: 9
                // },
                // 根据配置的浏览器兼容, 以及代码中使用到的 api 进行引入 polyfill 按需添加
                useBuiltIns: 'usage',
                // 配置使用 core-js 低版本
                corejs: 3
            }
        ],
        '@babel/preset-react',
        '@babel/preset-typescript'
    ],
    plugins: [
        [
            '@babel/plugin-proposal-decorators',
            {
                legacy: true
            }
        ],
        isEnv('development') && require.resolve('react-refresh/babel')
    ].filter(Boolean)
};
