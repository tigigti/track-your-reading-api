var express = require("express");
var router = express.Router();
var User = require("../models/User");

router.get("/",function(req,res){
    User.find(function(err,users){
        if(err) return res.status(500).send("Something wrong");
        res.send(users);
    });
});

router.post("/",function(req,res){
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    },function(err,user){
        if(err) return res.status(500).send("Couldn't create User");
        res.status(200).send(user);
    });
});

router.put("/",function(req,res){
    User.findByIdAndUpdate(req.body.id,{
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    },function(err,user){
        if(err) return res.status(500).send("Couldn't update user");
        res.status(200).send(user);
    });
});

router.delete("/",function(req,res){
    User.findByIdAndRemove(req.body.id,function(err,user){
        if(err) return res.status(500).send("Couldn't delete User");
        res.status(200).send("User "+user.name+" was deleted");
    });
});

module.exports = router;