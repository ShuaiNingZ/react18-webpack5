const prodConfig = require('./webpack.prod');
const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const smwp = new SpeedMeasureWebpackPlugin();

module.exports = smwp.wrap(
    merge(prodConfig, {
        plugins: [new BundleAnalyzerPlugin()]
    })
);
