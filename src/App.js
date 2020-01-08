import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Todos from './components/Todos'
import AddTodo from './components/AddTodo'
import About from './components/pages/About'
import Header from './components/layout/Header'
import './App.css';
// import uuid from 'uuid'
import axios from 'axios';

class App extends Component {
  state = {
    //object of arrays
    todos: []
  };

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10")//limiting res to 10 todos
      .then(res => this.setState({ todos: res.data })) //adding data to the state
  }
  //Toggle Complete
  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };
  //Delete Todo
  delTodo = id => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    }))
    
  };
  //Add Todo
  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,//just title is ok
      completed: false
    })
      .then(res => this.setState({ todos: [...this.state.todos, res.data] }) )
  };
  render() {
    return (
      <Router>
        <div className="container">
          <Header />
          <Route exact path='/' render={props => (
            <>
              <AddTodo
                addTodo={this.addTodo} />
              <Todos
                todos={this.state.todos}
                markComplete={this.markComplete}
                delTodo={this.delTodo}
              />
            </>
          )}/>
          <Route path='/about' component={About}/>
        </div>
      </Router>
    );
  }
}

export default App;
