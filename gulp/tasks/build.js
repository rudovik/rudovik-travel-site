const { src, dest, series } = require("gulp");
const imagemin = require("gulp-imagemin");
const del = require("del");
const umin = require("gulp-usemin");
const rev = require("gulp-rev");
const cssnano = require("gulp-cssnano");
const { scripts } = require("./scripts");
const { styles } = require("./styles");
const { icons } = require("./sprites");
const { modernizr } = require("./modernizr");
const uglify = require("gulp-uglify");

const { promisify } = require("util");
const browserSync = require("browser-sync").create();
const browserSyncInit = promisify(browserSync.init);

const previewDist = async () => {
  await browserSyncInit({
    server: {
      notify: false,
      baseDir: "docs",
    },
  });
};

const deleteDistFolder = () => {
  return del("./docs");
};

const copyGeneralFiles = () => {
  const pathsToCopy = [
    "./app/**/*",
    "!./app/index.html",
    "!./app/assets/images/**",
    "!./app/assets/styles/**",
    "!./app/assets/scripts/**",
    "!./app/temp",
    "!./app/temp/**",
    "!./app/assets",
  ];
  return src(pathsToCopy).pipe(dest("./docs"));
};

const optimizeImages = () => {
  return src([
    "./app/assets/images/**/*",
    "!./app/assets/images/icons",
    "!./app/assets/images/icons/**/*",
  ])
    .pipe(
      imagemin({
        progressive: true,
        interlaced: true,
        multipass: true,
      })
    )
    .pipe(dest("./docs/assets/images"));
};

const usemin = () => {
  return src("./app/index.html")
    .pipe(
      umin({
        css: [
          function () {
            return rev();
          },
          function () {
            return cssnano();
          },
        ],
        js: [
          function () {
            return rev();
          },
          function () {
            return uglify();
          },
        ],
      })
    )
    .pipe(dest("./docs"));
};

exports.build = series(
  deleteDistFolder,
  copyGeneralFiles,
  styles,
  modernizr,
  scripts(false, "production"),
  icons,
  optimizeImages,
  usemin,
  previewDist
);
exports.previewDist = previewDist;
