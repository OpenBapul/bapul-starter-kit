/*! Copyright © 2016 Bapul, jake <gjjoo@bapul.net> */

'use strict';

import path from 'path';
import del from 'del';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import gulp from 'gulp';
import {config} from './gulpfile.config';
import gulpLoadPlugins from 'gulp-load-plugins';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import merge from 'merge-stream';
import sassdoc from 'sassdoc';
import pngquant from 'imagemin-pngquant';
import stylish from 'jshint-stylish';
import swPrecache from 'sw-precache';
import pkg from './package.json';
import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';
import assign from 'lodash.assign';

const $ = gulpLoadPlugins();

/**
 * Default Task
 * 걸프(Gulp)의 모든 업무 수행
 */
gulp.task('default', (cb) => {
  runSequence(
    ['sprite', 'iconfont'],
    ['views', 'styles', 'scripts', 'images', 'copy'],
    'generate-service-worker',
    cb);
});

/**
 * Clean Task
 * 파일 및 폴더 삭제 처리
 */
gulp.task('clean', () => {
  del(config.dir.clean, {dot: true});
});

/**
 * Copy Task
 * 별도의 다른 처리과정 없이 복사만 하여 사용하는 파일들
 */
gulp.task('copy', ['copy:font', 'copy:sw-scripts'], () => {
  gulp.src(config.dir.copy.root.src)
    .pipe($.size({title: 'copy: '}))
    .pipe(gulp.dest(config.dir.copy.root.dest));
});
gulp.task('copy:font', () => {
  gulp.src(config.dir.copy.font.src)
    .pipe(gulp.dest(config.dir.copy.font.dest));
});
gulp.task('copy:sw-scripts', () => {
  gulp.src(['node_modules/sw-toolbox/sw-toolbox.js', 'src/scripts/sw/runtime-caching.js'])
    .pipe(gulp.dest('dist/scripts/sw'));
});

/**
 * Server Task
 * Javascript, Sass, HTML을 지속적인 감시를 통해 변경 항목만 웹브라우저 자동 리로딩
 */
gulp.task('serve', ['views', 'styles', 'scripts'], () => {
  browserSync.init(config.BROWSER_SYNC);

  gulp.watch([config.dir.html.src], ['views']);
  gulp.watch([config.dir.sass.src], ['styles']);
  bundler.on('update', bundleHandler).on('log', $.util.log);
});

/**
 * Views Task
 * HTML 압축
 */
gulp.task('views', () => {
  gulp.src(config.dir.html.src)
    .pipe($.htmlmin(config.HTML_MIN))
    .pipe($.size({title: 'views: '}))
    .pipe(gulp.dest(config.dir.html.dest))
    .pipe(browserSync.stream());
});

/**
 * Styles Task
 * Sass를 CSS로 변환한다.
 */
gulp.task('styles', () => {
  gulp.src(config.dir.sass.src)
    .pipe($.sourcemaps.init())
    // .pipe(sassdoc())
    .pipe($.sass(config.SASS_OPTION).on('error', $.sass.logError))
    .pipe($.autoprefixer(config.AUTOPREFIXER))
    .pipe($.size({title: 'styles: '}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(config.dir.sass.dest))
    .pipe(browserSync.stream());
});

/**
 * Styles Lint Task
 * Sass 유효성 검사
 */
gulp.task('styles:lint', () => {
  gulp.src(config.dir.sass.src)
    .pipe($.sassLint())
    .pipe($.sassLint.format())
    .pipe($.sassLint.failOnError());
});

/**
 * Scripts Task
 * 자바스크립트 번들링
 */
const opts = assign({}, watchify.args, config.BROWSERIFY);
const bundler = watchify(browserify(opts).transform(babelify));
const bundleHandler = () => {
  return bundler.bundle()
    .on('error', $.util.log.bind($.util, 'browserify error'))
    .pipe(source('script.js'))
    .pipe(buffer())
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.sourcemaps.write('./'))
    .pipe($.size({title: 'scripts: '}))
    .pipe(gulp.dest(config.dir.js.dest))
    .pipe(browserSync.stream());
};
gulp.task('scripts', bundleHandler);

/**
 * Scripts Lint Task
 * 자바스크립트 코드 스타일(jscs) 확인 및 유효성 검사(jshint)
 */
gulp.task('scripts:lint', () => {
  gulp.src(config.dir.js.src)
    .pipe($.print())
    .pipe($.jscs())
    .pipe($.jscs.reporter())
    .pipe($.jshint())
    .pipe($.jshint.reporter(stylish));
});

/**
 * Images Task
 * 이미지 캐쉬 및 압축
 */
gulp.task('images', () => {
  gulp.src(config.dir.img.src)
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe($.size({title: 'images: '}))
    .pipe(gulp.dest(config.dir.img.dest));
});

/**
 * Sprite Task
 * 이미지를 스프라이트 처리하여 Request 수 감소
 */
gulp.task('sprite', () => {
  const spriteData = gulp.src('src/images/sprites/*.png').pipe($.spritesmith({
    imgName: 'sprite.png',
    imgPath: '../images/sprite.png',
    cssName: '_sprite.scss',
    cssTemplate: 'sprites-template.handlebars',
    padding: 0,
    algorithm: 'binary-tree'
  }));

  const imgStream = spriteData.img
    .pipe(buffer())
    .pipe($.imagemin({
      optimizationLevel: 3,
      use: [pngquant({
        quality: '65-80',
        speed: 4
      })]
    }))
    .pipe(gulp.dest('src/images/'));

  const cssStream = spriteData.css
    .pipe(gulp.dest('src/styles/components/'));

  return merge(imgStream, cssStream);
});

/**
 * Iconfont Task
 * SVG를 폰트화 (※ 폰트화 할 경우 단색만 적용 가능)
 */
gulp.task('iconfont', () => {
  gulp.src(['src/icons/*.svg'])
    .pipe($.iconfontCss({
      fontName: 'bapul-icon-font',
      cssClass: 'bp',
      targetPath: '../../styles/components/_iconfont.scss',
      fontPath: '../fonts/bapul-icon-font/'
    }))
    .pipe($.iconfont({
      fontName: 'bapul-icon-font',
      prependUnicode: true,
      formats: ['ttf', 'eot', 'woff', 'svg']
    }))
    .pipe(gulp.dest('src/fonts/bapul-icon-font/'));
});

/**
 * Service Worker Task
 * 파일을 캐쉬하여 사용하고자 할 경우 (※ Production에서만 사용)
 */
gulp.task('generate-service-worker', ['copy:sw-scripts'], () => {
  const rootDir = 'dist';
  const filepath = path.join(rootDir, 'service-worker.js');

  return swPrecache.write(filepath, {
    cacheId: pkg.name || 'bapul-starter-kit',
    importScripts: [
      'scripts/sw/sw-toolbox.js',
      'scripts/sw/runtime-caching.js'
    ],
    staticFileGlobs: [
      `${rootDir}/images/**/*`,
      `${rootDir}/scripts/**/*.js`,
      `${rootDir}/styles/**/*.css`,
      `${rootDir}/*.{html,json}`
    ],
    stripPrefix: rootDir + '/'
  });
});
