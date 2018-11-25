import React, { Component } from 'react';

// 모듈 불러오기 (import)
// MyComponent 파일을 불러온다.
import MyComponent from './MyComponent';

class App extends Component {
  render() {
    return (
      // 컴포넌트에 직접적으로 선언한 경우
      // <MyComponent name = "React"/>

      // 문자열 외의 값을 컴포넌트에 전달할 때 {}로 감싸야함
      // propTypes을 string으로 설정하였는데 그 이외의 값이 들어갈 경우 view는 노출되지만 문법 오류가 난다.
      // <MyComponent name={3}/> 

      <MyComponent name="React" age={4} />
      );
  }
}

export default App;
