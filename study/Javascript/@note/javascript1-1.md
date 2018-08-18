<!-- $theme: default -->

# 자바스크립트 핵심

## 기능적 핵심 : Control
자바스크립트는 혼자서 사용하는 경우가 없음 다른 것들과 함께 연동해서 사용
이벤트를 인식하는 기능은 없음
HTML은 마크업이 아닌 애플리케이션 예전에는 HTML이 메인이였으나 HTML5가 나오면서 자바스크립트가 메인
자바스크립트는 다른 것을 포함하는게 목적이다.

- DOM : HTML, CSS 컨트롤
- HTML5 API : File, IndexedDB
- 그래픽 : SVG, Canvas, WebGL
- 통신 : XMLHttpRequest, Socket

## 기술적 핵심 : Object : {name : value}
자바스크립트의 근간은 네임밸류 키밸류
- Object 형태 : {name : value}
- 자바스크립트 아키텍처 근간
- 생각의 전환 필요

## 지속성
- 보유 콘텐츠 방대
- 국제 표준 언어
- 서버 영역 확대
	- Node.js, loT 디바이스
- 강사 개인 경험

## 언어특징
- 사전에 컴파일하지 않음
	- 실행 시점에 컴파일 : JIT 컴파일
    - 스크립트 언어의 특징
- JIT(Just-in-time) 컴파일
	- 실행 시점에 컴파일
    - 실행 시점 기준이란?
        - 함수 선언을 인식한 때
        - function today(){소스코드}
    - 함수 안의 소스 코드는 컴파일하지 않음
        - function 오브젝트만 생성
- 인터프리터(interpreter)
    - 문장 단위로 컴파일
    - eval() 함수

## 스펙
- JavaScript 스펙 명칭 : ECMAScript
- Creator : Brendan Eich
- 스펙 명칭 : ECMA-262 스펙
    - ES5, ES6 형태의 약칭 사용
    - 2015년부터 ES2015(ES6), ES2016(ES7) 형태

* head 내에 js 사용할 경우
<script src="js/jsFile.js” defer></script>
defer = > html 랜더링 끝난 후에 script 구문 읽도록 실행 / 본래 대로라면 랜더링 순서대로 스크립트 구문을 먼저 읽게 됨


## console
파라미터 = 매개변수 = argument
- console.log(object [, object, ...]) 
    - 대괄호는 생략 가능하다는 의미
    - 파라미터 값을 브라우저 콘솔 창에 출력

## 주석
주석은 코드 설명하는게 아님 role를 받침하는 근거를 작성한다.
주석을 먼저 작성하게 되면 시나리오가 연결되는 작업이 가능하다.
    => 시나리오가 연결되어야 주석없이 메소드 네이밍만 보고도 어떤 기능을 하는지 유추가 가능함
- 한줄 주석
    * // 주석
- 블록(block) 주석
    * /**/, /** */
        
                    /* 주석 */
                    /**
                    * @method
                    * @param
                    */

- 주석을 먼저 작성
    - 함수의 기능, 코드 실행 순서 등을 생각하고 정리
    - 이것이 주석을 작성하는 가장 큰 목적
    - 메모가 아닌 다른 사람이 보아도 알 수 있도록 작성

## 문장 작성
- 자바스크립트 코드 작성 위치
    - 위치 제약 없음
    - 들여쓰기 : 일반적으로 2칸, 4칸
- 대소문자 구분
    - var typeAAA = sports;
    - var typeaaa = sports;
- 문장 끝에 세미콜론 작성
    - var type = sports;
- 공백 영향 없음
    - var sports = ‘swim’;
    - var sports=‘swim’;
- 토큰(Token)
    - 코드 최소 단위

## 변수
- 변수
    - 값 할당 영역, 값 변경 가능
- 변수 선언
    - var로 변수 선언
    - var sports;
        - var 다음에 변수 이름 작성
    - var soccer, baseball;
        - 콤마로 변수 분리, var는 작성하지 않음
- 줄을 바꿔 작성
- 변수는 삭제할 수 없음


## 변수에 초깃값 할당
- 값 할당
    - var sports = ‘야구'
