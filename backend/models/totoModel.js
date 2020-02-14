var mongoose = require("mongoose");

var todoSchema = new mongoose.Schema({
    todo_description: String,
    todo_responsible: String,
    todo_priority: String,
    todo_completed: Boolean
});

var Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;