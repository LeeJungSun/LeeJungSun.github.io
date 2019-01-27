import React, { Component } from 'react';
import ChildA from "./ChildA";
import ChildB from "./ChildB";
import './test.css';

class App extends Component {
  state = {
    count : 1
  }

  componentDidMount () {
    setInterval (() => {
      this.setState({
        count : this.state.count + 1
      })
    }, 1000)
  }


  render() {
    const { count } = this.state
    return (
      <div className="App">
        <ChildA count={count}></ChildA>
        <ChildB></ChildB>
      </div>
    );
  }
}

export default App;
