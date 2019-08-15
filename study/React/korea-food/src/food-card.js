import React, { Component } from 'react';
import styled from 'styled-components';
import './food-card.scss';
import { withRouter } from 'react-router-dom';

const ImageCard = styled.div`
	height: 200px;
	border-top-right-radius: .5rem;
	border-top-left-radius: .5rem;
	background-color: #f5f5f5;
	background-image: ${p => p.photo ? `url(${`${p.photo}`})` : ''};
	background-position: 50% 50%;
	backgorund-size: cover;
`

class FoodCard extends Component {

	static defaultProps = {
		name: 'dafault name',
		photo: 'sf',
		subIntro: 'asdasdf'
	}

	goToSpecific = () => {
		this.props.history.push(`/foods/${this.props.name}`);
	}

	render() {
		return (
			<div className="food-card" onClick={this.goToSpecific}>
				<ImageCard photo={this.props.photo} />
				<span className="food-card-name">{this.props.name}</span>
				<span className="food-card-content">{this.props.subIntro}</span>
			</div>
		);
	}
}

export default withRouter (FoodCard);