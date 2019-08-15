import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Loader from './loader'

const WrapButton = styled.div`
  display: flex;
  justify-content: center;
`;
const Button = styled.button`
  font-size: 1.5rem;
  padding: 1rem;
  margin: 1rem;
  border: 1px solid #333333;
  border-radius: 0.5rem;
  color: black;
  cursor: pointer;
`;

class LoadMore extends Component {
	componentDidMount () {
		this.getImages();
	}

	getImages = () => {
    this.setState({isPending: true});
    axios
    .get ('https://api.unsplash.com/photos/random', {
      params : {
        client_id: 'f78e9a062b98f864d3eb7f6d3e9f09215dfd472da4769f33a508e6d711558602',
        count: 5
      }
    })
    .then(res => {
      // console.log(res.data);
      this.setState({
        images: [...this.state.images, ...res.data.map(image => image.urls.small)],
        isPending: false
      })
    })
    .catch(err => {
      console.log(err);
      this.setState({
        isPending: false
      })
    })
  }

	static defaultProps = {
		loadMore: () => console.log('더 불러오기 버튼 없음')
	}


	render() {
		return (
			<WrapButton>
				{this.props.isPending && <Loader />}
				<Button onClick={this.props.loadMore}>사진 불러오기</Button>
			</WrapButton>
		);
	}
}

export default LoadMore;