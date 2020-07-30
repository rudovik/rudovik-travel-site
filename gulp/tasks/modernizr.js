const { src, dest } = require("gulp");
const modernizr = require("gulp-modernizr");

const modern = () => {
  return src(["./app/assets/styles/**/*.scss", "./app/assets/scripts/**/*.js"])
    .pipe(
      modernizr({
        options: ["setClasses"],
      })
    )
    .pipe(dest("./app/temp/scripts/"));
};

exports.modernizr = modern;
