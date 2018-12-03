import React, { Component } from 'react';

class InterationSample extends Component {
	state = {
		names : ['눈사람', '얼음', '눈', '인형'],
		name : ''
	}
	handleChange = (e) => {
		this.setState({
			name : e.target.value
		})
	}

	handleInsert = () => {
		this.setState({
			names : this.state.names.concat(this.state.name),
			name : ''
		})
	}

	handleRemove = (index) => {
		// 편의상 name의 레퍼런스를 미리 만듦.
		const {names} = this.state;

		this.setState({
			names : [
				// 전개 연산자(...)
				// this.state.names.slice(0, index).concat(this.state.names.slice(index+1, this.state.names.length))
				...names.slice(0, index),
				...names.slice(index + 1, names.length)
			]
		});
	}

	render() {
		const nameList = this.state.names.map(
			(name, index) => (
				<li key = {index}
					  // index값을 인수로 설정하기위해 새로운 함수 생성
						onDoubleClick = {() => this.handleRemove(index)}>
				{name}</li>
			)
		)

		return (
			<div>
				<input
					value = {this.state.name}
					onChange = {this.handleChange} />
				<p>{this.state.name}</p>
				<button onClick = {this.handleInsert}>추가</button>
				<ul>
					{nameList}
				</ul>
			</div>
		);
	}
}

export default InterationSample;