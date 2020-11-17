const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './resource/ts/app.js',
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
      path: __dirname,
      filename: 'app.js'
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-typescript"
              ],
              plugins: [
                "@babel/plugin-proposal-class-properties",
                "@babel/proposal-object-rest-spread"
              ]
            }
          }
        },
        {
          test: /\.(c|sa|sc)ss$/,
          exclude: /node_modules/,
          use: [
            // style.cssファイルにバンドル結果を記載するプラグイン            
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              // url(image path)などをバンドル対象にしないため、下記を指定
              options: { url: false }
            },
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'style.css',
      })
    ]
};