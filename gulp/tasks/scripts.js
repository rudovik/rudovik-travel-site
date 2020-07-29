const {} = require("gulp");
const { promisify } = require("util");
const webpack = promisify(require("webpack"));

const scripts = (browserSync) =>
  async function scripts() {
    const stats = await webpack(require("../../webpack.config.js"));
    if (stats.compilation.errors && stats.compilation.errors.length) {
      throw new Error(stats.compilation.errors);
    } else {
      console.log(stats.toString());
      browserSync.reload();
    }
  };

exports.scripts = scripts;
