/*! Copyright © 2016 Bapul, jake <gjjoo@bapul.net> */

'use strict';

/**
 * 개발 소스 폴더 경로
 * @type {string}
 * @private
 */
const _source = 'src/';

/**
 * 최종 소스 폴더 경로
 * @type {string}
 * @private
 */
const _development = 'dist/';

/**
 * 폴더 경로 설정
 * @type {object}
 * @private
 */
const _dir = {
  // 제거
  clean: ['dist/*'],

  // 복사
  copy: {
    root: {
      src: [
        _source + 'favicon.ico',
        _source + 'humans.txt',
        _source + 'manifest.json',
        _source + 'manifest.webapp',
        _source + 'robots.txt'
      ],
      dest: _development
    },
    font: {
      src: _source + 'fonts/**/*',
      dest: _development + 'fonts'
    }
  },

  // HTML
  html: {
    src: _source + '**/*.html',
    dest: _development
  },

  // SASS
  sass: {
    src: _source + 'styles/**/*.{scss,sass}',
    dest: _development + 'styles/'
  },

  // JS
  js: {
    src: [
      './src/scripts/components/componentHandler.js',
      './src/scripts/components/layout.js',
      './src/scripts/components/textfield.js',
      './src/scripts/components/table.js',
      './src/scripts/components/panel.js'
    ],
    dest: _development + 'scripts/'
  },

  // IMG
  img: {
    src: ['src/images/**/*', '!src/images/sprites/', '!src/images/sprites/*'],
    dest: _development + 'images/'
  }
};

/**
 * browser-sync options
 * @reference https://www.browsersync.io/docs/gulp/
 * @private
 */
const _BROWSER_SYNC = {
  server: {
    baseDir: _development
  },
  port: 3000,   // 포트
  open: true    // 웹서버 실행 시 자동 파일 실행 여부
};

/**
 * gulp-sass options
 * @reference https://github.com/sass/node-sass#options
 * @private
 */
const _SASS_OPTION = {
  outputStyle: 'expanded',  // CSS 출력 스타일 (expanded, nested, compact, compressed)
  indentType: 'space',        // 들여쓰기 유형 (space, tab)
  indentWidth: 2,             // 들여쓰기 폭 (2 ~ 10)
  percision: 4,               // 수치 정확도 (소수점 이하 자리 수)
  sourceMap: false            // 소스맵 작성 설정
};

/**
 * gulp-autoprefixer options
 * @reference https://github.com/postcss/autoprefixer#options
 * @private
 */
const _AUTOPREFIXER = [
  'ie >= 10',       // Internet Explorer
  'ie_mob >= 10',   // Internet Explorer Mobile
  'ff >= 30',       // Mozilla Firefox
  'chrome >= 34',   // Google Chorme
  'safari >= 7',    // Desktop Safari
  'opera >= 23',    // Opera
  'ios >= 7',       // iOS Safari
  'android >= 4.4', // Android WebView
  'bb >= 10'        // Blackberry browser
];

/**
 * gulp-htmlmin options
 * @reference https://github.com/kangax/html-minifier
 * @private
 */
const _HTML_MIN = {
  collapseWhitespace: true
};

/**
 * gulp-uglify options
 * @reference https://github.com/terinjokes/gulp-uglify#options
 * @private
 */
const _UGLIFY = {
  preserveComments: 'some'
};

/**
 * browserify options
 * @reference https://www.npmjs.com/package/browserify#browserifyfiles--opts
 * @private
 */
const _BROWSERIFY = {
  entries: './src/scripts/script.js', // 번들 엔트리 파일 설정
  debug: true,                        // 소스맵 파일에 포함 설정
  extensions: ['js'],                 // 파일 확장자 설정
  insertGlobals: true                 // 글로벌 삽입 (process, global, __filename, __Dirname) 항상 삽입, ※ 빌드 속도는 향상하지만 출력(Output) 파일 크기는 커짐
};

/**
 * Export Gulp Config
 */
export const config = {
  src: _source,
  dev: _development,
  dir: _dir,

  BROWSER_SYNC: _BROWSER_SYNC,
  SASS_OPTION: _SASS_OPTION,
  AUTOPREFIXER: _AUTOPREFIXER,
  HTML_MIN: _HTML_MIN,
  UGLIFY: _UGLIFY,
  BROWSERIFY: _BROWSERIFY
};
