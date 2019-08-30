var webpack = require("webpack");
var Dotenv = require("dotenv-webpack");

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      "global.GENTLY": false,
      "process.env.REACT_APP_AWS_LOG_STREAM_NAME": '"masterplanner-development"',
    }),
    new Dotenv(),
  ],
  mode: "development",
  node: {
    __dirname: true,
  }
}