- 콤마 사용
    - var sport = ‘수영’, soccer = 11;
- 값 대체
- 같은 값 할당
    - var sports = swim = soccer = ‘스포츠’;
    - 좋은 형태 아님 ==> 변수 각각에 값 할당

## 정수, 실수
- 정수
	- 소수가 없는 숫자 값
- 실수
	- 소수를 가진 숫자 값
- 자바스크립트 숫자처리
	- 정수와 실수를 구분하지 않음
	- 64비트 부동 소수점 처리
- 부동 소수점(floating point)
	- 소수점 위치가 고정되지 않고 유동적
	- 부호, 지수, 가수로 구성
	- 지수 : 3.14 = 314e-2, 314E-2


## 상수
- 상수
	- var ONE = 1;
	- 영문 대문자 사용 : 코딩 관례 (문법적으로 해당하지 않음)
	- 값을 변경할 수 있음
	- 값이 변경되지 않는다는 선언
- 상수 사용 목적
	- 의미를 부여한 시맨틱 선언
	- 변수 이름으로 값 인식
- 상수 유형
	- 자바스크립트 상수
		- MAX_VALUE, MIN_VALUE 등
	- 개발자 정의
		- var ONE = 1;

## 진수
- 10진수
	- 12345
- 16진수
	- 0xFD : 253
	- 첫 번째에 숫자 0을 작성
	- 두 번째 영문자 x를 작성
	- 세 번째와 네 번째 0부터 f까지 작성
- 8진수
	- ES3에서 폐지, ES6 재정의
- 2진수
	- ES6에서 정의


## 키워드
- 자바스크립트 기능 수행
	- 식별자로 사용 불가
	- debugger : ES5에서 추가


## 예약어
- 자바스크립트 사용 예약 키워드
	- 개발자 사용 금지
	- 추가될 가능성이 있으므로
		- OS, 시스템 뉘앙스 단어 사용 금지

예약어
class
const
enum
export
extends
import
super

strict 모드 예약어 (객체지향에 사용하는것들)
implements
interface
let
package
private protected
public
static
yield

-------------

ES5 -> 객체지향이 미흡했음
ES6 -> 객체지향이 중점을 둠
ES8 -> 객체지향 + 활용에 중점

컴포넌트 = 객체지향 같은 레벨로 봄


## 유니코드
- Unicode
	- 전 세계의 모든 문자(언어)를 통합한 코드
	- 유니코드 컨소시엄 : http://www.unicode.org
	- 0000 ~ FFFF, 10000 ~ 1FFFF의 각 코드에 문자 매핑
	- 한글, 한중일 통합 한자도 포함되어 있음
		- 한글, 한문, 일본어 등으로도 변수 이름도 사용 가능!

- UTF
	- Unicode Transformation Format
	- 모든 유니코드를 매핑하는 알고리즘
	- UTF-8, UTF-16, UTF-32로 표기
		- 자바스크립트 안에서는 UTF-16 사용
	- UTF-8은 8비트로 유니코드를 매핑
	- 이를 8비트 인코딩이라고 함
- 표기방법
	- u+숫자 형태 : u0031은 

// 유니코드값 출력
// 자바스크립트는 u앞에 역슬래시(\) 작성
console.log(\u1100);


## 화이트스페이스
- Whitespace 문자
	- 사람 눈에 보이지 않는 문자
	- 문자마다 기능을 갖고 있음

json 포멧은 오브젝트



# Data type

## 값 타입
- 값(value)은 타입(type)을 가짐
	- 자바스크립트는 값을 기준으로 타입을 분류
	- 타입을 선언하고 타입에 맞는 값을 할당하지 않음
	- 변수는 타입을 무시하고 선언만 함
	- 값을 읽어봐야 타입을 알 수 있음

- 값 타입 분류
	- 자바스크립트 언어 타입, 스펙 타입
- 자바스크립트 언어 타입
	- Undefined, Null, Boolean, String, Number, Object 타입(ES5 기준 ES6에서 하나 추가됨)
		- undefinde, null, 0은 false 나머지는 true
- 스펙타입

