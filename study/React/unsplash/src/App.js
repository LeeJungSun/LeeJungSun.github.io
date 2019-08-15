import React, { Component } from 'react';
import './App.scss';
// import PictureList from './components/picture-list';
// import LoadMore from './components/load-more';
// import Loader from './components/loader';

import PictureList from './containers/picture-list.container';
import LoadMore from './containers/load-more.container';

class App extends Component {
  // state = {
  //   images: [],
  //   isPending: false
  // }

  // getImages = () => {
  //   this.setState({isPending: true});
  //   axios
  //   .get ('https://api.unsplash.com/photos/random', {
  //     params : {
  //       client_id: 'f78e9a062b98f864d3eb7f6d3e9f09215dfd472da4769f33a508e6d711558602',
  //       count: 5
  //     }
  //   })
  //   .then(res => {
  //     // console.log(res.data);
  //     this.setState({
  //       images: [...this.state.images, ...res.data.map(image => image.urls.small)],
  //       isPending: false
  //     })
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     this.setState({
  //       isPending: false
  //     })
  //   })
  // }

  // componentDidMount () {
  //   this.getImages();
  // }

  render() {
    return (
      <div className="App">
        <PictureList />
        <LoadMore />
      </div>
    );
  }
}

export default App;
