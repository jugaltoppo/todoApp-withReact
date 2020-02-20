import React, { Component } from 'react';
import axios from 'axios';

class Logout extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        axios.get("/logout")
        .then((response) => {
            if(response.data === "success"){
                console.log("success");
                this.props.handlelogout();
                this.props.history.push("/");
            }
        })
    }

    render(){
        return (
            <div><h1>logout</h1></div>
        );
    }
}

export default Logout;