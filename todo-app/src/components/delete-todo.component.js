import React, { Component } from 'react';
import axios from "axios";

class DeleteTodo extends Component{
    componentWillMount(){
        axios.delete("/todo/" + this.props.match.params.id)
        .then((res) => {
            this.setState({todos: res.data});
        })
        .catch((err) => {
            console.log(err);
        })

        this.props.history.push('/');
    }

    render(){
        return <div></div>
    }
}

export default DeleteTodo;