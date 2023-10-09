//based on https://github.com/thecodercoder/gulp-browsersync/blob/main/gulpfile.js

import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import gulpData from "gulp-data";
import fs from "fs";
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
function cssTask() {
  return src("app/scss/**/*.css", { sourcemaps: true, allowEmpty: true }).pipe(
    dest("docs/style", { sourcemaps: "." })
  );
}
function scssTask() {
  return src("app/scss/**/*.scss", { sourcemaps: true, allowEmpty: true })
    .pipe(sass())
    .pipe(dest("docs/style", { sourcemaps: "." }));
}

// Pug Task
function pugTask() {
  return src("app/index.pug", { sourcemaps: true, allowEmpty: true })
    .pipe(
      gulpData(() => {
        return JSON.parse(fs.readFileSync("app/assets/resume.json"));
      })
    )
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
    [
      "app/scss/**/*.scss",
      "app/js/**/*.js",
      "app/components/**/*.pug",
      "app/index.pug",
    ],
    series(scssTask, jsTask, pugTask, browsersyncReload)
  );
}

// Default Gulp task
export default series(
  cssTask,
  scssTask,
  jsTask,
  pugTask,
  imgTask,
  browsersyncServe,
  watchTask
);
