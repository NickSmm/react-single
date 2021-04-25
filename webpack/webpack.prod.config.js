const {smart: merge} = require("webpack-merge");
const baseConfig = require('./webpack.base.config');

const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const prodConfig = {
    mode: 'production',
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
    },
    optimization: {
        minimizer: [
            // 压缩js
            new TerserPlugin(),
            // 压缩css
            new OptimizeCssAssetsWebpackPlugin()
        ],
        splitChunks: {
            // all 对同步异步代码都做代码分割
            // async 只对异步代码做代码分割
            // initial 只对同步代码做代码分割
            chunks: 'all',
            cacheGroups: {
                // 第三方模块
                vendor: {
                    // 每个组的名字
                    name: 'vendor',
                    // 优先级越高，越优先检测
                    priority: 2,
                    // 检测方法
                    test: /node_modules/,
                    // 超过多大进行代码分割， 实际开发中可以写 5 * 1024
                    minSize: 5*1024,
                    // 检测模块被引用了几次
                    // 对于公共模块而言，引用了1次就需要单独打包
                    // 对于第三方模块而言，引用2次以上就要单独打包了
                    minChunks: 1
                },
                common: {
                    // 每个组的名字
                    name: 'common',
                    // 优先级越高，越优先检测
                    priority: 0,
                    // 检测方法
                    test: /node_modules/,
                    // 超过多大进行代码分割， 实际开发中可以写 5 * 1024
                    minSize: 5*1024,
                    // 检测模块被引用了几次
                    // 对于公共模块而言，引用了1次就需要单独打包
                    // 对于第三方模块而言，引用2次以上就要单独打包了
                    minChunks: 2
                }
            }
        }
    }
}

module.exports = merge(baseConfig, prodConfig);
