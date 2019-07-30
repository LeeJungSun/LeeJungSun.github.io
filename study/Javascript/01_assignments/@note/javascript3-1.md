- built-in 오브젝트
  - Function, Object, Array 등
- 오브젝트
  - 빌트인 오브젝트로 생성한 오브젝트
  - function(), Array[], Object{}
- 인스턴스
  - new로 생성한 인스턴스
- property key와 name 차이
  - property name : String value(문자열)
  - property key : String value + Symbol value(값 = value)



# let, const



## var 키워드

- 변수 선언 및 구분
  - 로컬(지역)변수
  - 글로벌(전역)변수 => 글로벌 오브젝트에 선언됨
- 구분 목적
  - scope, 검색을 빨리하기 위함
  - 자신의 영역에서 사용
  - 공용에 따른 문제 방지



## use strict 사용

- 함수 안에서 글로벌 변수 선언 방지 => 근본적인 접근은 아님



## let 변수

- var 문제 해결
- 스코프 범위
  - 블록{}, 문장, 표현식
- 블록{} 안의 블록{}도 스코프
  - 블록 밖의 변수는 스코프가 다름
  - 값이 대체되지 않음
- let 변수는 **호이스팅 되지 않음**



## let 작성

- 같은 스코프에 같은 이름 선언 불가
- 표현식 작성 가능



## 블록 스코프

- 블록 {}형태

  - function () {코드}

  - if (a===1) {코드}

  - try-catch

    try {
      코드

    } catch {}

  - switch () {코드}



## let과 this

- **글로벌오브젝트에서 let으로 this로 참조 불가**

  - let sports = "축구";

  ​       console.log(this.sports) => undefined

- var의 경우 글로벌 오브젝트 이므로 this참조가 가능하다.

  -  var music = "음악"

     console.log(this.music) => 음악



## function 

-  function 안과 밖에 같은 이름의 let변수 선언 가능 (스코프가 다르기 때문)

   let music = "음악"

   function get () {

  ​	let music = "클래식"

  ​	console.log(music); => 클래식

  };

  get();



## const

- 반드시 초깃값 설정, 초깃값은 변경할 수 없음 (let과 다름)
- 표현식 작성 가능, 평가 결과 사용
- 값을 바꿀 수 없는 변수 선언
  - JavaScript에서 상수는 대문자 사용이 관례
  - const가 상수 개념이지만 차이 있음
- 우선 let이 아닌 const 사용 검토 (let, const중 const의 우선순위가 더 높음)
- const 를 통째로 바꿀수는 없지만, 프로퍼티 단위로는 값을 추가하고 삭제할 수 있음
- let과는 통째로 바뀌냐 안바뀌느냐의 차이



```
var과 let의 차이점
- 호이스팅 : var의 경우 undefined가 출력
           let의 경우 error()

let과 const의 차이점
- const 를 통째로 바꿀수는 없지만, 프로퍼티 단위로는 값을 추가하고 삭제할 수 있음 통째로 바뀌냐 안바뀌느냐의 차이
```



# Arrow Function

- (param) => {함수 코드}

  - const sports = (param) => {코드}

- function () {}의 축약 형태

- 블록{}만 작성하면 undefined 반환

- new로 인스턴스 생성 불가

  - new를 사용하려면 prototype과 constructor가 있어야 함 (화살표 함수에는 이것이 없음)

- arguments 사용 불가

  - rest 파라미터 사용 권장

- 인스턴스와 오브젝트에서 this 참조가 다름

- 사용 환경에 따라 arrow 함수 선택 사용

  

Sports.prototype = {

​	arrow : function () {

​		setTimeout( () => {

​			console.log(this.count);

​		}) // arrow함수를 사용할 경우 window가 아닌(setTimeout은 window) arrow function을 바라 봄 (본래는 window)		

​	},

​	add : () => { // prototype에는 화살표함수 사용 금지 (이쪽만 window로 가져가버림)

​	}

};





## Syntax

- (param) => 표현식;
  - return값 까지 포함하여 반환됨
- (param) => ({key:value});
- (param1, param2 = 123) => {코드};
  - 디폴트 파라미터값 사용
- ([one, two] = [10,20]) => {코드};



## lambda

- 함수 이름이 없는 익명/무명 함수
- function () {}





# Interation

- 반복을 의미

- 반복하기 위한 프로토콜 필요

- 배열을 반복하기 위해서는 배열이 반복할 수 있는 오브젝트이어야하고
  반복을 위한 함수를 갖고 있어야 함 => 이터레이션 프로토콜(규약)

