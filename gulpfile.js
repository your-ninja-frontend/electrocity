'use strict';
import browserSync from 'browser-sync';
import { deleteAsync } from 'del';
import { dest, parallel, series, src, watch } from 'gulp';
import autoPrefixer from 'gulp-autoprefixer';
import babel from 'gulp-babel';
import csso from 'gulp-csso';
import imagemin, { mozjpeg, optipng } from 'gulp-imagemin';
import includeFiles from 'gulp-include';
import rename from 'gulp-rename';
import gulpSass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import { stacksvg } from 'gulp-stacksvg';
import svgmin from 'gulp-svgmin';
import uglify from 'gulp-uglify';
import webp from 'gulp-webp';
import * as dartSass from 'sass';

const sass = gulpSass(dartSass);

export const styles = () => {
  return src('./src/styles/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoPrefixer())
    .pipe(csso())
    .pipe(
      rename({
        basename: 'style',
        suffix: '.min'
      })
    )
    .pipe(sourcemaps.write())
    .pipe(dest('./docs/styles/'))
    .pipe(browserSync.stream());
};

export const scripts = () => {
  return src('./src/js/main.js')
    .pipe(
      includeFiles({
        includePaths: './src/components/**'
      })
    )
    .pipe(babel())
    .pipe(uglify())
    .pipe(dest('./docs/js/'))
    .pipe(browserSync.stream());
};

export const pages = () => {
  return src('./src/pages/*.html')
    .pipe(
      includeFiles({
        includePaths: './src/components/**'
      })
    )
    .pipe(dest('./docs'))
    .pipe(browserSync.reload({ stream: true }));
};

export const imagesOptimaze = () => {
  return src(['./src/assets/images/*.{jpg,png}'], {
    encoding: false
  })
    .pipe(
      imagemin([mozjpeg({ quality: 100, progressive: true }), optipng({ optimizationLevel: 1 })])
    )
    .pipe(dest('./docs/images/'));
};

export const svgOptimaze = () => {
  return src('./src/assets/images/*.svg', {
    encoding: false
  })
    .pipe(svgmin())
    .pipe(dest('./docs/images/'));
};

export const covertToWebp = () => {
  return src('./src/assets/images/*.{png,jpg}', { encoding: false })
    .pipe(imagemin())
    .pipe(webp())
    .pipe(dest('./docs/images/'));
};

export const createSprite = () => {
  return src('./src/assets/images/icons/*.svg', {
    encoding: false
  })
    .pipe(svgmin())
    .pipe(stacksvg())
    .pipe(dest('./docs/images/sprite/'));
};

export const clear = () => {
  return deleteAsync('./docs/');
};

export const copyFonts = () => {
  return src('./src/assets/fonts/**/*.{woff2,woff}', { encoding: false }).pipe(
    dest('./docs/fonts/')
  );
};

export const copyLibs = () => {
  return src('./src/js/libs/*.js').pipe(dest('./docs/js'));
};

export const server = (done) => {
  browserSync.init({
    server: {
      baseDir: './docs/'
    },
    cors: true,
    notify: false,
    ui: false
  });
  done();
};

export const watcher = () => {
  watch(['./src/styles/**/*.scss', './src/components/**/*.scss'], styles);
  watch(['./src/js/main.js', './src/components/**/*.js'], scripts);
  watch(['./src/pages/*.html', './src/components/**/*.html'], pages);
};

export const compileProject = parallel(
  copyFonts,
  copyLibs,
  createSprite,
  imagesOptimaze,
  svgOptimaze,
  covertToWebp,
  pages,
  styles,
  scripts
);
export const runDev = series(clear, compileProject, server, watcher);
export const build = series(clear, compileProject);
