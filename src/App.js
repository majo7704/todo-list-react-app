import React, { Component } from 'react';
import Todos from './components/Todos'
import './App.css';

class App extends Component {
  state = {//object of arrays
    todos: [
      {
        id: 1,
        title: 'Take out the trash',
        completed: false
      },
      {
        id: 2,
        title: 'Do grocery shoping',
        completed: false
      },
      {
        id: 3,
        title: 'Water the flowers',
        completed: true
      }
    ]
  }
  render() {
    
    return (
      <div>
        <Todos todos={this.state.todos}/>
      </div>
    );
  }
}

export default App;
