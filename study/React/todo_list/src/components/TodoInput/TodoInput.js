import React from 'react';
import styles from './TodoInput.scss';
import className from 'classnames/bind';

const cx = className.bind(styles);

/**
 * value : 값
 * onChange : 변경 이벤트
 * onInsert : 추가 버튼
 */
const TodoInput = ({value, onChange, onInsert}) => {
	return (
		<div className={cx('todo-input')}>
			<input />
			<button type="button" className={cx('add-button')}>추가</button>
		</div>
	)
}

export default TodoInput;