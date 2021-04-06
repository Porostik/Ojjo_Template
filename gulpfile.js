const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const scss = require('gulp-sass');
const autoPrefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const imageMin = require('gulp-imagemin');

function browsersync() {
  browserSync.init({
    server: { baseDir: 'dist/' },
    online: false,
    notify: false,
  });
}

function html() {
  return src('src/index.html').pipe(dest('dist')).pipe(browserSync.stream());
}

function styles() {
  return src('src/scss/main.scss')
    .pipe(scss())
    .pipe(concat('styles.min.css'))
    .pipe(autoPrefixer({ grid: true }))
    .pipe(cleanCss({ level: { 1: { specialComments: 0 } } }))
    .pipe(dest('dist/'))
    .pipe(browserSync.stream());
}

function scripts() {
  return src('src/js/*.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('dist/'))
    .pipe(browserSync.stream());
}

function images() {
  return src('src/img/**/*').pipe(imageMin()).pipe(dest('dist/img'));
}

function startWatching() {
  watch(['src/scss/*.scss'], styles);
  watch(['src/js/*.js'], scripts);
  watch(['src/index.html'], html);
  watch(['src/mg'], images);
}

exports.default = parallel(images, html, scripts, styles, browsersync, startWatching);
