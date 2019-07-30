# 자바스크립트 언어 특징

## 범위과 기준
객체지향 프로그래밍 언어
	- OOP : Object Oriented Programming -> 개념 이해
스크립팅 언어 -> 위에서부터 한줄씩 읽어 내려감
	- 코드를 사전에 컴파일하지 않음
		- 사전에 컴파일하지 않기때문에 유연성이 높음
	- 실제 사용하는 시점에 컴파일
	- java, c++과 같은 opp 언어와 구현 측면에서 차이가 있음
	- 단점은 버리고 장점 활용의 지혜 필요

**OOP 개념 이해!!!!**

- 캡슐화

  - 외부에서 접근하지 못하게 private화 하는 것

- 다형성

  - 상속을 통해서 다른 동작을 가능하게 해 준다. 오버라이딩/오버로딩

- 추상화

  - 추상 클래스를 만든다. (타입스크립트에서 많이 사용)

  - ```
    class user interface 
    	name : string
    	age : number
    	
    	interface에서 끌어다가 쓸 수 있음
    ```

- 상속성




## 랜더링
- Rendering
	- 자바스크립트 실행 환경 설정
- 랜더링 시점
	- 처음 <script></script>를 만났을 때
	- 두 번째 script에서는 랜더링하지 않음
- 랜더링에서 하는 것
	- 언어 실행을 위한 오브젝트 생성(built-in)
	- 언어에서 사용하는 값 초기화
- 빌트인(built-in) -> 내장 함수
	- 랜더링 과정에서 생성하는 것을 총칭

## built-in
- 빌트인 구분
	- 빌트인 값(데이터) 타입
	- 빌트인 연산자
	- 빌트인 오브젝트

- 값(데이터) 타입 (자바스크립트의 원시 타입)
	- undefined, Null, boolean, number, string, object

- 연산자
	- ++, --, +, -, *, /, %, new 등

- 오브젝트 (모든 언어에서 사용하게끔 빌트인된 객체?)
	- Global, Object, Function, Array
	- String, Boolean, Number
	- Math(자바스크립트에만 있음), Date, RegExp, JSON(모든 언어에서 사용할 수 있음)
	- Error, EvalError, RangeError, ReferenceError 등

## 함수
특정 기능을 처리하는 자바스크립트 코드 묶음

- 함수 구성 요소
	- function 키워드
	- 함수 이름(식별자)
	- 파라미터(Paramenter)
		- Argument, 매개변수로도 부름
		- 자바스크립트에 아규먼트 오브젝트라는게 있음
	- 자바스크립트 Argument 오브젝트가 있음


## 함수 이름 규칙
첫문자
	- 영문자, $, _ 사용 가능

의미를 부여하여 명명
	- 함수 기능을 직관적으로 알 수 있도록 이름 부여
	- 강사의 명명 기준
		- 함수 코드를 읽지 않더라도
		- 함수 이름과 파라미터로 기능을 파악할 수 있도록
		- 의미(시맨틱)를 부여하여 작성

함수 이름 일반 관례
	- getValue()와 같이 동사로 시작
	- 두 개 이상의 단어를 사용할 때는
		- 두 번째 부터는 명사를 사용하고
		- 명사의 첫 문자는 대문자 사용
		- CamelCase 형태라고 부름

함수 호출
	- 함수를 호출해야 함수가 실행됨
		- getValue() 형태로 호출
    	- 함수 이름에 소괄호를 첨부
    - 소괄호 안에 호출된 함수로 넘겨줄 파라미터 값 작성
    - getValue만 작성하면 호출되지 않고
    	- Function 오브젝트가 반환됨


## OOP의 객체
객체
	- 행위 Behavior (method, 함수)와 속성(값, 데이터)으로 구성

클래스
	- 클래스는 객체를 작성한 거스올
	- 이 자제로 사용 불가
	- 사용하기 위해서는 object로 생성 필요


## 자바스크립트와 OOP
객체
	- 함수를 객체로 볼 수 있지만 완전하게 같지 않음
	- OOP의 속성은, 클래스의모든 객체에서 사용 가능
		- 속성은 자바스크립트의 프로퍼티와 비슷

클래스
	- ES5에서는 지원하지 않음 전형적인 


## prototype -> 자바스크립트를 대표할 수 있는 오브젝트
프로토타입
	- 자바스크립트에서 OOP 구현을 위한 오브젝트
	- 프로토타입 오브젝트에 메소드(함수) 연결
	- 오브젝트이므로 {메소드 이름 : 메소드 코드} 형태로 작성
	- 연결된 메소드를 인스턴스로 생성
작성형태
	- String 빌트인 오브젝트에는 다수의 메소드가 있음
	- String.prototype.concat
	- String.prototype.indexOf와 같이
	- 프로토타입에 메소드가 연결되어 있음


## 함수와 메소드의 구분 (개발자도구 Sources > 우측 Scope창에서 확인)
프로토타입 내에 있는건 메소드
	- concat, indexOf 등...
