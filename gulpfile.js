//based on https://github.com/thecodercoder/gulp-browsersync/blob/main/gulpfile.js

import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);

import terser from "gulp-terser";
import pug from "gulp-pug";
import image from "gulp-image";
import { create as bsCreate } from "browser-sync";
const browserSync = bsCreate();

const src = gulp.src;
const dest = gulp.dest;
const watch = gulp.watch;
const series = gulp.series;

// Sass Task
function scssTask() {
  return src("app/scss/style.scss", { sourcemaps: true, allowEmpty: true })
    .pipe(sass())
    .pipe(dest("docs/styles", { sourcemaps: "." }));
}

// Pug Task
function pugTask() {
  return src("app/pug/index.pug", { sourcemaps: true, allowEmpty: true })
    .pipe(pug({ pretty: true }))
    .pipe(dest("docs"));
}

// JavaScript Task
function jsTask() {
  return (
    src("app/js/**.js", { sourcemaps: true, allowEmpty: true })
      //.pipe(terser())
      .pipe(dest("docs/js", { sourcemaps: "." }))
  );
}

function imgTask() {
  return src("app/images/*").pipe(image()).pipe(dest("docs/assets"));
}

function assetsTask() {
  return gulp.src("app/assets/*").pipe(gulp.dest("docs/assets"));
}

// Browsersync Tasks
function browsersyncServe(cb) {
  browserSync.init({
    server: {
      baseDir: "docs",
    },
  });
  cb();
}

function browsersyncReload(cb) {
  browserSync.reload();
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
export default series(
  scssTask,
  jsTask,
  pugTask,
  imgTask,
  browsersyncServe,
  watchTask
);
