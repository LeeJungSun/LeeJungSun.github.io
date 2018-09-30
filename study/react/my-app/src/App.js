import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Movie from './Movie';

// const movies = [
//   {
//     title : "Matrix",
//     poster : "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_CR0,0,665,1000_AL_.jpg"
//   },
//   {
//     title : "Full Metal Jacket",
//     poster : "https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Full_Metal_Jacket_poster.jpg/220px-Full_Metal_Jacket_poster.jpg"
//   },
//   {
//     title : "Oldboy",
//     poster : "https://www.languagetrainers.com/reviews/foreign-film-reviews/uploads/9214-Oldboy.jpg"
//   },
//   {
//     title : "Star Wars",
//     poster : "https://lumiere-a.akamaihd.net/v1/images/the-last-jedi-theatrical-poster-film-page_bca06283.jpeg?region=0%2C0%2C480%2C711"
//   }
// ]

class App extends Component {
  // # 3 Lifecycle
  // Render : componentWillMount() -> render() -> componentDidMount() 순서로 랜더링
  // Update : componentWillTeceiveProps() -> shouldComponentUpdate() === true -> componentWillUpdate() -> render() -> componentDidUpdate()
  // 새로운 component를 받음
  // old props, 새로운 props를 살펴본 다음 이전 과 새로운 prope가 다르면 update = true 라고 생각
  // 그 다음 업데이트 할거라는 단계로 넘어감 -> componentWillupdate
  // ex: componentWillUpdate 수행중에 spinner를 붙일 수 있음 업데이트 이후엔 componentDidUpdate 단계에서 로딩중 메세지나 아이콘을 숨기면 됨
  
  // componentWillMount () {
  // }
  // componentDidMount () {
  // }

  // # 4 State
  // state = 리액트 컴포넌트 안에 있는 오브젝트
  // state가 바뀔 때 마다, 컴포넌트는 새로운 state와 함께 다시 render가 발생한다

  state = {
  }

  componentDidMount () {
    setTimeout (() => {
      this.setState({
        // fetch()
        // movies : [
        //   ...this.state.movies, // 이전 리스트를 두고 새로운 코드를 추가
        //   {
        //     title : 'Trainspotting',
        //     poster : 'https://img.maximummedia.ie/joe_ie/eyJkYXRhIjoie1widXJsXCI6XCJodHRwOlxcXC9cXFwvbWVkaWEtam9lLm1heGltdW1tZWRpYS5pZS5zMy5hbWF6b25hd3MuY29tXFxcL3dwLWNvbnRlbnRcXFwvdXBsb2Fkc1xcXC8yMDE2XFxcLzAzXFxcLzA0MTU0NzU0XFxcL3RyYWluc3BvdHRpbmcuanBnXCIsXCJ3aWR0aFwiOjc2NyxcImhlaWdodFwiOjQzMSxcImRlZmF1bHRcIjpcImh0dHBzOlxcXC9cXFwvd3d3LmpvZS5pZVxcXC9hc3NldHNcXFwvaW1hZ2VzXFxcL2pvZVxcXC9uby1pbWFnZS5wbmc_dj01XCJ9IiwiaGFzaCI6IjVhZmU1MmI4YTM1YmMxMzZlMGM3ZWYyZWY5YzIwYmFmOWZhMjQ3M2EifQ==/trainspotting.jpg'
        //   }
        // ]

        // movies : [
        //   {
        //     title : "Matrix",
        //     poster : "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_CR0,0,665,1000_AL_.jpg"
        //   },
        //   {
        //     title : "Full Metal Jacket",
        //     poster : "https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Full_Metal_Jacket_poster.jpg/220px-Full_Metal_Jacket_poster.jpg"
        //   },
        //   {
        //     title : "Oldboy",
        //     poster : "https://www.languagetrainers.com/reviews/foreign-film-reviews/uploads/9214-Oldboy.jpg"
        //   },
        //   {
        //     title : "Star Wars",
        //     poster : "https://lumiere-a.akamaihd.net/v1/images/the-last-jedi-theatrical-poster-film-page_bca06283.jpeg?region=0%2C0%2C480%2C711"
        //   }
        // ]
      })
    }, 5000)
  }

_renderMovies = () => { // _ 언더스코어를 사용 하는 이유 -> 리액트 자체 기능이 많기에 리액트 자체기능과 나의 기능에 차이를 두기 위함
  const movies = this.state.movies.map((movie, index) => {
    return <Movie title={movie.title} poster={movie.poster} key={index} />
  })
  return movies
}

  render() {
    return (
      <div className="App">
        {this.state.movies ? this._renderMovies() : 'Loading'}
      </div>
    );
  }
}

export default App;
