const {smart: merge} = require("webpack-merge");
const baseConfig = require('./webpack.base.config');
const devConfig = {
    mode: 'development',
    devtool: 'eval-cheap-source-map',
    devServer: {
        port: 8081,
        contentBase: './dist', //服务器静态资源文件
        progress: true, //打包时显示进度条
        open: true, //启动后自动打开浏览器
        compress: true, //启动gzip压缩
        hot: true,
        // proxy: {
        //     '/api': {
        //         target: 'http:****', //请求地址
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^api': '' //重写某些请求地址
        //         }
        //     }
        // } //代理
    }
}

module.exports = merge(baseConfig, devConfig);
