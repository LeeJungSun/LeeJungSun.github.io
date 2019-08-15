import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    
  }

  testPostRequest = (e) => {
    e.preventDefault();

    console.log('preventDefault')
  }

  render() {
    return (
      <div className="App">
        <form action="/" method="post" name="test-form" onSubmit={this.testPostRequest}>
          <input type="text" placeholder="sample" />
          <input type="password" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
