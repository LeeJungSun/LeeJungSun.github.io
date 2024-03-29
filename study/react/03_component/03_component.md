# 3장 컴포넌트

부모 컴포넌트 => App.js 파일 내 class App extends Component {}

자식 컴포넌트 => 컴포넌트 파일 내 class MyComponent extends Component {}



## 3.1 컴포넌트 생성



### 3.1.1 컴포넌트 초기 코드

컴포넌트 코드를 선언할 스크립트 파일을 만들어준다.

```js
import React, {Component} from 'react';

class MyComponent extends Component {
    render () {
        return (
        	<div>
        		나의 새롭고 멋진 컴포넌트
        	</div>
        )
    }
}

export default MyComponent;
```



### 3.1.2 모듈 내보내기(export)

다른 파일에서 이 파일을 `import` 할 때, 위쪽에 선언한 클래스를 불러오도록 설정한다.

```js
export default MyComponent
```

>  **export 란?**
>
>  - 파일이나 모듈 안의 함수나, 객체를 내보낼때(export) 사용된다.
>  - **ES6에서 정의된 API**로 브라우저에서 기본으로 제공되지 않는다. (별도의 트랜스파일러(ex:babel..)와 함께 사용)



### 3.1.3 모듈 불러오기(import)

App.js파일에서 컴포넌트 파일을 불러온다.

```js
// MyComponent 파일을 불러온다.
import MyComponent from './MyComponent';

class App extends Component {
    render() {
        return (
        	<MyComponent />
        )
    }
}

export default App;
```



## 3.2 props

- **컴포넌트 속성을 설정**할 때 사용하는 요소
- ``props``는 **부모 컴포넌트에서 설정**하며, 자식 컴포넌트는 해당 ``props``를 읽기 전용으로만 사용가능하다.
  - 자식 컴포넌트에서 특정 이벤트가 발생할 때, 부모 컴포넌트의 메소드를 호출하면 ``props``도 유동적으로 사용 가능하다.



> **※ props 값 설정 및 검증 과정**
>
> props 렌더링 -> props 값 설정 -> props 기본 값 설정 -> props값 검증



### 3.2.1 JSX 내부에서 props 렌더링

`props`에 접근할 때 `this 키워드`를 사용하여 접근한다.

```js
(...)
class MyComponent extends Component {
    render () {
        return (
        	<div>
        		안녕하세요. 제 이름은 {this.props.name} 입니다.
        	</div>
        )
    }
}
(...)
```



### 3.2.2 컴포넌트 사용할 때 props 값 설정

```js
(...)
	<MyComponent name="React" />
(...)

// 아래와 같이 화면에 렌더링 된다.
안녕하세요. 제 이름은 React 입니다.
```



### 3.2.3 props 기본값 설정 : defaultProps

- `props` 값을 지정하지 않았을 때 기본 값으로 설정한다.
- **기본적인 선언 방식**과 **클래스 내부에 선언하는 방식**이 있다.
  - ES5 코드 형태로 변환할 때, 동일한 결과를 보이므로 차이점은 없음

  - 클래스 내부에 선언하는 방식은 일반적인 ES6 문법에서는 작동하지 않으나, transform-class-properties 문법으로는 사용할 수 있다.

    (create-react-app으로 만든 프로젝트는 기본적으로 적용하기 때문에 별도 작업 필요 없음)

```js
class MyComponent extends Compontnt {
	// 클래스 내부에 정의하는 방식
	static defaultProps = {
		name : '기본이름'
	}
	
    render () {
        (...)
    }
}

// 기본적인 선언 방식
MyComponent.defaultProps = {
	name : "기본 이름"
}
```



### 3.2.4 props 검증 : propTypes

- 컴포넌트 간에 주고 받는 props를 좀 더 **세밀하게 검사함으로써 버그를 사전에 발견**한다.

- 필수 props를 지정하거나, props 타입을 지정할 때는 `propTypes`를 사용한다.
- ``defaultProps`` 설정하는 방식과 비슷하다.
- 기본으로 제공되는 타입 뿐만 아니라, **사용자가 직접 설정한 커스텀 타입까지 사용할 수 있도록 API를 제공**



#### 3.2.4.1 필수 propTypes 설정 : isRequired

- props를 지정하지 않았을 때, 오류 노출

```js
// propTypes 불러오기
import PropTypes from 'prop-types';

class MyComponent extends Compontnt {
	// 클래스 내부에 정의하는 방식
	static propTypes = {
		name : PropTypes.string
	}
	
    render () {
        (...)
    }
}

// 클래스 외부에 정의하는 방식
MyComponent.propTypes = {
	name : PropTypes.string, // name props 타입을 문자열로 설정한다.
	age : PropTypes.number.isRequired // 필수적으로 존재해야 하며, 숫자값임
}

```



