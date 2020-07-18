/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const main = merge(common.main, {
  mode: "production"
});

const renderer = merge(common.renderer, {
  mode: "production"
});

module.exports = [main, renderer];
