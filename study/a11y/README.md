# Hivelab UIT Gulp

## Gulp란?

Gulp는 프론트 엔드 개발을 함에 있어 **`단순하고 반복적인 일들을 쉽게 처리`할 수 있게 도와주는 도구**입니다.  
이를테면, 다음과 같은 일들입니다.  

> * 추가/삭제가 이루어진 HTML 파일을 자동으로 감지하고 리스트(@index.html) 페이지를 생성해 줍니다.
> * CSS 전처리기(SASS/LESS)를 사용하여 CSS를 제작하고 자동으로 변환해 줍니다.
> * CSS, JS 파일을 하나의 파일로 병합하고 불필요한 공간을 제거하여 파일 용량을 줄여줍니다.  

## Hivelab UIT Gulp는 무얼 할 수있나?

Gulp를 통해 할 수 있는 일은 무궁무진하지만, **`Hivelab UIT Gulp는 마크업 개발 업무에 포커스`가 맞춰져 있으며**  
아래와 같은 업무들을 자동화 할 수 있습니다.  

> * 프로젝트 정보 세팅
> * 페이지 리스트 자동 생성 및 업데이트
> * HTML 문법 검사
> * SASS / LESS Compile (CSS 문법검사)
> * CSS Merge & Minify
> * 이미지 최적화
> * 이미지 스프라이트 자동화
> * Javascript Merge & Minify
> * 브라우저 동기화

## Hivelab UIT Gulp 세팅 가이드

Hivelab UIT Gulp를 프로젝트에 도입하기 위해 **초급, 중급의 `두가지 가이드를 제공`**합니다.

### 초급자 가이드 문서

초급자 가이드는 **Node.JS 및 Gulp 환경 세팅의 `경험이 없는 작업자`**를 위한 가이드입니다.  
아래 문서의 절차에 따라 주세요.

[초급자 가이드 : Beginners Guide Document]

### 중급자 가이드 문서

중급자 가이드는 **Node.JS 및 Gulp 환경 세팅의 `경험이 있는 작업자`**를 위한 가이드입니다.  
아래 문서의 절차에 따라 주세요.

[중급자 가이드 : Intermediate Guide Document]

### @index.html 파일의 리스트 생성 가이드 문서

Hivelab UIT Gulp는 **`src/views` 폴더내 파일을 분석하여 @index.html 파일에 리스트를 자동으로 생성**해 줍니다.  
이와 관련해서 HTML 문서를 만들때 참고해야할 사항에 대해 가이드합니다.

[@index.html 파일의 리스트 생성 Guide Document]

### Gulp Task 커스터마이징 작업자를 위한 gulpfile.js 가이드 문서

[gulpfile.js Guide Document]

## Hivelab UIT Gulp 폴더 구조 및 파일의 역할

폴더 및 파일 구성은 아래와 같습니다. 본 프로젝트의 저장소에서도 확인하실 수 있습니다.  

* `src/` 배포 전 원본 소스 폴더 (실제로 작업하는 폴더)
    * `css/` CSS 폴더
        * `less/` LESS 폴더
            * `common`
            * `mixins`
            * `pages`
        * `libs` 라이브러리(jQuery,Swipe Js 등) CSS 폴더
        * `scss/` SASS 폴더
            * `common`
            * `mixins`
            * `pages`
    * `img/` 원본 이미지 폴더
        * `sprites/` 스프라이트 이미지 폴더 (하위 폴더는 샘플)
            * `folder-01`
            * `folder-02`
            * `folder-03`
    * `js/` 자바스크립트 폴더
        * `apps` 직접 작성하는 자바스크립트 폴더
        * `libs` 자바스크립트 라이브러리 폴더
    * `views` 
* `dist/` 실제 배포 용 폴더 (브라우저에서는 이 폴더의 내용이 보여짐)
    * `css/` Merge, Clean, Minify된 CSS 파일이 저장
        * `less / libs / sass / sprites`
    * `img/` 최적화 작업을 거친 이미지 폴더
        * `sprites / ..` 스프라이트 이미지가 생성되는 폴더
    * `js/` 압축/병합이 완료된 자바스크립트 폴더
        * `apps / libs`
* `templates/` Gulp에서 사용할 파일의 보관 폴더
    * `@index.html` dist/ 하위에 생성될 @index.html 을 만들기 위한 템플릿. **수정을 지양** 합니다.
    * `htmlhintrc.json` HTML Validation을 실행하기 위한 설정 파일
* `gulpfile.js` Gulp로 실행시킬 task를 정의한 파일
* `.gitignore` git으로 관리할 필요가 없는 파일 목록(폴더) 리스트

## Hivelab UIT Gulp Task 목록

Hivelab UIT Gulp v0.1에서 **사용할 수 있는 명령어**는 아래와 같습니다.

* `gulp setting` **프로젝트 정보를 입력**할 수 있습니다. 입력된 내용은 templates/projectInfo.json으로 저장되며,  
인덱스 파일 생성 시 활용됩니다. **최초 1번은 꼭 실행**합니다.
* `gulp` UIT Gulp에서 제공하는 모든 기능을 실행합니다.

## History

**11 JUL 2017**
* @index.html 파일의 리스트 생성 가이드 콘텐츠 추가 제작

**10 JUL 2017**
* 초급자 가이드 제작
* 중급자 가이드 제작
* @index.html 파일의 리스트 생성 가이드 제작

**07 JUL 2017**
* README.md 수정
* 초급자, 중급자 분리

**29 JUN 2017**
* README.md 수정
* IA(Information Architecture) 생성 task 추가
* 프로젝트 Setting task 추가
* HTML Validation task 추가
* CSS Lint task 추가

**27 JUN 2017**
* README.md 수정

**26 JUN 2017**
* Guide gulpfile.js 문서 작성
* gulpfile.js 업데이트 (코드 정리)

[초급자 가이드 : Beginners Guide Document]: http://gitlab.hivelab.co.kr/uit-center/techdev-office/uidev1/gulp-lab/tree/master/@forBeginners
[중급자 가이드 : Intermediate Guide Document]: http://gitlab.hivelab.co.kr/uit-center/techdev-office/uidev1/gulp-lab/tree/master/@forIntermediate
[@index.html 파일의 리스트 생성 Guide Document]: http://gitlab.hivelab.co.kr/uit-center/techdev-office/uidev1/gulp-lab/tree/master/@guideIndexList
[gulpfile.js Guide Document]: http://gitlab.hivelab.co.kr/uit-center/techdev-office/uidev1/gulp-lab/tree/master/@guideGulpfilejs
[gulp-lab/package.json]: http://gitlab.hivelab.co.kr/uit-center/techdev-office/uidev1/gulp-lab/blob/master/package.json