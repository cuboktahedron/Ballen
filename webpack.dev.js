/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const createElectronReloadWebpackPlugin = require("electron-reload-webpack-plugin");

const ElectronReloadWebpackPlugin = createElectronReloadWebpackPlugin({
  path: path.join(__dirname, "dist", "main.js")
});

const main = merge(common.main, {
  mode: "development"
});

const renderer = merge(common.renderer, {
  mode: "development",
  devtool: "inline-source-map",
  plugins: [ElectronReloadWebpackPlugin()]
});

module.exports = [main, renderer];
