import React, { Component } from 'react';
import './delete.scss';

class Delete extends Component {
	excute = () => {
		this.props.action(this.props.number);
		this.props.close();
	}

	render() {
		return (
			<>
				<div id="memo-what-for">
					<span>노트 삭제</span>
				</div>

				<div>정말 노트를 삭제 하시겠어요 ? ({this.props.title})</div>

				<div id="memo-button">
					<button onClick={this.excute}>삭제하기</button>
				</div>
			</>
		);
	}
}

export default Delete;