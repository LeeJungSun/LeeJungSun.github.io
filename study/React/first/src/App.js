import React, { Component } from 'react';
import './App.css';
import ChildApp, { TestApp } from './child-app'

class App extends Component {
  hello = () => '앗뇽'

  // constructor (props) {
  //   super(props);
  //   this.state = {
  //     message : 'aaa'
  //   }
  // }

  state = {
    message : '우앙',
    input : '',
    testArray : [],
    count : 1,
    deepObject : {
      a : '1',
      b : '2'
    }
  }

  static defaultProps = {
    Up : () => {
      console.log('에러')
    }
  }

  countUp = () => {
    this.setState({
      count : this.state.count + 1
    })
  }

  countDown = () => {
    this.setState({
      count : this.state.count - 1
    })
  }

  changeDeepObject = () => {
    this.setState({
      deepObject : {
        // 깊은 오브젝트 일 경우 state에 선언된 b는 삭제되어서 전개 연산자로 사용하여야 함
        // 전개연산자는 array뿐만 아니라 객체에서도 동일하게 적용이됨
        ...this.state.deepObject,
        a : '123'
      }
    })
  }
  
  testFunc () {
    return '헤헷'
  }

  handleChange = (e) => {
    this.setState({
      input : e.target.value
    })
  }

  addArray = () => {
    this.setState ({
      testArray : [...this.state.testArray, this.state.input],
      input : ''
    })
    console.log(this.state.testArray)
  };


  render() {
    const returnTestArrayValue = () => {
      return this.state.testArray.map(testString => {
        return <div>{testString}</div>
      })
    }
    return (
    	<div className="App">
        <input value={this.state.input} onChange={this.handleChange} />
        <button onClick={this.addArray}>Add</button>
        


        <div>부모 컴포넌트</div>
        {this.state.message}
        {this.hello()}
        {this.testFunc()}

        <div>{this.state.count}</div>
        <button onClick={this.countUp}>Click me : count Up</button>
        <button onClick={this.countDown}>Click me : count Down</button>


        <ChildApp 
          count={this.state.count} 
          Up={this.countUp}
          Down={this.countDown}
          name="바나나"
        />
        <TestApp />

      </div>
    );
  }
}

export default App;
