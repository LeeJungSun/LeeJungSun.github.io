import React, { Component } from 'react';


class ChildApp extends Component {

  constructor (props) {
    super(props);
    this.state = {
      message : 'aaa'
    }
  }

	render() {

		return (
			<div>
        {this.props.count}
        <button onClick={this.props.Up}>업</button>
        <button onClick={this.props.Down}>다운</button>
			</div>
		);
	}
}

class TestApp extends Component {
  render () {
    return (
      <div>
        
      </div>
    )
  }
}

//export {test} // 외부 라이브러리에서 사용할 떄 많이 사용함 : 현재는 출력되지 않음 자식에서 부모로 값을 넘기는 것은 불가능하기 때문
export { TestApp } // 여러개 사용 가능
export default ChildApp; // default는 한 개만 사용가능