## 3.3 state

- **동적인 데이터**를 다룰때 사용
- ``this.setState()`` 메소드로만 값을 업데이트 해야한다.



> **※ state 값 설정 및 검증 과정**
>
> state 초깃값 설정 -> state 렌더링 -> state 값 업데이트



### 3.3.1 constructor() / setState()

#### 3.3.1.1 constructor()

- ``state``의 초깃값은 컴포넌트의 생성자 메소드인 **``constructor`` 내부에서 설정**한다.

- 생성자 메소드는 컴포넌트를 새로 만들때 실행된다.

- ``constructor`` 메소드를 만들어주지 않을 경우 Component 클래스의 생성자 메소드를 그대로 사용한다.

- 직접 ``constructor`` 메소드를 작성하여 생성자 메소드에서 추가 작업이 필요할 경우  **``super`` 키워드**를 사용한다.

  1. **constructor 안에서 super()를 꼭 불러야 하는가?**

     - ES6 class constructor는 subclasses가 있다면 무조건 super()를 불러야한다.

       (subclass는 constructor를 가지지 않아도 상관 없음)

  2. **super()를 부르는 것과 super(props)를 부르는 것의 차이는?**

     - constructor 안에서 this.props에 접근하고 싶을 때만 super(props)를  사용

     - constructor가 아닌 다른 곳에서 this.props를 사용한다면 props값을 인자값으로 넘겨줄 필요가 없음

       (React에서 자동으로 세팅 됨)

#### 3.3.1.2 .setState()

- 파라미터로 전달받은 필드를 업데이트 한 후, **컴포넌트가 리렌더링하도록 트리거**하는 역할

- 비동기로 state를 업데이트 한다. 

- 초기 state는 ``constructor`` 메소드에 정의해야 하지만 ``transform-class-properties`` 문법으로 constructor 바깥에서 정의 할 수도 있음

- state 값을 업데이트 할 경우 ``this.setState()`` 메소드 사용

  ```js
  this.setState({
      수정할 필드 이름 : 값,
      수정할 또 다른 필드 이름 : 값
  })
  ```

  

```js
(...)
class MyComponent extends Component {
 	// constructor 사용하여 state 정의
	constructor(props){ // 컴포넌트를 만들 때 props 값들을 사용하므로 props를 파라미터로 전달
		super(props);
    	// state 초깃값 설정
    	this.state = {
    		number : 0
    	}
	}

	// constructor 사용하지않고 state 정의 (transform-class-properties 문법 사용 필요)
	state = {
    	number = 0
	}

    render() {
        return (
            <div>
                // JSX 내부에 state 렌더링
                <p>숫자 : {this.state.number}</p>
                <button onClick={() => {
                    // setState() : state값 업데이트
                    this.setState({
                        // 버튼을 누를 때 마다 number값이 하나씩 추가되도록 설정
                        number : this.state.number + 1
                    })	
                }}>더하기</button>
            </div> 
        );
    }
}
(...)
```



### 3.3.2 state 값 업데이트시 주의 사항

- state 값을 업데이트할 때는 ``.setState()``로만 업데이트해야한다.
- state에 직접 접근하여 값을 수정하면 컴포넌트를 자동으로 리렌더링 하지 않음
  - ``this.forceUpdate()`` 메소드를 호출하여 강제로 리렌더링 할 수 있지만, 매우 비효율적임



## 3.4 그 외 정리

- ``props``는 부모 컴포넌트가 설정하고, ``state``는 컴포넌트 자체적으로 지닌 값으로 컴포넌트 내부에서 값을 업데이트한다.

- 모든 컴포넌트는 `render function`을 가지고 있다.

- 모든 컴포넌트는 무조건 `render`해야하고 `return`해주어야한다.

- app.js에서 동일한 컴포넌트를 여러번 불러오는 방식도 가능하지만, 컴포넌트의 각각 id가 없이 불러오는건 좋은 방식은 아님

  - ex)

    ```js
    (...)
    return (
    	<MyComponent />
    	<MyComponent />
    )
    (...)
    ```





## 참조링크

- [React propTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)
- [PropTypes 활용하기](https://medium.com/@sangboaklee/react-proptypes-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0-7a0615da236)
- [누구든지 하는 리액트 4편: props 와 state](https://velopert.com/3629)
- [ReactJS로 웹 서비스 만들기](https://academy.nomadcoders.co/courses/enrolled/216871)
- [[번역] React ES6 — Class constructor에서의 super()](https://medium.com/@umioh1109/react-es6-class-constructor%EC%97%90%EC%84%9C%EC%9D%98-super-9d53ba0611d9)
