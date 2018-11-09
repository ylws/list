const path = require("path");
const webpack = require("webpack");
 
module.exports = {
    devtool: 'source-map',
    entry: "./src/index.js",//入口文件，就是上步骤的src目录下的index.js文件，
    output: {
        path: path.resolve(__dirname, '../dist'),//输出路径，就是上步骤中新建的dist目录，
        publicPath: '/dist/',
        filename: 'index.js',
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.less$|\.sass$|\.scss$/,
                use: [
                  "style-loader", // creates style nodes from JS strings
                  "css-loader", // translates CSS into CommonJS
                  "sass-loader",
                  "less-loader"
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif|ttf|svg|woff|eot|woff2)$/,
                loader: 'url-loader',
                query: {
                    limit: 30000,
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    devServer: {
      historyApiFallback: true,
      noInfo: true,
      overlay: {
        errors: true
      }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        // new webpack.ProvidePlugin({
        //   $: "jquery",
        //   jQuery: "jquery"
        // }),
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: false,
          compress: {
            warnings: false
          }
        })
    ]
};
if (process.env.NODE_ENV === 'test') {
  module.exports.devtool = '#source-map'
  module.exports.entry = './src/index.js'
  module.exports.output.filename = 'index.js'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}

