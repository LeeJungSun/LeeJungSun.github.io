import React, { Component } from 'react';
import styles from './TodoItem.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class TodoItem extends Component {

	shouldComponentUpdate (nextProps, nextState) {
		return this.props.done !== nextProps.done;
	}

	render() {
		// props
		const {done, children, onRemove, onToggle} = this.props;

		return (
			<div className={cx('todo-item')} onClick={onToggle}>
				<input type="checkbox" className={cx('tick')} checked={done} readOnly/>
				{/* 체크박스가 done일경우 클래스명 추가 */}
				<p className={cx('text', {done})}>{children}</p>
				<button type="button" className={cx('delete')} onClick={(e) => {
					onRemove();
					e.stopPropagation();
				}}>[지우기]</button>
			</div>
		);
	}
}

export default TodoItem;