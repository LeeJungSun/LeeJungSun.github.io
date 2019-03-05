import React, { Component } from 'react';
import styled from 'styled-components';
import NoteList from './components/note-list/note-list';
import ModalPage from './components/modal/modal';
import NoteRaw from './components/note-raw/note-raw';
import SearchBarComponent from './components/search-bar/search-bar';

// 컨벤션 같은
const Container = styled.div`
  height : 100vh;
  display : flex;
  justify-content: center;
  align-items: center;
`;
const AppDiv = styled.div`
  width: 50vw;
  height: 50vh;
  border-radius: .25rem;
  padding: 1rem;
  box-shadow: 0 10px 6px -6px #777;
  background-color: skyblue;
`;
const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;

  div > span {
    font-size: 2rem;
    font-weight: bold;
  }

  div > button {
    font-size: 1.2rem;
    border-radius: 0.5rem;
    border: 1px solid transparent;
    outline: none;
    padding: 0.5rem;
    transition: 0.25s;
    color: #28bbf7;
    background-color: white;
    cursor: pointer;
    &:hover {
      background-color: #28bbf7;
      color: white;
    }
  }
`;

class App extends Component {

  state = {
    search: '',
    notes: [
      {title: '제목', text: '안뇽', date: new Date(), edited: false}
    ],
    modalToggle: false
  }

  toggleModal = () => {
    this.setState({
      modalToggle: !this.state.modalToggle
    })
  }

  onChagneSearchText = e => {
    this.setState({
      search : e.target.value
    })
  }

  createNote = (title, text) => {
    this.setState({
      notes: [...this.state.notes, {title, text, date: new Date(), edited: false}]
    })
  }
  changeNote = (title, text, number) => {
    this.setState({
      notes: this.state.notes.map(
        (note, idx) => (idx === number ? {...note, title, text, edited: true} : note)
      )
    })
  }
  deleteNote = number => {
    this.setState({
      notes: this.state.notes.filter(
        (note, idx) => (idx === number ? false : true)
      )
    })
  }

  render() {
    return (
      <Container>
        {this.state.modalToggle && (
            <ModalPage>
                <NoteRaw action={this.createNote} close={this.toggleModal} />
            </ModalPage>
        )}
        <AppDiv>
          <SearchBar>
            <div>
              <span>노트 만들기</span>
            </div>
            <div>
              <button onClick={this.toggleModal}>노트 작성</button>
              <SearchBarComponent search={this.state.search} onChageSearchText={this.onChagneSearchText} />
            </div>
          </SearchBar>
          <NoteList
            notes={this.state.notes}
            changeNote={this.changeNote}
            deleteNote={this.deleteNote}
          />
        </AppDiv>
      </Container>
    );
  }
}

export default App;
