import React, { Component } from 'react';
import FoodCard from './food-card';

class FoodCardList extends Component {

	static defaultProps = {
		foodData: []
	}

	render() {
		const renderFoodCard = foods => {
			return foods.map((food, idx) => {
				return <FoodCard key={idx} name={food.name} photo={food.photo} subIntro={food.subIntro} />
			})
		}

		return (
			<div id="app-food-card-container">
				{renderFoodCard(this.props.foodData)}
			</div>
		);
	}
}

export default FoodCardList;