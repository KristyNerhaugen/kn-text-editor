const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const { InjectManifest } = require("workbox-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const path = require("path");
// Added and configured workbox plugins for a service worker and manifest file.

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
    plugins: [
      // htmlWebpackPlugin
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Webpack Plugin",
      }),
      // WebpackPwaManifest
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "KN Text Editor",
        short_name: "Text Editor",
        description:
          "Create notes or code snippets with or without an internet connection!",
        // colors taken from inspecting given starter code
        background_color: "#272822",
        theme_color: "#31a9e1",
        start_url: "./",
        publicPath: "./",
        // add in icon image
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
      //  InjectManifest
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "service-worker.js",
      }),
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
        // trying to add plugins to babel to see if console errors go away
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
