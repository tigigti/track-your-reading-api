var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

var User = require("../models/User");

router.get("/",function(req,res){
    User.find(function(err,users){
        if(err) return res.status(500).send("Something wrong");
        res.send(users);
    });
});

router.put("/update",function(req,res){
    User.findByIdAndUpdate(req.body.id,{
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    },function(err,user){
        if(err) return res.status(500).send("Couldn't update user");
        res.status(200).send(user);
    });
});

router.delete("/delete",function(req,res){
    User.findByIdAndRemove(req.body.id,function(err,user){
        if(err) return res.status(500).send("Couldn't delete User");
        res.status(200).send("User "+user.name+" was deleted");
    });
});

router.post("/register",function(req,res){

    var hashedPassword = bcrypt.hashSync(req.body.password,8);

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    },function(err,user){
        if(err) return res.status(500).send("User could not be created");
        var token = jwt.sign({id: user._id}, process.env.SECRETKEY, {
            expiresIn: 86400 // 24 Hours
        });
        res.status(200).send({auth: true, token: token});
    });
});

module.exports = router;