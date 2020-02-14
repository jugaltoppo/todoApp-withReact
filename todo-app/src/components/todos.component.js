import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class TodosList extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {todos:[]}
    }
    
    componentDidMount(){
        axios.get("http://localhost:4000")
        .then((res) => {
            this.setState({todos: res.data});
        })
        .catch((err) => {
            console.log(err);
        })
    }

    componentDidUpdate(){
        axios.get("http://localhost:4000")
        .then((res) => {
            this.setState({todos: res.data});
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    render () {
        return (
            <div className="container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Description</th>
                            <th scope="col">Responsible</th>
                            <th scope="col">Priority</th>
                            <th scope="col">Completed</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.todos.map((data, key) => {
                           return ( <tr key={key}>
                                        <td className={data.todo_completed ? 'completed' : ''}>{data.todo_description}</td>
                                        <td className={data.todo_completed ? 'completed' : ''}>{data.todo_responsible}</td>
                                        <td className={data.todo_completed ? 'completed' : ''}>{data.todo_priority}</td>
                                        <td>{data.todo_completed ? "Yes" : "No"}</td>
                                        <td><Link to={"/edit/" + data._id}>Edit</Link></td>
                                     </tr>);
                        })}
                    </tbody>
                </table>
            </div>
            );
        }
    }
    
    // export default TodosList;