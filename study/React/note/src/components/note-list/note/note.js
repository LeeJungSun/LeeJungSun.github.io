import React, { Component } from 'react';
import './note.scss';

class Note extends Component {

	state = {
		showEditModal: false,
		showDeleteModal: false
	}

	changesShowEditModal = () => {
		this.setState({
			showEditModal: !this.state.showEditModal
		})
	}

	changesShowDeleteModal = () => {
		this.setState({
			showDeleteModal: !this.state.showDeleteModal
		})
	}

	render() {
		return (
			<div id="note">
				<div id="note-menu">
				<span>{this.props.title}</span>
				<span>
					<span id="showChangeModal" onClick={this.changesShowEditModal}>
						편집
					</span>
					<span id="showDeleteModal" onClick={this.changesShowDeleteModal}>
						삭제
					</span>
				</span>
				</div>
				<div id="date">
				<span>
					{this.props.date.toISOString()}
				</span>
				</div>
				<div>{this.props.text}</div>
			</div>
		);
	}
}

export default Note;