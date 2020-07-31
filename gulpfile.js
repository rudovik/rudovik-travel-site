const { series } = require("gulp");
const { watch } = require("./gulp/tasks/watch");
const {
  createSprite,
  createPngCopy,
  copySpriteCSS,
  copySpriteGraphic,
  beginClean,
  endClean,
} = require("./gulp/tasks/sprites");
const { modernizr } = require("./gulp/tasks/modernizr");
const { scripts } = require("./gulp/tasks/scripts");

const { build } = require("./gulp/tasks/build");

const { previewDist } = require("./gulp/tasks/build");

exports.watch = watch;
// exports.createSprite = createSprite;
// exports.copySpriteCSS = copySpriteCSS;
// exports.beginClean = beginClean;
// exports.endClean = endClean;
exports.icons = series(
  beginClean,
  createSprite,
  createPngCopy,
  copySpriteGraphic,
  copySpriteCSS,
  endClean
);

exports.modernizr = modernizr;

exports.scripts = scripts;

exports.build = build;

exports.previewDist = previewDist;