## Undefined
null은 의도적으로 undefinded에서 null로 값을 바꿨다는 의미
undefined 처리를 못해서인지 값 지정이 안돼서인지 구분이 안되므로 값 지정이 안된걸 의미하려면 null을 사용해주어야함
- Undefined 값 타입
	- 값 : undefined(소문자)
- 변수 초깃값
	- var sports;
    - 변수를 선언만 하면 초깃값으로 undefined가 할당됨
    - 변수에 값을 할당하지 않은 것을 나타냄
    - 변수에 undefined값을 할당할 수 있으므로 반드시는 아님
    - 구분을 위해 되도록 변수에 undefined를 할당하지 않음
    	- var abc = undefined;

## Null
null은 더하기할떄 0으로 변환됨
- Null 값 타입
- 변수에 null 할당
	- var sports = null;
- null과 undefined의 차이
- var sports = undefined 는 undefined를 의도적으로 할당


## Boolean
- Boolean 값 타입
	- true, false
	- var sports = true;
- 연산에서 숫자 값으로 사용
	- true : 1, false : 0
- 값의 Boolean 인식
	- 숫자, 영문자, 한글은 true로 인식
	- 단, 숫자 0은 false로 인식
	- null, undefined는 false로 인식


## String
- 값 타입
	- 문자열 : UTF-16비트의 부호 없는 값
	- 작은 따옴표 또는 큰 따옴표 안에 작성
	- var sports = 'baseball'
	- 최대 문자수 : 2의 53승 - 1

- +로 문자열 연결
	- 연결한다라는 의미
	- var sports = 'base' + 'ball';
- 숫자와 문자열 더하기
	- 숫자 + 숫자 : 덧셈 값으로 계산
	- 숫자 + 문자열 : 숫자와 문자열을 연결


## Number
- 값 타입
	- 값 : 64비트 부호 있는 값
	- 18437736874454810627(2의 64승 - 2의 53승 + 3)
	- var value = 12345;
- Number 타입에 속하는 3개 값
	- NaN : Not-a-Number
	- 양수 무한대 : Infinity
	- 음수 무한대 : -Infinity


## NaN
 Not-a-Number
 	- 숫자 값이 아닌 것을 나타내는 값


## Object 타입
- Object 형태
	- {book : 'javascript', sports: '농구'}
- Object 작성 방법
	- 중괄호 {}
	- {key : value} 형태
	- 콤마로 구분하여 다수 작성
- 프로퍼티(Property)
	- {key : value} 형태
	- key로 프로퍼티에 접근하여 value 설정
- Object는 프로퍼티 모음(Collection)
	- 속성과 프로퍼티는 차이가 있음
	- 프로퍼티를 수식하는게 속성이다.


var sports = {player : 11, item: '축구'};
console.log(sports.player);
console.log(sports['player']);
- key로 프로퍼티에 접근, 값 반환

sports.player = 22;
console.log(sports.player);
sports['player'] = 33;
- key로 프로퍼티에 값 설정


# 연산자(Operator)
할당, 산술, 단항 연산자

## 표현식
- 표현식(Expression) 형태
	- 1 + 2
	- var total = 1;
	- var total = 1 + 2;
	- var total = function () {...};
	- if (Expression) {...};
	- returen Expression;
	- 값 계산, 사칙연산, 할당, 함수 등의 형태
- '표현식을 평가'한다고 칭함
- return Expression;
	- Expression 평가 결과를 반환한다.


## 연산자
- 연산자(Operator) 형태
	- 연산/비교 기호 : +, -, /, *, <, =

typeof 연산자
	- typeof value;

delete 연산자
프로퍼티를 날릴 수 있음
변수는 못 날림
날리면 나중에 undefinde가 노출됨
	- delete 표현식

new 연산자
인스턴스를 생성해서 반환됨
ES6에서 엄청 사용됨(객체지향)
	- new Sports();

## typeof 연산자
값 타입 반환
	- typeof value;
	- value에 값 지정

고려 사항
	- Null과 Object의 반환 타입이 object
	- 완전하게 인식 불가 다른 방법으로 인식 뒤에서 다룸

