import React, { Component } from 'react';

class ChildA extends Component {
	render() {
		const { count } = this.props;
		return (
			<div>
				나는 Props를 받았습니다. {count}
			</div>
		);
	}
}

export default ChildA;