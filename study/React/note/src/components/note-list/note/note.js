import React, { Component } from 'react';
import './note.scss';
import ModalPage from '../../modal/modal';
import NoteRaw from '../../note-raw/note-raw';
import Delete from '../../delete/delete';

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
						{this.props.edited && ' (edited)'}
					</span>
				</div>
				<div>{this.props.text}</div>

				{this.state.showEditModal && (
					<ModalPage>
						<NoteRaw
							subject={'노트 수정'}
							noteNumber={this.props.noteNumber}
							action={this.props.changeNote}
							close={this.changesShowEditModal}
							title={this.props.title}
							text={this.props.text}
						/>
					</ModalPage>
				)}

				{this.state.showDeleteModal && (
					<ModalPage
						close={() => {
							this.toggle({target : { id : 'showDeleteModal'}})
						}}
					>
						<Delete
						subject={'노트 삭제'}
							number={this.props.noteNumber}
							action={this.props.deleteNote}
							title={this.props.title}
							close={this.changesShowDeleteModal}
						/>
					</ModalPage>
				)}
			</div>
		);
	}
}

export default Note;