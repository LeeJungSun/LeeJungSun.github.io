# Hivelab UIT Gulp - Simple Version

Hivelab UIT Gulp Simple 버전은 **배포(dist)폴더를 없애고 프로젝트 루트(root)폴더에 직접 코드가 배포**됩니다.  
특히 CSS 전처리기 기능을 없애고 **운영 프로젝트 또는 간단한 이벤트 프로젝트에 맞게 설계**되었습니다.  
꼭 필요한 기능만 담은 버전입니다.  

## 목차

> 1. [Hivelab UIT Gulp - Simple Version 지원 기능] (#user-content-hivelab-uit-gulp-simple-version-지원-기능)
> 2. [Hivelab UIT Gulp - Simple Version 세팅 가이드] (#user-content-hivelab-uit-gulp-simple-version-세팅-가이드)
> 3. [가이드 문서] (#user-content-가이드-문서)
> 4. [@index.html 파일의 리스트 생성 가이드 문서] (#user-content-indexhtml-파일의-리스트-생성-가이드-문서)
> 5. [HTML File Include 가이드 문서] (#user-content-html-file-include-가이드-문서)
> 6. [Gulp Task 커스터마이징 작업자를 위한 gulpfile.js 가이드 문서] (#user-content-gulp-task-커스터마이징-작업자를-위한-gulpfilejs-가이드-문서)
> 7. [Hivelab UIT Gulp 폴더 구조 및 파일의 역할] (#user-content-hivelab-uit-gulp-폴더-구조-및-파일의-역할)
> 8. [History] (#user-content-history)

## Hivelab UIT Gulp - Simple Version 지원 기능

> * 프로젝트 정보 세팅
> * 페이지 리스트 자동 생성 및 업데이트
> * HTML 문법 검사
> * HTML Include
> * CSS Merge & Minify
> * 이미지 최적화
> * Javascript Merge & Minify
> * 브라우저 동기화

- **프로젝트 정보 세팅**  
    - 프로젝트 명, 담당자, 담당 조직명을 미리 입력할 수 있습니다.
- **페이지 리스트 자동 생성 및 업데이트**
    - HTML파일을 생성하고 저장하면 자동으로 리스트 페이지를 업데이트해줍니다.
- **HTML 문법 검사**
    - HTMLHint(http://htmlhint.com)의 기능을 따르며 문법 검사를 합니다.  
    - 자세한 룰은 https://github.com/yaniswang/HTMLHint/wiki/Rules 에서 확인할 수 있습니다.  
- **HTML Include**
    - Head 태그, header, footer 등을 하나의 파일로 관리할 수 있고, 조건에 따라서 코드를 달리 불러올 수 있습니다.  
    - https://github.com/coderhaoxin/gulp-file-include  
- **SASS / LESS Compile**
    - CSS 전처리기(Preprocessor)를 사용할 수 있도록합니다.  
- **CSS Merge & Minify**
    - 페이지별 CSS를 병합(Concat)하고 압축(Minify)해줍니다.  
- **이미지 최적화**
    - 이미지의 퀄리티는 유지하면서 가능한 최소 사이즈로 줄여줍니다.  
    - https://github.com/sindresorhus/gulp-imagemin  
- **이미지 스프라이트 자동화**
    - png이미지를 병합해 주고 이미지의 CSS 속성을 자동으로 생성해줍니다. (폴더별 관리 가능)  
    - https://github.com/twolfson/gulp.spritesmith  
- **Javascript Merge & Minify**
    - 자바스크립트 코드를 병합(Concat)하고 압축(Minify)해줍니다.  
- **브라우저 동기화**
    - HTML, CSS, JS 코드의 변동이 있을시 브라우저를 자동으로 새로고침(Refresh)해줍니다.  
    - https://browsersync.io  

## Hivelab UIT Gulp - Simple Version 세팅 가이드

Hivelab UIT Gulp - Simple Version을 프로젝트에 도입하기 위해 **가이드를 제공**합니다.

### 가이드 문서

**Node.JS 및 Gulp 환경 세팅`**을 위한 가이드입니다.  

[가이드 : Guide Document]

## Hivelab UIT Gulp - Simple Version 추가 가이드

### @index.html 파일의 리스트 생성 가이드 문서

Hivelab UIT Gulp - Simple Version은 **`src/views` 폴더내 파일을 분석하여 @index.html 파일에 리스트를 자동으로 생성**해 줍니다.  
이와 관련해서 HTML 문서를 만들때 참고해야할 사항에 대해 가이드합니다.  

[@index.html 파일의 리스트 생성 Guide Document]

### HTML File Include 가이드 문서

Hivelab UIT Gulp는 헤더(header), 푸터(footer), 헤드(head)를 공통으로 관리할 수 있습니다.  
이와 관련해서 사용법을 가이드합니다.

[HTML File Include Guide Document]

### Gulp Task 커스터마이징 작업자를 위한 gulpfile.js 가이드 문서

[gulpfile.js Guide Document]

## Hivelab UIT Gulp 폴더 구조 및 파일의 역할

폴더 및 파일 구성은 아래와 같습니다. 본 프로젝트의 저장소에서도 확인하실 수 있습니다.  

* `src/` 배포 전 원본 소스 폴더 (실제로 작업하는 폴더)
    * `css/` CSS 폴더
        * `libs` 라이브러리(Swipe Js 등) CSS 폴더
    * `img/` 원본 이미지 폴더
    * `js/` 자바스크립트 폴더
        * `apps` 직접 작성하는 자바스크립트 폴더
        * `libs` 자바스크립트 라이브러리 폴더
    * `views` 
        * `include` 공통으로 쓰이는 html 파일 폴더  
* `css/` Merge, Clean, Minify된 CSS 파일 저장
    * `libs`
    * `styles` 각각의 CSS 파일과 이를 합친 styles.css 파일 저장
* `img/` 최적화 작업을 거친 이미지 폴더
* `js/` 압축/병합이 완료된 자바스크립트 폴더
    * `apps / libs`
* `views/` HTML 파일 폴더
* `templates/` Gulp에서 사용할 파일의 보관 폴더
    * `@index.html` dist/ 하위에 생성될 @index.html 을 만들기 위한 템플릿. **수정을 지양** 합니다.
    * `htmlhintrc.json` HTML Validation을 실행하기 위한 설정 파일
* `gulpfile.js` Gulp로 실행시킬 task를 정의한 파일
* `.gitignore` git으로 관리할 필요가 없는 파일 목록(폴더) 리스트

## History

**21 AUG 2017**
* Simple Version 제작 완료
* Simple Version 가이드 제작 완료

**18 AUG 2017**
* Simple Version 제작 시작

[가이드 : Guide Document]: http://gitlab.hivelab.co.kr/uit-center/techdev-office/uidev1/uidev1-goals/gulp-lab/tree/master/hivelab-gulp-simple/@useGuide
[@index.html 파일의 리스트 생성 Guide Document]: http://gitlab.hivelab.co.kr/uit-center/techdev-office/uidev1/uidev1-goals/gulp-lab/tree/master/hivelab-gulp-simple/@guideIndexList
[HTML File Include Guide Document]: http://gitlab.hivelab.co.kr/uit-center/techdev-office/uidev1/uidev1-goals/gulp-lab/tree/master/hivelab-gulp-simple/@guideHTMLfileInclude
[gulpfile.js Guide Document]: http://gitlab.hivelab.co.kr/uit-center/techdev-office/uidev1/uidev1-goals/gulp-lab/tree/master/hivelab-gulp-simple/@guideGulpfilejs