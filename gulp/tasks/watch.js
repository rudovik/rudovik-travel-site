const { series, parallel, src, dest } = require('gulp');
const { promisify } = require('util');
const watch = require('gulp-watch');

const browserSync = require('browser-sync').create('My Server');
const browserSyncInit = promisify(browserSync.init);

const { cssInject, styles } = require('./styles');

const watchTask = async () => {
  await browserSyncInit({
    server: {
      notify: false,
      baseDir: 'app'
    }
  });
  watch('./app/index.html').on('change', browserSync.reload);
  watch('./app/assets/styles/**/*', series(styles, cssInject(browserSync)));
};

exports.watch = watchTask;
