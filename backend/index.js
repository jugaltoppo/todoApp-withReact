var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var User = require('./models/user');
var expressSession = require('express-session');
var passport = require('passport');
var passportLocal = require('passport-local');
var bodyParser = require('body-parser');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

var uri = process.env.MONGOURL
console.log(uri)
mongoose.connect(uri)

app.use(express.static('build'));
app.use(express.json());
// app.use(express.urlencoded({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());
app.use(expressSession({
    secret: "last christmas i gave you my heart",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


var Todo = require("./models/totoModel");

app.get("/",function(req, res){
    res.redirect("/todo");
})

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
            // console.log("updated");
            res.send("todo updated");
        }
    })
});

app.delete("/todo/:id", function(req, res){
    Todo.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        }else{
            res.send("todo deleted")
        }
    })
})


//register
app.post("/register", function(req, res){

    User.register(new User({username: req.body.username}), req.body.password, function(err, newuser){
        if(err){
            console.log(err);
            res.json({status: err.message});
        }else{
            // console.log(newuser);
            passport.authenticate("local")(req, res, function(){
                // console.log(req)
                res.json({
                    status: "success",
                    user: newuser
                });
            });
        }
    })
});

//login
// app.post("/login", function(req, res, next){
//     passport.authenticate("local", function(err, user, info){
//        if(!err && !info){
//            res.json({
//                status: "success",
//                user: user
//            })
//        }else{
//            res.json({
//                status : "failure",
//                message: info.message
//            })
//        }
//     })(req, res, next)
// })

// app.post("/login", function(req, res){
//     passport.authenticate("local")(req, res, function(){
//         console.log(req)
//         res.json({
//             status: "success",
//             // user: newuser
//         });
//     })
// })

app.post("/login",passport.authenticate("local",{
    successRedirect: "/success",
    failureRedirect: "/fail"
}))
app.get("/success",function(req, res){
    res.json({
        status: "success",
        user: req.user
    });
})
app.get("/fail", function(req, res){
    res.json({
        status: "failure"
    });
})

app.get("/logout", function(req, res){
    if(req.user){
    req.logOut();
    res.send("success")
    }else{
        res.send("fail")
    }
})

// check if logged in 
app.get("/isloggedin", function(req, res){
    // console.log(req);
    if(req.user){
        res.json({
            status: "user is logged in",
            user: req.user
        });
    }else{
        res.json({
            status: "not logged in"
        });
    }
});

var port = process.env.PORT || 4000
app.listen(port,function(){
    console.log("listening to port 4000");
})