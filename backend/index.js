var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

app.use(express.static('build'));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());

var uri = process.env.MONGOURL || 'mongodb://localhost/todo'
mongoose.connect(uri)

var Todo = require("./models/totoModel");

app.get("/todo",function(req,res){
    Todo.find({})
    .then((index) => {
        res.json(index);
    })
    .catch((err) => {
        console.log(err);
    })
});

app.post("/todo/add", function(req, res){
    var data= req.body;
    console.log(data);
    Todo.create(data, function(err, createdTodo){
        if(err){
            console.log(err);
        }else{
            res.send("todo created");
        }
    });
});

app.get("/todo/:id",function(req,res){
    // Todo.findById(req.params.id, function(err, found){
    //     if(err){
    //         console.log(err);
    //     }else{
    //         res.json(found)
    //     }
    // });
    Todo.findById(req.params.id)
    .then((found) => {
        res.json(found);
    })
    .catch((err) => {
        console.log(err);
    })
});

app.put("/todo/:id", function(req, res){
    // Todo.findByIdAndUpdate(req.params.id, req.body)
    // .then((updated) => {
    //     res.json(updated);
    // })
    // .catch((err) => {
    //     console.log("error")
    // })
    Todo.findByIdAndUpdate(req.params.id, req.body, function(err, updated){
        if(err){
            console.log(err);
        }else{
            console.log("updated");
            res.json(updated);
        }
    })
});

var port = process.env.PORT || 4000
app.listen(port,function(){
    console.log("listening to port 4000");
})