# Bapul-Starter-Kit

v1.0.0: nodejs, gulp, babel, browserify, sass

### 기본 업무
```
  gulp
```

### 서버 업무
```
  gulp serve
```

### 스프라이트 업무
필요한 파일들
```
  // scss파일을 만들어 주는 템플릿
  sprite-template.handlebars
```

스프라이트 이미지 생성
```
  gulp sprite
```

생성된 파일
```
   src/styles/_sprite.scss
   src/images/sprite.png
```

### 아이콘 폰트 업무
필요한 파일들
```
  // 폰트화 할 SVG파일이 필요합니다.
  src/icons/*.svg
```

폰트 생성
```
  gulp iconfont
```

생성된 파일
```
   src/fonts/bapul-icon-font/bapul-icon-font.eof
   src/fonts/bapul-icon-font/bapul-icon-font.ttf
   src/fonts/bapul-icon-font/bapul-icon-font.woff
   src/styles/_bapul-icon-font.scss
```
