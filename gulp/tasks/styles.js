const { series, parallel, src, dest } = require("gulp");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssvars = require("postcss-simple-vars");
const rename = require("gulp-rename");
const nested = require("postcss-nested");
const cssImport = require("postcss-import");
const mixins = require("postcss-mixins");

const styles = () => {
  return src("./app/assets/styles/styles.scss")
    .pipe(postcss([cssImport, mixins, cssvars(), nested, autoprefixer]))
    .on("error", function (errorInfo) {
      console.log(errorInfo.toString());
      this.emit("end");
    })
    .pipe(rename("styles.css"))
    .pipe(dest("./app/temp/styles"));
};

const injectCss = (browserSync) => {
  let cssInject;
  return (cssInject = () => {
    return src("./app/temp/styles/styles.css").pipe(browserSync.stream());
  });
};

exports.styles = styles;
exports.cssInject = injectCss;