Undefined = undefined
**Null = object**
Boolean = boolean
Number = number
String = string
Object = object
Function = function

## 할당 연산자
- 단일 할당 연산자
	- = 하나만 사용
	- var result = 1 + 2;
- 복합 할당 연산자
	- 단일 할당 연산자와 연산자 기호 같이 사용
	- *=, /=, %=, +=, -=, <<=, >>=
	- >>>=, &=, ^=, \=
	- plus += 3;
- 해석, 할당 순서
	- 디폴트 : 왼쪽에서 오른쪽으로 표현식 해선
	- 단일 할당 연산자 해석 순서
	- var result = 1 + 2
		- 오른쪽 표현식 값 구함
		- 왼쪽 표현식에 할당


## +연산자
- 기호 +
- 기능
	- 왼쪽 표현식에 오른쪽 표현식을 더함
- 표현식 평가 결과 연결


## 숫자 값 변환
- 사칙연산을 하기 전에 숫자 값으로 변환
	- 변환 결과가 숫자이면 연산 처리
	- "123"은 String 타입이지만 값이 숫자이므로 연산 처리
	- +는 String 타입이면, 값을 더하지 않고 연결
값 타입 \ 변환 결과 값
Undefined = NaN
Null = +0
Boolean = true : 1, false : 0
Number = 변화 전/후 값 같음
String = 값이 숫자이면 숫자 값(+연산 제외)


## -연산자
- 기호 : -
- 기능
	- 왼쪽 표현식 평가 결과에서
	- 오른쪽 표현식 평가 결과를 마이너스
- String 타입이지만 값이 숫자일 때
	- String 타입 값을 숫자로 변환하여 뺄셈을 행함
	- 덧셈은 문자열 연결이 있으므로 더하기를 하지 못함


* 연산자
왼쪽 표현식 평가 결과에서 오른쪽 표현식 평과 경과를 곱한다.

- 고려사항
console.log(2.3 * 3)
6.9가 출력되지 않음 : 정상처리

console.log(2.3 * 10 * 3/10)
실수를 정수로 변환하여 연산하고 정수를 실수로 변환한다.



## / 연산자
- NaN 변환
왼쪽, 오른쪽 표현식 평가 결과가 하나라도 숫자가 아닐 떄
분모, 분자 모두 0
분자가 0 이면 0 반환


## % 연산자
- 기능
	- 왼쪽 값을 오른쪽 값으로 나눈 나머지 반환
	- 3 % 2의 나머지는 1
- 나머지 고려사항
	- 실수를 정수로 변환하여 연산


## 단항 +연산자
- 형태 : +value
	- var one = 2, onePlus = +one
- 피연산자 값을 숫자 값으로 반환
- 문자열의 숫자값을 숫자로 변환할 때 사용


## 단항 -연산자
- 피연산자 값을 부호로 바꿈
- 연산할 때만 바꾸고
- 변수에 할당된 값은 바꾸지 않음


## 단항 ++연산자
- 기능
	 - 자동으로 값을 1 증가 시킴
- 후치 ++연산자
	- value++형태
	- 문장을 수행한 후에 1 증가
	- 표현식이 아닌 문장 세미콜론 끝에서 증가
- 전치 ++연산자
	- ++value 형태
	- 표현식을 평가하기 전에 1 증가
	- 따라서 표현식에서 증가된 값 사용


## 단항 --연산자
- 기능
	 - 자동으로 값을 1 감소 시킴
- 후치 --연산자
	- value--형태
	- 문장을 수행한 후에 1 감소
	- 표현식이 아닌 문장 세미콜론 끝에서 감소
- 전치 --연산자
	- --value 형태
	- 표현식을 평가하기 전에 1 감소
	- 따라서 표현식에서 감소된 값 사용


## 논리 !연산자
- 논리(Logical) NOT 연산자
	- 형태 : !value;
- 기능
	- 표현식 평가 결과를 불린 값으로 변환한 후
	- true이면 false를, false이면 true를 반환
	- 변수에 할당된 값은 바뀌지 않으며 사용할 떄만 변환

