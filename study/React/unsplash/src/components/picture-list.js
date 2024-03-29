import React, { Component } from 'react';
import styled from 'styled-components';
import Picture from './picture';
import Loader from './loader';

const Content = styled.div`
  margin-top: 1rem;
  /* Prevent vertical gaps */
  line-height: 0;
  @media screen and (max-width: 832px) {
    -webkit-column-count: 1;
    -webkit-column-gap: 0px;
    -moz-column-count: 1;
    -moz-column-gap: 0px;
    column-count: 1;
    column-gap: 0px;
  }
  @media screen and (min-width: 833px) and (max-width: 1232px) {
    -webkit-column-count: 2;
    -webkit-column-gap: 0px;
    -moz-column-count: 2;
    -moz-column-gap: 0px;
    column-count: 2;
    column-gap: 0px;
  }
  @media screen and (min-width: 1233px) and (max-width: 1632px) {
    -webkit-column-count: 3;
    -webkit-column-gap: 0px;
    -moz-column-count: 3;
    -moz-column-gap: 0px;
    column-count: 3;
    column-gap: 0px;
  }
  @media screen and (min-width: 1633px) {
    -webkit-column-count: 4;
    -webkit-column-gap: 0px;
    -moz-column-count: 4;
    -moz-column-gap: 0px;
    column-count: 4;
    column-gap: 0px;
  }
`;


class PictureList extends Component {
	render() {
		const renderImage = (images) => {
			return images.map((url, idx) => {
				return <Picture key={idx} url={url} />
			})
		}

		return (
      <Content>
        {renderImage(this.props.images)}
        {this.props.isPending && <Loader />}
      </Content>
		);
	}
}

export default PictureList;