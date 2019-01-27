import React, { Component } from 'react';

class ChildB extends Component {

	state = {
		childCount : 1
	}

	componentDidMount() {
		setInterval(() => {
			this.setState({
				childCount : this.state.childCount + 1
			})
		}, 5000)
	}

	shouldComponentUpdate (nextProps, nextState) {
		if (this.state.childCount !== nextState.childCount) {
			return true;
		}
		return false;
	}

	render() {
		const { childCount } = this.state;
		return (
			<div>
				나는 Props를 받지 않았습니다. {childCount}
			</div>
		);
	}
}

export default ChildB;