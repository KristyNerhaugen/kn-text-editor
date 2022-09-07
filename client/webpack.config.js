const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    // 'development' will need to be changed to 'production' when project is MVP
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    // Added onfigure workbox plugins for a service worker and manifest file.
    plugins: [
      // htmlWebpackPlugin
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Webpack Plugin",
      }),
      // WebpackPwaManifest
      new WebpackPwaManifest({
        name: "KN Text Editor",
        short_name: "Text Editor",
        description:
          "Create notes or code snippets with or without an internet connection!",
        // colors to be determined
        // background_color: '',
        // theme_color: '',
        start_url: "./",
        publicPath: "./",
      }),
      // will need to InjectManifest
      // new InjectManifest({
      //   swSrc: "./sw.js",
      //   swDest: "service-worker.js",
      // }),
    ],

    module: {
      // Added CSS loaders and babel to webpack.
      rules: [
        // css loaders
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        // rule to handle image files
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        // babel
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};
