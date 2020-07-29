module.exports = {
  mode: "development",
  entry: "./app/assets/scripts/App.js",
  output: {
    path:
      "/home/rudovik/Desktop/node-course/rudovik-travel-site/app/temp/scripts",
    filename: "App.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
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
