const path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = env => {
  const isDevelopment = env.NODE_ENV === "development";
  console.log("ISDEVELOPMENT: ", isDevelopment);
  
  return {
    entry: "./src/index.ts",
    devtool: isDevelopment ? "inline-source-map" : "source-map",
    plugins: [new Dotenv(), new HtmlWebpackPlugin({
      template: "index.html",
      scriptLoading: "defer",
    })],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpg|gif|svg)$/i,
          use: ["url-loader"],
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    watchOptions: {
      ignored: "node_modules/**",
    },
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
  }
};
