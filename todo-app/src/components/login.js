import React, { Component } from 'react';
import Axios from 'axios';

class Login extends Component{
    constructor(props){
        super(props);
        
        this.state= {
            username: "",
            password: ""
        }
        this.handleOnChange=this.handleOnChange.bind(this);
        this.handleOnSubmit=this.handleOnSubmit.bind(this);
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    
    handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        Axios.post("/login", this.state)
        .then((response) => {
            console.log(response);
            if(response.data.status==="success"){
                this.props.handleinfo(response.data)
                this.props.history.push("/")
            }else{
                this.props.history.push("/login");
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    render(){
        return (
            <div className="container mt-5">
                <h1>Login Page</h1>
                <form onSubmit={this.handleOnSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" className="form-control" name="username" value={this.state.username} onChange={this.handleOnChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" className="form-control" name="password" value={this.state.password} onChange={this.handleOnChange} />
                    </div>
                    <button className="btn btn-primary btn-block">Log In</button>
                </form>
            </div>
            );
        }
    }
    
    export default Login;