**boolean 변환값**
Undefined = false
Null = false
Number = 0 또는 NaN이면 false, 아니면 true
String = 값이 있으면 true, 없으면 false


## 비트 ~연산자
가독성이 떨어짐
속도가 크게 필요하진 않는 이상 지금은 사용하지 않아도 됨
스펙은 +0과 -0을 구분(엔진 개발자들이 주로 사용)

- 비트(Bitwise) NOT 연산자
	- 형태 : ~value
- 기능
	- 2진수 비트 값을 반대로 반환
	- 양수/음수 사인 부호 바꿈
	- 양수 : 양수를 음수로 변환 후, -1을 더함
	- 음수 : 음수를 양수로 변환 후, 1을 마이너스
- 비트
	- 1비트는 0 또는 1 값을 가진다.
	- 16비트는 16개의 비트로 구성되며 16비트로 값 표현
	- 32비트, 64비트도 같은 개념
	- 많은 비트 수로 값을 표현하면 값의 범위가 큼
	- 반면, 그만큼 메모리가 필요


## 관계 연산자
- Relational Operators범위
	- < 연산자
	- > 연산자
	- <= 연산자
	- >= 연산자
	- instanceof 연산자
	- in 연산자
- instanceof, in 연산자
	- 사전 설명이 필요하므로 관련된 곳에서 다룸


## > 연산자
- 기능
	- ture : 왼쪽 표현식 평가 값이 오른쪽 값보다 크면
	- flase : true가 아니면 false
	- 한쪽이 number 타입이면 수학 값으로 비교
	- 모두 string 타입이면 유니코드 사전 순서로 비교


## 콤마(,) 연산자
- 기능
	- 콤마를 기준으로 왼쪽 표현식과 오른쪽 표현식을 평가하고 평가 결과를 반환

## () 연산자
- 기능
	 - 소괄호 안의 표현식을 먼저 평가하고 결과 값을 반환


## 프로퍼티 악세서
- 프로퍼티(property)접근자
	- 오브젝트{}에서 프로퍼티 값 반환
	- 오브젝트에 프로퍼티(key:value) 추가, 값 변경
	- obj.abc = 123
	- 프로퍼티 이름 abc가 존재하면 값이 변경되고 존재하지 않으면 {abc:123}이 추가됨

- {} : 오브젝트 생성, 초기화
	- var obj = {};
	- var obj = {abc:123, def:'ball'};

- 작성 형태
	- 점(.)으로 프로퍼티 이름 지정 : obj.abc
	- 대괄호 사용 : obj['abc']
	- abc가 변수 이름일 때 : obj[abc]


## 동등 연산자
- Equality Operators 범위
	- == 연산자
	- != 연산자
	- === 연산자 (type까지 비교) => 되도록 사용
	- !== 연산자 (type까지 비교) => 되도록 사용


## == 연산자
true : 왼쪽 표현식 평가 값과 오른쪽 값이 같음
값 타입은 비교하지 않고 값만 비교


## === 연산자
Strict Equals Operator(일치 연산자)


## || 연산자
- 기능
	- true : 표현식 평가 결과가 하나라도 true이면 true
	- false : true가 아니면 false
	- 왼쪽 결과가 true이면 오른쪽은 수행(비교)하지 않음
	- 조건과 값으로 비교
	- 마지막 까지 비교하였는데 false이면 마지막 변수 값 반환
	- false를 반환하지 않음

- 조건 비교
	- 표현식 조건으로 true/false 비교
- 값으로 비교
	- 표현식 평가 결과 값으로 true/false 비교
	- **true/false를 반환하는게 아닌 값을 변환하는 것**
    
    
## && 연산자
- 기능
	- true : 표현식 평가 결과가 모두 true이면 true 아니면 false
	- 왼쪽 결과가 false이면 오른쪽은 수행하지 않음
	- 조건과 값으로 비교


## ? 연산자
- 조건 연산자
	- 삼항 연산자라고도 부름
- exp ? A : B;
- 기능
	- exp위치의 표현식 평가 결과가 true이면 A 위치의 표현식 평가 결과를 반환하여 flase이면 B 위치의 표현식 평가 결과를 반환


## 연산자 우선 순위




