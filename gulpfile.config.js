'use strict';

var source = 'src/';
var development = 'dist/';
var build = 'build/';
var config = {
  // 폴더 경로
  dir: {
    // 제거 폴더 설정
    clean: ['dist/*'],

    // 복사
    copy: {
      root: {
        src: [
          source + 'favicon.ico',
          source + 'humans.txt',
          source + 'manifest.json',
          source + 'manifest.webapp',
          source + 'robots.txt'
        ],
        dest: development
      },
      font: {
        src: source + 'fonts/**/*',
        dest: development + 'fonts'
      }
    },

    // HTML 설정
    html: {
      src: source + '**/*.html',
      dest: development
    },

    // SASS 설정
    sass: {
      src: source + 'styles/**/*.{scss,sass}',
      dest: development + 'styles/'
    },

    // JS 설정
    js: {
      src: source + 'scripts/**/*.js',
      dest: development + 'scripts/'
    },

    // IMG 설정
    img: {
      src: ['src/images/**/*', '!src/images/sprites/', '!src/images/sprites/*'],
      dest: development + 'images/'
    }
  },

  /**
   * browser-sync
   * @reference https://www.browsersync.io/docs/gulp/
   */
  BROWSER_SYNC: {
    server: {
      baseDir: development
    },
    port: 3000,   // 포트
    open: true    // 웹서버 실행 시 자동 파일 실행 여부
  },

  /**
   * gulp-sass
   * @reference https://github.com/sass/node-sass#options
   */
  SASS_OPTION: {
    outputStyle: 'compressed',  // CSS 출력 스타일 (expanded, nested, compact, compressed)
    indentType: 'space',        // 들여쓰기 유형 (space, tab)
    indentWidth: 2,             // 들여쓰기 폭 (2 ~ 10)
    percision: 4,               // 수치 정확도 (소수점 이하 자리 수)
    sourceMap: false            // 소스맵 작성 설정
  },

  /**
   * gulp-autoprefixer
   * @reference https://github.com/postcss/autoprefixer#options
   */
  AUTOPREFIXER: [
    'ie >= 10',       // Internet Explorer
    'ie_mob >= 10',   // Internet Explorer Mobile
    'ff >= 30',       // Mozilla Firefox
    'chrome >= 34',   // Google Chorme
    'safari >= 7',    // Desktop Safari
    'opera >= 23',    // Opera
    'ios >= 7',       // iOS Safari
    'android >= 4.4', // Android WebView
    'bb >= 10'        // Blackberry browser
  ],

  /**
   * gulp-htmlmin
   * @reference https://github.com/kangax/html-minifier
   */
  HTML_MIN: {
    collapseWhitespace: true
  },

  /**
   * gulp-uglify
   * @reference https://github.com/terinjokes/gulp-uglify#options
   */
  UGLIFY: {
    preserveComments: 'some'
  },

  /**
   * browserify
   * @reference https://www.npmjs.com/package/browserify#browserifyfiles--opts
   */
  BROWSERIFY: {
    entries: './src/scripts/script.js', // 번들 엔트리 파일 설정
    debug: true,                        // 소스맵 파일에 포함 설정
    extensions: ['js'],                 // 파일 확장자 설정
    insertGlobals: true                 // 글로벌 삽입 (process, global, __filename, __Dirname) 항상 삽입, ※ 빌드 속도는 향상하지만 출력(Output) 파일 크기는 커짐
  }
};

module.exports = function() {
  return {
    src: source,
    dev: development,
    build: build,
    dir: config.dir,

    BROWSER_SYNC: config.BROWSER_SYNC,
    SASS_OPTION: config.SASS_OPTION,
    AUTOPREFIXER: config.AUTOPREFIXER,
    HTML_MIN: config.HTML_MIN,
    UGLIFY: config.UGLIFY,
    BROWSERIFY: config.BROWSERIFY
  };
};
