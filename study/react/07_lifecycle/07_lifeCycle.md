Will 접두사 - 어떤 작업을 **작동하기 전**에 실행되는 메소드

Did 접두사 - 어떤 작업을 **작동한 후**에 실행되는 메소드



## 컴포넌트 초기 생성 (Mount)

- DOM이 생성되고 웹에 나타나는것

- 호출하는 메소드

  - ``render`` : UI 렌더링 메소드

    - this.props, this.state에 접근할 수 있으며 리액트 요소(태그 또는 컴포넌트)를 반환
    - 보여주고 싶지 않다면 null 또는 false 값 반환
    - state의 변형을 해서는 안되며, 웹 브라우저에 접근해서도 안 됨
    - DOM 정보를 가져오거나 변화를 줄 경우 => componentDidMount에서 처리

  - ``constructor`` : 컴포넌트를 새로 만들 때마다 호출되는 생성자 메소드

  - ``componentDidMount`` : 컴포넌트가 웹에 노출 후 호출하는 메소드 (컴포넌트를 만들고, 첫 렌더링을 마친 후 실행)

    - 라이브러리, 프레임워크 함수 호출, 이벤트 등록 네트워크 요청 등 **비동기 작업을 처리**
    -  외부 라이브러리 연동 : D3, masonry, etc
    - 컴포넌트에서 필요한 데이터 요청 : Ajax, GraphQL, etc
    - DOM에 관련된 작업 : 스크롤 설정, 크기 읽어오기 등

    

## 컴포넌트 업데이트 (Update)

- 컴포넌트가 업데이트 될 때
  - props가 바뀔 때
  - state가 바뀔 때
  - 부모 컴포넌트가 리렌더링될 때
  - this.forceUpdate로 강제로 렌더링을 트리거할 때

- 호출하는 메소드

  - ``getDerivedStateFromProps`` : props가 바뀌어서 업데이트할 때도 호출

    - props로 받아온 값을 state에 동기화 시키는 용도

    - 컴포넌트를 마운트하거나 props를 변경할 때 호출

      ``````js
      static getDerivedStateFromProps (nextProps, prevState) {
          if (nextProps.value !== prevState.value) {
              return { value : nextProps.value };
          }
          return null; // null을 리턴하면 따로 업데이트 할 것이 없다라는 의미
      }
      ``````

  - ``shouldComponentUpdate`` : 컴포넌트가 리렌더링 할지 말지 결정하는 메소드 (VirtualDOM에 리렌더링 하는 것도 결정)

    - props 또는 state를 변경했을 때, 리렌더링을 시작할지 여부를 지정하는 메소드

      this.props, this.state로 접근

    - false를 반환하면 아래 메소드들을 호출하지 않음 (기본 true 반환)

    - **컴포넌트를 최적화하는 작업에서 매우 유용하게 사용** 

      ```javascript
      shouldComponentUpdate (nextProps, nextState) {
          return this.props.checked !== nextProps.checked // false
          return true; // true
      }
      ```

  - ``render`` : 컴포넌트 렌더링

  - ``getSnapshotBeforeUpdate`` : 컴포넌트 변화를 DOM에 반영하기 바로 직전에 호출하는 메소드

    - ``shouldComponentUpdate`` 에서 true가 반환했을때만 호출
    - 애니메이션 효과를 초기화하거나, 이벤트 리스너를 없애는 작업을한다.

  - ``componentDidUpdate`` : 컴포넌트 업데이트 작업이 끝난 후 호출하는 메소드

    ```js
    componentDidUpdate(prevProps, prevState, snapshot) {...}
    ```

    - 리렌더링을 완료한 후 실행
      - 업데이트가 끝난 직후이므로, DOM 관련 처리를해도 무방

    - 이 시점에서는 this.props, this.state값이 바뀌어 있다.
    - 파라미터 값으로 이전 데이터에 접근할 수 있다.
    - ```getSnapshotBeforeUpdate```에서 리턴한 값을 3번째 파라미터로 받아 올 수 있다.

    

## 컴포넌트 제거 (Unmount)

- 컴포넌트를 DOM에서 제거하는 것
- 호출하는 메소드
  - ``componentWillUnmount`` : 컴포넌트가 웹 브라우저상에서 사라지기 전에 호출하는 메소드
    - 이벤트, setTimeout, 외부 라이브러리 인스턴스 제거





