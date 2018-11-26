import React, {Component} from 'react';
import PropTypes from 'prop-types'; // propTypes 불러오기

class MyComponent extends Component {

	// constructor : 컴포넌트의 생성자 메소드
	// 생성자 메소드는 컴포넌트를 새로 만들 때 실행
	constructor (props) {
		// super
		// - 메서드 내부에서 부모 클래스인 component의 constructor 메소드를 호출하기 위하여 사용
		// - 컴포넌트를 만들 때 props 값들을 사용하므로 props를 메소드의 파라미터로 전달
		super(props);

		// state 초깃값 설정
		this.state = {
			number : 0
		}
	}

	// defaultProps(transform-class-properties) : 클래스 내부에 정의하는 방식
	// static defaultProps = {
	// 	name : '기본이름'
	// }

	// propTypes(transform-class-properties) : 클래스 내부에 정의하는 방식
	// static propTypes = {
	// 	name : PropTypes.string
	// }

	render() {
		return (
			// props : 컴포넌트 속성을 설정할 때 사용하는 요소
			// props에 접근할 때는 this 키워드를 사용하여 접근
			<div>
				<p>안녕하세요 제 이름은 {this.props.name} 입니다.</p>
				<p>저는 {this.props.age}살 입니다.</p>
				<p>숫자 : {this.state.number}</p>
				<button onClick={() => {
					// setState() : state값 업데이트
					this.setState({
						number : this.state.number + 1
					})	
				}}>더하기</button>
			</div> 
		);
	}
}

// prop 기본값 설정 : defaultProps
// 컴포넌트 명 + .defaultProps
MyComponent.defaultProps = {
	name : "기본 이름"
}

// prop 검증 : propTypes
MyComponent.propTypes = {
	name : PropTypes.string, // name props 타입을 문자열로 설정한다.
	age : PropTypes.number.isRequired // 필수적으로 존재해야 하며, 숫자값임
}

// 모듈 내보내기(export)
// 다른 파일에서 이 파일을 import 할 때, 위쪽에 선언한 MyComponent 클래스를 불러오도록 설정
export default MyComponent;