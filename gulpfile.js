//based on https://github.com/thecodercoder/gulp-browsersync/blob/main/gulpfile.js

const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const terser = require("gulp-terser");
const pug = require("gulp-pug");

const browsersync = require("browser-sync").create();

// Sass Task
function scssTask() {
  return src("app/scss/style.scss", { sourcemaps: true, allowEmpty: true })
    .pipe(sass())
    .pipe(dest("docs", { sourcemaps: "." }));
}

// Pug Task
function pugTask() {
  return src("app/pug/index.pug", { sourcemaps: true, allowEmpty: true })
    .pipe(pug({ pretty: true }))
    .pipe(dest("docs"));
}

// JavaScript Task
function jsTask() {
  return src("app/js/script.js", { sourcemaps: true, allowEmpty: true })
    .pipe(terser())
    .pipe(dest("docs", { sourcemaps: "." }));
}

// Browsersync Tasks
function browsersyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: "docs",
    },
  });
  cb();
}

function browsersyncReload(cb) {
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch("docs/*.html", browsersyncReload);
  watch(
    ["app/scss/**/*.scss", "app/js/**/*.js", "app/pug/**/*.pug"],
    series(scssTask, jsTask, pugTask, browsersyncReload)
  );
}

// Default Gulp task
exports.default = series(
  scssTask,
  jsTask,
  pugTask,
  browsersyncServe,
  watchTask
);
