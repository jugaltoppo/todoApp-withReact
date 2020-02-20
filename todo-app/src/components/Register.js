import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component{
    constructor(props){
        super(props);

        this.usernameOnChange= this.usernameOnChange.bind(this);
        this.passwordOnChange= this.passwordOnChange.bind(this);
        this.onSubmitAction= this.onSubmitAction.bind(this);

        this.state={
            username: '',
            password: ''
        }
    }

    usernameOnChange(e){
        this.setState({
            username: e.target.value
        });
    }

    passwordOnChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    onSubmitAction= (e) => {
        e.preventDefault();
        axios.post("/register", this.state)
        .then((response) => {
            console.log(response);
            if(response.data.status === "success"){
                this.props.handleinfo(response.data);
                this.props.history.push("/")
            }else{
                this.setState({
                    username: '',
                    password: ''
                });
                this.props.history.push("/register");
            }
        })

    }


    render(){
        return(
            <div className="container mt-5" onSubmit={this.onSubmitAction}>
                <h1>Register User</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input className="form-control" type="text" id="username" value={this.state.username} onChange={this.usernameOnChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input className="form-control" type="password" id="password" value={this.state.password} onChange={this.passwordOnChange} />
                    </div>
                    <button className="btn- btn-primary btn-block">SignUp</button>
                </form>
            </div>
        );
    }
}

export default Register;