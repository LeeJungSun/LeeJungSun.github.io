# Lexical Environment



## 실행 콘텍스트

- Execution Contexts
- 함수의 실행 영역
- 함수 코드를 실행하고 실행 결과를 저장
- 실행 콘텍스트 처리 단계
  - 준비 -> 초기화 -> 코드 실행



## 렉시컬 환경

- 함수가 사용할 함수와 변수를 렉시컬 환경에 설정 오브젝트, 변수, 다른 함수 참조 가능
- 초기화 단계에서 해석한 모든 함수와 변수를 {key:value} 형태로 저장



## 렉시컬 환경 구성

- 렉시컬 환경 생성 (function, with, try-catch문에서 생성)

- 렉시컬 환경 구성 형태

  - 렉시컬 환경(LE) = {

    ​	환경 레코드

    ​	외부 렉시컬 환경 참조 => scope

    }



## 렉시컬 환경 이해

- 렉시컬 환경에 기록(설정)하는 것
  - 환경 레코드에 함수 안의 함수, 변수 기록
  - 외부 렉시컬 환경 참조에 가장 근접한 스코프 설정
- 함수, 변수 검색 방법
  - 우선 환경 레코드에서 검색 없으면 외부 렉시컬 환경 참조에서 검색
- 소스 코드 작성 최적화 방법
  - 1단계 밖의 실행 환경이 스코프이며 외부 렉시컬 환경 참조에 설정되기 때문에 되도록 1단계 안에 변수, 함수 작성



## 검색 메커니즘

- 프로퍼티 검색 순서, 방법
  - 함수 안에서 프로퍼티 검색
  - 존재하지 않으면 외부 렉시컬 환경 참조에서 검색



## 환경 레코드 구분

- 선언적 환경 레코드
- 오브젝트 환경 레코드
  - with문을 실행할 때마다 렉시컬 환경을 생성 (사용되지 않는것도 메모리에서 계속 만들어짐)
  - 여러번 with문을 실행하더라도 같은 렉시컬 환경이 외부 렉시컬 환경 참조에 설정
- 글로벌 환경
  - 글로벌 오브젝트를 위한 렉시컬 환경 -> 렉시컬 환경과 형태 같음
  - 동적으로 함수와 변수 바인딩
    - 함수에서 var키워드를 사용하지 않고 함수/변수를 선언하면 글로벌 오브젝트에 설정되기 때문



## 생성자 함수

- new로 인스턴스를 생성하는 함수
- new : 인스턴스 생성 제어



## constructor

- Function 오브젝트를 생성할 떄 설정되며 생성하는 Function 오브젝트를 참조하도록 설정 prototype에 연결되어 있음
- constructor가 없더라도 인스턴스가 생성됨



## prototype

- 프로퍼티 연결을 통한 프로퍼티 확장
- 생성한 각 인스턴스에서 prototype의 프로퍼티 공유
- 프로퍼티 확장
  - prototype에 프로퍼티 {key:value}를 연결하여 확장
- 프로퍼티 공유
  - prototype에 연결된 프로퍼티로 인스턴스 생성
  - 인스턴스에서 prototype에 연결된 프로퍼티 값 공유



## 인스턴스 상속

- Function 오브젝트를 인스턴스로 생성하여 prototype에 연결
- 객체 지향의 상속 개념
- prototype-based inheritance(상속)라고도 하지만 자바스크립트에서 prototype은 상속보다 프로퍼티 연결이 주된 목적
- 인스턴스 연결도 프로퍼티 연결의 하나
- prototype으로 상속을 구현한 형태를 프로토타입 체인이라고 함



## 프로퍼티 연결 목적

- prototype에 연결된 프로퍼티로 인스턴스 생성
- 생성한 모든 인스턴스에서 prototype의 프로퍼티 공유
- 각각 다른 인스턴스에서 같은 결과를 얻을 수 있음
- 인스턴스마다 값을 사용하려면 this가 원본 Function 오브젝트를 참고하지않고 생성한 인스턴스를 참조



# this

- 키워드
- 실행 콘텍스트의 this 바인딩 컴포넌트 참조



## call() 과 this

apply()

## bind()와 this

- bind()는 한 번에 처리하지 않고 나누어 처리
  - Function 오브젝트를 생성하여 반환
  - 생성한 Function 오브젝트를 함수로 호출
- 첫 번째 파라미터에 생성한 Function 오브젝트를 호출할 때 this로 참조할 오브젝트 작성
- 두 번째 파라미터에 bind()에 넘겨 줄 값 작성
- 생성한 Function 오브젝트를 호출할 때에도 파라미터 작성 가능 두 개의 파라미터를 병합하여 사용







# 객체지향프로그래밍



## 객체

- 객체
  - 독립적으로 존재하며 객체 자체에서 목적 달성
- 객체 지향 프로그래밍(OOP)
  - 객체 중심으로 프로그래밍하는 방법, 형태



## 클래스

- 객체의 행위와 속성을 선언하는 영역
- 텍스트 형태이므로 오브젝트로 생성해야 사용할 수 있음
- ES6부터 사용



## OOP 주요 개념

- 추상화, 캡슐화, 다형성, 상속
- 추상화
  - 추상화의 목적은 최적화
  - 공통 개념을 하나로 정의하는 것부터 시작
- 자바스크립트에서 추상화
  - 일반적으로 사용하지 않음
  - 이유는 상속을 크게 사용하지 않기 때문





# 자바스크립트 활용



# 프로퍼티 연동 방지

- 오브젝트에 오브젝트를 할당하면
  - 프로퍼티 값이 연동 됨
  - 배열도 마찬가지로 연동 됨
  - 이를 방지하려면 프로퍼티 단위로 할당



## 재귀함수

- Recursive Function
- 함수 안에서 자신 함수를 호출하는 형태



## 함수 즉시 실행

- 엔진이 함수 코들르 만나면 자동으로 함수를 실행하는 형태
- 무명함수, 익명함수








