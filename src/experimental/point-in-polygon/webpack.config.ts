import path from 'path';
import webpack from 'webpack';
import 'webpack-dev-server';

import HtmlWebpackPlugin from 'html-webpack-plugin';

const config: webpack.Configuration = {
  context: path.resolve(__dirname, 'src'),
  entry: './game.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'ts-loader'
      },
      {
        test: require.resolve('Phaser'),
        loader: 'expose-loader',
        options: { exposes: { globalName: 'Phaser', override: true } }
      }
    ]
  },
  devServer: {
    static: path.join(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      title: 'Point in Polygon',
      inject: 'head'
    })
  ]
};

export default config;