- 이터레이션 구성

  - 이터러블(iterable) 프로토콜
    - 오브젝트의 반복 동작을 정의
    - 디폴트로 이터러블 프로토콜을 갖고 있음
    - Symbol.iterator()가 있어야 함

  - 이터레이터(iterator)프로토콜
    - 오브젝트의 값을 순서로 처리할 수 있는 방법
    - next()가 적용되어있으면 이터레이터 프로토콜이 적용되어 있음



# Spread

- 이터러블 오브젝트를 하나씩 전개
- […iterable]
  - […]처럼 []안에 점 3개 작성
  - 이어서 이터러블 오브젝트 작성



## Array spread

- []안에 spread 대상 이터러블 오브젝트 작성



## push(...spread)

- push() 파라미터에 spread 대상 작성



## Object spread

- []안에 spread 대상 Object 작성



## function spread

- 호출하는 함수의 파라미터에 spread 대상 작성
  - function get (one, two, three) {};
  - const values = [10, 20, 30];
  - get(...values);
- 함수를 호출하기 전에 엘리먼트 단위로 전개
- 각 엘리먼트 값을 파라미터로 넘겨 줌
- 호출받는 함수의 파라미터에 순서로 매핑



## rest 파라미터

- 하나 이상의 파라미터를 배열로 묶음



## Array-like

- 배열처럼 이터러블 가능한 오브젝트
- Object 타입이지만 for()문으로 전개 가능



## rest, arguments 차이

- arguments
  - 파라미터 작성에 관계없이 전체 설정



# Operator



## destructuring

- let one, two, three;
- [one, two, three] = [1,2,3];
- 원 데이터는 변경되지 않음
- 분할/분리에 더 가까움



## Array 분할



## Object 분할



## 파라미터 분할



Object 안에서 function 키워드 생략 가능

const obj = {

​	getTotal (param) {

​		return param + 123;

​	}

}

obj.getTotal();



// ES5 형태

getTotal : function (param) {

​	return param + 123;

}



## Descriptor

- ES5
- 프로퍼티 디스크립터 타입
  - 속성(필드) 이름(예:enumerable)과
  - 속성(필드) 값(true/false)로 구성
  - 프로퍼티 속성의 처리 기준 정의
- 프로퍼티 디스크립터 타입 분류
  - 데이터 프로퍼티 디스크립터
  - Access 프로퍼티 디스크립터
- 프로퍼티 디스크립터 인식 기준
  - value와 get을 함께 작성하면 에러



 # default

- 값을 할당하지 않으면 default 값 할당



# for-of

- 이터러블 오브젝트 반복
- variable
  - 변수 이름 작성
  - 오브젝트를 반복할 때마다
  - variable에 프로퍼티 값이 할당됨



## for-of, Array

- 배열의 엘리먼트를 하나씩 반복하여 전개

 for (const value of [10,20,30]) {

​	console.log(value);

}



## NodeList

- NodeList 엘리먼트를 하나씩 반복하여 전개



## for-in, for-of 차이

- 배열의 엘리먼트를 하나씩 반복하여 전개





# Object



## is()

- 두개의 파라미터 값과 값 타입을 비교
  - 같으면 true, 아니면 false 반환
- 오브젝트 비교 목적이 아님
  - []와 [] 비교, {}와, {} 비교는 false
  - 단 window 오브젝트 비교는 true

JavaScript-Equality-Table



## assign()

- 프로퍼티 디스크립터는 복사하지 않음
- 두 번째 파라미터를 작성하지 않으면 첫 번째 파라미터로 변환한 오브젝트 반환
- 필요한 이유
  - Object를 할당하면 프로퍼티가 연동됨
  - 한쪽의 프로퍼티 값을 바꾸면 다른 곳도 바뀜
- 연동되지 않게 하려면 별도 처리 필요
- assign() 결과를 다른 오브젝트에 할당 가능
- 복사할 object에 getter가 있으면 getter에서 반환된 값을 복사



## __ proto__

- prototype과 __ proto __의 차이
  - Book.prototype.read() 형태로 호출 가능
  - __ proto __ 메소드로 바로 호출 가능
- __ proto __에 function 추가
  - 인스턴스 메소드가 되며
  - 인스턴스.method() 형태로 직접 호출



## setPrototypeOf()

- 첫번째 파라미터의 __ proto __에 두번쨰 파라미터를 설정하면 성성된 모든 인스턴스에서 사용 가능
- 두번째 파라미터에 오브젝트의 prototype 작성
  - prototype의 프로퍼티로 인스턴스를 생성하여 첫번째 파라미터의 __ proto __에 첨부
- __ proto __에 첨부는 권장하지 않음
  - prototype에 첨부하는 Object.create() 사용
- ES5에 getPrototypeOf() 있음



