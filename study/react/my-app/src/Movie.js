import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Movie.css'; //CSS 연결

class Movie extends Component {

	static propTypes = {
		title : PropTypes.string.isRequired,
		poster : PropTypes.string.isRequired
	}

	// component는 항상 render 해야한다.
	render () {
		// console.log(this.props)
		return (
			<div>
				<MoviePoster poster={this.props.poster} />
				<h1>{this.props.title}</h1>
			</div>
		)
	}
}

class MoviePoster extends Component {

	static propTypes = {
		poster : PropTypes.string.isRequired
	}

	render () {
		// console.log(this.props)
		return (
			<img src={this.props.poster} alt="" />
		)
	}
}

// https://yts.ag/api/v2/list_movies.json?sort_by=rating

export default Movie;