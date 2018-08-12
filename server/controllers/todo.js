var Todos = require('../models/todos')
const Users = require('../models/users')

const jwt = require('jsonwebtoken')


class Todo{
    static show(req,res){
        Todos.find({})
        .then(todos=>{
            res.json(todos)
        })
    }
    static add(req,res){
        var decode = jwt.verify(req.headers.token, process.env.secret_key)
        // console.log(decode);
        var date = Number(req.body.deadline)
        var createDate = new Date()
        var deadline = createDate.setDate(createDate.getDate()+date)
        var deadLine = new Date(deadline)
        Todos.create({
            todo:req.body.todo,
            deadLine:deadLine,
            status:req.body.status
        })
        .then(todo=>{
            // console.log(todo);
            Users.update({
                _id:decode.id
            },{
                $push:{
                  todos:todo._id  
                }
            })
            .then(user=>{
                res.json(user)
            })
            .catch(err=>{
                res.json(err)
            })
        })
        .catch(err=>{
            res.json(err)
        })
    }
    static deleteTodo(req,res){
        Todos.findByIdAndDelete(req.params.id,function(err,todo){
            if(err){
                res.json(err)
            }
            else{
                res.json(todo)
            }
        })
    }
    static update(req,res){
        Todos.findByIdAndUpdate(req.params.id,{
            todo:req.body.todo
        },function(err,todo){
            if(err){
                res.json(err)
            }
            else{
                res.json(todo)
            }
        })
    }
    static progress(req,res){
        Todos.findByIdAndUpdate(req.params.id,{
            progress:req.body.progress
        },function(err,todo){
            if(err){
                res.json(err)
            }
            else{
                res.json(todo)
            }
        })
    }
    static filterToday(req,res){
        var decode = jwt.verify(req.headers.token, process.env.secret_key)
        Users.findOne({
            _id:decode.id
        })
        .populate('todos')
        .then(users=>{
            // console.log(users);
            
            var filter = []
            for( var i = 0; i < users.todos.length; i++){
                var today = new Date()
                var day = today.getDate()
                var month = today.getMonth()
                var year = today.getFullYear()

                var date = users.todos[i].deadLine
                var dl_day = date.getDate()
                var dl_month = date.getMonth()
                var dl_year = date.getFullYear()
                // console.log(day,month,year);
                // console.log(dl_day,dl_month,dl_year);
                
                if(day==dl_day&&month==dl_month&&year==dl_year){
                    filter.push(users.todos[i])
                }
            }
            // console.log(filter);
            
            res.status(200).json(filter)
        })
        .catch(err=>{
            res.json(err)
        })
    }
    static filterStatus(req,res){
        var decode = jwt.verify(req.headers.token, process.env.secret_key)
        Users.findOne({
            _id:decode.id
        })
        .populate('todos')
        .then(users=>{
            // console.log(users);
            
            var filter = []
            for( var i = 0; i < users.todos.length; i++){
                if(users.todos[i].status=="important"){
                    filter.push(users.todos[i])
                }
            }
            // console.log(filter);
            
            res.status(200).json(filter)
        })
        .catch(err=>{
            res.json(err)
        })
    }
}


module.exports = Todo
