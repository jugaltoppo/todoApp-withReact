import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import TodosList from "./components/todos.component";
import EditTodo from "./components/edit-todo.component";
import CreateTodo from "./components/create-todo.component";

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        
          <div className="container">
            <a className="navbar-brand" href="/">MEAN-Stack Todo App</a>
            <button className="navbar-toggler" data-toggle="collapse" data-target="#mynav" aria-expanded="false" aria-controls="mynav" aria-label="Toggle Navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
                <div className="collapse navbar-collapse" id="mynav">
                  <ul className="nav navbar-nav">
                    <li className="nav-item">
                      <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/create" className="nav-link">Create Todo</Link>
                    </li>
                  </ul>
                </div>
          </div>
        </nav>
          <Route path="/" exact component={TodosList} /> 
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
         

      </div>
      </Router>
    )
     
  }
}

export default App;
