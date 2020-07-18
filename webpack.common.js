/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const main = {
  target: "electron-main",
  entry: path.join(__dirname, "src", "main"),
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /.ts?$/,
        include: [path.resolve(__dirname, "src")],
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: ["ts-loader"]
      }
    ]
  },
  plugins: [],
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    extensions: [".js", ".ts", ".json"]
  }
};

const renderer = {
  target: "electron-renderer",
  entry: path.join(__dirname, "src", "renderer", "index"),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist", "scripts")
  },
  resolve: {
    alias: {
      actions: path.resolve(__dirname, "src", "actions"),
      reducers: path.resolve(__dirname, "src", "reducers"),
      renderer: path.resolve(__dirname, "src", "renderer"),
      stores: path.resolve(__dirname, "src", "store"),
      types: path.resolve(__dirname, "src", "types"),
      utils: path.resolve(__dirname, "src", "utils")
    },
    extensions: [".json", ".js", ".jsx", ".css", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.ts[x]?$/,
        use: ["ts-loader"],
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules")
        ]
      }
    ]
  },
  plugins: []
};

module.exports = { main, renderer };
