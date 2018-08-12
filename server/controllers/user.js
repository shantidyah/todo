const Users = require('../models/users')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

class User{
    static show(req,res){
        var decoded = jwt.verify(req.headers.token, process.env.secret_key)
        // console.log(decoded);
        
        Users.findOne({
            _id:decoded.id
        })
        .populate('todos')
        .then(users=>{
            // console.log(users);
            
            res.status(200).json(users)
        })
        .catch(err=>{
            res.json(err)
        })
    }
    static add(req,res){
        const saltRounds = 5;
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(req.body.password, salt);
        // console.log("masuk routes add");
        Users.find({
            email:req.body.email
        },(err,user)=>{
            if(user.length>0){
                res.json("email already used")
            }
            else{
                Users.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                },function(err,user){
                    if(err){
                        res.json(err)
                    }
                    else{
                        const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.secret_key)
                        res.json(token)
                    }
                })
            }
        })
    }
    static login(req,res){
        Users.findOne({
            email:req.body.email
        })
        .then(user=>{
            if(user!=null){
                var statusPass = bcrypt.compareSync(req.body.password, user.password);
                if(statusPass){
                    const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.secret_key)
                    res.json(token)
                  }
                  else{
                    // console.log("your password wrong");
                    res.json("x")
                  }
            }else{
                res.json("o")
            }
        })
    }
}

module.exports = User