obj내에 같은 레벨에 있는 것들은 함수 (obj === String)
	- arguments, caller, prototype 등..

인스턴스를 a라고 생성하고 concat을 a.concat이라고 호출하면 읽혀짐


## 프로퍼티
객체는 프로퍼티 모음(집합)


## 인스턴스
Class => new => Instance
- Instance
	- 오브젝트로 생성한 오브젝트
	- 하나 이상 다수를 생성할 수 있음
	- var Value = function () {};
	- Value.prototype = {};
	- new Value() 형태로 생성

- 싱글톤(Singleton) 오브젝트
	- var Value = {add : function (param) {코드}} 형태는
	- new로 인스턴스 생성 불가
	- 이를 싱글톤(싱글) 오브젝트라고 함

- 자바스크립트는 두 형태를 모두 갖고 있음
	- 인스턴스를 생성할 수 있는 오브젝트
	- 인스턴스를 생설할 수 없는 싱글톤 오브젝트


* 인스턴스를 생성하는 목적
인스턴스마다 값(프로퍼티)을 다르게 가져가겠다, 저장, 관리하겠다라는 의미!


## 함수 인식
* mdn (오브젝트 명) 검색하면 좌측 프로퍼티 메소드
- 요구 사항
	- 함수를 사용하여 작성한 값을 연결하고 결과를 출력하세요
	- 이를 위해서는 아래와 같이 코드를 작성해야 한다.

- 데이터 연결 기능을 가진 함수 선택
	- concat()
- 함수가 포함된 오브젝트 선택
	- '오브젝트.함수()' 형태로 호출해야 하기 때문
	- 그런데, concat()이 Array와 String 오브젝트에 존재
	- 값 타입이 배열이면 Array 오브젝트의 concat()을 호출하고
		- 값 타입이 문자열이면 String 오브젝트의 concat()을 호출한다.
		- "sports".concat("soccer", "11");
		- [].concat("soccer", "11");

- 데이터 타입에 따라 오브젝트가 결정된다!!!
- 함수에 넘겨 줄 데이터 형태
	- 문자열 형태 : 'book', 123
    - 배열 형태 : ['aaa', 'bbb']
- 데이터 타입에 따른 오브젝트 생성
	- 오브젝트를 생성해야 함수를 호출할 수 있음
	- 그런데 형태가 2개이므로 데이터 타입에 따라 오브젝트 생성

- 함수가 호출되어 실행되면
	- 파라미터로 넘겨준 데이터를 연결하고 반환한다.


## 자바스크립트 형태
인스턴스를 생성하지 않고 인스턴스 위치에 연결할 데이터를 작성한다.
엔진이 데이터 타입에 따라 오브젝트를 결정하고 오브젝트에 속한 함수를 호출한다.
'sports'와 같이 문자열을 작성했으므로 String오브젝트의 concat()이 호출된다.


## 자바스크립트 메커니즘
- 빌트인 타입, 빌트인 오브젝트
	- 랜더링하면서 빌트인 타입과 오브젝트 생성
	- 따라서 필요한 처리를 하지 않아도 오브젝트를 사용할 수 있음
	- 즉, new 연산자로 인스턴스를 생성하지 않아도
		- 데이터 타입에 따른 오브젝트 인식과 함수 호출 가능


## new
__proto__
인스턴스 생성, 반환
	- new Sports('aaa') 형태
		- constructor 위치(Sports)에 작성한 생성자 호출
		- 새로운 오브젝트를 생성하여 반환
		- 그래서 생성자 함수라고 부름

constructor 위치에 작성 가능한 생성자
	- String, Array, Object 등의 빌트인 오브젝트
	- var Sports = function () {}형태에서 Sports

파라미터

	- 소괄호 안에 원하는 파라미터 값 입력

fallback (pollyfill)

- 

프로퍼티

- key와 value를 가지고 있는 것


## instanceof
오브젝트로 생성한 인스턴스 여부 반환
obj instance

var obj = new String('baseball');
console.log(obj == String); // false 반환
console.log(obj instanceof String); // true 반환




# Object 오브젝트

## Object 분류
형태 분류
	- 오브젝트 {}
	- 빌트인 오브젝트
	- 네이티브 오브젝트(Natice Object)
	- 호스트 오브젝트(Host Object)
네이티브 오브젝트
	- Arguments 오브젝트와 같이
	- 자바스크립트 프로그램을 실행할 때 생성하는 오브젝트
호스트 오브젝트 -> 대표적으로 DOM
	- 자바스크립트 실행 환경을 지원하기 위한 오브젝트
	- 네이티브 오브젝트를 제외한 오브젝트
	- 자바스크립트로 호스트 오브젝트를 제어할 수 있다.


## Object 프로퍼티 리스트
Object
= new Object(), Object
Object.prototype
= constructor, toString(), toLaocalString(), valueOf(), hasOwnProperty(), isPrototypeOf(), propertyIsEnumerable()


