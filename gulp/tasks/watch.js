const { series, parallel, src, dest } = require("gulp");
const { promisify } = require("util");
const watch = require("gulp-watch");

const browserSync = require("browser-sync").create("My Server");
const browserSyncInit = promisify(browserSync.init);

const { cssInject, styles } = require("./styles");
const { scripts } = require("./scripts");
const { modernizr } = require("./modernizr");

const watchTask = async () => {
  await browserSyncInit({
    server: {
      notify: false,
      baseDir: "app",
    },
  });
  watch("./app/index.html").on("change", browserSync.reload);
  watch("./app/assets/styles/**/*", series(styles, cssInject(browserSync)));
  watch(
    "./app/assets/scripts/**/*.js",
    series(modernizr, scripts(browserSync))
  ).on("error", function () {
    this.emit("end");
  });
};

exports.watch = watchTask;
