const { src, dest } = require("gulp");
const modern = require("gulp-modernizr");

const modernizer = () => {
  return src(["./app/assets/styles/**/*.scss", "./app/assets/scripts/**/*.js"])
    .pipe(
      modern({
        options: ["setClasses"],
      })
    )
    .pipe(dest("./app/temp/scripts/"));
};

exports.modernizr = modernizer;
