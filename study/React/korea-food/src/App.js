import React, { Component } from 'react';
import './App.scss';
import koreaFoodData from './food-data';
import FoodCardList from './food-card-list';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';
import FoodSpecific from './food-specific';


class App extends Component {
  // 따로 호출해야할지 말지 따로 고민할 필요 없이 json 호출할 필요 없음
  // 추가로 바인딩이 필요한 경우 axios 사용
  state = { // 최초에 보여질 경우
    foodData : koreaFoodData
  };

  pickData = (foodData) => {
    return foodData.filter(food => {
      if (food.name === this.props.location.pathname.split('/')[2]) {
        return true;
      }
      return false;
    })[0];
  }

  go = () => {
    this.props.history.go(1);
  }
  goBack = () => {
    this.props.history.goBack();
  }
  toHome = () => {
    this.props.history.push('/foods');
  }

  render() {
    return (
      <div id="app-container">
        <div id="app">
          <div id="app-header">
            <span>한국의 전통 음식</span>
          </div>
          <Switch>
            <Route path="/foods/:foodName" render={() => <FoodSpecific foodSpecific={this.pickData(this.state.foodData)} />} />
            <Route path="/foods" render={() => <FoodCardList foodData={this.state.foodData} />} />
            <Redirect to="/foods" />
          </Switch>

          <div id="">
            <button onClick={this.go}>앞으로</button>
            <button onClick={this.toHome}>홈으로가기</button>
            <button onClick={this.goBack}>뒤로</button>
          </div>

        </div>
      </div>
    );
  }
}

export default withRouter (App);
