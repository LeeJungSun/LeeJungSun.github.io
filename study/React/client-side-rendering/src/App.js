import React, { Component } from 'react';
import './App.css';

import { Route, Switch, NavLink, withRouter } from 'react-router-dom';
import Home from './component/home';
import First from './component/first';
import Second from './component/second';

class App extends Component {

  go = () => {
    // go에 인자를 담아줘야함 인자값을 담아주지 않으면 페이지를 새로 랜더링 해버림
    this.props.history.go(1);
  }
  goBack = () => {
    this.props.history.goBack();
  }

  render() {

    const style = {
      color: 'red'
    }

    return (
      <div className="App">
        <div>Hello React</div>

        <div>
          <button type="button" onClick={this.goBack}>뒤로 가기</button>
          <button type="button" onClick={this.go}>앞으로 가기</button>
        </div>
        <ul>
        <li>
          <NavLink to="/" exact={true} activeStyle={style}>
            메인 페이지로 이동
          </NavLink>
        </li>
        <li>
          <NavLink to="/first" exact activeStyle={style}>
            첫번째 페이지로 이동
          </NavLink>
        </li>
        <li>
          <NavLink to="/second" exact activeStyle={style}>
            두번째 페이지로 이동
          </NavLink>
        </li>
        </ul>

        <Switch>
          {/* exact default=false, true로 설정할 경우 해당하는 라우터 컴포넌트만 보여짐 */}
          {/* Switch를 사용할 경우 exact를 사용할 필요가 없음 */}
          {/* 루트 디렉터리가 맨 아래에 있어야 정상적으로 적용 */}
          <Route path="/first" component={First}></Route>
          <Route path="/second" component={Second}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter ( App );
