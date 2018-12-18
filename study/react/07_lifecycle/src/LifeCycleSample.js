import React, { Component } from 'react';

class LifeCycleSample extends Component {
	state = {
		number : 0,
		color : null
	}

	myRef = null; //ref를 설정할 부분

	constructor(props) {
		super(props);
		console.log('constructor');
	}


	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.color !== prevState.color) {
			return {color : nextProps.color};
		}
		return null;
	}

	// DOM이 웹에 노출된 후 호출
	componentDidMount () {
		console.log('componentDidMount');
	}

	// 컴포넌트가 리렌더링 할지 말지 결정
	shouldComponentUpdate (nextProps, nextState) {
		console.log('shouldComponentUpdate', nextProps, nextState);

		// 숫자의 마지막 자리가 4면 리렌더링하지 않습니다.
		return nextState.number % 10 !== 4;
	}

	// 컴포넌트가 웹 브라우저상에서 사라지기 전에 호출
	componentWillUnmount () {
		console.log('componentWillUnmount');
	}

	handleClick = () => {
		this.setState({
			number : this.state.number + 1
		})
	}

	// 컴포넌트 변화를 DOM에 반영하기 바로 직전에 호출
	getSnapshotBeforeUpdate (prevProps, prevState) {
		console.log('getSnapshotBeforeUpdate');

		if (prevProps.color !== this.props.color) {
			return this.myRef.style.color;
		}
		return null;
	}

	// 컴포넌트 업데이트 작업이 끝난 후 호출
	componentDidUpdate (prevProps, prevState, snapshot) {
		console.log('componentDidUpdate', prevProps, prevState);
		if (snapshot) {
			console.log('업데이트 되기 직전 색상:', snapshot);
		}
	}


	render() {
		console.log('render');

		const style = {
			color : this.props.color
		};

		return (
			<div>
				<h1 style={style} ref={ref => this.myRef=ref}>
					{this.state.number}
				</h1>
				<p>color : {this.state.color}</p>
				<button onClick = {this.handleClick}>더하기</button>
			</div>
		);
	}
}

export default LifeCycleSample;