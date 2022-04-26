const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require("webpack-node-externals");

const generalConfig = {
  experiments: {
    syncWebAssembly: true,
    layers: true,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, './dist')],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
      util: false,
    }
  },
};

const nodeConfig = {
  entry: "./src/index.ts",
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: '',
    filename: "node.js",
    libraryTarget: "umd",
    libraryExport: "default",
  },
};

const browserConfig = {
  entry: "./src/index.ts",
  target: "web",
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: '',
    filename: "browser.js",
    libraryTarget: "umd",
    globalObject: "this",
    libraryExport: "default",
    umdNamedDefine: true,
    library: "heimdall",
  },
};

module.exports = () => {
  Object.assign(nodeConfig, generalConfig);
  Object.assign(browserConfig, generalConfig);

  return [nodeConfig, browserConfig];
};