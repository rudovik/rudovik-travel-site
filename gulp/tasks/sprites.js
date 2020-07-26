const { src, dest, series } = require("gulp");
const svgSprite = require("gulp-svg-sprite");
const rename = require("gulp-rename");
const del = require("del");

const config = {
  mode: {
    css: {
      sprite: "sprite.svg",
      render: {
        css: {
          template: "./gulp/templates/sprite.mustache",
        },
      },
    },
  },
};

const beginClean = () => {
  return del(["./app/temp/sprite", "./app/assets/images/sprites"]);
};

const createSprite = () => {
  return src("./app/assets/images/icons/**/*.svg")
    .pipe(svgSprite(config))
    .pipe(dest("./app/temp/sprite/"));
};

const copySpriteCSS = () => {
  return src("./app/temp/sprite/css/sprite.css")
    .pipe(rename("_sprite.scss"))
    .pipe(dest("./app/assets/styles/modules"));
};

const copySpriteGraphic = () => {
  return src("./app/temp/sprite/css/**/*.svg").pipe(
    dest("./app/assets/images/sprites")
  );
};

const endClean = () => {
  return del("./app/temp/sprite");
};

const icons = () => {
  series(createSprite, copySpriteCSS);
};

exports.createSprite = createSprite;
exports.copySpriteCSS = copySpriteCSS;
exports.copySpriteGraphic = copySpriteGraphic;
exports.beginClean = beginClean;
exports.endClean = endClean;
exports.icons = icons;
