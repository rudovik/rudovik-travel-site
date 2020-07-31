const {} = require("gulp");
const { promisify } = require("util");
const webpack = promisify(require("webpack"));

const scripts = (browserSync, mode) =>
  async function scripts() {
    const webpackConfig = require("../../webpack.config.js");
    if (mode === "production") webpackConfig["mode"] = mode;
    // console.log(webpackConfig);
    const stats = await webpack(webpackConfig);
    if (stats.compilation.errors && stats.compilation.errors.length) {
      throw new Error(stats.compilation.errors);
    } else {
      console.log(stats.toString());
      if (browserSync) browserSync.reload();
    }
  };

exports.scripts = scripts;
