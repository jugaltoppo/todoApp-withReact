import React, { Component } from "react";
import axios from 'axios';

export default class EditTodo extends Component {
    constructor(props){
        super(props);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: "",
            todo_responsible: "",
            todo_priority: '',
            todo_completed: Boolean
        }
    }

        componentDidMount(){
           axios.get("http://localhost:4000/" + this.props.match.params.id)
           .then( (res) => {
               this.setState({
                   todo_description: res.data.todo_description,
                   todo_responsible: res.data.todo_responsible,
                   todo_priority: res.data.todo_priority,
                   todo_completed: res.data.todo_completed
               });
           })
           .catch((err) => {
               console.group(err)
           })
        }

        onChangeTodoDescription = (e) => {
            this.setState({
                todo_description: e.target.value
            })
        }

        onChangeTodoResponsible = (e) => {
            this.setState({
                todo_responsible: e.target.value
            })
        }

        onChangeTodoPriority = (e) => {
            this.setState({
                todo_priority: e.target.value
            })
        }

        onChangeTodoCompleted = () => {
            this.setState({
                todo_completed: !this.state.todo_completed
            })
        }

        onSubmit = () => {
            axios.put("http://localhost:4000/" + this.props.match.params.id, this.state)
            .then((res) => {
                console.log(res.data)
            })

            this.props.history.push("/")
        }
    

    render () {
        {console.log(this.state)}
        return (
            <div className="container">
                <h1>Create new Todo</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="description">Description: </label>
                        <input className="form-control" type="text" id="description" name="description" value={this.state.todo_description} onChange={this.onChangeTodoDescription} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="responsible">Responsible: </label>
                        <input className="form-control" type="text" id="responsible" name="responsible" value={this.state.todo_responsible} onChange={this.onChangeTodoResponsible} />
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="Low" checked={this.state.todo_priority === 'Low'} id="priorityLow" name="priorityOptions" onChange={this.onChangeTodoPriority} />
                        <label htmlFor="priorityLow" className="form-check-label">Low</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="Medium" checked={this.state.todo_priority === 'Medium'} id="priorityMedium" name="priorityOptions" onChange={this.onChangeTodoPriority} />
                        <label htmlFor="priorityMedium" className="form-check-label">Medium</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="High" checked={this.state.todo_priority=== 'High'} id="priorityHigh" name="priorityOptions" onChange={this.onChangeTodoPriority} />
                        <label htmlFor="priorityHigh" className="form-check-label">High</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value={this.state.todo_completed} checked={this.state.todo_completed} id="completed" name="completed" onChange={this.onChangeTodoCompleted} />
                        <label htmlFor="completed" className="form-check-label">Completed</label>
                    </div>
                    <button className="btn btn-primary btn-block">Create Todo</button>
                </form>
            </div>
        );
    };
}
