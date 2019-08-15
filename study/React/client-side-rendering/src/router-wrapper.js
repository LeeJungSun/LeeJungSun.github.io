import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

class RouterWrapper extends Component {
	render() {
		return (
			<BrowserRouter>
				<App />
			</BrowserRouter>
		);
	}
}

export default RouterWrapper;