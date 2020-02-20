import React, { Component } from 'react';
import axios from 'axios';

class Logout extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        axios.get("/logout")
        .then((response) => {
            this.props.handlelogout();
            this.props.history.push("/");
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render(){
        return (
            <div><h1>you shouldn't see this Logout page</h1></div>
        );
    }
}

export default Logout;