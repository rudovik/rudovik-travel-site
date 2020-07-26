const { series } = require("gulp");
const { watch } = require("./gulp/tasks/watch");
const {
  createSprite,
  copySpriteCSS,
  copySpriteGraphic,
  beginClean,
  endClean,
} = require("./gulp/tasks/sprites");

exports.watch = watch;
// exports.createSprite = createSprite;
// exports.copySpriteCSS = copySpriteCSS;
// exports.beginClean = beginClean;
// exports.endClean = endClean;
exports.icons = series(
  beginClean,
  createSprite,
  copySpriteGraphic,
  copySpriteCSS,
  endClean
);
