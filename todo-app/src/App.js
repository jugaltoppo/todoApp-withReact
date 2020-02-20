import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import axios from 'axios';
import TodosList from "./components/todos.component";
import EditTodo from "./components/edit-todo.component";
import CreateTodo from "./components/create-todo.component";
import DeleteTodo from "./components/delete-todo.component";
import Register from "./components/Register";
import Login from "./components/login";
import Logout from './components/logout';

class App extends Component {
  constructor(props){
    super(props);


    this.state = {
      isLoggedIn: false,
      user: {}
    }
       this.userinfo=this.userinfo.bind(this);
       this.handlelogout=this.handlelogout.bind(this);
  }
        
    // console.log(this.state)

    userinfo = (userdata) => {
      this.setState({
        isLoggedIn: true,
        user: userdata.user
      });
    }

    handlelogout(){
      this.setState({
        isLoggedIn: false,
        user: {}
      });
    }

  componentDidMount(){
    axios.get("/isloggedin")
    .then((response) => {
      console.log(response)
      if(response.data.status === `user is logged in` && this.state.isLoggedIn === false){
          this.setState({
            isLoggedIn: true,
            user: response.data.user
          })
      }else if(response.data.status === `not logged in` && this.state.isLoggedIn===true){
        this.setState({
          isLoggedIn: false,
          user: {}
        });
      }  
    })
  }

  componentDidUpdate(){
    axios.get("/isloggedin")
    .then((response) => {
      console.log(response)
      if(response.data.status === `user is logged in` && this.state.isLoggedIn === false){
          this.setState({
            isLoggedIn: true,
            user: response.data.user
          })
      }else if(response.data.status === `not logged in` && this.state.isLoggedIn===true){
        this.setState({
          isLoggedIn: false,
          user: {}
        });
      }  
    })
  }

  render() {
    return (
      <Router>
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        
          <div className="container">
            <a className="navbar-brand" href="/">MERN-Stack Todo App</a>
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
                  <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link to="/register" className="nav-link">{this.state.isLoggedIn ? `Welcome ${this.state.user.username}` : "Sigh Up"}</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/logout" className="nav-link">{this.state.isLoggedIn ? "Logout" : ""}</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/login" className="nav-link">{this.state.isLoggedIn ? `` : "Log In"}</Link>
                    </li>
                  </ul>
                </div>
          </div>
        </nav>
          <Route path="/" exact component={TodosList} /> 
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create"  component={CreateTodo} />
          <Route path="/delete/:id" component={DeleteTodo} />
          <Route path="/register" render={props => (<Register {...props} handleinfo={this.userinfo} />)}/>
          <Route path="/login" render={props => (<Login {...props} handleinfo={this.userinfo} />)} />
          <Route path="/logout" render={(props) => (<Logout {...props} handlelogout={this.handlelogout}  />)} />

      </div>
      </Router>
    )
     
  }
}

export default App;
