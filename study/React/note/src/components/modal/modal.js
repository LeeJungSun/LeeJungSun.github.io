import React, { Component } from 'react';
import './modal.scss';

class ModalPage extends Component {
	render() {
		return (
			<div className="modal">
				<div className="modal-card">{this.props.children && this.props.childeren}</div>
			</div>
		);
	}
}

export default ModalPage;