## new Object()
인스턴스 생성, 반환
	- 파라미터에 작성한 데이터 타입에 따라 오브젝트 타입 결정
	- 파라미터에 배열로 다수의 데이터 작성 가능
	- 파라미터 값이 undefined, null 빈 Object 인스턴스 반환


## 오브젝트 {}
Object 인스턴스 생성
	 - var obj = {}
	- {} 표기를 Object Literal이라고 부름


## 오브젝트 구성


## 함수와 메소드
함수와 메소드 구분
	- 함수 : 오브젝트에 연결
		- 예 : Object.create
	- 메소드 : 오브젝트.prototype에 연결
		- 예 : Object.prototype.toString


## toString()
개요
	- 인스턴스 타입을 문자열 표시 형태로 변환하여 반환

작성방법
	- 파라미터에 값 작성 불가
	- object 위치에 오브젝트가 아닌 인스턴스 작성

매커니즘
	- 대부분의 빌트인 오브젝트에 toString()이 있음
	- 모든 인스턴스에 Object.prototype.toString()이 설정됨


## valueOf()
개요
	- 오브젝트의 프리미티브 값 반환
	- 프리미티브 값을 반환하는 오브젝트
	- 불린, 데이트, 넘버, 스트링 오브젝트
	- 4개 오브젝트는 자신의 valueOf()가 호출되고


## prototype chain 
- 개요
	- prototype에 오브젝트를 연결하고 연결될 오브젝트의 prototype에 다시 오브젝트를 연결
	- 따라서 3개의 오브젝트가 연결된 형태가 된다.
	- 이 형태를 prototype chain이라고 함

- 연결과 상속의 차이
	- 연결 : 프로퍼티연결
    - 상속 : 인스턴스 연결


## isPrototypeOf()

## propertyIsEnumerable()
- 개요
  - 오브젝트에서 프로퍼티 이름을 열거할 수 있으면 true 변환
    - 열거할 수 없으면 false 반환
  - prototype에 프로퍼티를 연결하면
    - 1단계 아래 작성한 것이며 오브젝트 1차 프로퍼티가 아니므로 false 반환

    


# Global 오브젝트

## 글로벌 오브젝트 특징
- 글로벌 오브젝트
	- built-in 오브젝트
- 전체를 통해 하나만 존재
	- 전체 기준
		- 모든 script의 소스 코드 전체
- 오브젝트 실체 없음
	- Number, Array는 오브젝트 실체 있음
		- 오브젝트를 사용하여
		- Number.concat(), Array.concat() 형태로 호출
	- 글로벌 오브젝트는 오브젝트를 작성하지 않고(못하고) 함수 호출 및 변수에 접근
- new로 생성자 호출 불가
	- 인스턴스를 생성할 수 없음 따라서 메소드가 아닌 함수
	- prototype 사용 여부는 엔진 개발자에게 일임
		- prototype은 자바스크립트의 기본 구조이기 때문
- 함수, 프로퍼티, 변수
	- 글로벌 오브젝트의 함수를 글로벌 함수로
	- 프로퍼티/변수를 글로벌 프로퍼티/변수로 부름 (전역함수, 전역변수)


## 프로퍼티 리스트
- 값 프로퍼티
	- NaN, Infinity, undefined
- 함수 프로퍼티
	- isNaN(), isFinite(), parseInt(), parseFloat(), eval(), encodeURI(), encodeURIComponent(), decodeURI(), decodeURIComponent()
- 생성자 프로퍼티
	- Array, Boolean, Date, Error, EvalError, Function, Number, Object, RangeError, ReferenceError, String, SyntaxError, TypeError, URIError
- 이외 프로퍼티
	-  Math, JSON


## 글로벌 프로퍼티
외부에서 프로퍼티 값 변경 불가
delete 연산자로 삭제 불가
for~in으로 열거 불가


## window 오브젝트와 관계
글로벌 오브젝트는 자바스크립트에서 제공
window 오브젝트는 window에서 제공

- 오브젝트를 작성하지 않으면 글로벌 오브젝트 사용
	- 글로벌 오브젝트를 사용하면 윈도우 오브젝트가 사용되는 구조
	- 자바스크립트 실행 환경을 위한 Host Object 개념
	- ES5에서는 window를 작성해야하는 경우도 있음


## isNaN()
숫자 값이 아니면 true 반환
숫자 값이면 false 반환

파라미터 값이 숫자이면 숫자로 인식
값 타입이 문자열이라도 숫자값이면 순자로 인식한다.


## isInfinite()


## parseInt()
진수를 적용한 정숫값으로 변환하여 반환
값이 '123ABC'이면 123 반환


## parseFloat()



## eval() -> 쓰지 말것 / 보안 이슈

파라미터의 문자열 값을 자바스크립트 코드로 간주하여 컴파일, 실행 => 메모리에 쌓이지 않음
예 : eval('parseInt('-123.45')')




## encodeURI()

## decodeURI()


# String 오브젝트



